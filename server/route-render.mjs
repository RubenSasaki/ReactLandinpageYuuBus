// Preserved production templates; data supplied at request time.
const SITE_ORIGIN = "https://www.yuubus.com";
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function jsonLd(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c')
}

export function staticHeader() {
  return `<header class="page-header"><div class="page-header-inner"><a class="page-brand" href="/" aria-label="Yuu Bus — inicio"><img src="/yuubus-icon-192.png" alt="" width="38" height="38"><span>Yuu Bus</span></a><nav class="route-page-nav" aria-label="Navegación"><a class="route-page-primary" href="/rutas/">Rutas</a><a class="route-page-primary" href="/anunciate/">Anúnciate</a><details class="nav-more"><summary>Más</summary><nav class="nav-more-menu" aria-label="Navegación secundaria"><a class="nav-more-mobile-primary" href="/rutas/">Rutas</a><a class="nav-more-mobile-primary" href="/anunciate/">Anúnciate</a><a href="/eventos/">Eventos</a><a href="/colabora/">Colabora</a><a href="/privacy/">Aviso de Privacidad</a><a href="/terminos/">Términos y Condiciones</a></nav></details><a href="/">Inicio</a></nav></div></header>`
}

export function staticFooter() {
  return `<footer><div class="footer-greca" aria-hidden="true"></div><img class="footer-logo" src="/yuubus-icon-192.png" alt="Icono oficial de Yuu Bus" width="192" height="192" loading="lazy"><strong class="footer-brand">Yuu Bus: Rutas Oaxaca</strong><span class="footer-studio">Un producto de MonteCode</span><strong class="footer-trust">Hecho para moverse por Oaxaca.</strong><nav class="footer-links" aria-label="Enlaces del pie de página"><a href="/rutas/">Rutas</a><a href="/anunciate/">Anúnciate</a><a href="/eventos/">Eventos</a><a href="/colabora/">Colabora</a><a href="/privacy/">Aviso de Privacidad</a><a href="/terminos/">Términos y Condiciones</a></nav><p>Hecha por Equipo Yuu Bus · Oaxaca de Juárez, México<br>App no oficial. Datos capturados por la comunidad.<br>Contacto: <a href="mailto:montealbancode@gmail.com">montealbancode@gmail.com</a></p><button class="footer-cookie-button" type="button" data-cookie-preferences>Preferencias de cookies</button></footer>`
}

function documentHtml({ title, description, canonical, bodyClass, routeId, content, structuredData, assetTags, extraHead = '', extraScript = '' }) {
  return `<!doctype html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}"><meta name="robots" content="index, follow, max-image-preview:large"><meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:type" content="website"><meta property="og:url" content="${canonical}"><meta property="og:site_name" content="YuuBus"><meta property="og:locale" content="es_MX"><meta property="og:image" content="${SITE_ORIGIN}/og-yuubus.png"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(title)}"><meta name="twitter:description" content="${escapeHtml(description)}"><meta name="twitter:image" content="${SITE_ORIGIN}/og-yuubus.png"><link rel="canonical" href="${canonical}"><meta name="theme-color" content="#352078"><link rel="icon" type="image/png" href="/yuubus-icon-192.png">${assetTags.styles}${extraHead}<script type="application/ld+json">${jsonLd(structuredData)}</script></head><body data-yuubus-static-page="${bodyClass}"${routeId ? ` data-route-id="${escapeHtml(routeId)}"` : ''}>${content}<div id="root"></div>${assetTags.scripts}${extraScript}</body></html>`
}

