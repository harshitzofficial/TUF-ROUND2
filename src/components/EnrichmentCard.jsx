import { useState, useRef } from 'react';
import './EnrichmentCard.css';

const INTERCOM_DATA = [
  { icon: '🌐', k: 'Website',   v: 'intercom.io' },
  { icon: '📍', k: 'Location',  v: 'Dublin, Ireland' },
  { icon: '👥', k: 'Employees', v: '800' },
  { icon: '🐦', k: 'Twitter',   v: '@intercom' },
  { icon: '💰', k: 'Funding',   v: '$241M' },
  { icon: '✅', k: 'Qualified', v: 'true', isTrue: true },
];

const STRIPE_DATA = [
  { icon: '🌐', k: 'Website',   v: 'stripe.com' },
  { icon: '📍', k: 'Location',  v: 'San Francisco' },
  { icon: '👥', k: 'Employees', v: '4,000' },
  { icon: '🐦', k: 'Twitter',   v: '@stripe' },
  { icon: '💰', k: 'Funding',   v: '$8.7B' },
  { icon: '✅', k: 'Qualified', v: 'true', isTrue: true },
];

/** Shimmer skeleton placeholder row */
function SkeletonRow() {
  return (
    <div className="enrich-row skeleton-row">
      <div className="skeleton" style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0 }} />
      <div style={{ flex: 1, display:'flex', flexDirection:'column', gap: 6 }}>
        <div className="skeleton" style={{ width: '40%', height: 10 }} />
        <div className="skeleton" style={{ width: '70%', height: 13 }} />
      </div>
    </div>
  );
}

export default function EnrichmentCard() {
  const [data, setData] = useState(INTERCOM_DATA);
  const [loading, setLoading] = useState(false);
  const [enriched, setEnriched] = useState(true);
  const [animKey, setAnimKey] = useState(0); // force re-animation on refresh
  const toggle = useRef(false);

  const refresh = () => {
    setLoading(true);
    setEnriched(false);
    setTimeout(() => {
      toggle.current = !toggle.current;
      setData(toggle.current ? STRIPE_DATA : INTERCOM_DATA);
      setAnimKey((k) => k + 1);
      setLoading(false);
      setEnriched(true);
    }, 1400);
  };

  return (
    <div className="card card-yellow">
      <div className="enrichment-inner">
        <div className="e-headline">Automatic enrichment</div>
        <div className="e-sub">
          Automatically enrich your customers' profiles and their users powered by GPT
        </div>

        {enriched && (
          <div className="ai-badge">
            <span className="ai-dot" /> Enriched with AI
          </div>
        )}

        <div className="enrich-grid" key={animKey}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
            : data.map((d, i) => (
              <div
                className="enrich-row"
                key={d.k}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <span className="e-icon">{d.icon}</span>
                <div>
                  <div className="e-k">{d.k}</div>
                  <div className={`e-v${d.isTrue ? ' true-val' : ''}`}>{d.v}</div>
                </div>
              </div>
            ))
          }
        </div>

        <button className="refresh-btn" onClick={refresh} disabled={loading}>
          <span className={loading ? 'spinning' : ''}>⟳</span>
          {loading ? 'Enriching…' : 'Re-enrich with AI'}
        </button>
      </div>
    </div>
  );
}
