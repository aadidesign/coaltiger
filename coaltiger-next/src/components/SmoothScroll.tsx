"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    let lenis: Lenis | null = null;
    let onClick: ((e: MouseEvent) => void) | null = null;
    let rafCb: ((t: number) => void) | null = null;

    if (!reduce) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.6 });
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      rafCb = (time: number) => lenis && lenis.raf(time * 1000);
      gsap.ticker.add(rafCb);
      gsap.ticker.lagSmoothing(0);
    }

    // Smooth anchor navigation (works with or without Lenis)
    onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const a = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.length < 2) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -90, duration: 1.3 });
      else
        window.scrollTo({
          top: (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 90,
          behavior: "smooth",
        });
    };
    document.addEventListener("click", onClick);

    // settle ScrollTrigger after fonts/images load
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      if (onClick) document.removeEventListener("click", onClick);
      window.removeEventListener("load", onLoad);
      if (rafCb) gsap.ticker.remove(rafCb);
      if (lenis) lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
