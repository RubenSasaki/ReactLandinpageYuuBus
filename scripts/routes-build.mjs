import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const SITE_ORIGIN = 'https://www.yuubus.com'
const INDEX_URL = process.env.ROUTES_FEED_INDEX_URL
  ?? 'https://raw.githubusercontent.com/RubenSasaki/rutas_oaxaca-feed/main/rutas/indice.json'
const ROUTE_BASE_URL = process.env.ROUTES_FEED_BASE_URL
  ?? 'https://raw.githubusercontent.com/RubenSasaki/rutas_oaxaca-feed/main/rutas/'
const CACHE_FILE = path.resolve('.route-build-cache/routes.json')
const ROUTE_STATS_FILE = path.resolve('src/data/routeStats.generated.ts')
const DIST_DIR = path.resolve('dist')
const FEATURED_ROUTE_IDS = ['RC03', 'RA08', 'GE21', 'RT01']
const ROUTE_ID_PATTERN = /^[A-Z][A-Z0-9]{1,15}$/
const HEX_COLOR_PATTERN = /^#[0-9A-F]{6}$/i
const SPECIAL_ROUTE_COLORS = {
  GE11: '#3D2A80',
  GE12: '#B7295A',
  GE21: '#C76A16',
  GE22: '#007F73',
  GE23: '#E45D18',
  GE31: '#2F6B3D',
  GE41: '#7A2E72',
}
const SPECIAL_ROUTE_COLOR_RESERVE = [
  '#9B1B4D', '#D24B24', '#006E83', '#5A3A91',
  '#B87812', '#21745C', '#C43D63', '#8A4B16',
]

function fail(message) {
  throw new Error(`Feed de rutas inválido: ${message}`)
}

function requiredString(value, label) {
  if (typeof value !== 'string' || value.trim() === '') fail(`${label} debe ser texto no vacío`)
  return value.trim()
}

function isoDate(value, label) {
  const text = requiredString(value, label)
  const date = new Date(text)
  if (Number.isNaN(date.getTime())) fail(`${label} debe ser ISO-8601 válido`)
  return date
}

async function fetchJson(url, label) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15_000)
  try {
    const response = await fetch(url, {
      headers: { accept: 'application/json' },
      signal: controller.signal,
    })
    if (!response.ok) fail(`${label} respondió HTTP ${response.status}`)
    return await response.json()
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Feed de rutas inválido:')) throw error
    fail(`${label} no pudo descargarse (${error instanceof Error ? error.message : 'error desconocido'})`)
  } finally {
    clearTimeout(timeout)
  }
}

function routeSlug(id) {
  return id.replace(/^([A-Z]+)(\d+)$/, '$1-$2').toLowerCase()
}

// Compatibilidad exacta con colorAutomaticoRutaEspecial de la app: el feed
// publicado permite que una ruta GE delegue su color, sin modificar el origen.
function publishedRouteColor(id, color) {
  if (HEX_COLOR_PATTERN.test(color)) return color
  if (!/^GE[0-9A-Z]+$/.test(id)) fail(`${id}.color debe usar #RRGGBB`)
  if (SPECIAL_ROUTE_COLORS[id]) return SPECIAL_ROUTE_COLORS[id]
  let hash = 0
  for (const unit of id) hash = (hash * 31 + unit.charCodeAt(0)) & 0x7fffffff
  return SPECIAL_ROUTE_COLOR_RESERVE[hash % SPECIAL_ROUTE_COLOR_RESERVE.length]
}

function entryIsVisible(entry, now) {
  if (entry.activa !== true) return false
  if (entry.temporal === true && (!entry.visibleDesde || !entry.visibleHasta)) {
    fail(`${entry.id}: una ruta temporal requiere visibleDesde y visibleHasta`)
  }
  const visibleFrom = entry.visibleDesde ? isoDate(entry.visibleDesde, `${entry.id}.visibleDesde`) : null
  const visibleUntil = entry.visibleHasta ? isoDate(entry.visibleHasta, `${entry.id}.visibleHasta`) : null
  if (visibleFrom && visibleUntil && visibleUntil < visibleFrom) {
    fail(`${entry.id}: visibleHasta no puede ser anterior a visibleDesde`)
  }
  if (visibleFrom && now < visibleFrom) return false
  if (visibleUntil && now > visibleUntil) return false
  return true
}

