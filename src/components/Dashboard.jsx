import { useEffect, useRef, useState, useCallback } from 'react';
import ReportsCard from './ReportsCard';
import MilestonesCard from './MilestonesCard';
import EnrichmentCard from './EnrichmentCard';
import CrmCard from './CrmCard';
import ThemeToggle from './ThemeToggle';
import AlsoDoneSection from './AlsoDoneSection';

/* ── Cursor spotlight glow ── */
function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (ref.current) {
        ref.current.style.left = e.clientX + 'px';
        ref.current.style.top  = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div ref={ref} className="cursor-glow" />;
}

/* ── Scroll-reveal ── */
function useScrollReveal(delay = '0s') {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = delay;
          el.classList.add('revealed');
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ── 3-D magnetic tilt wrapper ── */
function TiltCard({ children, delay }) {
  const revealRef = useScrollReveal(delay);
  const wrapRef   = useRef(null);

  const handleMove = useCallback((e) => {
    const el = wrapRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-y * 9}deg) rotateY(${x * 11}deg) translateY(-4px) scale(1.01)`;
  }, []);

  const handleLeave = useCallback(() => {
    if (wrapRef.current) {
      wrapRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    }
  }, []);

  return (
    <div ref={revealRef} className="reveal">
      <div
        ref={wrapRef}
        className="tilt-wrap"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ transition: 'transform 0.15s ease' }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Typewriter for hero heading ── */
function Typewriter({ words, speed = 60, pause = 1800 }) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const current = words[wordIdx % words.length];
    const delay = deleting ? speed / 2 : text.length === current.length ? pause : speed;
    const t = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % words.length);
      } else {
        setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, wordIdx, words, speed, pause]);

  useEffect(() => {
    const t = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <span style={{ color: 'inherit' }}>
      {text}
      <span className="tw-cursor" style={{ opacity: showCursor ? 1 : 0 }} />
    </span>
  );
}

export default function Dashboard({ dark, onToggleTheme }) {
  return (
    <>
      <CursorGlow />

      {/* Dark mode toggle bar */}
      <div className="topbar fade-up">
        <span className="topbar-label">{dark ? 'Dark' : 'Light'} mode</span>
        <ThemeToggle dark={dark} onToggle={onToggleTheme} />
      </div>

      <div className="page">
        {/* ── Hero header ── */}
        <div className="page-header fade-up" style={{ position: 'relative' }}>
          {/* Floating gradient orbs */}
          <div className="orb" style={{ width: 240, height: 240, background: 'radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%)', top: -70, left: '8%',  animationDuration: '8s' }} />
          <div className="orb" style={{ width: 180, height: 180, background: 'radial-gradient(circle, rgba(96,165,250,0.18) 0%, transparent 70%)', top: -30, right: '12%', animationDuration: '6s', animationDelay: '1s' }} />
          <div className="orb" style={{ width: 120, height: 120, background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)', bottom: -10, left: '44%', animationDuration: '9s', animationDelay: '2.5s' }} />

          <h1 style={{ position: 'relative' }}>
            Everything done{' '}
            <em>
              <Typewriter words={['for you', 'automatically', 'instantly', 'without effort']} />
            </em>
          </h1>
          <p className="subtitle">
            From reports to enrichment to CRM sync — June handles the work so your team can focus on customers.
          </p>
        </div>

        {/* ── Full-width reports card ── */}
        <TiltCard delay="0s">
          <ReportsCard />
        </TiltCard>

        <div className="section-label">Features</div>

        {/* ── 2-col feature grid ── */}
        <div className="grid-2">
          <TiltCard delay="0.08s">
            <MilestonesCard />
          </TiltCard>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TiltCard delay="0.16s">
              <EnrichmentCard />
            </TiltCard>
            <TiltCard delay="0.24s">
              <CrmCard />
            </TiltCard>
          </div>
        </div>

        {/* ── Also done for you ── */}
        <AlsoDoneSection dark={dark} />
      </div>
    </>
  );
}
