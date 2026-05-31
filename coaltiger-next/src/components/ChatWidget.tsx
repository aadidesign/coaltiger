"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const BASE = process.env.NEXT_PUBLIC_CHATBOT_URL || "http://localhost:8787";

const FALLBACK_GREETING =
  "Hi, I'm the **Coal Tiger AI Assistant**.\n\nAsk me about our **mission**, the **Bindu Method**, our **AI governance** work, the portfolio, or how to start a partnership.";
const FALLBACK_SUGGESTIONS = [
  "What does Coal Tiger do?",
  "Explain the Bindu Method",
  "What is 'evidence, not authority'?",
  "How do funding partnerships work?",
];

/* ----------------------------- icons (Lucide) ----------------------------- */
const Icon = {
  spark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z" />
      <path d="M20 3v4M22 5h-4M4 17v2M5 18H3" />
    </svg>
  ),
  send: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <path d="m21.854 2.147-10.94 10.939" />
    </svg>
  ),
  refresh: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="11.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
};

// Lucide "bot" — the AI assistant avatar
const BotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2M20 14h2M15 13v2M9 13v2" />
  </svg>
);

/* --------------------------- text + markdown --------------------------- */
// Normalise dashes (no em/en dashes) and tidy whitespace artefacts.
function sanitize(text: string) {
  return text
    .replace(/\s*[—–]\s*/g, " - ")
    .replace(/[ \t]{2,}/g, " ");
}