function validatePoint(point, label) {
  if (!Array.isArray(point) || point.length !== 2) fail(`${label} debe ser [lat, lng]`)
  const [lat, lng] = point
  if (typeof lat !== 'number' || typeof lng !== 'number' || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    fail(`${label} contiene coordenadas inválidas`)
  }
  return [lat, lng]
}

function validateRouteDocument(document, entry) {
  if (!document || typeof document !== 'object' || Array.isArray(document)) fail(`${entry.id}.json no es un objeto`)
  if (requiredString(document.id, `${entry.id}.json.id`) !== entry.id) fail(`${entry.id}.json no coincide con el índice`)
  const name = requiredString(document.nombre ?? entry.nombre, `${entry.id}.nombre`)
  const origin = requiredString(document.origen, `${entry.id}.origen`)
  const destination = requiredString(document.destino, `${entry.id}.destino`)
  if (!Array.isArray(document.paradas) || document.paradas.length === 0) fail(`${entry.id}.paradas debe contener elementos`)
  const stopIds = new Set()
  const stops = document.paradas.map((stop, index) => {
    if (!stop || typeof stop !== 'object' || Array.isArray(stop)) fail(`${entry.id}.paradas[${index}] no es un objeto`)
    const id = requiredString(stop.id, `${entry.id}.paradas[${index}].id`)
    if (stopIds.has(id)) fail(`${entry.id} contiene la parada duplicada ${id}`)
    stopIds.add(id)
    const stopName = requiredString(stop.nombre, `${entry.id}.paradas[${index}].nombre`)
    if (typeof stop.lat !== 'number' || typeof stop.lng !== 'number' || stop.lat < -90 || stop.lat > 90 || stop.lng < -180 || stop.lng > 180) {
      fail(`${entry.id}.paradas[${index}] contiene coordenadas inválidas`)
    }
    return { id, name: stopName, lat: stop.lat, lng: stop.lng }
  })
  if (!Array.isArray(document.trayecto) || document.trayecto.length < 2) fail(`${entry.id}.trayecto debe contener al menos dos puntos`)
  const pathPoints = document.trayecto.map((point, index) => validatePoint(point, `${entry.id}.trayecto[${index}]`))
  const segments = document.trayectosPorSegmento
  if (!segments || typeof segments !== 'object' || Array.isArray(segments)) fail(`${entry.id}.trayectosPorSegmento debe ser un objeto`)
  const segmentPath = (key) => {
    const points = segments[key]
    if (points === undefined || (Array.isArray(points) && points.length === 0)) return []
    if (!Array.isArray(points) || points.length < 2) fail(`${entry.id}.trayectosPorSegmento.${key} debe ser una polilínea válida`)
    return points.map((point, index) => validatePoint(point, `${entry.id}.${key}[${index}]`))
  }
  const outboundPath = segmentPath('ida')
  const returnPath = segmentPath('regreso')
  return {
    id: entry.id,
    slug: routeSlug(entry.id),
    version: requiredString(entry.version, `${entry.id}.version`),
    name,
    origin,
    destination,
    color: entry.color,
    stopCount: stops.length,
    stops,
    path: pathPoints,
    outboundPath: outboundPath.length > 0 ? outboundPath : pathPoints,
    returnPath,
  }
}

async function mapWithConcurrency(items, concurrency, callback) {
  const results = new Array(items.length)
  let cursor = 0
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++
      results[index] = await callback(items[index], index)
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker))
  return results
}

