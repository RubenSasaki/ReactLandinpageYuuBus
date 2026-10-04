export const ORIGIN = 'https://www.yuubus.com'
export const ZONE = 'America/Mexico_City'
export const CATEGORIES = {guelaguetza_oficial:'Guelaguetza',calenda_convite:'Calendas',gastronomia:'Gastronomía',ferias:'Ferias',musica:'Música',arte:'Arte',mercado_artesanal:'Mercado artesanal',musica_cultura:'Cultura',deportes:'Deportes'}
const ID = /^[A-Za-z0-9_-]{1,100}$/
export const validSlug = value => typeof value === 'string' && value.length <= 180 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
const text = (v,max=4000) => typeof v === 'string' ? v.trim().slice(0,max) : ''
export function httpsUrl(value) {
  try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password ? u.href : null } catch { return null }
}
function instant(value) { return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(value) && Number.isFinite(Date.parse(value)) ? value : null }
function dateOnly(value) { return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0,10)===value ? value : null }
export function civilDate(iso) { return new Intl.DateTimeFormat('en-CA',{timeZone:ZONE,year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(iso)) }
export function eventState(event,now=new Date()) { if(event.end && Date.parse(event.end)<now.getTime()) return 'Finalizado'; if(event.endDate && event.endDate<civilDate(now))return 'Finalizado'; if(event.start && Date.parse(event.start)<=now.getTime())return 'En curso'; return 'Próximo' }
export function formatDate(event) { const value=event.start || `${event.startDate}T12:00:00-06:00`; return new Intl.DateTimeFormat('es-MX',{timeZone:ZONE,day:'numeric',month:'long',year:'numeric'}).format(new Date(value)) }
export function formatTime(value) { return value ? new Intl.DateTimeFormat('es-MX',{timeZone:ZONE,hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date(value)) : null }
export function normalizeEvents(raw) {
  if(!Array.isArray(raw)||raw.length>200)throw Error('Contrato de eventos: se esperaba una lista de hasta 200 elementos')
  const ids=new Set()
  return raw.filter(e=>e?.publicado===true&&e.enabled!==false).map(e=>{
    const id=text(e.id,100),title=text(e.tituloES,180),description=text(e.descripcionES),venue=text(e.ubicacion?.nombre || e.zonaES,180)
    const start=instant(e.inicioEn),end=instant(e.finEn),startDate=start?civilDate(start):dateOnly(e.fechaInicio),endDate=end?civilDate(end):dateOnly(e.fechaFin)
    if(!ID.test(id)||ids.has(id)||!title||!description||!venue||!startDate||end&&start&&Date.parse(end)<Date.parse(start))throw Error('Contrato de eventos: campos requeridos o fechas inválidos')
    ids.add(id)
    const base=title.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,65).replace(/-$/,'') || 'evento'
    // UUID appended in full: no collisions, no hardcoded featured event.
    const slug=`${base}-${startDate}-${id.toLowerCase()}`
    if(!validSlug(slug))throw Error('Slug inválido')
    const loc=e.ubicacionLlegada??e.ubicacion
    const coordinates=typeof loc?.lat==='number'&&Number.isFinite(loc.lat)&&Math.abs(loc.lat)<=90&&typeof loc?.lng==='number'&&Number.isFinite(loc.lng)&&Math.abs(loc.lng)<=180?{lat:loc.lat,lng:loc.lng}:null
    return {id,slug,title,description,venue,address:text(e.direccion,240),municipality:text(e.municipio,180),start,end,startDate,endDate,coordinates,category:CATEGORIES[e.categoria]||'Cultura',image:httpsUrl(e.imagenUrl),imageAlt:text(e.imagenAltES,180)||`Cartel de ${title}`,source:httpsUrl(e.sourceUrl),free:typeof e.gratuito==='boolean'?e.gratuito:null,price:typeof e.precio==='number'&&Number.isFinite(e.precio)&&e.precio>=0?e.precio:null,routes:[...new Set(Array.isArray(e.rutas)?e.rutas.filter(r=>/^[A-Z][A-Z0-9]{1,15}$/.test(r)):[])],audience:text(e.audience,180)||null,adultOnly:typeof e.adultOnly==='boolean'?e.adultOnly:null,sponsored:typeof e.esPatrocinado==='boolean'?e.esPatrocinado:null,updatedAt:instant(e.updatedAt)}
  }).sort((a,b)=>a.startDate.localeCompare(b.startDate)||a.title.localeCompare(b.title))
}
export function schemaEvent(e) {
  return {'@context':'https://schema.org','@type':'Event',name:e.title,description:e.description,url:`${ORIGIN}/eventos/${e.slug}/`,startDate:e.start||e.startDate,...(e.end||e.endDate?{endDate:e.end||e.endDate}:{}),...(e.image?{image:[e.image]}:{}),location:{'@type':'Place',name:e.venue,...(e.address||e.municipality?{address:{'@type':'PostalAddress',streetAddress:e.address||undefined,addressLocality:e.municipality||undefined,addressRegion:'Oaxaca',addressCountry:'MX'}}:{}),...(e.coordinates?{geo:{'@type':'GeoCoordinates',latitude:e.coordinates.lat,longitude:e.coordinates.lng}}:{})},...(e.free!==null?{isAccessibleForFree:e.free}:{}),...(e.audience?{audience:{'@type':'Audience',audienceType:e.audience}}:{})}
}
export const escapeHtml = value => String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;')
export const jsonLd = value => JSON.stringify(value).replaceAll('<','\\u003c')
