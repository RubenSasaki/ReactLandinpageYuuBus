import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import path from 'node:path'
export const marketingPages = [
 { path: '/anunciate/', title: 'Anúnciate en YuuBus | Negocios de Oaxaca', description: 'Dale presencia a tu negocio en YuuBus. Conoce los planes y contáctanos por WhatsApp para que más personas sepan dónde estás y cómo llegar.' },
 { path: '/colabora/', title: 'Colabora con YuuBus | Movilidad en Oaxaca', description: 'Conoce formas de colaborar con información, validación de rutas, datos, desarrollo o diseño para mejorar YuuBus.' },
]
const escape = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;')
export function marketingHtml(html, page) {
 const canonical = `https://www.yuubus.com${page.path}`
 let result = html.replace(/<title>.*?<\/title>/s, `<title>${escape(page.title)}</title>`)
 for (const [key, value] of [['description',page.description],['og:title',page.title],['og:description',page.description],['og:url',canonical],['twitter:title',page.title],['twitter:description',page.description]]) {
  result = result.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*(")`),(_, before, after) => before + escape(value) + after)
 }
 result = result.replace(/(<link rel="canonical" href=")[^"]*(")/,(_,before,after)=>before+canonical+after)
 result = result.replace(/<link rel="preload" as="image"[^>]*>/g,'')
 const schema = { '@context':'https://schema.org','@type':'WebPage','@id':canonical, url:canonical, name:page.title,description:page.description,inLanguage:'es-MX',isPartOf:{'@id':'https://www.yuubus.com/#website'} }
 return result.replace('</head>',`<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\u003c')}</script></head>`)
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
 const html = await readFile('dist/index.html','utf8')
 for (const page of marketingPages) { await mkdir(`dist${page.path}`,{recursive:true}); await writeFile(`dist${page.path}index.html`,marketingHtml(html,page)) }
 console.log('Metadatos comerciales estáticos: Anúnciate y Colabora. URLs conservadas.')
}