async function prepare() {
  if (!INDEX_URL.startsWith('https://') || !ROUTE_BASE_URL.startsWith('https://')) {
    fail('las fuentes deben utilizar HTTPS')
  }
  const index = await fetchJson(INDEX_URL, 'indice.json')
  if (!index || typeof index !== 'object' || Array.isArray(index)) fail('indice.json no es un objeto')
  const feedVersion = requiredString(index.version, 'indice.version')
  const generatedAt = isoDate(index.generatedAt, 'indice.generatedAt').toISOString()
  if (!Array.isArray(index.rutas) || index.rutas.length === 0) fail('indice.rutas debe contener elementos')

  const ids = new Set()
  const slugs = new Set()
  const now = new Date()
  const visibleEntries = []
  for (const [position, entry] of index.rutas.entries()) {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) fail(`indice.rutas[${position}] no es un objeto`)
    const id = requiredString(entry.id, `indice.rutas[${position}].id`)
    if (!ROUTE_ID_PATTERN.test(id)) fail(`${id}: identificador no canónico`)
    if (ids.has(id)) fail(`${id}: identificador duplicado`)
    ids.add(id)
    requiredString(entry.version, `${id}.version`)
    requiredString(entry.nombre, `${id}.nombre`)
    entry.color = publishedRouteColor(id, entry.color)
    if (typeof entry.activa !== 'boolean' || typeof entry.temporal !== 'boolean') fail(`${id}: activa y temporal deben ser booleanos`)
    const slug = routeSlug(id)
    if (slugs.has(slug)) fail(`${id}: slug duplicado ${slug}`)
    slugs.add(slug)
    if (entryIsVisible(entry, now)) visibleEntries.push(entry)
  }

  const routes = await mapWithConcurrency(visibleEntries, 6, async (entry) => {
    const document = await fetchJson(`${ROUTE_BASE_URL}${encodeURIComponent(entry.id)}.json`, `${entry.id}.json`)
    return validateRouteDocument(document, entry)
  })
  routes.sort((left, right) => left.id.localeCompare(right.id, 'es'))
  const routeById = new Map(routes.map((route) => [route.id, route]))
  const featured = FEATURED_ROUTE_IDS.map((id) => routeById.get(id)).filter(Boolean)
  for (const route of routes) {
    if (featured.length >= 4) break
    if (!featured.some((item) => item.id === route.id)) featured.push(route)
  }
  const preview = featured.slice(0, 4).map(({ id, slug, name, origin, destination, stopCount, color }) => ({
    id, slug, name, origin, destination, stopCount, color,
  }))
  const publicRouteCount = routes.length
  const publicStopCount = routes.reduce((total, route) => total + route.stopCount, 0)

  await mkdir(path.dirname(CACHE_FILE), { recursive: true })
  await writeFile(CACHE_FILE, `${JSON.stringify({
    source: { index: INDEX_URL, base: ROUTE_BASE_URL },
    feedVersion,
    generatedAt,
    routes,
    preview,
  })}\n`)
  await writeFile(ROUTE_STATS_FILE, `// Generado por scripts/routes-build.mjs a partir del feed validado.\nexport const routeStats = {\n  routes: ${publicRouteCount},\n  stops: ${publicStopCount},\n} as const\n`)
  console.log(`Feed de rutas validado: ${publicRouteCount} rutas públicas y ${publicStopCount} paradas.`)
}

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

function staticHeader() {
  return `<header class="page-header"><div class="page-header-inner"><a class="page-brand" href="/" aria-label="Yuu Bus — inicio"><img src="/yuubus-icon-192.png" alt="" width="38" height="38"><span>Yuu Bus</span></a><nav class="route-page-nav" aria-label="Navegación"><a class="route-page-primary" href="/rutas/">Rutas</a><a class="route-page-primary" href="/anunciate/">Anúnciate</a><details class="nav-more"><summary>Más</summary><nav class="nav-more-menu" aria-label="Navegación secundaria"><a class="nav-more-mobile-primary" href="/rutas/">Rutas</a><a class="nav-more-mobile-primary" href="/anunciate/">Anúnciate</a><a href="/colabora/">Colabora</a><a href="/privacy/">Aviso de Privacidad</a><a href="/terminos/">Términos y Condiciones</a></nav></details><a href="/">Inicio</a></nav></div></header>`
}

function staticFooter() {
  return `<footer><div class="footer-greca" aria-hidden="true"></div><img class="footer-logo" src="/yuubus-icon-192.png" alt="Icono oficial de Yuu Bus" width="192" height="192" loading="lazy"><strong class="footer-brand">Yuu Bus: Rutas Oaxaca</strong><span class="footer-studio">Un producto de MonteCode</span><strong class="footer-trust">Hecho para moverse por Oaxaca.</strong><nav class="footer-links" aria-label="Enlaces del pie de página"><a href="/rutas/">Rutas</a><a href="/anunciate/">Anúnciate</a><a href="/colabora/">Colabora</a><a href="/privacy/">Aviso de Privacidad</a><a href="/terminos/">Términos y Condiciones</a></nav><p>Hecha por Equipo Yuu Bus · Oaxaca de Juárez, México<br>App no oficial. Datos capturados por la comunidad.<br>Contacto: <a href="mailto:montealbancode@gmail.com">montealbancode@gmail.com</a></p><button class="footer-cookie-button" type="button" data-cookie-preferences>Preferencias de cookies</button></footer>`
}

