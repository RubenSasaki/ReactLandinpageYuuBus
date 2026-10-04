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
    if (value && ['facebook', 'instagram', 'whatsapp', 'social', 'organic', 'paid_social', 'inspector-septiembre-2026', 'eventos-oaxaca', 'feed', 'story'].includes(value)) context[key] = value
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
  const page = document.body?.dataset?.yuubusStaticPage
  if (page === 'event-detail') pixel('trackCustom', 'event_view', safeDetails({event_id: document.body.dataset.eventId ?? 'unknown'}))
  else if (page === 'routes' || page === 'route-detail') pixel('trackCustom', 'route_page_view', safeDetails({route_id: document.body.dataset.routeId ?? 'directory'}))
  else if (!page) pixel('trackCustom', 'landing_view', campaignContext())
}

export function setMeasurementConsent(consent: Exclude<Consent, null>) {
  try {
    window.localStorage.setItem(CONSENT_KEY, consent)
  } catch {
    // The site remains usable when storage is unavailable.
  }

  if (consent === 'granted') { window.fbq?.('consent', 'grant'); initializeMetaPixel() }
  else window.fbq?.('consent', 'revoke')
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event('yuubus:open-cookie-preferences'))
}

export function trackConversion(
  event: 'download_click' | 'open_app_click' | 'explore_routes_click',
  details: { platform: 'android' | 'ios' | 'web'; placement: string },
) {
  if (getMeasurementConsent() !== 'granted') return
  initializeMetaPixel()
  window.fbq?.('trackCustom', event === 'download_click' ? 'app_download_click' : event, { ...safeDetails(details), ...campaignContext() })
  if (event === 'download_click') trackSiteEvent('cta_download', details)
}

type SiteEvent =
  | 'event_view'
  | 'event_directions_click'
  | 'whatsapp_click'
  | 'route_page_view'
  | 'business_cta'
  | 'cta_whatsapp'
  | 'cta_download'
  | 'collaboration_cta'
  | 'app_screenshot_interaction'
  | 'routes_preview_click'
  | 'routes_page_view'
  | 'route_detail_view'
  | 'business_plans_preview_click'
  | 'business_plan_selected'

export function trackSiteEvent(event: SiteEvent, details: Record<string, string>) {
  if (getMeasurementConsent() !== 'granted') return
  initializeMetaPixel()
  window.fbq?.('trackCustom', event, { ...safeDetails(details), ...campaignContext() })
}

function safeDetails(details: Record<string, string>) {
  const allowed = ['channel','platform','placement','event_id','route_id','plan','intent','screen','path'];
  return Object.fromEntries(Object.entries(details).filter(([key,value]) => allowed.includes(key) && typeof value === 'string' && /^[a-zA-Z0-9_/-]{1,100}$/.test(value)));
}

export function trackContact(intent: string, placement: string, channel: 'whatsapp' | 'email') {
  const details = { intent, placement, channel }
  if (channel === 'whatsapp') trackSiteEvent('cta_whatsapp', details)
  if (intent === 'business' || intent === 'advertise') trackSiteEvent('business_cta', details)
  if (intent === 'collaborate') trackSiteEvent('collaboration_cta', details)
}
