# SystemMaster Automations Website

Next.js 15 marketing website for SystemMaster Automations.

## Run locally

```bash
npm install
npm run dev
```

## Production verification

```bash
npm run typecheck
npm run build
```

## Deployment

Import the repository into Vercel. Framework preset: Next.js. Leave Root Directory empty when these files are at repository root.

## Important

- `app/layout.tsx` is the required Next.js root layout.
- Localized pages live under `app/[locale]/`.
- Existing demos are preserved under `public/demos/`.
