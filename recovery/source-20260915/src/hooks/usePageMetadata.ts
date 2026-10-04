import { useEffect } from 'react'

type PageMetadata = {
  title: string
  description: string
  path: `/${string}`
}

export function usePageMetadata({ title, description, path }: PageMetadata) {
  useEffect(() => {
    const canonicalUrl = `https://www.yuubus.com${path.endsWith('/') ? path : `${path}/`}`
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]')
    const twitterTitle = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')
    const twitterDescription = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')

    document.title = title
    canonical?.setAttribute('href', canonicalUrl)
    descriptionMeta?.setAttribute('content', description)
    ogTitle?.setAttribute('content', title)
    ogDescription?.setAttribute('content', description)
    ogUrl?.setAttribute('content', canonicalUrl)
    twitterTitle?.setAttribute('content', title)
    twitterDescription?.setAttribute('content', description)
  }, [description, path, title])
}
