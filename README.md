# PainMiner

PainMiner does one thing well: it turns one messy Reddit-style thread or online discussion into one app idea worth testing.

Main promise:

```text
Paste a thread. Get one app idea worth testing.
```

## What V1 includes

- Landing page: `/`
- Analyzer page: `/analyze`
- Result page: `/result`
- Example page: `/example`
- Local mock idea generation
- Copy App Idea button
- Local state only

V1 intentionally has no database, login, payments, Reddit API, saved reports, dashboards, trend tracking, or external API calls.

## Local setup

```powershell
npm.cmd install
npm.cmd run dev
```

Open:

```text
http://localhost:3000
```

## Build

```powershell
npm.cmd run build
npm.cmd start
```

## Vercel deployment

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Use the default Next.js settings.
4. Build command: `npm run build`.
5. Output directory: leave blank for Next.js.

## Netlify deployment

1. Push this project to GitHub.
2. Import the repository in Netlify.
3. Build command: `npm run build`.
4. Publish directory: `.next`.
5. Enable Netlify's Next.js runtime/plugin when prompted.

## Where to add OpenAI later

The mock generator is in:

```text
src/lib/idea.ts
```

Replace `generateMockIdea()` with an API route that accepts the same `AnalyzerInput` shape and returns the same `IdeaResult` shape.

Suggested future route:

```text
src/app/api/generate-idea/route.ts
```

The analyzer currently stores the generated result in `sessionStorage` before navigating to `/result`.
