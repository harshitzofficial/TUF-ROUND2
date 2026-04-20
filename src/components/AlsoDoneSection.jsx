import { useEffect, useRef, useState } from 'react';
import './AlsoDoneSection.css';

/* ── Animated connector + pill row ── */
function StatusPill({ label, badge, delay }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="ads-row" style={{ '--d': delay }}>
      {/* Left: dot + expanding line */}
      <div className="ads-connector">
        <span className="ads-dot" />
        <span className={`ads-line${on ? ' ads-line--on' : ''}`} />
      </div>

      {/* Pill */}
      <div className={`ads-pill${on ? ' ads-pill--on' : ''}`}>
        <span className="ads-bolt">⚡</span>
        <span className="ads-label">{label}</span>
        <span className="ads-badge">{badge}</span>
      </div>
    </div>
  );
}

/* ── Draw-on SVG curl arrow ── */
function CurlArrow({ dark }) {
  const p1 = useRef(null);
  const p2 = useRef(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    [p1, p2].forEach((r) => {
      if (!r.current) return;
      const l = r.current.getTotalLength();
      r.current.style.strokeDasharray  = l;
      r.current.style.strokeDashoffset = l;
    });
    const t = setTimeout(() => setGo(true), 500);
    return () => clearTimeout(t);
  }, []);

  const stroke = dark ? '#a78bfa' : '#1a1a2e';

  return (
    <svg className="ads-arrow" viewBox="0 0 130 80" fill="none">
      <path
        ref={p1}
        d="M 15 12 C 28 35, 8 52, 22 62 C 36 72, 52 58, 38 42 C 30 32, 46 22, 68 38 L 112 60"
        stroke={stroke}
        strokeWidth="2.2"
        strokeLinecap="round"
        style={{
          transition: go ? 'stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1) 0.2s' : 'none',
          strokeDashoffset: go ? 0 : undefined,
        }}
      />
      <path
        ref={p2}
        d="M 98 53 L 112 60 L 100 70"
        stroke={stroke}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transition: go ? 'stroke-dashoffset 0.5s cubic-bezier(.4,0,.2,1) 1.5s' : 'none',
          strokeDashoffset: go ? 0 : undefined,
        }}
      />
    </svg>
  );
}

export default function AlsoDoneSection({ dark }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`ads-section${inView ? ' ads-section--in' : ''}`}>

      {/* LEFT COLUMN — under MilestonesCard */}
      <div className="ads-left">
        <p className={`ads-handwritten${inView ? ' ads-hw--in' : ''}`}>
          Also done for you
        </p>
        <CurlArrow dark={dark} />
      </div>

      {/* RIGHT COLUMN — under EnrichmentCard / CrmCard */}
      <div className="ads-right">
        <StatusPill label="Last seen"  badge="today" delay="0s" />
        <StatusPill label="Activated"  badge="true"  delay="0.18s" />
      </div>

    </div>
  );
}
