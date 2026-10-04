# Production recovery — 4 October 2026

This branch is a buildable recovery of the production behavior deployed on 26 September. It is **not the missing original TypeScript checkout**. Application JavaScript was recovered mechanically from the production bundles, separated from its React runtime, formatted, and given descriptive names where behavior established their roles. Original TypeScript types, component file boundaries, local variable names, comments and the post-15 September build pipeline cannot be recovered exactly without sourcemaps.

## Preserved evidence

| Deployment | Files downloaded | Sourcemaps | File SHA-1 mismatches against Vercel IDs |
| --- | ---: | ---: | ---: |
| GCdGNDVezoHn1r2NnWSABVYzMxQz — 15 Sep | 244 | 0 | 0 |
| 56BGM1cy8kwWEUrDDMpwG5VpBjCA — 24 Sep | 119 | 0 | 0 |
| J2mpCMASbFiwcnUZZs6yATF73fDf — 26 Sep | 155 | 0 | 0 |

All three full exports are preserved locally at `E:/Androidstudio/yuubus-production-recovery-20261003/deployment-YYYYMMDD`. This branch includes inventories, hashes and deployment metadata. The source of 15 September is in `source-20260915/`; generated dist/build caches are retained in the complete local export. The prior remote base is retained in `github-base/` and Git history. The current production static files are retained byte-for-byte under `public/`, including the original bundles for provenance.

The closest remote base is `10f187265fdebd2b40cf49780f662dbd3c10038f` (main and codex/dynamic-home-route-stats). Of 68 source/config/document files compared to 15 September, 23 match, 28 differ and 17 are absent. Main is only ancestry, not the production source of truth.

## Active editable recovery

- `src/recovered/landing.js`: application, Businesses V2, owner CTAs, WhatsApp, navigation, homepage and supporting pages. The functions have descriptive top-level names recorded in `symbols.json`; emitted React JSX-runtime calls and some minified local identifiers remain.
- `src/recovered/BusinessCard.js`, `RanchoBusinessPreview.js`: recovered lazy modules.
- `src/recovered/theme.css`: complete production stylesheet, formatted for editing.
- `src/recovered/react-runtime.js`, `preload-helper.js`: exact recovered runtime logic. React 19.2.8 is preserved, not upgraded.
- `public/`: original images, fonts, manifests, snapshots, route/event pages and MapLibre runtime.
- `scripts/preserve-static-pages.mjs`: replaces only app JS/CSS references in static pages and produces `.vercel/output` with the original production routing configuration. No feed is fetched during build.

Rancho Mijangos retains the San José del Pacífico location, five photographs, Alpina A ($1,500 MXN, 2 guests, kitchen) and Niebla ($1,800 MXN, 2 guests, no kitchen), exactly as emitted in production. These are recovered display values, not a fresh verification of business prices.

## Validation

`npm install`, `npm run build` and `npm run verify` pass. Verification checks every preserved public file against the Vercel download hash, 114 byte-identical data/assets, 38 static pages with only generated app references replaced, and unchanged Vercel route configuration.

Preview: https://react-landinpage-yuu-5s3b15tpu-yuubus.vercel.app

Preview deployment: dpl_4YqbkN5KKXV4jdVTA42UTy1Jx9hm, READY, non-production. It was built locally from this recovery branch and uploaded with the prebuilt CLI flow. Git branch metadata is a label; it is not evidence of a Git-triggered deployment.

At 1440×900 and 390×844, production and preview match all collected headings, link attributes and section/header/footer/nav geometry, colors and fonts. No mobile horizontal overflow was measured. Rancho headings, links and layout match; all five photos loaded. Desktop/mobile dropdowns open; the route filter narrows 30 routes to RA02 and its detail opens. Screenshots and DOM measurements are in `visual-checks/`.

The captured source includes existing expiration/fallback behavior and old event dates. Those behaviors are deliberately preserved. No Routes/Events feature fixes, fresh data, redesign, production deployment, domain assignment or main merge are part of this recovery.

## Limits

Recovery confidence is HIGH for the existing rendered experience, PARTIAL for the original authoring structure. This branch can serve as a documented recovery baseline with reproducible builds. It must not be represented as the exact lost Mac checkout or as a restoration of the missing post-15 September TypeScript source/build pipeline.
