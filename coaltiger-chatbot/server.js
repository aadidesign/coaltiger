// ============================================================
// Coal Tiger Chatbot Service  (deploy on Render)
// Express + Google Gemini. Reads GEMINI_API_KEY from env.
// ============================================================
import express from "express";
import cors from "cors";
import { KNOWLEDGE_BASE, GREETING, SUGGESTIONS } from "./knowledge-base.js";

// Load .env for local dev. On Render, env vars are injected directly and there
// is no .env file, so this is a no-op there. Requires Node >= 20.12.
try {
  process.loadEnvFile();
} catch {
  // No .env file present (e.g. production) — rely on the real environment.
}

// User-facing message for any failure. Never expose internal error detail to
// the visitor; point them at the contact form instead.
const FALLBACK_REPLY =
  "I'm having trouble reaching my knowledge service right now. Please try again shortly, or reach the team at https://www.coaltigerltd.com/contact";

const app = express();
app.use(express.json({ limit: "1mb" }));

// ---- CORS ----
const ALLOWED = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      // allow same-origin / curl (no origin), localhost, and configured origins
      if (!origin) return cb(null, true);
      if (ALLOWED.length === 0) return cb(null, true); // open by default; lock down via ALLOWED_ORIGINS
      if (/^https?:\/\/localhost(:\d+)?$/.test(origin)) return cb(null, true);
      if (ALLOWED.includes(origin)) return cb(null, true);
      return cb(null, false);
    },
    methods: ["GET", "POST", "OPTIONS"],
  })
);

const MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";
const API_KEY = process.env.GEMINI_API_KEY || "";

// Strip em/en dashes so replies read naturally and human (no "—" or "–").
function sanitizeReply(text) {
  return String(text)
    .replace(/\s*[—–]\s*/g, ", ")
    .replace(/\s+,/g, ",")
    .replace(/[ \t]{2,}/g, " ");
}

// ---- Health check (Render pings this) ----
app.get("/", (_req, res) => {
  res.json({
    service: "coal-tiger-chatbot",
    status: "ok",
    model: MODEL,
    keyConfigured: Boolean(API_KEY),
  });
});

app.get("/api/meta", (_req, res) => {
  res.json({ greeting: GREETING, suggestions: SUGGESTIONS });
});

// ---- Chat ----
app.post("/api/chat", async (req, res) => {
  try {
    if (!API_KEY) {
      // Log the real cause for operators; show the visitor a friendly message.
      console.error("Server is missing GEMINI_API_KEY. Set it in the environment / Render dashboard.");
      return res.status(500).json({ reply: FALLBACK_REPLY });
    }

    const incoming = Array.isArray(req.body?.messages) ? req.body.messages : [];
    // Keep the last 12 turns; map to Gemini's content format.
    const contents = incoming
      .slice(-12)
      .filter((m) => m && typeof m.content === "string" && m.content.trim())
      .map((m) => ({
        role: m.role === "assistant" || m.role === "model" ? "model" : "user",
        parts: [{ text: String(m.content).slice(0, 4000) }],
      }));

    if (contents.length === 0) {
      return res.status(400).json({ reply: "I didn't catch a question there. What would you like to know about Coal Tiger?" });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
      MODEL
    )}:generateContent?key=${API_KEY}`;

    const payload = {
      systemInstruction: { parts: [{ text: KNOWLEDGE_BASE }] },
      contents,
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 700,
        topP: 0.95,
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
      ],
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    if (!r.ok) {
      const detail = await r.text();
      console.error("Gemini error", r.status, detail.slice(0, 500));
      return res.status(502).json({ reply: FALLBACK_REPLY });
    }

    const data = await r.json();
    const reply = sanitizeReply(
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("").trim() ||
        "I wasn't able to form a response to that. Could you rephrase, or reach the team at https://www.coaltigerltd.com/contact ?"
    );

    res.json({ reply });
  } catch (err) {
    console.error("chat handler error", err);
    res.status(500).json({ reply: FALLBACK_REPLY });
  }
});

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => {
  console.log(`Coal Tiger chatbot listening on :${PORT} (model: ${MODEL}, key: ${API_KEY ? "set" : "MISSING"})`);
});
