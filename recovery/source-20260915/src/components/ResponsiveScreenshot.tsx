import { useState } from 'react'
import type { ProductScreen } from '../data/productScreens'
export function ResponsiveScreenshot({ screen, alt = screen.alt, priority = false, sizes = '(max-width: 620px) 230px, 280px' }: { screen: ProductScreen; alt?: string; priority?: boolean; sizes?: string }) {
  const [failedSource, setFailedSource] = useState<string | null>(null)
  const srcSet = (format: string) => [320, 640, 960].map(width => `/assets/polish-202609/${screen.id}-${width}.${format} ${width}w`).join(', ')
  if (failedSource === screen.id) return <div className="screenshot-unavailable" role="img" aria-label={alt}>Captura de {screen.label} no disponible.</div>
  return <picture className="product-screenshot">
    <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
    <img src={screen.src} srcSet={srcSet('webp')} sizes={sizes} alt={alt} width={screen.width} height={screen.height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" onError={() => setFailedSource(screen.id)} />
  </picture>
}
