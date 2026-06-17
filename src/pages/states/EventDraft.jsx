import { FloatingShapes } from '../../components/dashboard/FloatingShapes';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { useGo } from '../../hooks/useGo';

function IconBadge({ icon, color = '#1E40AF', soft, size = 88, pulse, glow }) {
  return (
    <div
      style={{
        width: size, height: size, borderRadius: 999,
        background: soft || `${color}1A`,
        color,
        display: 'grid', placeItems: 'center',
        boxShadow: glow
          ? `0 0 0 12px ${color}10, 0 0 0 24px ${color}06`
          : 'inset 0 0 0 1px ' + color + '33',
        animation: pulse ? 'pulse-ring 2s infinite' : 'none',
        position: 'relative',
      }}
    >
      <Icon name={icon} size={size * 0.42} stroke={2} />
    </div>
  );
}

export default function EventDraft() {
  const go = useGo();

  let draft = { name: 'Untitled event', tickets: [], startDate: '', venue: {} };
  try {
    const v = sessionStorage.getItem('ep_event_draft');
    if (v) draft = { ...draft, ...JSON.parse(v) };
  } catch (_) {
    /* ignore */
  }
  
  const completion = (() => {
    let n = 0;
    if (draft.name) n++;
    if (draft.startDate) n++;
    if (draft.venue?.name) n++;
    if (draft.tickets?.length) n++;
    if (draft.description) n++;
    return Math.round((n / 5) * 100);
  })();

  return (
    <div
      style={{
        minHeight: '100vh', background: 'var(--bg)',
        display: 'grid', placeItems: 'center',
        padding: '60px 20px', position: 'relative', overflow: 'hidden',
      }}
    >
      <FloatingShapes tone="blue" />
      <div
        className="card"
        style={{
          position: 'relative', padding: 40,
          maxWidth: 560, width: '100%',
          display: 'flex', flexDirection: 'column', gap: 22,
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <IconBadge icon="check" color="#10B981" soft="var(--success-soft)" size={56} />
          <div>
            <span className="badge badge-emerald">✓ Auto-saved</span>
            <h1 className="h1" style={{ fontSize: 26, marginTop: 10 }}>
              Your draft is <span className="serif" style={{ color: '#10B981' }}>safe.</span>
            </h1>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 6 }}>
              You can pick up where you left off any time — drafts are kept for 30 days.
            </p>
          </div>
        </div>

        {/* Draft preview */}
        <div
          style={{
            padding: 18, background: 'var(--bg-2)',
            borderRadius: 14,
            display: 'flex', flexDirection: 'column', gap: 12,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div
              style={{
                fontSize: 11, color: 'var(--ink-soft)',
                fontFamily: 'Geist Mono', textTransform: 'uppercase', letterSpacing: '0.08em',
              }}
            >
              Draft · saved just now
            </div>
            <span style={{ fontSize: 11, fontWeight: 540, color: 'var(--ink-soft)' }}>{completion}% complete</span>
          </div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{draft.name}</div>
          <div style={{ height: 6, borderRadius: 999, background: 'var(--hairline)', overflow: 'hidden' }}>
            <div
              style={{
                width: `${completion}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--primary), #10B981)',
                transition: 'width 600ms',
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'var(--ink-soft)', marginTop: 4 }}>
            <span>
              <Icon name="calendar" size={11} style={{ verticalAlign: 'middle', marginRight: 4 }} />{' '}
              {draft.startDate || 'No date set'}
            </span>
            <span>
              <Icon name="pin" size={11} style={{ verticalAlign: 'middle', marginRight: 4 }} />{' '}
              {draft.venue?.name || 'No venue'}
            </span>
            <span>
              <Icon name="ticket" size={11} style={{ verticalAlign: 'middle', marginRight: 4 }} />{' '}
              {draft.tickets?.length || 0} ticket types
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <Button
            variant="primary"
            size="lg"
            iconRight="arrow"
            onClick={() => go('event-create-start')}
            style={{ flex: 1 }}
          >
            Resume editing
          </Button>
          <Button variant="ghost" size="lg" onClick={() => go('home')}>
            Go home
          </Button>
        </div>

        <div style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center', paddingTop: 4 }}>
          <Icon name="info" size={11} style={{ verticalAlign: 'middle', marginRight: 4 }} />
          Drafts are stored privately to your account. They never appear publicly.
        </div>
      </div>
    </div>
  );
}
