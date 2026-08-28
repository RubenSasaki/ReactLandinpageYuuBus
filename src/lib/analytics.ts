const META_PIXEL_ID = '1262029865535833'
const CONSENT_KEY = 'yuubus_measurement_consent'

type Consent = 'granted' | 'denied' | null
type MetaPixelFunction = {
  (...args: unknown[]): void
  callMethod?: (...args: unknown[]) => void
  queue: unknown[][]
  loaded: boolean
  version: string
}

declare global {
  interface Window {
    _fbq?: MetaPixelFunction
    fbq?: MetaPixelFunction
  }
}

function campaignContext() {
  const params = new URLSearchParams(window.location.search)
  const context: Record<string, string> = {}

  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
    const value = params.get(key)
    if (value) context[key] = value.slice(0, 120)
  }

  return context
}

export function getMeasurementConsent(): Consent {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

function createPixelFunction() {
  const pixel = function (...args: unknown[]) {
    if (pixel.callMethod) pixel.callMethod(...args)
    else pixel.queue.push(args)
  } as MetaPixelFunction

  pixel.queue = []
  pixel.loaded = true
  pixel.version = '2.0'
  return pixel
}

export function initializeMetaPixel() {
  if (getMeasurementConsent() !== 'granted' || window.fbq) return

  const pixel = createPixelFunction()
  window.fbq = pixel
  window._fbq = pixel

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  script.dataset.yuubusPixel = 'true'
  document.head.appendChild(script)

  pixel('init', META_PIXEL_ID)
  pixel('track', 'PageView')
  pixel('trackCustom', 'landing_view', campaignContext())
}

export function setMeasurementConsent(consent: Exclude<Consent, null>) {
  try {
    window.localStorage.setItem(CONSENT_KEY, consent)
  } catch {
    // The site remains usable when storage is unavailable.
  }

  if (consent === 'granted') initializeMetaPixel()
}

export function trackConversion(
  event: 'download_click' | 'open_app_click' | 'explore_routes_click',
  details: { platform: 'android' | 'ios' | 'web'; placement: string },
) {
  if (getMeasurementConsent() !== 'granted') return
  initializeMetaPixel()
  window.fbq?.('trackCustom', event, { ...details, ...campaignContext() })
}
