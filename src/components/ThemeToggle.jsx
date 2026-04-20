import './ThemeToggle.css';

export default function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      className={`theme-toggle${dark ? ' dark' : ''}`}
      onClick={onToggle}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label="Toggle dark mode"
    >
      <div className="tt-track">
        <div className="tt-thumb" />
        <span className="tt-icon sun">☀️</span>
        <span className="tt-icon moon">🌙</span>
      </div>
    </button>
  );
}
