import { Icon } from '../../components/ui/Icon';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import { useGo } from '../../hooks/useGo';
import { useWizardStore } from '../../stores/wizardStore';
import { useToast } from '../../stores/toastStore';
import { ConfettiBG, FloatingShapes } from '../../components/wizard/shared';

export default function EventCreateSuccess() {
  const go = useGo();
  const draft = useWizardStore((s) => s.draft);
  const { push } = useToast();

  const url = `eventpro.in/e/${draft.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)}`;
  const totalCap = draft.tickets.reduce((s, t) => s + Number(t.qty || 0), 0);

  const copy = () => {
    try {
      navigator.clipboard.writeText(`https://${url}`);
      push('Link copied', { icon: 'check' });
    } catch (_) {}
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <ConfettiBG />
      <FloatingShapes tone="emerald" />

      {/* Top bar */}
      <header style={{ padding: '20px 0', borderBottom: '1px solid var(--hairline)', background: 'color-mix(in oklab, var(--surface) 88%, transparent)', backdropFilter: 'blur(8px)', position: 'relative', zIndex: 5 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => go('dashboard-empty')} className="btn btn-ghost btn-sm">Open dashboard</button>
            <Button variant="primary" size="sm" onClick={() => go('event-create-start')}>Create another</Button>
          </div>
        </div>
      </header>

      <main className="container" style={{ position: 'relative', zIndex: 1, padding: '60px 0 100px', display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'center' }}>
        {/* Big check */}
        <div style={{ position: 'relative' }}>
          <div style={{ width: 120, height: 120, borderRadius: 999, background: 'linear-gradient(135deg, #10B981, #059669)', display: 'grid', placeItems: 'center', color: 'white', boxShadow: '0 30px 60px -20px #10B98180' }}>
            <Icon name="check" size={56} stroke={3} />
          </div>
          <span style={{ position: 'absolute', inset: -10, borderRadius: 999, border: '3px solid #10B981', animation: 'pulse-ring 2s infinite', opacity: 0.4 }} />
          <span style={{ position: 'absolute', inset: -22, borderRadius: 999, border: '2px solid #10B981', animation: 'pulse-ring 2s infinite', animationDelay: '0.4s', opacity: 0.25 }} />
        </div>

        <div style={{ textAlign: 'center', maxWidth: 640 }}>
          <span className="badge badge-emerald" style={{ marginBottom: 14 }}>● Live now</span>
          <h1 className="display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1.05 }}>
            Your event is <span className="serif" style={{ color: '#10B981' }}>live.</span>
          </h1>
          <p className="lead" style={{ marginTop: 14 }}>
            <strong style={{ color: 'var(--ink)' }}>{draft.name}</strong> just got published. Share the link, open the scanner, or keep tweaking.
          </p>
        </div>

        {/* Share card */}
        <div className="card" style={{ padding: 24, width: '100%', maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
              <span style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--primary-tint)', color: 'var(--primary)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <Icon name="share" size={16} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, color: 'var(--ink-soft)', fontFamily: 'Geist Mono', textTransform: 'uppercase' }}>Public link</div>
                <div style={{ fontSize: 14, fontWeight: 540, marginTop: 2, fontFamily: 'Geist Mono', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{url}</div>
              </div>
            </div>
            <Button variant="ghost" onClick={copy}>
              <Icon name="copy" size={13} /> Copy
            </Button>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[
              { label: 'WhatsApp', c: '#25D366' }, { label: 'Instagram', c: '#E4405F' },
              { label: 'Twitter / X', c: '#0F1419' }, { label: 'Email', c: '#3B82F6' },
              { label: 'Embed code', c: '#7C3AED' },
            ].map((s) => (
              <button key={s.label} className="btn btn-ghost btn-sm" style={{ borderColor: s.c + '40' }}>
                <span style={{ width: 16, height: 16, borderRadius: 4, background: s.c, display: 'inline-block', marginRight: 4 }} /> {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, width: '100%', maxWidth: 880 }}>
          {[
            { t: 'View live event', b: 'See what attendees see', i: 'share', c: '#1E40AF', to: 'event' },
            { t: 'Open scanner', b: 'Test QR scan flow', i: 'qr', c: '#10B981', to: 'components' },
            { t: 'Add more tickets', b: 'Boost capacity & tiers', i: 'ticket', c: '#F59E0B', to: 'event-create-tickets' },
            { t: 'Open dashboard', b: 'Track sales in real time', i: 'bar', c: '#7C3AED', to: 'dashboard-empty' },
          ].map((a) => (
            <button key={a.t} onClick={() => go(a.to)} className="card" style={{
              padding: 20, textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 10, transition: 'all 200ms',
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: a.c + '1A', color: a.c, display: 'grid', placeItems: 'center' }}>
                <Icon name={a.i} size={16} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{a.t}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{a.b}</div>
            </button>
          ))}
        </div>

        {/* Stats strip */}
        <div className="card" style={{ padding: 18, width: '100%', maxWidth: 880, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, background: 'var(--ink)', color: 'white' }}>
          {[
            ['Capacity', totalCap.toLocaleString()],
            ['Tickets', String(draft.tickets.length)],
            ['Visibility', draft.visibility],
            ['Status', 'Live'],
          ].map(([t, v]) => (
            <div key={t}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Geist Mono' }}>{t}</div>
              <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4, textTransform: 'capitalize' }}>{v}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
