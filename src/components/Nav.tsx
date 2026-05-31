"use client";

import { useEffect, useState } from "react";
import Mark from "./Mark";

const LINKS = [
  { href: "#mission", label: "Mission" },
  { href: "#method", label: "The Method" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#governance", label: "AI Governance" },
  { href: "#founder", label: "Founder" },
];

export default function Nav() {
  const [shrink, setShrink] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { start: () => void; stop: () => void } }).__lenis;
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open]);

  return (
    <>
      <header className="nav-shell">
        <nav className={`nav ${shrink ? "shrink" : ""}`}>
          <a href="#top" className="brand" aria-label="Coal Tiger home">
            <Mark />
            <span className="brand-name">
              COAL TIGER<small>Innovations &amp; Solutions</small>
            </span>
          </a>
          <div className="nav-links">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="nav-right">
            <a href="#contact" className="btn btn-primary btn-connect-desktop" style={{ height: 44, padding: "0 22px" }}>
              Start a Conversation
            </a>
            <button
              className={`burger ${open ? "open" : ""}`}
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
            </button>
          </div>
        </nav>
      </header>

      <div className={`mobile-menu ${open ? "active" : ""}`}>
        {[...LINKS, { href: "#contact", label: "Contact" }].map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
