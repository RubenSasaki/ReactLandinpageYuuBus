import fs from 'node:fs/promises'
import path from 'node:path'
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
const manifest=JSON.parse(await fs.readFile('dist/.vite/manifest.json','utf8'))
const entry=manifest['index.html']
assert(entry?.file&&entry.css?.length===1)
const inventory=JSON.parse(await fs.readFile('recovery/20260926/recovery-results.json','utf8'))
const prefix='src/.vercel/output/static/'
let exact=0,rewritten=0
for(const row of inventory){
 if(!row.path.startsWith(prefix))continue
 const rel=row.path.slice(prefix.length)
 const original=await fs.readFile(path.join('public',rel))
 assert.equal(crypto.createHash('sha256').update(original).digest('hex'),row.sha256,`Archive changed: ${rel}`)
 if(rel==='index.html'||rel==='.vite/manifest.json')continue
 const built=await fs.readFile(path.join('dist',rel))
 if(rel.endsWith('.html')){
  const expected=original.toString().replaceAll('/assets/main-mnCW4kEW.js','/'+entry.file).replaceAll('/assets/main-DX7bSXea.css','/'+entry.css[0])
  assert.equal(built.toString(),expected,`Static content changed: ${rel}`);rewritten++
 }else{assert.deepEqual(built,original,`Production asset changed: ${rel}`);exact++}
}
assert.deepEqual(JSON.parse(await fs.readFile('.vercel/output/config.json','utf8')),JSON.parse(await fs.readFile('recovery/production-output-config.json','utf8')))
const code=await fs.readFile('src/recovered/landing.js','utf8')
for(const marker of ['Rancho Mijangos','529711462985','Estamos sumando nuevos lugares'])assert(code.includes(marker),`Missing ${marker}`)
console.log(`PASS: ${exact} byte-identical assets/data files; ${rewritten} static pages differ only in rebuilt app references; routing configuration unchanged.`)
