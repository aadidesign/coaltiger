"use client";

import { useEffect, useRef, useState } from "react";

const NODES = [
  { b: "Agentic AI control", d: "Bound reasoning, memory & action" },
  { b: "Authority gating", d: "Least-privilege escalation" },
  { b: "Evidence verification", d: "Lineage before trust" },
  { b: "Rollback discipline", d: "Recover from unsafe state" },
  { b: "Proof-chain integrity", d: "Tamper-evident record" },
  { b: "Buyer-readable assurance", d: "Evidence anyone can audit" },
  { b: "Runtime integrity", d: "Parity at execution time" },
  { b: "Human escalation", d: "Warden review & approval" },
];

const RADIUS = 42; // percent

export default function ArchExplode() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setExploded(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setExploded(true)),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="arch">
      <div className="arch-stage" ref={stageRef}>
        <div className="arch-core">
          GOVERNED
          <br />
          AUTHORITY
        </div>
        {NODES.map((n, i) => {
          const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
          const x = exploded ? 50 + Math.cos(angle) * RADIUS : 50;
          const y = exploded ? 50 + Math.sin(angle) * RADIUS : 50;
          return (
            <div
              key={n.b}
              className={`arch-node ${exploded ? "exploded" : ""}`}
              style={{ left: `${x}%`, top: `${y}%`, transitionDelay: `${i * 70}ms` }}
            >
              {n.b}
            </div>
          );
        })}
      </div>
      <div>
        <span className="eyebrow">Governance Architecture</span>
        <h2 style={{ fontSize: "clamp(1.7rem,3vw,2.6rem)", textTransform: "uppercase", margin: "16px 0 26px" }}>
          Authority, contained.
        </h2>
        <ul className="arch-list">
          {NODES.map((n) => (
            <li key={n.b}>
              <b>{n.b}</b>
              {n.d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
