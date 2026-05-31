# Coal Tiger Chatbot (Gemini) — Render service

A small Express service that powers **Tiger**, the Coal Tiger knowledge-base assistant.
It calls the **Google Gemini API** with a system prompt built from Coal Tiger's own
material (mission, the Bindu Method, the portfolio, AI-governance work, services, founder).
It answers only about Coal Tiger and never invents facts.

## Endpoints
- `GET /` — health check (Render pings this). Returns status + whether the key is set.
- `GET /api/meta` — greeting + suggested prompts for the widget.
- `POST /api/chat` — body `{ "messages": [{ "role": "user"|"assistant", "content": "..." }] }` → `{ "reply": "..." }`.

## Local run
```bash
cp .env.example .env      # then put your real GEMINI_API_KEY in .env
npm install
npm run dev               # http://localhost:8787
```

## Deploy on Render
1. Push this folder to a Git repo (or use the repo root with **Root Directory** = `coaltiger-chatbot`).
2. In Render: **New → Web Service** → connect the repo. Render auto-detects `render.yaml`.
   - Build command: `npm install`
   - Start command: `npm start`
   - Health check path: `/`
3. Add environment variables in the Render dashboard:
   - `GEMINI_API_KEY` = your key from https://aistudio.google.com/apikey
   - `GEMINI_MODEL` = `gemini-2.0-flash` (or another available Gemini model)
   - `ALLOWED_ORIGINS` = your site origins, e.g. `https://your-site.vercel.app,https://www.coaltigerltd.com`
4. Deploy. Copy the public URL (e.g. `https://coal-tiger-chatbot.onrender.com`).
5. In the **Next.js site** (Vercel), set `NEXT_PUBLIC_CHATBOT_URL` to that URL.

> Note: Render's free tier sleeps when idle; the first request after a nap may take a few seconds.

## Updating the knowledge base
Edit `knowledge-base.js`. Keep it grounded in real Coal Tiger material — do not add unverified claims.
