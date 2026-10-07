import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {cached,loadRoutes,visibleRoutes,loadEvents,currentEvents,readJson} from '../server/catalog.mjs';
import {normalizeEvents,civilDate,formatTime,eventState} from '../server/event-contract.mjs';
import {createHandler} from '../server/handler.mjs';
import {staticHeader,staticFooter} from '../server/route-render.mjs';
import {dynamicConfig} from '../server/routing.mjs';

const now = new Date('2026-10-05T05:30:00Z'); // Sunday 23:30 in Oaxaca.
const entry = (id, extra={}) => ({id,version:'test-only',nombre:'Test',color:'#23605B',activa:true,temporal:false,...extra});
const doc = id => ({id,nombre:'Test route',origen:'A',destino:'B',paradas:[{id:'one',nombre:'One',lat:17,lng:-96}],trayecto:[[17,-96],[17.1,-96.1]],trayectosPorSegmento:{}});
const event = extra => ({id:'test-only',publicado:true,enabled:true,tituloES:'Prueba domingo',descripcionES:'Fixture only, never published',zonaES:'Oaxaca',fechaInicio:'2026-10-04',fechaFin:'2026-10-05',inicioEn:'2026-10-05T04:00:00Z',finEn:'2026-10-05T06:30:00Z',...extra});
const assets = {styles:'',scripts:'',map:{styles:'',scripts:''}};
const request = async (handler,path,method='GET') => {
  const result={headers:{}};
  await handler({url:path,method},{set statusCode(v){result.status=v;},setHeader(k,v){result.headers[k]=v;},end(body){result.body=body;}});
  return result;
};
test('live-source adapter includes active RA18 and new routes without a build, excludes hidden routes',async()=>{
  let entries=[entry('RA02'),entry('RA18'),entry('RA03',{activa:false})];
  const read=async url=>url.endsWith('indice.json')?{rutas:entries}:doc(url.split('/').pop().replace('.json',''));
  assert.deepEqual(visibleRoutes(await loadRoutes(read)).map(r=>r.id),['RA02','RA18']);
  entries.push(entry('RA99'));
  assert.deepEqual(visibleRoutes(await loadRoutes(read)).map(r=>r.id),['RA02','RA18','RA99']);
  entries.push(entry('RA99')); await assert.rejects(loadRoutes(read),/duplicate/);
});
test('temporal route visibility is reevaluated inside warm cache',async()=>{
  const e=entry('RA02',{temporal:true,visibleDesde:'2026-10-04T00:00:00Z',visibleHasta:'2026-10-05T00:00:00Z'});
  const rows=await loadRoutes(async url=>url.endsWith('indice.json')?{rutas:[e]}:doc('RA02'));
  assert.equal(visibleRoutes(rows,new Date('2026-10-04T12:00:00Z')).length,1);
  assert.equal(visibleRoutes(rows,new Date('2026-10-06T00:00:00Z')).length,0);
});
test('cache coalesces refreshes, refreshes changed data and bounds stale fallback',async()=>{
  let time=1,calls=0,fail=false;
  const get=cached(async()=>{calls++;if(fail)throw Error('offline');return [calls];},{clock:()=>time});
  await Promise.all([get(),get()]);assert.equal(calls,1);
  time=60002;assert.deepEqual((await get()).value,[2]);
  fail=true;time=120003;assert.equal((await get()).stale,true);
  time=360003;await assert.rejects(get(),/offline/);
  await assert.rejects(cached(async()=>{throw Error('cold');})(),/cold/);
});
test('Sunday uses Oaxaca civil date, exact end boundary expires; unpublished and past are absent',()=>{
  assert.equal(civilDate(now),'2026-10-04');
  const events=normalizeEvents([event({}),event({id:'draft',publicado:false}),event({id:'past',finEn:'2026-10-05T05:30:00Z'})]);
  assert.equal(events[0].startDate,'2026-10-04');assert.equal(formatTime(events[0].start),'22:00');
  assert.equal(currentEvents(events,now).length,1);
  assert.equal(eventState(events.find(e=>e.id==='past'),now),'Finalizado');
});
test('RPC adapter uses public config, POST contract and rejects guessed or secret config',async()=>{
  const env={SUPABASE_URL:'https://example.supabase.co',SUPABASE_PUBLISHABLE_KEY:'sb_publishable_test'};
  const events=await loadEvents(async(url,options)=>{assert.equal(url,env.SUPABASE_URL+'/rest/v1/rpc/eventos_publicos');assert.equal(options.method,'POST');assert.equal(options.headers.apikey,env.SUPABASE_PUBLISHABLE_KEY);return[event({})];},env);
  assert.equal(events.length,1);
  await assert.rejects(loadEvents(undefined,{}),/configuration/);
  await assert.rejects(loadEvents(undefined,{...env,SUPABASE_PUBLISHABLE_KEY:'sb_secret_test'}),/configuration/);
  await assert.rejects(loadEvents(async()=>[event({finEn:null})],env),/instants/);
});
test('request renderer handles detail, filtering hooks, missing data and upstream errors honestly',async()=>{
  const rows=await loadRoutes(async url=>url.endsWith('indice.json')?{rutas:[entry('RA02'),entry('RA18')]}:doc(url.split('/').pop().replace('.json','')));
  const snapshot=value=>async()=>({value,fetchedAt:now.getTime(),stale:false});
  const handler=createHandler(assets,{routes:snapshot(rows),events:snapshot(normalizeEvents([event({tituloES:'<script>test</script>'})])),clock:()=>now});
  const listing=await request(handler,'/rutas/');assert.equal(listing.status,200);assert.match(listing.body,/id="route-search"/);assert.match(listing.body,/routes-filter.js/);
  const detail=await request(handler,'/api/catalog?catalogPath=rutas/ra-02/');assert.match(detail.body,/data-route-map-data/);
  assert.equal((await request(handler,'/rutas/ra-18/')).status,200);
  assert.equal((await request(handler,'/rutas/ra-99/')).status,404);
  const agenda=await request(handler,'/eventos/');assert.match(agenda.body,/&lt;script&gt;/);assert.doesNotMatch(agenda.body,/<script>test/);
  const eventSlug=normalizeEvents([event({tituloES:'<script>test</script>'})])[0].slug;
  const eventDetail=await request(handler,'/eventos/'+eventSlug+'/');
  assert.equal(eventDetail.status,200);assert.match(eventDetail.body,/yuubus:\/\/event\/test-only/);
  assert.match(eventDetail.body,/22:00 h/);assert.match(eventDetail.body,/4 de octubre de 2026/);
  assert.equal((await request(handler,'/eventos/obsolete/')).status,404);
  const empty=createHandler(assets,{events:snapshot([]),clock:()=>now});assert.match((await request(empty,'/eventos/')).body,/No hay eventos publicados/);
  const down=createHandler(assets,{events:async()=>{throw Error('offline');}});
  const failure=await request(down,'/events-preview.json');assert.equal(failure.status,503);assert.equal(failure.headers['Cache-Control'],'no-store');
});
test('preserved navigation and footer match deployed route and event pages',async()=>{
  for(const page of ['public/rutas/index.html','public/eventos/index.html']){
    const html=await fs.readFile(page,'utf8');
    assert(html.includes(staticHeader()),page+' header differs');
    assert(html.includes(staticFooter()),page+' footer differs');
  }
});
test('dynamic endpoints take precedence over historical filesystem snapshots only for intended paths',async()=>{
  const base=JSON.parse(await fs.readFile('recovery/production-output-config.json','utf8'));
  const config=dynamicConfig(base),index=config.routes.findIndex(r=>r.dest?.startsWith('/api/catalog'));
  assert(index<config.routes.findIndex(r=>r.handle==='filesystem'));
  const pattern=new RegExp('^'+config.routes[index].src+'$');
  for(const url of ['/rutas/','/rutas/ra-99/','/eventos/','/events-preview.json','/route-stats.json'])assert(pattern.test(url));
  for(const url of ['/','/negocios/rancho-mijangos-preview/','/privacy/','/assets/test.js'])assert(!pattern.test(url));
  config.routes.splice(index,1);assert.deepEqual(config,base);
});
test('upstream JSON rejects failed HTTP and oversized responses',async()=>{
  await assert.rejects(readJson('https://example.com',{},async()=>new Response('{}',{status:503})),/HTTP 503/);
  await assert.rejects(readJson('https://example.com',{},async()=>new Response(' '.repeat(5_000_001))),/too large/);
});
test('preserved route filter matches IDs and accented names and shows empty state',async()=>{
  let update;
  const input={value:'',addEventListener:(name,fn)=>{assert.equal(name,'input');update=fn;}};
  const cards=[{dataset:{search:'RA02 Atzompa'}},{dataset:{search:'RA08 Agencia Donají'}}];
  const count={},empty={};
  vm.runInNewContext(await fs.readFile('public/routes-filter.js','utf8'),{document:{
    querySelector:selector=>({'#route-search':input,'#route-results':count,'[data-routes-empty]':empty})[selector],
    querySelectorAll:()=>cards,
  }});
  input.value='ra02';update();assert.equal(cards[0].hidden,false);assert.equal(cards[1].hidden,true);
  input.value='donaji';update();assert.equal(cards[1].hidden,false);assert.equal(count.textContent,'1 ruta disponible');
  input.value='missing';update();assert.equal(empty.hidden,false);assert.equal(count.textContent,'0 rutas disponibles');
});