function documentHtml({ title, description, canonical, bodyClass, routeId, content, structuredData, assetTags, extraHead = '', extraScript = '' }) {
  return `<!doctype html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}"><meta name="robots" content="index, follow, max-image-preview:large"><meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:type" content="website"><meta property="og:url" content="${canonical}"><meta property="og:site_name" content="YuuBus"><meta property="og:locale" content="es_MX"><meta property="og:image" content="${SITE_ORIGIN}/og-yuubus.png"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(title)}"><meta name="twitter:description" content="${escapeHtml(description)}"><meta name="twitter:image" content="${SITE_ORIGIN}/og-yuubus.png"><link rel="canonical" href="${canonical}"><meta name="theme-color" content="#352078"><link rel="icon" type="image/png" href="/yuubus-icon-192.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">${assetTags.styles}${extraHead}<script type="application/ld+json">${jsonLd(structuredData)}</script></head><body data-yuubus-static-page="${bodyClass}"${routeId ? ` data-route-id="${escapeHtml(routeId)}"` : ''}>${content}<div id="root"></div>${assetTags.scripts}${extraScript}</body></html>`
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

function sitemap(feed) {
  const staticUrls = ['/', '/privacy/', '/terminos/', '/anunciate/', '/colabora/']
  const nodes = staticUrls.map((pathname) => `  <url><loc>${SITE_ORIGIN}${pathname}</loc></url>`)
  nodes.push(`  <url><loc>${SITE_ORIGIN}/rutas/</loc><lastmod>${feed.generatedAt.slice(0, 10)}</lastmod></url>`)
  nodes.push(...feed.routes.map((route) => `  <url><loc>${SITE_ORIGIN}/rutas/${route.slug}/</loc></url>`))
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${nodes.join('\n')}\n</urlset>\n`
}

async function render() {
  const feed = JSON.parse(await readFile(CACHE_FILE, 'utf8'))
  const indexHtml = await readFile(path.join(DIST_DIR, 'index.html'), 'utf8')
  const styles = [...indexHtml.matchAll(/<link[^>]+rel="stylesheet"[^>]*>/g)].map((match) => match[0]).join('')
  const scripts = [...indexHtml.matchAll(/<script[^>]+type="module"[^>]*><\/script>/g)].map((match) => match[0]).join('')
  if (!styles || !scripts) throw new Error('No se encontraron assets compilados de Vite para las páginas estáticas.')
  const assetTags = { styles, scripts }
  const manifest = JSON.parse(await readFile(path.join(DIST_DIR, '.vite', 'manifest.json'), 'utf8'))
  const routeMapEntry = manifest['src/route-map-entry.ts']
  if (!routeMapEntry?.file || routeMapEntry.isEntry !== true) {
    throw new Error('No se encontró la entrada compilada exclusiva para MapLibre.')
  }
  const routeMapAssetTags = {
    styles: (routeMapEntry.css ?? []).map((file) => `<link rel="stylesheet" href="/${file}">`).join(''),
    scripts: `<script type="module" src="/${routeMapEntry.file}"></script>`,
  }

  await mkdir(path.join(DIST_DIR, 'rutas'), { recursive: true })
  await writeFile(path.join(DIST_DIR, 'rutas', 'index.html'), routeListPage(feed, assetTags))
  await writeFile(path.join(DIST_DIR, 'routes-preview.json'), `${JSON.stringify(feed.preview)}\n`)
  for (const route of feed.routes) {
    const routeDirectory = path.join(DIST_DIR, 'rutas', route.slug)
    await mkdir(routeDirectory, { recursive: true })
    await writeFile(path.join(routeDirectory, 'index.html'), routeDetailPage(route, assetTags, routeMapAssetTags))
  }
  await writeFile(path.join(DIST_DIR, 'sitemap.xml'), sitemap(feed))
  console.log(`Páginas estáticas generadas: /rutas/ + ${feed.routes.length} detalles; sitemap con ${feed.routes.length + 6} URLs.`)
}

const command = process.argv[2]
try {
  if (command === 'prepare') await prepare()
  else if (command === 'render') await render()
  else throw new Error('Uso: node scripts/routes-build.mjs <prepare|render>')
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
}
