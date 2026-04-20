import { useState, useCallback } from 'react';
import './CrmCard.css';

const INITIAL_ROWS = [
  { id: 1, name: 'Intercom', color: '#6366f1', seats: 22, delta: +3, flashing: false },
  { id: 2, name: 'Amie',     color: '#ec4899', seats: 20, delta: -2, flashing: false },
  { id: 3, name: 'Linear',   color: '#0ea5e9', seats: 15, delta: +5, flashing: false },
  { id: 4, name: 'Vercel',   color: '#f59e0b', seats:  8, delta: +1, flashing: false },
];

const CRM_OPTIONS = [
  { id: 'attio',      label: 'Attio',    emoji: '🔷' },
  { id: 'hubspot',    label: 'HubSpot',  emoji: '🟠' },
  { id: 'salesforce', label: 'SF',       emoji: '☁️' },
];

export default function CrmCard() {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [activeCrm, setActiveCrm] = useState('attio');
  const [syncing, setSyncing] = useState(false);
  const [syncKey, setSyncKey] = useState(0);

  const simulateSync = useCallback(() => {
    setSyncing(true);
    setTimeout(() => {
      setRows((prev) =>
        prev.map((row) => {
          const change = Math.floor(Math.random() * 5) - 2;
          return { ...row, seats: Math.max(1, row.seats + change), delta: change, flashing: true };
        })
      );
      setSyncKey((k) => k + 1); // force flip-num re-animation
      setSyncing(false);
      // Remove flash class after animation
      setTimeout(() => {
        setRows((prev) => prev.map((r) => ({ ...r, flashing: false })));
      }, 1300);
    }, 700);
  }, []);

  return (
    <div className="card card-green">
      <div className="crm-inner">
        <div className="c-headline">Integrated with your CRM</div>
        <div className="c-sub">
          Connect June to your CRM and sync product usage data with your CS and sales teams
        </div>

        <div className="crm-logos">
          {CRM_OPTIONS.map((c) => (
            <div
              key={c.id}
              className={`crm-pill${activeCrm === c.id ? ' active' : ''}`}
              onClick={() => setActiveCrm(c.id)}
            >
              <span>{c.emoji}</span> {c.label}
            </div>
          ))}
        </div>

        <div className="crm-table">
          <div className="crm-thead">
            <span>Company</span>
            <span>Active seats</span>
          </div>
          {rows.map((row) => (
            <div
              className={`crm-row${row.flashing ? ' row-flash' : ''}`}
              key={row.id}
            >
              <div className="crm-company">
                <div className="crm-dot" style={{ background: row.color }} />
                {row.name}
              </div>
              <div className="crm-seats">
                {/* key forces flip-num animation on every sync */}
                <span key={`${syncKey}-${row.id}`} className="flip-num">{row.seats}</span>
                <span className={`delta ${row.delta >= 0 ? 'pos' : 'neg'}`}>
                  {row.delta >= 0 ? `+${row.delta}` : row.delta}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button className="sync-btn" onClick={simulateSync} disabled={syncing}>
          {syncing
            ? <><span className="spinning">↺</span> Syncing…</>
            : <>↺ Sync now</>
          }
        </button>
      </div>
    </div>
  );
}
