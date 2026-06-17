// import { FloatingShapes } from '../../components/dashboard/FloatingShapes';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { useGo } from '../../hooks/useGo';

export default function Event404() {
  const go = useGo();
  return (
    <div
      style={{
        minHeight: '100vh', background: 'var(--bg)',
        display: 'grid', placeItems: 'center',
        padding: '60px 20px', position: 'relative', overflow: 'hidden',
      }}
    >
      <FloatingShapes tone="amber" />
      <div
        style={{
          position: 'relative', maxWidth: 560, width: '100%',
          textAlign: 'center',
          display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'center',
        }}
      >
        {/* Lost ticket SVG */}
        <div style={{ position: 'relative' }}>
          <svg width="180" height="120" viewBox="0 0 180 120">
            <defs>
              <linearGradient id="t404" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <g transform="rotate(-8 90 60)">
              <rect x="20" y="30" width="140" height="60" rx="10" fill="url(#t404)" opacity="0.15" />
              <rect x="20" y="30" width="140" height="60" rx="10" fill="none" stroke="url(#t404)" strokeWidth="2" strokeDasharray="6 4" />
              <line x1="100" y1="35" x2="100" y2="85" stroke="url(#t404)" strokeWidth="1" strokeDasharray="3 3" />
              <text x="60" y="68" textAnchor="middle" fontSize="22" fontFamily="Geist Mono" fontWeight="700" fill="url(#t404)">
                404
              </text>
              <text x="130" y="56" textAnchor="middle" fontSize="9" fontFamily="Geist Mono" fill="#F59E0B">
                EVENT
              </text>
              <text x="130" y="72" textAnchor="middle" fontSize="9" fontFamily="Geist Mono" fill="#F59E0B">
                REMOVED
              </text>
            </g>
            <circle cx="40" cy="20" r="3" fill="#F59E0B" opacity="0.6" />
            <circle cx="160" cy="100" r="4" fill="#EC4899" opacity="0.5" />
            <circle cx="20" cy="100" r="2" fill="#10B981" opacity="0.5" />
          </svg>
        </div>

        <span className="badge badge-amber">Event unavailable</span>
        <h1 className="h1" style={{ fontSize: 36 }}>
          This event is no longer <span className="serif" style={{ color: '#F59E0B' }}>available.</span>
        </h1>
        <p style={{ fontSize: 15, color: 'var(--ink-soft)', maxWidth: 440 }}>
          It may have been canceled, removed by the organizer, or set to private. If you bought a ticket, check your email for refund details.
        </p>

        <div
          className="card"
          style={{
            padding: 16, width: '100%', maxWidth: 440,
            display: 'flex', gap: 12, alignItems: 'flex-start', textAlign: 'left',
          }}
        >
          <Icon name="info" size={16} style={{ color: 'var(--ink-soft)', flexShrink: 0, marginTop: 2 }} />
          <div style={{ fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--ink)' }}>Were you trying to attend?</strong>
            <br />
            Refunds are processed automatically within 5–7 business days for any canceled event.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button variant="primary" size="lg" iconRight="arrow" onClick={() => go('explore')}>
            Discover similar events
          </Button>
          <Button variant="ghost" size="lg" onClick={() => go('home')}>
            Back to home
          </Button>
        </div>
        <button
          onClick={() => go('contact')}
          style={{
            background: 'none', border: 'none',
            color: 'var(--ink-soft)', fontSize: 13,
            textDecoration: 'underline', cursor: 'pointer',
          }}
        >
          Contact support
        </button>
      </div>
    </div>
  );
}
