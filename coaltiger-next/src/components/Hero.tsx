"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

export default function Hero() {
  const root = useRef<HTMLElement | null>(null);
  const photoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".hero-title .line > span");
      gsap.set(lines, { yPercent: 115 });
      gsap.to(lines, { yPercent: 0, duration: 1.15, ease: "power4.out", stagger: 0.08, delay: 0.2 });

      if (photoRef.current) {
        gsap.to(photoRef.current, {
          yPercent: 18,
          scale: 1.16,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      }
    }, root);

    // mouse parallax on the tiger photo (the eyes feel alive)
    const section = root.current;
    const photo = photoRef.current;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (!section || !photo) return;
      const r = section.getBoundingClientRect();
      const dx = (e.clientX - r.width / 2) / r.width;
      const dy = (e.clientY - r.height / 2) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        photo.style.transition = "transform .4s ease-out";
        photo.style.transform = `scale(1.1) translate(${dx * -18}px, ${dy * -14}px)`;
      });
    };
    section?.addEventListener("mousemove", onMove);

    return () => {
      ctx.revert();
      section?.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" id="hero" ref={root}>
      <div className="hero-bg">
        <ParticleField />
        <div className="hero-scrim" />
        <div className="hero-grain" />
      </div>
      <div className="hero-inner wrap">
        <div className="hero-grid">
          <div>
            <span className="eyebrow hero-tag">
              Coal Tiger Innovations &amp; Solutions Ltd · London, United Kingdom
            </span>
            <h1 className="hero-title">
              <span className="line"><span>Disruptive</span></span>
              <span className="line"><span>concepts for the</span></span>
              <span className="line"><span className="grad-text">betterment of</span></span>
              <span className="line"><span className="grad-text">humanity.</span></span>
            </h1>
            <p className="hero-sub">
              We pioneer concepts and solutions engineered to save lives, generate sustainable
              employment, and safeguard both people and wildlife — built where impact, ethics,
              and financial strength meet.
            </p>
            <div className="hero-cta">
              <a href="#portfolio" className="btn btn-primary">
                Explore the Work
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#partners" className="btn btn-ghost">Funding Partnerships</a>
            </div>
          </div>
          <div className="hero-visual">
            <figure className="hero-figure">
              <div className="hero-figure-img" ref={photoRef} />
              <figcaption className="hero-figure-tag">London, United Kingdom</figcaption>
            </figure>
            <div className="hero-principle">
              <b>Inevitability Engineered.</b>
              <span>The Coal Tiger ethos</span>
            </div>
            <div
              className="hero-principle"
              style={{ borderColor: "var(--emerald)", background: "linear-gradient(90deg,rgba(20,197,139,.06),transparent)" }}
            >
              <b>Profit with principle.</b>
              <span>Impactful · Ethical · Robust</span>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-cue">
        <span>Scroll</span>
        <div className="track" />
      </div>
    </section>
  );
}
