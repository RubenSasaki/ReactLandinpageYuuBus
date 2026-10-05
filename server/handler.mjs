import {getRoutes, getEvents, visibleRoutes, currentEvents, routePreview} from './catalog.mjs';
import {routeListPage, routeDetailPage} from './route-render.mjs';
import {listing, detail, missing, shell} from './event-render.mjs';

export function createHandler(assets, {routes = getRoutes, events = getEvents, clock = () => new Date()} = {}) {
  return async (req, res) => {
    const url = new URL(req.url, 'https://www.yuubus.com');
    const pathname = '/' + (url.searchParams.get('catalogPath') || url.pathname).replace(/^\/+/, '');
    const json = pathname.endsWith('.json');
    const send = (status, body, cache = 'no-store') => {
      res.statusCode = status;
      res.setHeader('Content-Type', json ? 'application/json; charset=utf-8' : 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', cache);
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.end(req.method === 'HEAD' ? '' : json ? JSON.stringify(body) : body);
    };
    if (!['GET','HEAD'].includes(req.method)) {res.setHeader('Allow','GET, HEAD'); return send(405, {error:'Method not allowed'});}
    const isRoute = /^\/rutas(?:\/|$)/.test(pathname) || ['/routes-preview.json','/route-stats.json'].includes(pathname);
    const isEvent = /^\/eventos(?:\/|$)/.test(pathname) || pathname === '/events-preview.json';
    if (!isRoute && !isEvent) return send(404, json ? {error:'Not found'} : missing(assets));
    try {
      const snapshot = await (isRoute ? routes() : events());
      const now = clock();
      const data = isRoute ? visibleRoutes(snapshot.value, now) : currentEvents(snapshot.value, now);
      // Browser revalidates; CDN + warm-instance cache gives at most ~2 minutes normal freshness.
      // Event responses must not outlive the earliest closing instant.
      const seconds = isEvent && data.length ? Math.max(0, Math.min(60, ...data.map(e => Math.floor((Date.parse(e.end)-now.getTime())/1000)))) : 60;
      const cache = snapshot.stale ? 'no-store' : `public, max-age=0, s-maxage=${seconds}, must-revalidate`;
      res.setHeader('X-Catalog-Fetched-At', new Date(snapshot.fetchedAt).toISOString());
      res.setHeader('X-Catalog-State', snapshot.stale ? 'stale' : 'fresh');
      if (pathname === '/routes-preview.json') return send(200, routePreview(data), cache);
      if (pathname === '/route-stats.json') return send(200, {routes:data.length, stops:data.reduce((sum,r)=>sum+r.stopCount,0)}, cache);
      if (pathname === '/events-preview.json') return send(200, {fetchedAt:new Date(snapshot.fetchedAt).toISOString(),events:data.slice(0,3).map(({id,slug,title,venue,image,imageAlt,startDate})=>({id,slug,title,venue,image,imageAlt,startDate}))}, cache);
      const base = isRoute ? '/rutas' : '/eventos';
      const slug = pathname.slice(base.length).replace(/^\/|\/$/g, '');
      if (!slug || slug === 'index.html') return send(200, isRoute ? routeListPage({routes:data},assets) : listing(data,assets), cache);
      const item = data.find(e => e.slug === slug.replace(/\/index\.html$/, ''));
      if (!item) return send(404, isRoute ? shell({title:'Ruta no disponible | YuuBus',description:'Esta ruta no está disponible en el catálogo público.',canonical:'https://www.yuubus.com/rutas/',assets,robots:'noindex, follow',body:'<main class="routes-page"><h1>Esta ruta no está disponible.</h1><a href="/rutas/">Consultar rutas activas</a></main>'}) : missing(assets), cache);
      if (isRoute) return send(200, routeDetailPage(item, assets, assets.map), cache);
      // A routes outage must not hide an otherwise available event.
      let nearby = [];
      try {nearby = visibleRoutes((await routes()).value, now);} catch {}
      return send(200, detail(item, nearby, assets, now), cache);
    } catch {
      res.setHeader('Retry-After','60');
      return send(503, json ? {error:'Catálogo temporalmente no disponible'} : shell({
        title:'Catálogo temporalmente no disponible | YuuBus', description:'No pudimos actualizar el catálogo. Intenta nuevamente en unos minutos.',
        canonical:`https://www.yuubus.com/${isRoute?'rutas':'eventos'}/`, assets, robots:'noindex, follow',
        body:'<main class="event-page event-directory-hero"><h1>No pudimos cargar el catálogo.</h1><p>Intenta nuevamente en unos minutos.</p><a href="/">Volver al inicio</a></main>',
      }));
    }
  };
}
