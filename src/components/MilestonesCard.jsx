import React, { useState, useEffect, useCallback } from 'react';
import './MilestonesCard.css';

const INITIAL_NOTIFS = [
  {
    id: 1, delay: '0s', avatar: '🦊', name: 'June', time: '10:36 AM',
    tag: { type: 'signup', label: 'Qualified signup' },
    person: 'Eoghan McCabe', email: 'eoghan@intercom.io',
    fields: [
      { k: 'Company', v: 'Intercom' }, { k: 'Location', v: 'Dublin, Ireland' },
      { k: 'Role', v: 'CTO & Co-Founder' }, { k: 'Company website', v: 'intercom.io' },
      { k: 'Company size', v: '800' }, { k: 'LinkedIn', v: 'View profile', link: true },
      { k: 'Funding', v: '33M' }, { k: 'Crunchbase', v: 'View company', link: true },
    ],
  },
  {
    id: 2, delay: '0.1s', avatar: '📊', name: 'June', time: 'Yesterday',
    tag: { type: 'activated', label: 'Activated' },
    person: 'Sarah Chen', email: 'sarah@linear.app',
    fields: [
      { k: 'Company', v: 'Linear' }, { k: 'Location', v: 'San Francisco' },
      { k: 'Role', v: 'Head of Product' }, { k: 'MRR', v: '$2,400/mo' },
    ],
  },
];

const AVATARS   = ['🚀','⭐','💡','🎯','🦄','🔥'];
const COMPANIES = ['Figma','Notion','Stripe','Vercel','Loom','Linear','Slack'];
const PEOPLE    = ['Alex Kim','Jordan Lee','Maya Patel','Morgan Davis','Chris Park'];
const CITIES    = ['NYC','London','Tokyo','Berlin','Austin','Singapore'];
const TAG_TYPES = ['signup','activated','churned'];
const TAG_MAP   = { signup:'Qualified signup', activated:'Activated', churned:'Churned' };
const CONFETTI_COLORS = ['#a78bfa','#60a5fa','#f472b6','#34d399','#fbbf24','#f87171','#38bdf8'];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function rand(min, max) { return Math.random() * (max - min) + min; }

/* ── Confetti particle component ── */
function ConfettiParticle({ x, y, color }) {
  const dx   = rand(-120, 120);
  const dy   = rand(-180, -60);
  const rot  = rand(-360, 360);
  const dur  = rand(0.7, 1.2);
  const size = rand(6, 11);
  const shape = Math.random() > 0.5 ? '50%' : '2px';

  return (
    <div
      className="confetti-particle"
      style={{
        left: x, top: y,
        background: color,
        width: size, height: size,
        borderRadius: shape,
        '--dx': `${dx}px`,
        '--dy': `${dy}px`,
        '--rot': `${rot}deg`,
        '--dur': `${dur}s`,
      }}
    />
  );
}

/* ── Live activity counter ── */
function LiveCounter({ count }) {
  return (
    <div className="live-bar">
      <span className="ping-wrapper">
        <span className="ping-ring" style={{ background: '#22c55e' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'block' }} />
      </span>
      <span className="live-text">
        <span key={count} className="flip-num">{count}</span> new signups today
      </span>
    </div>
  );
}

/* ── Single notification card ── */
function NotifCard({ notif, onDismiss }) {
  const [dismissing, setDismissing] = useState(false);
  const handleDismiss = () => {
    setDismissing(true);
    setTimeout(() => onDismiss(notif.id), 300);
  };
  return (
    <div
      className={`notif-card${dismissing ? ' dismissing' : ''}`}
      style={{ animationDelay: notif.delay }}
    >
      <div className="notif-header">
        <div className="notif-meta">
          <div className="notif-avatar">{notif.avatar}</div>
          <span className="notif-sender">{notif.name}</span>
          <span className="notif-time">{notif.time}</span>
        </div>
        <button className="notif-dismiss" onClick={handleDismiss} title="Dismiss">✕</button>
      </div>
      <span className={`milestone-tag ${notif.tag.type}`}>🏷 {notif.tag.label}</span>
      <div className="notif-person">
        {notif.person} <span className="notif-person-email">{notif.email}</span>
      </div>
      <div className="notif-body">
        {notif.fields.map((f) => (
          <div className="notif-row" key={f.k}>
            <span className="k">{f.k}:</span>
            <span className="v">{f.link ? <a href="#">{f.v}</a> : f.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MilestonesCard() {
  const [notifs,      setNotifs]      = useState(INITIAL_NOTIFS);
  const [nextId,      setNextId]      = useState(3);
  const [signupCount, setSignupCount] = useState(14);
  const [confetti,    setConfetti]    = useState([]);

  /* Auto-increment live counter every 7s */
  useEffect(() => {
    const t = setInterval(() => {
      setSignupCount((c) => c + Math.floor(Math.random() * 3 + 1));
    }, 7000);
    return () => clearInterval(t);
  }, []);

  /* Dismiss a notification */
  const dismiss = useCallback((id) => setNotifs((p) => p.filter((n) => n.id !== id)), []);

  /* Launch confetti from button position, then add notification */
  const addNotif = useCallback((e) => {
    // Spawn confetti from button
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top;
    const burst = Array.from({ length: 28 }, (_, i) => ({
      id: Date.now() + i,
      x: cx, y: cy,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    }));
    setConfetti(burst);
    setTimeout(() => setConfetti([]), 1400);

    // Add a new notification
    const type    = pick(TAG_TYPES);
    const company = pick(COMPANIES);
    setNotifs((prev) => [{
      id: nextId, delay: '0s', avatar: pick(AVATARS),
      name: 'June', time: 'Just now',
      tag: { type, label: TAG_MAP[type] },
      person: pick(PEOPLE), email: `user@${company.toLowerCase()}.com`,
      fields: [
        { k: 'Company', v: company },
        { k: 'Location', v: pick(CITIES) },
        { k: 'MRR', v: `$${(Math.floor(Math.random() * 50) + 5) * 100}/mo` },
      ],
    }, ...prev]);
    setNextId((id) => id + 1);
    setSignupCount((c) => c + 1);
  }, [nextId]);

  return (
    <>
      {/* Confetti particles rendered at fixed position */}
      {confetti.map((p) => (
        <ConfettiParticle key={p.id} x={p.x} y={p.y} color={p.color} />
      ))}

      <div className="card card-purple">
        <div className="milestones-inner">
          <div className="m-headline">Celebrate milestones</div>
          <div className="m-sub">
            Instant alerts and weekly digests to keep your team aligned and celebrate wins
          </div>

          <LiveCounter count={signupCount} />

          <div className="notif-list">
            {notifs.map((n) => (
              <NotifCard key={n.id} notif={n} onDismiss={dismiss} />
            ))}
          </div>

          <button className="add-notif-btn" onClick={addNotif}>
            ＋ Simulate new milestone
          </button>
        </div>
      </div>
    </>
  );
}
