import { Logo } from '../ui/Logo';
import { Icon } from '../ui/Icon';
import { useGo } from '../../hooks/useGo';

const COLUMNS = [
  { title: 'Product', links: [['Explore', 'explore'], ['Create event', 'create'], ['Pricing', 'pricing'], ['Components', 'components']] },
  { title: 'Company', links: [['About', 'about'], ['Contact', 'contact'], ['Careers', 'about'], ['Press kit', 'about']] },
  { title: 'Resources', links: [['Help center', 'contact'], ['Scanner app', 'create'], ['Organizer guide', 'create'], ['Status', 'contact']] },
  { title: 'Legal', links: [['Terms', 'about'], ['Privacy', 'about'], ['Refunds', 'contact'], ['Cookies', 'about']] },
];

export function Footer() {
  const go = useGo();
  return (
    <footer style={{ borderTop: '1px solid var(--hairline)', marginTop: 80, background: 'var(--bg)' }}>
      <div className="container" style={{ padding: '64px 32px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr repeat(4, 1fr)', gap: 48, marginBottom: 56 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
            <Logo />
            <p style={{ fontSize: 14, color: 'var(--ink-soft)' }}>
              Modern event creation for everyone. Sell tickets, scan QR, run the whole show.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {['twitter', 'instagram', 'linkedin'].map((n) => (
                <a
                  key={n}
                  href="#"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 999,
                    border: '1px solid var(--hairline-2)',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--ink-soft)',
                  }}
                >
                  <Icon name={n} size={15} />
                </a>
              ))}
            </div>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
                {col.title}
              </h4>
              {col.links.map(([label, target]) => (
                <button
                  key={label}
                  onClick={() => go(target)}
                  style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', color: 'var(--ink)', fontSize: 14, cursor: 'pointer' }}
                >
                  {label}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 24, borderTop: '1px solid var(--hairline)', fontSize: 13, color: 'var(--ink-soft)' }}>
          <span>© 2026 EventPro Technologies. Made for organizers.</span>
          <span style={{ display: 'flex', gap: 16 }}>
            <span><Icon name="bolt" size={12} style={{ verticalAlign: -1 }} /> All systems operational</span>
            <span>v3.2.1</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
