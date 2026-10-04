import {writeFile,mkdir} from 'node:fs/promises'
import {createHash} from 'node:crypto'
import process from 'node:process'
import {escapeHtml as h,formatDate,ORIGIN} from './event-contract.mjs'
// Deterministic composition of the real published poster; no generated event imagery.
export async function generateEventOg(event,dest='dist') {
  if(!event.image)return null
  const url=new URL(event.image)
  if(!/^[a-z0-9]+\.supabase\.co$/.test(url.hostname)||!url.pathname.startsWith(`/storage/v1/object/public/event-media/events/${event.id}/`))return null
  const response=await fetch(url,{signal:AbortSignal.timeout(12000),redirect:'error'})
  if(!response.ok)throw Error(`OG poster HTTP ${response.status}`)
  const reader=response.body.getReader();let count=0;const chunks=[]
  try{while(true){const {done,value}=await reader.read();if(done)break;count+=value.length;if(count>8_000_000)throw Error('OG image exceeds 8 MB');chunks.push(value)}}catch(e){await reader.cancel();throw e}finally{reader.releaseLock()}
  const {default:sharp}=await import(process.env.YUUBUS_SHARP_MODULE||'sharp')
  const poster=await sharp(Buffer.concat(chunks),{limitInputPixels:20_000_000}).rotate().resize(430,534,{fit:'contain',background:'#f4f1e8'}).png().toBuffer()
  const lines=[];let current='';for(const word of event.title.split(/\s+/)){if((current+' '+word).trim().length>24&&current){lines.push(current);current=word}else current=(current+' '+word).trim()}if(current)lines.push(current)
  const title=lines.slice(0,4);if(lines.length>4)title[3]=title[3].slice(0,21)+'…'
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#F4F1E8"/><rect x="496" width="704" height="630" fill="#352078"/><text x="548" y="78" fill="#eed8b5" font-family="Arial" font-size="19" letter-spacing="3">OAXACA · AGENDA YUUBUS</text>${title.map((line,i)=>`<text x="548" y="${148+i*53}" fill="white" font-family="Arial" font-weight="bold" font-size="44">${h(line)}</text>`).join('')}<text x="548" y="405" fill="#ffb26f" font-family="Arial" font-size="26">${h(formatDate(event))}</text><text x="548" y="448" fill="white" font-family="Arial" font-size="22">${h(event.venue.slice(0,44))}</text><rect x="548" y="493" width="602" height="2" fill="#aa95dc"/><text x="548" y="542" fill="white" font-family="Arial" font-size="26">Consulta el evento y cómo llegar →</text><text x="548" y="594" fill="#eadfff" font-family="Arial" font-weight="bold" font-size="22">YuuBus · Muévete y descubre Oaxaca</text></svg>`
  await mkdir(`${dest}/assets/event-og`,{recursive:true})
  const composed=await sharp(Buffer.from(svg)).composite([{input:poster,left:32,top:48}]).png().toBuffer()
  const digest=createHash('sha256').update(composed).digest('hex').slice(0,16)
  const out=`/assets/event-og/${event.id}-${digest}.png`
  await writeFile(dest+out,composed)
  return ORIGIN+out
}
