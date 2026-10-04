import { trackSiteEvent, trackConversion } from './analytics'
export function attachEventInteractions() {
  const eventId = document.body.dataset.eventId
  const onClick = async (event: MouseEvent) => {
    const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-track], [data-share-event]') : null
    if (!target) return
    const name = target.dataset.track
    const details = { event_id: eventId ?? 'unknown', placement: 'event_page' }
    if (name === 'event_directions_click' || name === 'whatsapp_click') trackSiteEvent(name, details)
    if (name === 'app_download_click') trackConversion('download_click', {platform:'android',placement:'event_page'})
    if (name === 'open_app_click') trackConversion('open_app_click', {platform:'web',placement:'event_page'})
    if (target.hasAttribute('data-share-event')) {
      const url = target.dataset.shareUrl, title = target.dataset.shareTitle
      if (!url?.startsWith('https://www.yuubus.com/eventos/')) return
      const status = document.querySelector<HTMLElement>('[data-share-status]')
      try {
        if (navigator.share) await navigator.share({title,url})
        else { await navigator.clipboard.writeText(url); if (status) status.textContent = 'Enlace copiado.' }
      } catch (error) {
        if (status && !(error instanceof DOMException && error.name === 'AbortError')) status.textContent = `Comparte este enlace: ${url}`
      }
    }
  }
  // Re-evaluate expiry on load and while the page stays open, without network or polling backend.
  const updateState = () => {
    const el = document.querySelector<HTMLElement>('[data-event-state]')
    if (!el) return
    const end = Date.parse(el.dataset.end ?? ''), start = Date.parse(el.dataset.start ?? '')
    if (Number.isFinite(end) && end < Date.now()) {
      el.textContent = 'Finalizado'
      document.querySelector('meta[name="robots"]')?.setAttribute('content', 'noindex, follow')
    } else if (Number.isFinite(start) && start <= Date.now()) el.textContent = 'En curso'
  }
  updateState()
  const timer = window.setInterval(updateState, 60000)
  document.addEventListener('click', onClick)
  return () => { document.removeEventListener('click', onClick); window.clearInterval(timer) }
}
