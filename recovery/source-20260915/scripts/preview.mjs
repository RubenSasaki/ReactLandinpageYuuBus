import http from 'node:http'
import {readFile,stat} from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
const root=path.resolve(process.env.PREVIEW_ROOT||'dist'),port=Number(process.env.PORT||4176)
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.avif':'image/avif','.svg':'image/svg+xml','.woff2':'font/woff2','.xml':'application/xml'}
http.createServer(async(req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)
  let file=path.resolve(root,'.'+pathname),code=200
  if(!file.startsWith(root+path.sep)&&file!==root)throw Error('path')
  try{if((await stat(file)).isDirectory())file=path.join(file,'index.html');await stat(file)}catch{
   if(pathname.startsWith('/eventos/')){file=path.join(root,'eventos/no-disponible.html');code=404}
   else if(['/privacy/','/terminos/','/anunciate/','/colabora/'].includes(pathname)||pathname==='/'){file=path.join(root,'index.html')}
   else{res.writeHead(404);res.end('No disponible');return}
  }
  let body=await readFile(file);if(process.env.YUUBUS_QA_METRICS==='1'&&file.endsWith('.html')){const probe=await readFile(process.env.YUUBUS_QA_PROBE,'utf8');body=Buffer.from(body.toString().replace('<head>','<head><script>'+probe+'</script>'))}res.writeHead(code,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:body)
 }catch{res.writeHead(400);res.end('Solicitud inválida')}
}).listen(port,'127.0.0.1',()=>console.log(`Preview local: http://127.0.0.1:${port}/`))
