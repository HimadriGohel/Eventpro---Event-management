export function Logo({ size = 22, color, label = true }) {
  const c = color || 'var(--ink)';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <svg width={size + 4} height={size + 4} viewBox="0 0 32 32" fill="none">
        <rect x="2" y="2" width="28" height="28" rx="9" fill={c} />
        <path d="M10 20l5-12 5 12-5-3-5 3z" fill="var(--bg)" />
        <circle cx="22" cy="10" r="3" fill="var(--accent)" />
      </svg>
      {label && (
        <span style={{ fontWeight: 600, fontSize: size * 0.72, letterSpacing: '-0.02em', color: c }}>
          Event
          <span className="serif" style={{ fontStyle: 'italic', fontWeight: 400, marginLeft: 1 }}>
            Pro
          </span>
        </span>
      )}
    </div>
  );
}
