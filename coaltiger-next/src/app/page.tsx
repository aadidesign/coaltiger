import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import ArchExplode from "@/components/ArchExplode";
import SmoothScroll from "@/components/SmoothScroll";
import Reveal from "@/components/Reveal";
import Mark from "@/components/Mark";
import ChatWidget from "@/components/ChatWidget";

const MARQUEE = [
  "Save Lives",
  "Sustainable Employment",
  "Safeguard People & Wildlife",
  "Universal Well-Being",
  "Profit With Principle",
  "Transformative Scale",
];

const CHAIN = [
  { idx: "01", h: "Model", p: "Reasons, recalls, suggests." },
  { idx: "02", h: "Tool", p: "Acts on the suggestion." },
  { idx: "03", h: "Agent", p: "Chains tools autonomously." },
  { idx: "04", h: "Credentials", p: "Gains access & identity." },
  { idx: "05", h: "Infrastructure", p: "Reaches production & data." },
];

const IMMUNE = [
  { h: "Detect", p: "Observe risk across reasoning, tools, memory, and actions.", icon: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" strokeLinecap="round" /></> },
  { h: "Test", p: "Verify evidence and lineage before confidence becomes power.", icon: <><path d="M9 3v6l-5 8a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-8V3" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 3h6" strokeLinecap="round" /></> },
  { h: "Contain", p: "Sandbox, gate, or block unsafe paths and excessive agency.", icon: <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M9 9h6v6H9z" /></> },
  { h: "Remember", p: "Capture audit trails and proof-chain evidence for review.", icon: <><path d="M12 8v4l3 2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="8" /></> },
  { h: "Adapt", p: "Strengthen after pressure — recover, review, and improve.", icon: <><path d="M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2" strokeLinecap="round" strokeLinejoin="round" /><path d="M18 4v5h-5M6 20v-5h5" strokeLinecap="round" strokeLinejoin="round" /></> },
];

const INTEL = [
  { src: "NIST · United States", h: "AI Risk Management Framework (AI RMF 1.0)", p: "A voluntary framework organised around four functions: Govern, Map, Measure, and Manage, designed to help organisations manage risks across the AI lifecycle. Released January 2023, with a Generative AI Profile added in 2024.", url: "https://www.nist.gov/itl/ai-risk-management-framework", cite: "nist.gov" },
  { src: "MITRE", h: "ATLAS: Adversarial Threat Landscape for AI Systems", p: "A globally accessible, living knowledge base of adversary tactics and techniques against AI-enabled systems, modelled on MITRE ATT&CK and informed by real-world attacks.", url: "https://atlas.mitre.org/", cite: "atlas.mitre.org" },
  { src: "OWASP", h: "Top 10 for LLM Applications & Agentic Threats", p: "Community-driven guidance cataloguing the most critical risks in LLM and agentic applications — including prompt injection and excessive agency — to steer secure design and deployment.", url: "https://genai.owasp.org/", cite: "genai.owasp.org" },
  { src: "European Union", h: "The EU AI Act", p: "The first comprehensive, horizontal AI law, taking a risk-based approach across prohibited, high-risk, and limited-risk tiers. It entered into force in 2024 with obligations phasing in over subsequent years.", url: "https://artificialintelligenceact.eu/", cite: "artificialintelligenceact.eu" },
];

const SERVICES = [
  { n: "01", h: "Custom Software & Application Development", d: "Governed, verifiable systems from architecture to runtime." },
  { n: "02", h: "Engineering & Systems Design", d: "Bindu-Method diagnosis and redesign of complex systems." },
  { n: "03", h: "Information Security", d: "Cybersecurity logic, containment, and proof discipline." },
  { n: "04", h: "Financial & Strategic Consulting", d: "Economic repair and incentive architecture at scale." },
  { n: "05", h: "Healthcare & Public-Systems Consulting", d: "Emergency-response and surveillance framework design." },
  { n: "06", h: "Political & Policy Consulting", d: "National strategy, stabilisation, and governance design." },
];

const SKILLS = ["Systems Engineering", "System Architecture", "AI Governance", "Control Design", "Cybersecurity Logic", "Data Analysis", "Creative Problem Solving"];

const ARROW = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <SmoothScroll>
      <Nav />
      <main id="top">
        <Hero />

        {/* MARQUEE */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span className="marquee-item" key={i}>
                <i className="dot" /> {m}
              </span>
            ))}
          </div>
        </div>

        {/* MISSION */}
        <section className="block" id="mission">
          <span className="section-num">01 · Mission</span>
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">About Coal Tiger Innovations</span>
              <h2>
                Built from a vantage of <span className="grad-text">universal well-being.</span>
              </h2>
              <p>
                At Coal Tiger Innovations, we are dedicated to pioneering disruptive concepts and
                solutions that foster the holistic betterment of humanity. Led by CEO and Founder
                Leon M. Browne, our mission extends beyond conventional innovation to deliver
                multi-billion-dollar potential that saves lives, generates sustainable employment,
                and meticulously safeguards both people and wildlife.
              </p>
            </Reveal>

            <div className="cards-3">
              <Reveal as="article" className="pcard">
                <div>
                  <div className="ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M12 21s-7-4.5-9.5-9A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3>Impact First</h3>
                  <p>Every concept is developed from a foundational vantage of universal well-being, so all stakeholders are thoughtfully considered and cared for.</p>
                </div>
                <span className="pnum">PRINCIPLE 01</span>
              </Reveal>

              <Reveal as="article" className="pcard" delay={0.1}>
                <div>
                  <div className="ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M12 3 4 7v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V7l-8-4Z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3>Ethically Sound</h3>
                  <p>Solutions that are not only profoundly impactful but ethically sound and financially robust — a deliberate balance between profitability and principle.</p>
                </div>
                <span className="pnum">PRINCIPLE 02</span>
              </Reveal>

              <Reveal as="article" className="pcard" delay={0.2}>
                <div>
                  <div className="ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M3 12h4l3 8 4-16 3 8h4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3>Financially Robust</h3>
                  <p>We pursue large-scale, transformative projects with genuine multi-billion-dollar potential — and occasionally undertake pro bono initiatives true to our core mission.</p>
                </div>
                <span className="pnum">PRINCIPLE 03</span>
              </Reveal>
            </div>
          </div>
        </section>

        {/* METHOD */}
        <section className="block" id="method" style={{ background: "var(--coal-850)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          <span className="section-num">02 · The Method</span>
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">The Engine Behind Every Concept</span>
              <h2>The Bindu Method.</h2>
              <p>
                A practical systems-repair framework created by Leon Browne for diagnosing broken
                systems and redesigning them to survive real-world pressure. It is the discipline
                applied across every Coal Tiger concept — from AI governance to economic repair and
                public-health response.
              </p>
            </Reveal>
            <Reveal className="bindu">
              {[
                { n: "01", h: "Find the real constraint", p: "Locate the structural truth — the actual bottleneck a system is failing on, not its symptoms." },
                { n: "02", h: "Align incentives", p: "Redesign so the rational path and the safe, beneficial path become the same path." },
                { n: "03", h: "Embed verification", p: "Build proof, correction, and authority boundaries into the architecture, not bolted on." },
                { n: "04", h: "Engineer correction", p: "Fault-tolerant execution: unsafe paths are pushed toward containment, recovery, and review." },
                { n: "05", h: "Survive stress", p: "Test whether the solution holds under real pressure — and strengthens, rather than fails." },
              ].map((s) => (
                <div className="bstep" key={s.n}>
                  <div className="bn">{s.n}</div>
                  <h4>{s.h}</h4>
                  <p>{s.p}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* PORTFOLIO */}
        <Portfolio />

        {/* GOVERNANCE */}
        <section className="block" id="governance" style={{ background: "var(--coal-850)", borderTop: "1px solid var(--line)" }}>
          <span className="section-num">04 · AI Governance</span>
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">The Flagship Pillar</span>
              <h2>
                A cybersecurity immune system <span className="grad-text">for AI.</span>
              </h2>
              <p>
                Capabilities are advancing faster than authority, verification, rollback, and
                accountability. Coal Tiger governs the handoff between AI capability and operational
                power — so powerful systems remain usable where trust, safety, and command discipline
                matter.
              </p>
            </Reveal>

            <Reveal as="p" style={{ textTransform: "uppercase", letterSpacing: ".22em", fontSize: 12, color: "var(--text-faint)", marginBottom: 20 }}>
              The dangerous point is not the output — it is the handoff.
            </Reveal>
            <Reveal className="chain">
              {CHAIN.map((c, i) => (
                <div style={{ display: "contents" }} key={c.idx}>
                  <div className="chain-node">
                    <span className="idx">{c.idx}</span>
                    <h4>{c.h}</h4>
                    <p>{c.p}</p>
                  </div>
                  {i < CHAIN.length - 1 && <div className="chain-arrow">→</div>}
                </div>
              ))}
            </Reveal>
            <Reveal className="handoff-flag">
              <span className="pulse" />
              <p>
                <b>AI output enters as evidence — not authority.</b> Before anything high-impact
                happens, there must be verification, lineage, containment, rollback discipline, and
                human accountability. Unsafe pressure cannot create more authority.
              </p>
            </Reveal>
          </div>

          <div className="wrap" style={{ marginTop: 90 }}>
            <Reveal className="section-head center" style={{ marginBottom: 54 }}>
              <span className="eyebrow" style={{ justifyContent: "center" }}>The Biological Model</span>
              <h2 style={{ fontSize: "clamp(1.8rem,3.6vw,3rem)" }}>Detect. Test. Contain. Remember. Adapt.</h2>
            </Reveal>
            <Reveal className="immune">
              {IMMUNE.map((s) => (
                <div className="istage" key={s.h}>
                  <div className="ring">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      {s.icon}
                    </svg>
                  </div>
                  <h4>{s.h}</h4>
                  <p>{s.p}</p>
                </div>
              ))}
            </Reveal>
          </div>

          <div className="wrap" style={{ marginTop: 100 }}>
            <ArchExplode />
          </div>
        </section>

        {/* FIELD INTELLIGENCE */}
        <section className="block" id="intel">
          <span className="section-num">05 · Context</span>
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">Aligned With Recognised Standards</span>
              <h2>
                Governance the field <span className="grad-text">already understands.</span>
              </h2>
              <p>
                Coal Tiger&apos;s discipline maps onto the established frameworks governments and
                enterprises are adopting for trustworthy and agentic AI. Sources are linked for
                verification.
              </p>
            </Reveal>
            <Reveal className="intel">
              {INTEL.map((c) => (
                <div className="intel-card" key={c.h}>
                  <span className="src">{c.src}</span>
                  <h4>{c.h}</h4>
                  <p>{c.p}</p>
                  <a className="cite" href={c.url} target="_blank" rel="noopener noreferrer">
                    {c.cite} ↗
                  </a>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* PARTNERS */}
        <section className="block" id="partners" style={{ background: "var(--coal-850)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          <span className="section-num">06 · Partnerships</span>
          <div className="wrap">
            <div className="founder" style={{ gridTemplateColumns: "1.1fr 0.9fr" }}>
              <Reveal>
                <span className="eyebrow">Strategic Funding Partnerships</span>
                <h2 style={{ fontSize: "clamp(2rem,4vw,3.4rem)", textTransform: "uppercase", margin: "18px 0 22px" }}>
                  Bring the most ambitious ideas to fruition.
                </h2>
                <p className="bio">
                  To accelerate the realisation of our most impactful ideas, we actively seek
                  strategic funding partnerships. It is through the invaluable support of our funders
                  that our most groundbreaking innovations are brought to fruition.
                </p>
                <p className="bio">
                  Our primary focus is large-scale, transformative projects — and we occasionally
                  undertake pro bono initiatives, reflecting our unwavering commitment to our core
                  mission. We are particularly interested in conversations with organisations in AI
                  security, critical infrastructure, defence, enterprise governance, and frontier AI.
                </p>
                <div className="hero-cta" style={{ marginTop: 30 }}>
                  <a href="#contact" className="btn btn-primary">
                    Become a Partner {ARROW}
                  </a>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="cards-3" style={{ gridTemplateColumns: "1fr", gap: 16 }}>
                  {[
                    { t: "FOCUS", h: "Large-Scale & Transformative", p: "Concepts with genuine multi-billion-dollar potential and societal upside." },
                    { t: "PRINCIPLE", h: "Profit Meets Principle", p: "Returns and responsibility held together — never traded against each other." },
                    { t: "COMMITMENT", h: "Pro Bono, When It Matters", p: "Select initiatives undertaken at no cost, true to the core mission." },
                  ].map((c) => (
                    <div className="pcard" style={{ minHeight: "auto", padding: "28px 30px" }} key={c.h}>
                      <div>
                        <span className="pnum">{c.t}</span>
                        <h3 style={{ fontSize: "1.3rem", margin: "10px 0 6px" }}>{c.h}</h3>
                        <p style={{ fontSize: 14 }}>{c.p}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FOUNDER */}
        <section className="block" id="founder">
          <span className="section-num">07 · Founder</span>
          <div className="wrap">
            <div className="founder">
              <Reveal className="founder-visual">
                <div className="founder-photo" />
                <div className="founder-photo-scrim" />
                <div className="badge">
                  <b>Leon Maurice Browne</b>
                  <span>CEO &amp; Founder · He/Him · London, UK</span>
                </div>
              </Reveal>
              <Reveal>
                <span className="eyebrow">The Founder</span>
                <blockquote className="grad-text">
                  &ldquo;Be soft but not weak. Governance before power. Evidence before authority.&rdquo;
                </blockquote>
                <p className="bio">
                  Leon M. Browne is the CEO and Founder of Coal Tiger. His work focuses on a critical
                  gap in the AI era: capabilities are advancing faster than authority, verification,
                  rollback, and accountability — and he builds the governance layer that decides when
                  AI output is merely evidence, when it can support action, and when it must be
                  blocked, sandboxed, escalated, or contained.
                </p>
                <p className="bio">
                  He created the Bindu Method — a systems-repair framework applied across AI
                  governance, cybersecurity, infrastructure, public systems, economic repair, and
                  high-stakes decision architecture — and continues to publish frameworks aimed at the
                  betterment of humanity.
                </p>
                <div className="skills">
                  {SKILLS.map((s) => (
                    <span className="skill" key={s}>{s}</span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="block services" id="services" style={{ background: "var(--coal-850)", borderTop: "1px solid var(--line)" }}>
          <span className="section-num">08 · Services</span>
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">Capabilities</span>
              <h2>How we engage.</h2>
            </Reveal>
            <Reveal>
              {SERVICES.map((s) => (
                <div className="srow" key={s.n}>
                  <span className="sn">{s.n}</span>
                  <h4>{s.h}</h4>
                  <span className="sd">{s.d}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="block cta" id="contact">
          <div className="halo" aria-hidden="true" />
          <div className="wrap cta-inner">
            <Reveal>
              <span className="eyebrow" style={{ justifyContent: "center" }}>Questions &amp; Inquiries</span>
              <h2 style={{ marginTop: 18 }}>
                Let&apos;s engineer
                <br />
                the inevitable.
              </h2>
              <p>
                For strategic funding partnerships, briefings, or collaboration on high-consequence
                systems — start a conversation with Coal Tiger.
              </p>
            </Reveal>
            <Reveal className="contact-grid" style={{ margin: "46px auto 0", maxWidth: 860 }}>
              <div className="cbox">
                <span className="lbl">Website</span>
                <div className="val">
                  <a href="https://www.coaltigerltd.com" target="_blank" rel="noopener noreferrer">coaltigerltd.com</a>
                </div>
              </div>
              <div className="cbox">
                <span className="lbl">Inquiries</span>
                <div className="val">
                  <a href="https://www.coaltigerltd.com/contact" target="_blank" rel="noopener noreferrer">Contact form ↗</a>
                </div>
              </div>
            </Reveal>
            <Reveal className="cta-actions" style={{ marginTop: 36 }}>
              <a href="https://www.coaltigerltd.com/contact" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Send an Inquiry {ARROW}
              </a>
              <a href="#partners" className="btn btn-ghost">Funding Partnerships</a>
            </Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="foot">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="foot-brand">
                <Mark />
                <span className="brand-name">
                  COAL TIGER<small>Innovations &amp; Solutions Ltd</small>
                </span>
              </div>
              <p className="foot-about">
                Pioneering disruptive concepts and solutions for the holistic betterment of
                humanity — impactful, ethically sound, and financially robust. Inevitability
                Engineered.
              </p>
            </div>
            <div className="foot-col">
              <h5>Explore</h5>
              <ul>
                <li><a href="#mission">Mission</a></li>
                <li><a href="#method">The Bindu Method</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#governance">AI Governance</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h5>Company</h5>
              <ul>
                <li><a href="#founder">Founder</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#partners">Partnerships</a></li>
                <li><a href="https://www.coaltigerltd.com/contact" target="_blank" rel="noopener noreferrer">Contact</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h5>Get in touch</h5>
              <ul>
                <li><a href="https://www.coaltigerltd.com" target="_blank" rel="noopener noreferrer">coaltigerltd.com</a></li>
                <li><a href="#contact">Start a conversation</a></li>
                <li><a href="#partners">Strategic funding</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <p>© {year} Coal Tiger Innovations &amp; Solutions Ltd. All rights reserved.</p>
            <p>London, United Kingdom · Inevitability Engineered</p>
          </div>
          <p className="foot-disclaimer">
            Coal Tiger frameworks referenced here — including the Bindu Method, the AI-governance and
            Christ Shard control work, PEACELOCK, the Bindu WL emergency-response framework, and the
            UAE stabilisation framework — represent concept and design work by the founder. Test and
            milestone figures describe internal proof work, not external validation or production
            certification. Referenced standards (NIST AI RMF, MITRE ATLAS, OWASP, EU AI Act) are the
            property of their respective organisations and are cited for context.
          </p>
        </div>
      </footer>

      <ChatWidget />
    </SmoothScroll>
  );
}
