import { Logo } from '../ui/Logo';
import { Icon } from '../ui/Icon';
import { useGo } from '../../hooks/useGo';

const NAV = [
  { id: 'dashboard-home', label: 'Dashboard', icon: 'home' },
  { id: 'dashboard-events', label: 'Events', icon: 'calendar', badge: 4 },
  { id: 'dashboard-tickets', label: 'Tickets', icon: 'ticket' },
  { id: 'dashboard-venues', label: 'Venues', icon: 'pin' },
  { id: 'create', label: 'Analytics', icon: 'bar' },
  { id: 'create', label: 'Attendees', icon: 'users' },
];

const TAIL = [
  { id: 'auth-security', label: 'Settings', icon: 'settings' },
  { id: 'contact', label: 'Support', icon: 'chat' },
];

export function Sidebar({ active }) {
  const go = useGo();

  return (
    <aside
      className="dash-sidebar"
      style={{
        position: 'sticky', top: 0, height: '100vh',
        width: 248, flexShrink: 0,
        background: 'var(--ink)', color: 'var(--bg)',
        padding: '22px 16px',
        display: 'flex', flexDirection: 'column', gap: 6,
      }}
    >
      <button
        onClick={() => go('home')}
        style={{ background: 'none', border: 'none', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}
      >
        <Logo color="var(--bg)" />
      </button>

      <button
        onClick={() => go('event-create-start')}
        className="dash-create-cta"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
          padding: '12px 14px',
          background: 'var(--accent)', color: 'white',
          border: 'none', borderRadius: 12,
          cursor: 'pointer', fontSize: 13, fontWeight: 600,
          marginBottom: 12,
          boxShadow: '0 6px 20px -8px var(--accent)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="plus" size={15} /> Create event
        </span>
        <span style={{ fontSize: 10, opacity: 0.85, fontFamily: 'Geist Mono', padding: '2px 6px', background: 'rgba(0,0,0,0.18)', borderRadius: 4 }}>⌘N</span>
      </button>

      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '10px 12px 6px' }}>
        Manage
      </div>
      {NAV.map((it) => {
        const isActive = active === it.id;
        return (
          <button
            key={it.label}
            onClick={() => go(it.id)}
            className="dash-nav-item"
            data-active={isActive}
            style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
              background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
              color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
              border: 'none', borderRadius: 10,
              fontSize: 13.5, fontWeight: 500,
              cursor: 'pointer', textAlign: 'left',
              position: 'relative',
            }}
          >
            {isActive && (
              <span style={{ position: 'absolute', left: -16, top: 8, bottom: 8, width: 3, background: 'var(--accent)', borderRadius: '0 3px 3px 0' }} />
            )}
            <Icon name={it.icon} size={16} />
            <span style={{ flex: 1 }}>{it.label}</span>
            {it.badge && (
              <span style={{ fontSize: 11, padding: '2px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: 999, color: 'white' }}>{it.badge}</span>
            )}
          </button>
        );
      })}

      <div style={{ flex: 1 }} />

      {TAIL.map((it) => (
        <button
          key={it.label}
          onClick={() => go(it.id)}
          style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '9px 12px',
            background: 'transparent', color: 'rgba(255,255,255,0.55)',
            border: 'none', borderRadius: 10, fontSize: 13, cursor: 'pointer', textAlign: 'left',
          }}
        >
          <Icon name={it.icon} size={15} />
          <span>{it.label}</span>
        </button>
      ))}

      <button
        onClick={() => go('auth-security')}
        style={{
          marginTop: 10,
          display: 'flex', alignItems: 'center', gap: 10, padding: 10,
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12, cursor: 'pointer', textAlign: 'left', color: 'white',
        }}
      >
        <div
          style={{
            width: 32, height: 32, borderRadius: 999,
            background: 'linear-gradient(135deg, var(--accent), var(--accent-3))',
            display: 'grid', placeItems: 'center', color: 'white', fontWeight: 600, fontSize: 13,
          }}
        >
          AS
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 540, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Anjali Sharma</div>
          <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist Mono' }}>Pro · Verified</div>
        </div>
        <Icon name="chevRight" size={14} style={{ color: 'rgba(255,255,255,0.5)' }} />
      </button>
    </aside>
  );
}
