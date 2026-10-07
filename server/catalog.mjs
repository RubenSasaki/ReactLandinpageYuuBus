import {entryIsVisible, publishedRouteColor, validateRouteDocument, mapWithConcurrency, ROUTE_ID_PATTERN} from './route-contract.mjs';
import {normalizeEvents, eventState} from './event-contract.mjs';

export const ROUTES_BASE = 'https://raw.githubusercontent.com/RubenSasaki/rutas_oaxaca-feed/main/rutas/';
export const FRESH_MS = 60_000;
export const STALE_MS = 300_000;

// One refresh per warm instance; never silently replace a failed feed with an empty catalog.
export function cached(loader, {clock = Date.now} = {}) {
  let value, fetchedAt = 0, pending;
  return async () => {
    if (value && clock() - fetchedAt < FRESH_MS) return {value, fetchedAt, stale: false};
    if (!pending) pending = Promise.resolve().then(loader).then(next => {
      value = next; fetchedAt = clock(); return {value, fetchedAt, stale: false};
    }).catch(error => {
      if (value && clock() - fetchedAt < STALE_MS) return {value, fetchedAt, stale: true};
      throw error;
    }).finally(() => { pending = undefined; });
    return pending;
  };
}

export async function readJson(url, options = {}, fetcher = fetch) {
  const response = await fetcher(url, {...options, redirect: 'error', signal: AbortSignal.timeout(12_000)});
  if (!response.ok) throw Error(`Catalog upstream HTTP ${response.status}`);
  const reader = response.body.getReader(), chunks = [];
  let size = 0;
  try {
    while (true) {
      const {done, value} = await reader.read(); if (done) break;
      size += value.byteLength;
      if (size > 5_000_000) throw Error('Catalog payload too large');
      chunks.push(value);
    }
  } catch (error) { await reader.cancel(); throw error; }
  finally { reader.releaseLock(); }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

export async function loadRoutes(read = readJson) {
  const index = await read(ROUTES_BASE + 'indice.json');
  if (!Array.isArray(index?.rutas) || !index.rutas.length || index.rutas.length > 300) throw Error('Invalid route index');
  const ids = new Set();
  const entries = index.rutas.map(entry => {
    if (!entry || !ROUTE_ID_PATTERN.test(entry.id) || ids.has(entry.id) ||
        typeof entry.activa !== 'boolean' || typeof entry.temporal !== 'boolean') throw Error('Invalid or duplicate route');
    ids.add(entry.id);
    entryIsVisible(entry, new Date()); // Validate visibility bounds even when not currently visible.
    return {...entry, color: publishedRouteColor(entry.id, entry.color)};
  });
  // Load active routes including future windows, then reevaluate visibility on every request.
  return mapWithConcurrency(entries.filter(e => e.activa), 6, async entry => ({
    entry, route: validateRouteDocument(await read(ROUTES_BASE + entry.id + '.json'), entry),
  }));
}

export function visibleRoutes(rows, now = new Date()) {
  return rows.filter(({entry}) => entryIsVisible(entry, now)).map(({route}) => route)
    .sort((a,b) => a.id.localeCompare(b.id, 'es'));
}
export function routePreview(routes) {
  const featured = ['RC03','RA08','RT01','RA02'].map(id => routes.find(r => r.id === id)).filter(Boolean);
  for (const route of routes) if (featured.length < 4 && !featured.includes(route)) featured.push(route);
  return featured.map(({id,slug,name,origin,destination,stopCount,color}) => ({id,slug,name,origin,destination,stopCount,color}));
}

export async function loadEvents(read = readJson, env = process.env) {
  const url = env.EVENTS_SUPABASE_URL || env.SUPABASE_URL;
  const key = env.EVENTS_SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_PUBLISHABLE_KEY;
  if (!/^https:\/\/[a-z0-9]+\.supabase\.co$/.test(url || '') || !/^sb_publishable_[A-Za-z0-9_-]+$/.test(key || ''))
    throw Error('Missing public Supabase configuration');
  const raw = await read(url + '/rest/v1/rpc/eventos_publicos', {
    method: 'POST', headers: {apikey: key, 'content-type': 'application/json'}, body: '{}',
  });
  const events = normalizeEvents(raw);
  // Current RPC promises precise instants; reject an incompatible payload instead of guessing weekdays.
  if (events.some(e => !e.start || !e.end)) throw Error('Missing event instants');
  return events;
}
export const currentEvents = (events, now = new Date()) => events.filter(e => eventState(e, now) !== 'Finalizado');
export const getRoutes = cached(loadRoutes);
export const getEvents = cached(loadEvents);