function routeDiagram(route) {
  const paths = [route.outboundPath, route.returnPath].filter((points) => points.length > 1)
  const all = paths.flat()
  const lats = all.map(([lat]) => lat)
  const lngs = all.map(([, lng]) => lng)
  const minLat = Math.min(...lats)
  const maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs)
  const maxLng = Math.max(...lngs)
  const width = 820
  const height = 340
  const padding = 28
  const latRange = Math.max(maxLat - minLat, 0.0001)
  const lngRange = Math.max(maxLng - minLng, 0.0001)
  const mapPoint = ([lat, lng]) => {
    const x = padding + ((lng - minLng) / lngRange) * (width - padding * 2)
    const y = padding + ((maxLat - lat) / latRange) * (height - padding * 2)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }
  const polylines = paths.map((points, index) => {
    const step = Math.max(1, Math.ceil(points.length / 320))
    const sampled = points.filter((_, position) => position % step === 0 || position === points.length - 1)
    return `<polyline class="route-map-line route-map-line--${index === 0 ? 'outbound' : 'return'}" points="${sampled.map(mapPoint).join(' ')}"></polyline>`
  }).join('')
  const first = mapPoint(paths[0][0])
  const lastPath = paths.at(-1)
  const last = mapPoint(lastPath[lastPath.length - 1])
  return `<svg class="route-map-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Recorrido esquemático de ${escapeHtml(route.id)}"><title>Recorrido de ${escapeHtml(route.id)}</title><rect width="${width}" height="${height}" rx="24"></rect>${polylines}<circle class="route-map-node route-map-node--start" cx="${first.split(',')[0]}" cy="${first.split(',')[1]}" r="8"></circle><circle class="route-map-node route-map-node--end" cx="${last.split(',')[0]}" cy="${last.split(',')[1]}" r="8"></circle></svg>`
}

function routeListPage(feed, assetTags) {
  const description = 'Consulta rutas activas de transporte público en Oaxaca, sus recorridos y paradas registradas en YuuBus.'
  const cards = feed.routes.map((route) => {
    const search = `${route.id} ${route.name} ${route.origin} ${route.destination}`.toLocaleLowerCase('es-MX')
    return `<article class="web-route-card" data-route-card data-search="${escapeHtml(search)}" style="--route-color:${route.color}"><div class="web-route-card-top"><span class="web-route-code">${escapeHtml(route.id)}</span><span class="web-route-status">Activa</span></div><h2>${escapeHtml(route.name)}</h2><p class="web-route-journey">${escapeHtml(route.origin)} <span aria-hidden="true">→</span> ${escapeHtml(route.destination)}</p><p>${route.stopCount} paradas registradas</p><a href="/rutas/${route.slug}/">Ver recorrido <span aria-hidden="true">→</span></a></article>`
  }).join('')
  const content = `${staticHeader()}<main class="routes-page"><section class="routes-page-hero"><p class="section-tag">RED YUUBUS</p><h1>Rutas de transporte público en Oaxaca</h1><p>Consulta rutas activas, recorridos y paradas registradas para moverte con más claridad.</p></section><section class="routes-directory" aria-labelledby="routes-list-title"><div class="routes-search"><label for="route-search">Buscar por código, nombre, origen o destino</label><input id="route-search" type="search" placeholder="Ejemplo: RC03, Centro o San Felipe" autocomplete="off"><p id="route-results" aria-live="polite">${feed.routes.length} rutas disponibles</p></div><h2 class="sr-only" id="routes-list-title">Listado de rutas activas</h2><div class="web-routes-grid">${cards}</div><p class="routes-empty" data-routes-empty hidden>No encontramos una ruta con ese término.</p></section></main>${staticFooter()}`
  return documentHtml({
    title: 'Rutas de transporte público en Oaxaca | YuuBus',
    description,
    canonical: `${SITE_ORIGIN}/rutas/`,
    bodyClass: 'routes',
    content,
    assetTags,
    extraScript: '<script type="module" src="/routes-filter.js"></script>',
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebSite', '@id': `${SITE_ORIGIN}/#website`, url: `${SITE_ORIGIN}/`, name: 'YuuBus', inLanguage: 'es-MX' },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Rutas', item: `${SITE_ORIGIN}/rutas/` },
        ] },
      ],
    },
  })
}

