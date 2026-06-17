import { useGo } from '../../hooks/useGo';
import { Icon } from '../ui/Icon';

/* Floating "Overview" button visible on non-sitemap, non-fullbleed pages. */
export function OverviewFAB() {
  const go = useGo();
  return (
    <div style={{ position: 'fixed', left: 16, bottom: 16, zIndex: 80 }}>
      <button
        onClick={() => go('sitemap')}
        className="card"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 14px',
          borderRadius: 999,
          background: 'var(--ink)',
          color: 'var(--bg)',
          border: 'none',
          cursor: 'pointer',
          fontSize: 12,
          fontWeight: 540,
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <Icon name="grid" size={14} /> Overview
      </button>
    </div>
  );
}
