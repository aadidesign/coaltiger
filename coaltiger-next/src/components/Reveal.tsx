"use client";

import { createElement, useEffect, useRef, useState, type ElementType, type CSSProperties } from "react";

export default function Reveal({
  children,
  className = "",
  as = "div",
  delay = 0,
  style,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  style?: CSSProperties;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            setShown(true);
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      className: `reveal ${shown ? "in" : ""} ${className}`.trim(),
      style: { ...style, transitionDelay: delay ? `${delay}s` : style?.transitionDelay },
      ...rest,
    },
    children
  );
}
