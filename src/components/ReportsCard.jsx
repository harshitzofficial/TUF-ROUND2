import { useState, useEffect } from 'react';
import './ReportsCard.css';

const COMPANY = {
  name: 'Intercom',
  joined: '9 Feb 2023',
  stats: [
    { label: 'Total seats', value: 50 },
    { label: 'Active seats', value: 22 },
    { label: 'Active last 7 days', value: 'True', badge: true },
  ],
};

const BARS = [
  { label: 'Signed up',  pct: 100, color: '#fbbf24' },
  { label: 'Setup',      pct: 80,  color: '#60a5fa' },
  { label: 'Aha moment', pct: 60,  color: '#fbbf24' },
  { label: 'Activated',  pct: 40,  color: '#1e3a5f' },
  { label: 'Active',     pct: 80,  color: '#60a5fa' },
];

/** Animates an integer from 0 → target over `duration` ms */
function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return count;
}

function ActivationBar({ label, pct, color, delay }) {
  const [filled, setFilled] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setFilled(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bar-row">
      <div className="bar-label">
        <span className="bar-dot" style={{ background: color }} />
        {label}
      </div>
      <div className="bar-track">
        <div
          className="bar-fill"
          style={{
            width: filled ? `${pct}%` : '0%',
            background: color,
            transition: filled
              ? `width 1.2s cubic-bezier(.4,0,.2,1) ${delay}`
              : 'none',
          }}
        />
      </div>
      <div className="bar-pct">{pct}%</div>
    </div>
  );
}

function CompanyProfile() {
  return (
    <div className="cp-card">
      <div className="cp-header">
        <div className="cp-logo">🏢</div>
        <div>
          <div className="cp-name">{COMPANY.name}</div>
          <div className="cp-joined">Joined {COMPANY.joined}</div>
        </div>
      </div>
      {COMPANY.stats.map((s) => (
        <div className="cp-stat" key={s.label}>
          <span><span className="stat-icon">⚡</span>{s.label}</span>
          {s.badge
            ? <span className="badge-true">{s.value}</span>
            : <span className="val">{s.value}</span>
          }
        </div>
      ))}
    </div>
  );
}

function ActivationPanel() {
  const displayed = useCountUp(40, 1400);

  return (
    <div className="act-panel">
      <div className="act-title">Company activation</div>
      {/* Count-up number */}
      <div className="act-pct">{displayed}%</div>
      {BARS.map((b, i) => (
        <ActivationBar
          key={b.label}
          {...b}
          delay={`${0.35 + i * 0.09}s`}
        />
      ))}
    </div>
  );
}

export default function ReportsCard() {
  return (
    <div className="card card-blue">
      {/* Decorative floating orb */}
      <div className="orb" style={{
        width: 180, height: 180,
        background: 'radial-gradient(circle, #93c5fd40, transparent 70%)',
        right: -40, bottom: -40, animationDuration: '9s',
      }} />
      <div className="reports-banner">
        <div className="reports-headline">
          We automatically generate reports for each of your customers
        </div>
        <CompanyProfile />
        <ActivationPanel />
      </div>
    </div>
  );
}