// Inline formatting -> React nodes. Builds elements (no HTML injection).
function renderInline(text: string, prefix: string) {
  const nodes: React.ReactNode[] = [];
  const re =
    /\*\*([^*]+)\*\*|__([^_]+)__|\*([^*]+)\*|_([^_]+)_|`([^`]+)`|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s)]+)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const k = `${prefix}-${i++}`;
    if (m[1] !== undefined) nodes.push(<strong key={k}>{m[1]}</strong>);
    else if (m[2] !== undefined) nodes.push(<strong key={k}>{m[2]}</strong>);
    else if (m[3] !== undefined) nodes.push(<em key={k}>{m[3]}</em>);
    else if (m[4] !== undefined) nodes.push(<em key={k}>{m[4]}</em>);
    else if (m[5] !== undefined) nodes.push(<code key={k}>{m[5]}</code>);
    else if (m[6] !== undefined)
      nodes.push(
        <a key={k} href={m[7]} target="_blank" rel="noopener noreferrer">
          {m[6]}
        </a>
      );
    else if (m[8] !== undefined)
      nodes.push(
        <a key={k} href={m[8]} target="_blank" rel="noopener noreferrer">
          {m[8]}
        </a>
      );
    last = re.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

// Block-level markdown: headings, bullet/numbered lists, paragraphs.
function renderMarkdown(raw: string) {
  const lines = sanitize(raw).split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  const isUl = (s: string) => /^\s*[-*•]\s+/.test(s);
  const isOl = (s: string) => /^\s*\d+\.\s+/.test(s);
  const isH = (s: string) => /^#{1,4}\s+/.test(s);

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    const h = /^#{1,4}\s+(.*)$/.exec(line);
    if (h) {
      blocks.push(
        <p className="md-h" key={key++}>
          {renderInline(h[1], `h${key}`)}
        </p>
      );
      i++;
      continue;
    }
    if (isUl(line)) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && isUl(lines[i])) {
        items.push(<li key={key++}>{renderInline(lines[i].replace(/^\s*[-*•]\s+/, ""), `li${key}`)}</li>);
        i++;
      }
      blocks.push(<ul key={key++}>{items}</ul>);
      continue;
    }
    if (isOl(line)) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && isOl(lines[i])) {
        items.push(<li key={key++}>{renderInline(lines[i].replace(/^\s*\d+\.\s+/, ""), `ol${key}`)}</li>);
        i++;
      }
      blocks.push(<ol key={key++}>{items}</ol>);
      continue;
    }
    const buf: string[] = [];
    while (i < lines.length && lines[i].trim() && !isUl(lines[i]) && !isOl(lines[i]) && !isH(lines[i])) {
      buf.push(lines[i]);
      i++;
    }
    const inner: React.ReactNode[] = [];
    buf.forEach((pl, idx) => {
      inner.push(...renderInline(pl, `p${key}-${idx}`));
      if (idx < buf.length - 1) inner.push(<br key={`br${key}-${idx}`} />);
    });
    blocks.push(<p key={key++}>{inner}</p>);
  }
  return blocks;
}

function Bubble({ role, content }: Msg) {
  const bot = role === "assistant";
  return (
    <div className={`msg-row ${bot ? "bot" : "user"}`}>
      {bot && (
        <span className="msg-av" aria-hidden="true">
          <BotIcon />
        </span>
      )}
      <div className={`msg ${bot ? "bot" : "user"}`}>{renderMarkdown(content)}</div>
    </div>
  );
}

/* --------------------------------- widget --------------------------------- */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [greeting, setGreeting] = useState(FALLBACK_GREETING);
  const [suggestions, setSuggestions] = useState<string[]>(FALLBACK_SUGGESTIONS);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fetchedMeta = useRef(false);

  // Load greeting + suggestions once when first opened
  useEffect(() => {
    if (!open || fetchedMeta.current) return;
    fetchedMeta.current = true;
    fetch(`${BASE}/api/meta`)
      .then((r) => r.json())
      .then((d) => {
        if (d?.greeting) setGreeting(d.greeting);
        if (Array.isArray(d?.suggestions) && d.suggestions.length) setSuggestions(d.suggestions);
      })
      .catch(() => {});
  }, [open]);

  // Autofocus the field when the panel opens
  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  // Esc closes the panel
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy, open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const r = await fetch(`${BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await r.json().catch(() => ({}));
      // `error` is for diagnostics only — never surface raw error text to the
      // visitor. Show the server's friendly `reply`, or a safe fallback.
      if (data.error) console.error("chat error:", data.error);
      const reply =
        data.reply ||
        "I'm having trouble reaching my knowledge service right now. Please try again shortly, or use the contact form at https://www.coaltigerltd.com/contact";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please try again shortly, or reach the team at https://www.coaltigerltd.com/contact",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {!open && (
        <button className="chat-launch" aria-label="Open chat" onClick={() => setOpen(true)}>
          <span className="ping" aria-hidden="true" />
          {Icon.chat}
        </button>
      )}

      <div className={`chat-panel ${open ? "open" : ""}`} role="dialog" aria-label="Coal Tiger assistant">
        <div className="chat-head">
          <div className="av">
            <BotIcon />
            <i className="av-dot" aria-hidden="true" />
          </div>
          <div className="who">
            <b>AI Assistant</b>
            <span>
              <i className="live" /> Coal Tiger · Online
            </span>
          </div>
          <div className="head-actions">
            {messages.length > 0 && (
              <button className="hbtn" aria-label="New chat" title="New chat" onClick={() => setMessages([])}>
                {Icon.refresh}
              </button>
            )}
            <button className="hbtn" aria-label="Close chat" title="Close" onClick={() => setOpen(false)}>
              {Icon.close}
            </button>
          </div>
        </div>

        <div className="chat-body" ref={bodyRef} data-lenis-prevent>
          <Bubble role="assistant" content={greeting} />
          {messages.map((m, i) => (
            <Bubble key={i} role={m.role} content={m.content} />
          ))}
          {busy && (
            <div className="msg-row bot">
              <span className="msg-av" aria-hidden="true">
                <BotIcon />
              </span>
              <div className="chat-typing" aria-label="Assistant is typing">
                <i />
                <i />
                <i />
              </div>
            </div>
          )}
        </div>

        {messages.length === 0 && (
          <div className="chat-suggest">
            <span className="suggest-label">
              {Icon.spark} Suggested
            </span>
            <div className="suggest-chips">
              {suggestions.map((s) => (
                <button key={s} onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <form
          className="chat-input"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Coal Tiger..."
            aria-label="Message"
            maxLength={500}
          />
          <button type="submit" disabled={busy || !input.trim()} aria-label="Send">
            {Icon.send}
          </button>
        </form>
      </div>
    </>
  );
}
