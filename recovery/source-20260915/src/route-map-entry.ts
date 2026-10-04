import 'maplibre-gl/dist/maplibre-gl.css'
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import './route-map.css'

type RouteStop = {
  id: string
  name: string
  lat: number
  lng: number
}

type RouteMapData = {
  id: string
  origin: string
  destination: string
  color: string
  path: [number, number][]
  stops: RouteStop[]
}

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean }
}

const wrapper = document.querySelector<HTMLElement>('[data-route-map]')
const canvas = document.querySelector<HTMLElement>('[data-route-map-canvas]')
const dataElement = document.querySelector<HTMLScriptElement>('[data-route-map-data]')
const status = document.querySelector<HTMLElement>('[data-route-map-status]')

function readRouteData() {
  if (!dataElement?.textContent) return null
  try {
    const data = JSON.parse(dataElement.textContent) as RouteMapData
    if (!Array.isArray(data.path) || data.path.length < 2 || !Array.isArray(data.stops)) return null
    return data
  } catch {
    return null
  }
}

function showFallback(message: string) {
  wrapper?.classList.remove('is-map-loading', 'is-map-ready')
  wrapper?.classList.add('is-map-fallback')
  if (status) status.textContent = message
}

function markerElement(kind: 'start' | 'end', label: string) {
  const element = document.createElement('button')
  element.type = 'button'
  element.className = `route-map-marker route-map-marker--${kind}`
  element.setAttribute('aria-label', label)
  element.title = label
  return element
}

async function initializeRouteMap(data: RouteMapData) {
  if (!wrapper || !canvas) return
  wrapper.classList.add('is-map-loading')
  if (status) status.textContent = 'Cargando mapa interactivo.'

  try {
    const maplibre = await import('maplibre-gl')
    maplibre.setWorkerUrl(workerUrl)

    const coordinates = data.path.map(([lat, lng]) => [lng, lat] as [number, number])
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let resourceFailed = false
    let ready = false

    const map = new maplibre.Map({
      container: canvas,
      style: 'https://tiles.openfreemap.org/styles/positron',
      center: coordinates[0],
      zoom: 12,
      attributionControl: {},
      cooperativeGestures: true,
      dragRotate: false,
      touchPitch: false,
    })

    map.addControl(new maplibre.NavigationControl({ showCompass: false }), 'top-right')
    map.on('error', () => {
      resourceFailed = true
      if (ready) {
        map.remove()
        showFallback('El mapa interactivo no está disponible. Se muestra el recorrido esquemático.')
      }
    })

    map.on('load', () => {
      map.addSource('yuubus-route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: { type: 'LineString', coordinates },
        },
      })
      map.addLayer({
        id: 'yuubus-route-casing',
        type: 'line',
        source: 'yuubus-route',
        paint: {
          'line-color': '#fffaf0',
          'line-width': 9,
          'line-opacity': 0.92,
        },
        layout: { 'line-cap': 'round', 'line-join': 'round' },
      })
      map.addLayer({
        id: 'yuubus-route-line',
        type: 'line',
        source: 'yuubus-route',
        paint: {
          'line-color': data.color || '#F56A16',
          'line-width': 5,
          'line-opacity': 0.96,
        },
        layout: { 'line-cap': 'round', 'line-join': 'round' },
      })

      const stopFeatures = data.stops.map((stop) => ({
        type: 'Feature' as const,
        properties: { id: stop.id, name: stop.name },
        geometry: { type: 'Point' as const, coordinates: [stop.lng, stop.lat] },
      }))
      map.addSource('yuubus-stops', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: stopFeatures },
      })
      map.addLayer({
        id: 'yuubus-stop-hit',
        type: 'circle',
        source: 'yuubus-stops',
        paint: { 'circle-radius': 14, 'circle-opacity': 0 },
      })
      map.addLayer({
        id: 'yuubus-stop-dots',
        type: 'circle',
        source: 'yuubus-stops',
        paint: {
          'circle-radius': 4.5,
          'circle-color': '#FFFFFF',
          'circle-stroke-color': data.color || '#352078',
          'circle-stroke-width': 2,
        },
      })

      map.on('click', 'yuubus-stop-hit', (event) => {
        const feature = event.features?.[0]
        if (!feature || feature.geometry.type !== 'Point') return
        const [lng, lat] = feature.geometry.coordinates as [number, number]
        new maplibre.Popup({ closeButton: false, offset: 10, maxWidth: '240px' })
          .setLngLat([lng, lat])
          .setText(String(feature.properties?.name ?? 'Parada'))
          .addTo(map)
      })
      map.on('mouseenter', 'yuubus-stop-hit', () => { map.getCanvas().style.cursor = 'pointer' })
      map.on('mouseleave', 'yuubus-stop-hit', () => { map.getCanvas().style.cursor = '' })

      const startStop = data.stops.find((stop) => !stop.id.includes('_REG_')) ?? data.stops[0]
      const outboundStops = data.stops.filter((stop) => !stop.id.includes('_REG_'))
      const endStop = outboundStops[outboundStops.length - 1] ?? data.stops[data.stops.length - 1]
      const first: [number, number] = startStop ? [startStop.lng, startStop.lat] : coordinates[0]
      const last: [number, number] = endStop ? [endStop.lng, endStop.lat] : coordinates[coordinates.length - 1]
      const startLabel = `Inicio: ${startStop?.name ?? data.origin}`
      const endLabel = `Destino: ${endStop?.name ?? data.destination}`
      new maplibre.Marker({ element: markerElement('start', startLabel) })
        .setLngLat(first)
        .setPopup(new maplibre.Popup({ offset: 15 }).setText(startLabel))
        .addTo(map)
      new maplibre.Marker({ element: markerElement('end', endLabel) })
        .setLngLat(last)
        .setPopup(new maplibre.Popup({ offset: 15 }).setText(endLabel))
        .addTo(map)

      const bounds = coordinates.reduce(
        (current, coordinate) => current.extend(coordinate),
        new maplibre.LngLatBounds(coordinates[0], coordinates[0]),
      )
      map.fitBounds(bounds, {
        padding: window.innerWidth <= 620 ? 30 : 48,
        maxZoom: 15,
        duration: reducedMotion ? 0 : 500,
      })
    })

    map.once('idle', () => {
      if (resourceFailed) {
        map.remove()
        showFallback('El mapa interactivo no está disponible. Se muestra el recorrido esquemático.')
        return
      }
      ready = true
      wrapper.classList.remove('is-map-loading', 'is-map-fallback')
      wrapper.classList.add('is-map-ready')
      if (status) status.textContent = 'Mapa interactivo disponible.'
    })
  } catch {
    showFallback('El mapa interactivo no está disponible. Se muestra el recorrido esquemático.')
  }
}

const routeData = readRouteData()
const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true

if (!routeData || !wrapper || !canvas) {
  showFallback('Se muestra el recorrido esquemático.')
} else if (saveData) {
  showFallback('El ahorro de datos está activo. Se muestra el recorrido esquemático.')
} else if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return
    observer.disconnect()
    void initializeRouteMap(routeData)
  }, { rootMargin: '320px 0px' })
  observer.observe(wrapper)
} else {
  void initializeRouteMap(routeData)
}
