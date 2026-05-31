# Coal Tiger — Website + Chatbot

A premium redesign of **Coal Tiger Innovations & Solutions Ltd** plus a Gemini-powered
knowledge-base assistant. Two independently deployable parts:

| Folder | What it is | Deploy to |
| --- | --- | --- |
| [`coaltiger-next/`](./coaltiger-next) | The website — Next.js 16 + React Three Fiber + GSAP + Lenis | **Vercel** |
| [`coaltiger-chatbot/`](./coaltiger-chatbot) | "Tiger" assistant — Express + Google Gemini, grounded in Coal Tiger's knowledge base | **Render** |

## How they connect
The site shows a floating chat widget that calls the Render service.
Set `NEXT_PUBLIC_CHATBOT_URL` (on Vercel) to the chatbot's Render URL, and set
`GEMINI_API_KEY` (on Render) to your Google Gemini key.

## Deploy order (recommended)
1. **Render** — deploy `coaltiger-chatbot`, add `GEMINI_API_KEY`. Copy the public URL.
2. **Vercel** — deploy `coaltiger-next`, set `NEXT_PUBLIC_CHATBOT_URL` to that URL.
3. On Render, set `ALLOWED_ORIGINS` to your Vercel/site domains to lock down CORS.

Each folder has its own README with step-by-step instructions and an `.env.example`.

## Design & content notes
- Brand palette derives from Coal Tiger's own mark: coal-black ground, electric-cyan
  tiger eyes, emerald foliage.
- All copy is grounded in the live site and the founder's stated work — no fabricated
  facts, customers, photos, or metrics. Internal milestone figures are clearly framed as
  internal proof work, not external certification.
- Get a real Gemini API key at https://aistudio.google.com/apikey
