# PainMiner

PainMiner turns pasted complaints, Reddit threads, app reviews, forum posts, and customer conversations into buildable app ideas.

## Local setup

```powershell
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:3000`.

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
5. For full Next.js support, use Netlify's Next.js runtime/plugin when prompted.

## Where to plug in OpenAI later

The mock report generator lives in `src/lib/report.ts`.

Replace or wrap `generateMockReport()` with an API route that sends:

- source type
- niche/topic
- goal
- pasted text

Then return the same `OpportunityReport` shape from `src/types/report.ts`. Keeping the same shape means the report UI can stay mostly unchanged.

Suggested future route:

```text
src/app/api/generate-report/route.ts
```

The analyzer page currently stores the generated report in `sessionStorage` before navigating to `/report`.
