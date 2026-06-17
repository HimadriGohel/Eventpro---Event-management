import { Fragment } from 'react';
import { Icon } from '../ui/Icon';

export function Topbar({ title, crumb, actions }) {
  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 30,
        background: 'color-mix(in oklab, var(--bg) 88%, transparent)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--hairline)',
        padding: '18px 36px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
      }}
    >
      <div style={{ minWidth: 0 }}>
        {crumb && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--ink-soft)', marginBottom: 4 }}>
            {crumb.map((c, i) => (
              <Fragment key={i}>
                <span>{c}</span>
                {i < crumb.length - 1 && <Icon name="chevRight" size={11} style={{ opacity: 0.5 }} />}
              </Fragment>
            ))}
          </div>
        )}
        <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>{title}</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px',
            background: 'var(--surface)', border: '1px solid var(--hairline)',
            borderRadius: 10, cursor: 'pointer', color: 'var(--ink-soft)',
            fontSize: 13, minWidth: 240, textAlign: 'left',
          }}
        >
          <Icon name="search" size={14} />
          <span style={{ flex: 1 }}>Search events, tickets…</span>
          <span style={{ fontSize: 10, fontFamily: 'Geist Mono', padding: '2px 5px', border: '1px solid var(--hairline)', borderRadius: 4 }}>⌘K</span>
        </button>
        <button
          style={{
            width: 38, height: 38, display: 'grid', placeItems: 'center',
            background: 'var(--surface)', border: '1px solid var(--hairline)',
            borderRadius: 10, cursor: 'pointer', color: 'var(--ink-soft)', position: 'relative',
          }}
        >
          <Icon name="info" size={15} />
          <span style={{ position: 'absolute', top: 8, right: 8, width: 7, height: 7, background: 'var(--accent)', borderRadius: 999 }} />
        </button>
        {actions}
      </div>
    </header>
  );
}
