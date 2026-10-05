// Validation from the recovered route renderer; no build-time fetching.
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


export {routeSlug,publishedRouteColor,entryIsVisible,validateRouteDocument,mapWithConcurrency,ROUTE_ID_PATTERN};
