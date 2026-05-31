"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const SLIDES = [
  {
    glyph: "🐯",
    tag: "AI Governance · Flagship",
    title: "Coal Tiger & The Christ Shard",
    body: "A cybersecurity immune system for high-consequence AI and autonomous agents — a governed control kernel where AI output enters as evidence, not authority. Governance before power.",
  },
  {
    glyph: "🕊️",
    tag: "Peace Architecture",
    title: "PEACELOCK Event Economy",
    body: "A peace framework built on a hard idea: engineer the world's incentives so aggression becomes financially self-defeating. Bind prosperity, price escalation, protect civilians, reward restraint.",
  },
  {
    glyph: "🧬",
    tag: "Public Health · Saves Lives",
    title: "Bindu WL Emergency Framework",
    body: "A WHO-style emergency-response framework applying the Bindu Method to surveillance, treatment, logistics, and international coordination for an Ebola outbreak in the DRC.",
  },
  {
    glyph: "🏗️",
    tag: "Economic Repair",
    title: "UAE Stabilisation Framework",
    body: "National-scale economic repair and development strategy — systems thinking, policy imagination, and disciplined design translated into executive-grade, public-facing clarity.",
  },
  {
    glyph: "🧠",
    tag: "LLM Governance",
    title: "Coal Tiger Cub",
    body: "An LLM governance stack focused on runtime parity, release-packet integrity, agentic governance, auditability, and proof discipline — internal proof work toward governed authority.",
  },
];

export default function Portfolio() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const drag = useRef({ down: false, startX: 0, moved: 0 });

  const slideStep = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const first = track.querySelector<HTMLElement>(".slide");
    if (!first) return 0;
    const style = getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || "30") || 30;
    return first.getBoundingClientRect().width + gap;
  }, []);

  const layout = useCallback(
    (extra = 0) => {
      const track = trackRef.current;
      const vp = viewportRef.current;
      if (!track || !vp) return;
      const slides = Array.from(track.querySelectorAll<HTMLElement>(".slide"));
      const step = slideStep();
      const slideW = slides[0]?.getBoundingClientRect().width ?? 0;
      const centerOffset = (vp.getBoundingClientRect().width - slideW) / 2;
      track.style.transform = `translateX(${centerOffset - index * step + extra}px)`;
      slides.forEach((s, i) => {
        const dist = i - index;
        const rot = Math.max(-2, Math.min(2, dist)) * -7;
        const scale = i === index ? 1 : 0.9;
        const op = Math.abs(dist) > 2 ? 0.25 : i === index ? 1 : 0.7;
        s.style.transform = `rotateY(${rot}deg) scale(${scale})`;
        s.style.opacity = String(op);
        s.classList.toggle("is-active", i === index);
      });
    },
    [index, slideStep]
  );

  useEffect(() => {
    layout();
  }, [layout]);

  useEffect(() => {
    const onResize = () => layout();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [layout]);

  const go = (i: number) => setIndex(Math.max(0, Math.min(SLIDES.length - 1, i)));

  // drag / swipe
  useEffect(() => {
    const vp = viewportRef.current;
    const track = trackRef.current;
    if (!vp || !track) return;

    const start = (x: number) => {
      drag.current = { down: true, startX: x, moved: 0 };
      track.style.transition = "none";
    };
    const move = (x: number) => {
      if (!drag.current.down) return;
      drag.current.moved = x - drag.current.startX;
      layout(drag.current.moved);
    };
    const end = () => {
      if (!drag.current.down) return;
      const moved = drag.current.moved;
      drag.current.down = false;
      track.style.transition = "";
      if (Math.abs(moved) > 70) go(index + (moved < 0 ? 1 : -1));
      else layout();
    };

    const md = (e: MouseEvent) => { e.preventDefault(); start(e.clientX); };
    const mm = (e: MouseEvent) => move(e.clientX);
    const mu = () => end();
    const ts = (e: TouchEvent) => start(e.touches[0].clientX);
    const tm = (e: TouchEvent) => move(e.touches[0].clientX);
    const te = () => end();

    vp.addEventListener("mousedown", md);
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup", mu);
    vp.addEventListener("touchstart", ts, { passive: true });
    vp.addEventListener("touchmove", tm, { passive: true });
    vp.addEventListener("touchend", te);

    return () => {
      vp.removeEventListener("mousedown", md);
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup", mu);
      vp.removeEventListener("touchstart", ts);
      vp.removeEventListener("touchmove", tm);
      vp.removeEventListener("touchend", te);
    };
  }, [index, layout]);

  return (
    <section className="block" id="portfolio">
      <span className="section-num">03 — Portfolio</span>
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Concepts &amp; Frameworks</span>
          <h2>
            Disruptive concepts, <span className="grad-text">engineered.</span>
          </h2>
          <p>
            A portfolio of large-scale frameworks developed through the Bindu Method — each built
            to be impactful, ethically grounded, and structurally sound. Drag, swipe, or use the
            controls to explore.
          </p>
        </Reveal>
      </div>

      <div className="wrap slider-wrap">
        <div className="slider-viewport" ref={viewportRef}>
          <div className="slider-track" ref={trackRef}>
            {SLIDES.map((s, i) => (
              <article
                className="slide"
                key={s.title}
                onClick={() => {
                  if (i !== index && Math.abs(drag.current.moved) < 6) go(i);
                }}
              >
                <span className="glyph" aria-hidden="true">{s.glyph}</span>
                <span className="tag">{s.tag}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="slider-nav">
          <button aria-label="Previous" onClick={() => go(index - 1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button aria-label="Next" onClick={() => go(index + 1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
