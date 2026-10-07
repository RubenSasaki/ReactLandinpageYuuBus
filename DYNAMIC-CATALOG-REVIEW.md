# Routes + Events preview — validated 2026-10-06

Base: `724e3c4bea8a484707775210c8ba8404f0ac35b9`, verified HEAD/merge-base before changes.
Branch: `codex/landing-dynamic-routes-events-20261004`. Adapter checkpoint `a77c2357d768c92262619806fc0b03d2092c67b3` is backed up on GitHub. No production deployment created.

Preview: https://react-landinpage-yuu-cht522axk-yuubus.vercel.app
Deployment: `dpl_9XZHEGHfgtyzHjLSM8Qnbtf4rrir`, target preview, READY.
Production remains `dpl_J2mpCMASbFiwcnUZZs6yATF73fDf` (verified after preview).

## Sources and behavior

- Before: preserved `routes-preview.json`, `events-preview.json`, route/event HTML generated at build time, and hardcoded route statistics.
- Routes now: request-time index and documents from `https://raw.githubusercontent.com/RubenSasaki/rutas_oaxaca-feed/main/rutas/`. The same active/visibility-window rules apply. RA18 is explicitly excluded as requested. Current eligible count: **30 routes / 2,521 stops**, no duplicate IDs.
- Events now: request-time public Supabase RPC `POST /rest/v1/rpc/eventos_publicos`. Only published/enabled events whose closing instant has not passed are shown. Requires `EVENTS_SUPABASE_URL` and `EVENTS_SUPABASE_PUBLISHABLE_KEY` (also accepts their `SUPABASE_*` equivalents). No service-role key is accepted or required.
- The events RPC contract uses `inicioEn`/`finEn` instants and Oaxaca civil dates, not numeric weekdays. Sunday 2026-10-04 at 23:30 Oaxaca is Monday UTC; tested explicitly. An event expires exactly at its closing instant, matching the SQL predicate.
- Supabase public URL and publishable key are configured only for Preview and Development under the exact `EVENTS_*` names. Production environment variables were not modified. Anonymous RPC invocation returned HTTP 200 and 9 published current events; no service-role, user session, secret key or database credentials were used. Returned fields match the public event contract (event content, public media, venue/location, routes and scheduling); no private account/payment fields were observed. This is validation of this RPC response, not an audit of all database RLS policies.

## Cache and resilience

- Warm function cache: 60 seconds; one shared in-flight refresh. On remote failure, a previously validated catalog can be reused for at most 5 minutes and is marked `X-Catalog-State: stale`, with `Cache-Control: no-store`.
- CDN: up to 60 seconds; browser revalidation. Combined normal freshness is approximately two minutes. Event CDN lifetime is capped at the next closing instant. No stale-while-revalidate window for events. Visibility/end-time filtering is repeated for cached data on every origin request.
- Cold failures return 503, not an invented empty catalog. Responses include the source fetch time. Static asset caching is unchanged.
- New valid route IDs and event slugs are served by the function without rebuilding. Old route/event HTML stays byte-preserved as recovery evidence, but routing intercepts those paths before filesystem lookup.

## Validation

- `npm install`: PASS (0 reported vulnerabilities).
- `npm run build`: PASS.
- `npm run verify`: PASS; archive hashes remain exact (114 assets/data, 38 HTML pages with app-reference replacements only), plus runtime adapter/cache/date/render/filter tests.
- Authenticated preview HTTP checks: `/route-stats.json` 200 (30/2521); `/rutas/` 200 with 30 cards; `/rutas/ra-02/` 200 with MapLibre data; `/rutas/ra-18/` 404; `/eventos/` renders 9 current events; homepage renders 3 real event previews.
- Original route filter tested for code, accent-insensitive search, and empty results. Event fixture tests cover escaping, date/time, deep links, missing/expired events and empty/error states. Test data is never published.
- React runtime, theme CSS, MapLibre bundles, business components, preserved public files, navigation and footer remain unchanged. Runtime templates reuse recovered renderers; header/footer match preserved production HTML.
- Browser QA PASS: 1440×1000 desktop and 390×844 mobile comparisons against production. Unchanged section dimensions/colors/fonts match after page settles; no horizontal overflow. Navbar/dropdown, hero, Businesses/Rancho card, owner CTA, footer and Theme B remain equivalent. Dynamic agenda content differs as intended. Screenshots and DOM measurements are saved locally in ignored `.catalog-qa/`.

## Current live event validation

- Current count: **9**. Karin Fest is absent from the current published RPC response; no claim is made about unpublished or historical records.
- Current titles: Dia del Árbol del Tule; Eden Muñoz; Festival del Mole de Caderas; Festival de la Barbacoa; Trono de México; 6º Festival del Corte de Flor de Cresta de Gallo; El Lago de los Cisnes; La Arrolladora Banda el Limón; Morras Malditas.
- All 9 image URLs return HTTP 200 with image content types. Browser confirmed rendered posters and event detail.
- Sunday: Festival de la Barbacoa displays October 11, 2026 at 08:00 Oaxaca. Eden Muñoz displays October 10 at 21:00, correctly converting the October 11 UTC instant.
- Event → Cómo llegar anchor works; Eden Muñoz → RA04 link opens the route detail. Related RA04/RA10/RA11 links match the RPC. Directory search RA02 returns exactly one card; RA18 is absent.
- Build PASS; verify PASS (10 tests, including expiration boundary, Sunday, cache failure/expiry and empty state). No application code changes were needed for activation.

## Review status

DYNAMIC ROUTES + EVENTS READY FOR PRODUCTION REVIEW.
SAFE TO DEPLOY: YES as a reviewed candidate, subject to the separate production authorization and production environment configuration. Production still uses its original deployment and has no new Supabase configuration; do not deploy this branch to production until that separate step is authorized. No merge or production deployment performed.
