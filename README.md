# YuuBus — production recovery

This branch rebuilds the landing currently deployed on yuubus.com from preserved Vercel evidence. Read [the recovery report](recovery/RECOVERY-REPORT.md) before editing.

## Build and verify

```sh
npm ci
npm run build
npm run verify
```

The active application is editable JavaScript in `src/recovered/landing.js`, with separate business chunks and `theme.css`. It was mechanically recovered from the production bundles. Original TypeScript types and original file boundaries are not recoverable without sourcemaps. The exact React runtime is retained to avoid changing behavior during recovery.

`recovery/source-20260915/` preserves the earlier editable TypeScript source. It is historical evidence and is not the active application. `public/` preserves production assets, snapshots and static pages. Builds do not fetch fresh route/event data. The build keeps the existing pages and replaces only references to rebuilt application assets.

Preview: https://react-landinpage-yuu-5s3b15tpu-yuubus.vercel.app

Branch: `codex/landing-production-recovery-20261003`

No production deployment or main merge is included in this recovery.
