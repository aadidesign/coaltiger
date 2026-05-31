# Coal Tiger — Website (Next.js)

Premium redesign of **Coal Tiger Innovations & Solutions Ltd** (coaltigerltd.com).
Next.js 16 (App Router) + TypeScript, with React Three Fiber (WebGL hero), GSAP +
ScrollTrigger, Lenis smooth scroll, and a glassmorphism design system themed to the
brand's coal-black / electric-cyan / emerald palette.

## Stack
- **Next.js 16 / React 19** (App Router, fully static-prerendered)
- **@react-three/fiber + three** — WebGL particle "immune mesh" hero
- **gsap + ScrollTrigger** — headline reveal, parallax
- **@studio-freight/lenis** — smooth scrolling
- Custom CSS design system in `src/app/globals.css`

## Local development
```bash
npm install
npm run dev        # http://localhost:3000
```
The chat widget reads `NEXT_PUBLIC_CHATBOT_URL` (see `.env.example`). In dev it falls
back to `http://localhost:8787` — run the `coaltiger-chatbot` service alongside it.

## Environment variables
| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_CHATBOT_URL` | Public URL of the Render chatbot service (e.g. `https://coal-tiger-chatbot.onrender.com`) |

## Deploy on Vercel
1. Push this folder to a Git repo (set **Root Directory** = `coaltiger-next` if it lives in a monorepo).
2. Vercel auto-detects Next.js — no extra config needed.
3. In **Project → Settings → Environment Variables**, add `NEXT_PUBLIC_CHATBOT_URL` =
   your Render chatbot URL.
4. Deploy. (Build: `next build`, output is static.)

## Production build locally
```bash
npm run build && npm run start
```

## Content sourcing
All copy is grounded in Coal Tiger's own material — the live site's About text and the
founder's publicly stated work (the Bindu Method, the Christ Shard / AI-governance work,
PEACELOCK, the Bindu WL emergency framework, the UAE stabilisation framework). The brand
image is the company's own tiger mark. Referenced standards (NIST AI RMF, MITRE ATLAS,
OWASP, EU AI Act) are cited with source links. No fabricated facts, photos, or metrics.
