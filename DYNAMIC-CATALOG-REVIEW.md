# Routes + Events preview — 2026-10-04

Base: `724e3c4bea8a484707775210c8ba8404f0ac35b9`, verified HEAD/merge-base before changes.
Branch: `codex/landing-dynamic-routes-events-20261004`. No commits or production deployment created.

Preview: https://react-landinpage-yuu-96pyqeqzg-yuubus.vercel.app
Deployment: `dpl_6KNhX696HGVqt5konKQNgAqbwc8v`, target preview, READY.
Production remains `dpl_J2mpCMASbFiwcnUZZs6yATF73fDf` (verified after preview).

## Sources and behavior

- Before: preserved `routes-preview.json`, `events-preview.json`, route/event HTML generated at build time, and hardcoded route statistics.
- Routes now: request-time index and documents from `https://raw.githubusercontent.com/RubenSasaki/rutas_oaxaca-feed/main/rutas/`. The same active/visibility-window rules apply. RA18 is explicitly excluded as requested. Current eligible count: **30 routes / 2,521 stops**, no duplicate IDs.
- Events now: request-time public Supabase RPC `POST /rest/v1/rpc/eventos_publicos`. Only published/enabled events whose closing instant has not passed are shown. Requires `EVENTS_SUPABASE_URL` and `EVENTS_SUPABASE_PUBLISHABLE_KEY` (also accepts their `SUPABASE_*` equivalents). No service-role key is accepted or required.
- The events RPC contract uses `inicioEn`/`finEn` instants and Oaxaca civil dates, not numeric weekdays. Sunday 2026-10-04 at 23:30 Oaxaca is Monday UTC; tested explicitly. An event expires exactly at its closing instant, matching the SQL predicate.
- Preview lacks Supabase configuration: events return an honest HTTP 503 with retry guidance. No preserved historical events are presented as current. A successful empty RPC produces the existing empty-state text.

## Cache and resilience

- Warm function cache: 60 seconds; one shared in-flight refresh. On remote failure, a previously validated catalog can be reused for at most 5 minutes and is marked `X-Catalog-State: stale`, with `Cache-Control: no-store`.
- CDN: up to 60 seconds; browser revalidation. Combined normal freshness is approximately two minutes. Event CDN lifetime is capped at the next closing instant. No stale-while-revalidate window for events. Visibility/end-time filtering is repeated for cached data on every origin request.
- Cold failures return 503, not an invented empty catalog. Responses include the source fetch time. Static asset caching is unchanged.
- New valid route IDs and event slugs are served by the function without rebuilding. Old route/event HTML stays byte-preserved as recovery evidence, but routing intercepts those paths before filesystem lookup.

## Validation

- `npm install`: PASS (0 reported vulnerabilities).
- `npm run build`: PASS.
- `npm run verify`: PASS; archive hashes remain exact (114 assets/data, 38 HTML pages with app-reference replacements only), plus runtime adapter/cache/date/render/filter tests.
- Authenticated preview HTTP checks: `/route-stats.json` 200 (30/2521); `/rutas/` 200 with 30 cards; `/rutas/ra-02/` 200 with MapLibre data; `/rutas/ra-18/` 404; `/eventos/` and `/events-preview.json` 503 because configuration is absent.
- Original route filter tested for code, accent-insensitive search, and empty results. Event fixture tests cover escaping, date/time, deep links, missing/expired events and empty/error states. Test data is never published.
- React runtime, theme CSS, MapLibre bundles, business components, preserved public files, navigation and footer remain unchanged. Runtime templates reuse recovered renderers; header/footer match preserved production HTML.
- Browser QA is **not complete**: the provided browser tool fails initialization with “failed to write kernel assets … os error 3”, including after reset. Source/hash checks cannot substitute for desktop/mobile visual comparison.

## Blockers before production readiness

1. Supply the public Supabase URL and publishable key through Preview environment configuration, then redeploy preview and validate actual published events, count, images, timing and navigation.
2. Restore browser automation to compare preview and production on desktop/mobile and interactively validate filtering, map and navigation.

SAFE TO DEPLOY: **NO**. This is an incomplete preview for review, not a production candidate. Production has not changed.

Changed: `.gitignore`, `package.json`, `src/recovered/landing.js`, `scripts/verify-recovery.mjs`; added `scripts/build-catalog.mjs`, `server/*.mjs`, `tests/catalog.test.mjs`, and this report.
