import fs from 'node:fs/promises'
import path from 'node:path'
const manifest=JSON.parse(await fs.readFile('dist/.vite/manifest.json','utf8'))
const entry=manifest['index.html']
if(!entry?.file||entry.css?.length!==1)throw Error('Unexpected app build outputs')
async function walk(dir){const result=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())result.push(...await walk(p));else result.push(p)}return result}
let count=0
for(const file of await walk('public')){
  if(!file.endsWith('.html')||file===path.join('public','index.html'))continue
  const raw=await fs.readFile(file,'utf8')
  // Keep every route/event byte except references to the rebuilt app JS/CSS.
  const html=raw.replaceAll('/assets/main-mnCW4kEW.js','/'+entry.file).replaceAll('/assets/main-DX7bSXea.css','/'+entry.css[0])
  await fs.writeFile(path.join('dist',path.relative('public',file)),html)
  count++
}
const output=path.resolve('.vercel/output')
if(!output.startsWith(process.cwd()+path.sep))throw Error('Unsafe output path')
await fs.mkdir(output,{recursive:true})
await fs.copyFile('recovery/production-output-config.json',path.join(output,'config.json'))
await fs.cp('dist',path.join(output,'static'),{recursive:true})
console.log(`Preserved ${count} static pages and original Vercel routing configuration.`)
