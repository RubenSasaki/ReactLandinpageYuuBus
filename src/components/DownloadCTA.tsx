import { GOOGLE_PLAY_URL } from '../data/landingContent'

export function DownloadCTA() {
  return (
    <a className="sr-only" href={GOOGLE_PLAY_URL}>Descargar Yuu Bus en Google Play</a>
  )
}