function routeDetailPage(route, assetTags, routeMapAssetTags) {
  const title = `${route.id} en Oaxaca — Recorrido y paradas | YuuBus`
  const description = `Consulta el recorrido y las ${route.stopCount} paradas registradas de la ruta ${route.id}, de ${route.origin} a ${route.destination}, en YuuBus.`
  const canonical = `${SITE_ORIGIN}/rutas/${route.slug}/`
  const outbound = route.stops.filter((stop) => !stop.id.includes('_REG_'))
  const returning = route.stops.filter((stop) => stop.id.includes('_REG_'))
  const stopList = (titleText, items) => items.length === 0 ? '' : `<section class="route-stops-group"><h2>${escapeHtml(titleText)}</h2><ol>${items.map((stop) => `<li>${escapeHtml(stop.name)}</li>`).join('')}</ol></section>`
  const mapData = { id: route.id, origin: route.origin, destination: route.destination, color: route.color, path: route.path, stops: route.stops }
  const interactiveMap = `<div class="route-map-stage" data-route-map><div class="route-map-fallback">${routeDiagram(route)}</div><div class="route-map-interactive" data-route-map-canvas aria-label="Mapa interactivo de la ruta ${escapeHtml(route.id)}"></div><p class="sr-only" data-route-map-status aria-live="polite">Se muestra el recorrido esquemático.</p></div><script type="application/json" data-route-map-data>${jsonLd(mapData)}</script>`
  const content = `${staticHeader()}<main class="route-detail-page" style="--route-color:${route.color}"><nav class="route-breadcrumb" aria-label="Ruta de navegación"><a href="/">Inicio</a><span>/</span><a href="/rutas/">Rutas</a><span>/</span><span aria-current="page">${escapeHtml(route.id)}</span></nav><header class="route-detail-hero"><div><span class="route-detail-code">${escapeHtml(route.id)}</span><span class="web-route-status">Activa</span></div><h1>${escapeHtml(route.origin)} <span aria-hidden="true">→</span> ${escapeHtml(route.destination)}</h1><p>${escapeHtml(route.name)}</p></header><section class="route-fact" aria-label="Resumen de ruta"><p>La ruta ${escapeHtml(route.id)} conecta ${escapeHtml(route.origin)} con ${escapeHtml(route.destination)} y cuenta con ${route.stopCount} paradas registradas en YuuBus.</p></section><section class="route-map-section" aria-labelledby="route-map-title"><div><p class="section-tag">RECORRIDO</p><h2 id="route-map-title">Mapa de la ruta ${escapeHtml(route.id)}</h2><p>Recorrido basado en el trayecto registrado. Consulta la app para explorar el mapa con mayor detalle.</p></div>${interactiveMap}</section><section class="route-stops" aria-labelledby="route-stops-title"><p class="section-tag">PARADAS</p><h2 id="route-stops-title">Paradas de ${escapeHtml(route.id)}</h2><div class="route-stops-grid">${stopList('Recorrido de ida', outbound)}${stopList('Recorrido de regreso', returning)}</div></section><section class="route-download"><div><p class="section-tag">MUÉVETE CON YUUBUS</p><h2>Consulta esta ruta desde tu teléfono</h2><p>Descarga YuuBus para explorar rutas, paradas y opciones de viaje en Oaxaca.</p></div><a href="https://play.google.com/store/apps/details?id=mx.oaxaca.rutasoaxaca" target="_blank" rel="noopener noreferrer">Abrir / Descargar YuuBus</a></section></main>${staticFooter()}`
  return documentHtml({
    title,
    description,
    canonical,
    bodyClass: 'route-detail',
    routeId: route.id,
    content,
    assetTags,
    extraHead: routeMapAssetTags.styles,
    extraScript: routeMapAssetTags.scripts,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Rutas', item: `${SITE_ORIGIN}/rutas/` },
        { '@type': 'ListItem', position: 3, name: route.id, item: canonical },
      ],
    },
  })
}


export {routeListPage,routeDetailPage};
