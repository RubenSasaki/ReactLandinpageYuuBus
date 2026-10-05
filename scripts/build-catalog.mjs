import fs from 'node:fs/promises';
import {dynamicConfig} from '../server/routing.mjs';
const destination = '.vercel/output/functions/api/catalog.func';
await fs.mkdir(destination,{recursive:true});
await fs.cp('server',destination,{recursive:true});
const manifest = JSON.parse(await fs.readFile('dist/.vite/manifest.json','utf8'));
const entry = manifest['index.html'];
const assets = {
  styles:`<link rel="stylesheet" crossorigin href="/${entry.css[0]}">`,
  scripts:`<script type="module" crossorigin src="/${entry.file}"></script>`,
  map:{styles:'<link rel="stylesheet" crossorigin href="/assets/routeMap-BXLA5NCv.css">',scripts:'<script type="module" crossorigin src="/assets/routeMap-CVpqLkp5.js"></script>'},
};
await fs.writeFile(destination+'/serve.mjs',`import {createHandler} from './handler.mjs';\nexport default createHandler(${JSON.stringify(assets)});\n`);
await fs.writeFile(destination+'/.vc-config.json',JSON.stringify({runtime:'nodejs22.x',handler:'serve.mjs',launcherType:'Nodejs',shouldAddHelpers:true,maxDuration:60}));
const config = dynamicConfig(JSON.parse(await fs.readFile('recovery/production-output-config.json','utf8')));
await fs.writeFile('.vercel/output/config.json',JSON.stringify(config,null,2)+'\n');
console.log('Dynamic routes/events function packaged; catalog data is fetched at request time.');
