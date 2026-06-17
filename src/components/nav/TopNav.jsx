import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { useGo } from '../../hooks/useGo';
import { PATHS } from '../../routes/paths';
import { useAuthStore } from '../../stores/authStore';

const ITEMS = [
  { id: 'explore', label: 'Explore' },
  { id: 'create', label: 'Create event' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'about', label: 'About' },
];

export function TopNav() {
  const go = useGo();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  
  const userName = user?.fullName || user?.name || user?.email?.split('@')[0] || 'Dashboard';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const goto = (id) => { setMenuOpen(false); go(id); };
  const isActive = (id) => pathname === PATHS[id];

  return (
    <header
      className="topnav"
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: scrolled || menuOpen ? 'color-mix(in oklab, var(--bg) 80%, transparent)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(16px) saturate(140%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--hairline)' : '1px solid transparent',
        transition: 'all 200ms',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <button onClick={() => goto('home')} style={{ background: 'none', border: 'none', padding: 0 }}>
          <Logo />
        </button>
        <nav className="topnav-links" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {ITEMS.map((it) => {
            const active = isActive(it.id);
            return (
              <button
                key={it.id}
                onClick={() => go(it.id)}
                style={{
                  padding: '8px 14px', borderRadius: 999, border: 'none',
                  background: active ? 'var(--bg-2)' : 'transparent',
                  color: active ? 'var(--ink)' : 'var(--ink-soft)',
                  fontWeight: 500, fontSize: 14, cursor: 'pointer', letterSpacing: '-0.005em',
                  transition: 'all 160ms',
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = 'var(--ink)'; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = 'var(--ink-soft)'; }}
              >
                {it.label}
              </button>
            );
          })}
        </nav>
        <div className="topnav-cta" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {user ? (
            <Button variant="ghost" size="sm" onClick={() => go('dashboard')}>
              {userName}
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => go('login')}>Log in</Button>
              <Button variant="primary" size="sm" onClick={() => go('signup')} iconRight="arrow">Get started</Button>
            </>
          )}
        </div>
        <button
          className="topnav-burger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{
            display: 'none',
            width: 42, height: 42, border: '1px solid var(--hairline-2)', borderRadius: 12,
            background: 'var(--surface)', cursor: 'pointer', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
        </button>
      </div>
      {menuOpen && (
        <div
          className="topnav-drawer"
          style={{
            borderTop: '1px solid var(--hairline)',
            background: 'color-mix(in oklab, var(--bg) 92%, transparent)',
            backdropFilter: 'blur(20px) saturate(140%)',
          }}
        >
          <div className="container" style={{ padding: '16px 0 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {ITEMS.map((it) => (
              <button
                key={it.id}
                onClick={() => goto(it.id)}
                style={{
                  padding: '14px 16px', borderRadius: 12, border: 'none',
                  background: isActive(it.id) ? 'var(--bg-2)' : 'transparent',
                  color: 'var(--ink)', textAlign: 'left',
                  fontWeight: 540, fontSize: 17, cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}
              >
                {it.label}
                <Icon name="arrow" size={16} />
              </button>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--hairline)' }}>
              {user ? (
                <Button variant="ghost" onClick={() => goto('dashboard')}>
                  {userName}
                </Button>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => goto('login')}>Log in</Button>
                  <Button variant="primary" onClick={() => goto('signup')} iconRight="arrow">Get started</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
