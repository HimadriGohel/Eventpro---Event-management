import { useState } from 'react';
import { fmtINR } from '../../components/dashboard/widgets';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { useGo } from '../../hooks/useGo';

function PreviewDesktop() {
  return (
    <div
      style={{
        background: 'var(--bg)', borderRadius: 16, overflow: 'hidden',
        maxWidth: 1240, margin: '0 auto', width: '100%',
        boxShadow: '0 30px 80px -20px rgba(0,0,0,0.5)',
      }}
    >
      {/* Faux browser chrome */}
      <div
        style={{
          background: 'var(--bg-2)', padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
          borderBottom: '1px solid var(--hairline)',
        }}
      >
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 12, height: 12, borderRadius: 999, background: '#EF4444' }} />
          <span style={{ width: 12, height: 12, borderRadius: 999, background: '#F59E0B' }} />
          <span style={{ width: 12, height: 12, borderRadius: 999, background: '#10B981' }} />
        </div>
        <div
          style={{
            flex: 1, padding: '5px 12px',
            background: 'var(--surface)', border: '1px solid var(--hairline)',
            borderRadius: 8, fontSize: 11.5, fontFamily: 'Geist Mono',
            color: 'var(--ink-soft)', textAlign: 'center',
          }}
        >
          🔒 eventpro.io/neo-rave
        </div>
        <span style={{ fontSize: 11, color: 'var(--ink-soft)', fontFamily: 'Geist Mono' }}>1440 × 900</span>
      </div>

      {/* Hero */}
      <div style={{ position: 'relative', height: 360, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=70"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,11,46,0.1), rgba(14,11,46,0.8))' }} />
        <div
          style={{
            position: 'absolute', left: 40, bottom: 32, right: 40,
            color: 'white', display: 'flex',
            justifyContent: 'space-between', alignItems: 'flex-end',
          }}
        >
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              <span
                style={{
                  padding: '3px 10px',
                  background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)',
                  borderRadius: 999, fontSize: 11, fontWeight: 540,
                }}
              >
                ● Live
              </span>
              <span
                style={{
                  padding: '3px 10px',
                  background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)',
                  borderRadius: 999, fontSize: 11,
                }}
              >
                Music & nightlife
              </span>
            </div>
            <h1 style={{ fontSize: 48, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 8, textWrap: 'balance' }}>
              Neo Rave:{' '}
              <span className="serif" style={{ color: 'var(--accent-2)', fontStyle: 'italic', fontWeight: 400 }}>
                Midnight Bloom
              </span>
            </h1>
            <div style={{ display: 'flex', gap: 22, fontSize: 14, opacity: 0.9 }}>
              <span>
                <Icon name="calendar" size={13} style={{ verticalAlign: 'middle', marginRight: 5 }} />
                Sat 14 Jun · 9:00 pm
              </span>
              <span>
                <Icon name="pin" size={13} style={{ verticalAlign: 'middle', marginRight: 5 }} />
                Famous Studios, Mumbai
              </span>
              <span>
                <Icon name="users" size={13} style={{ verticalAlign: 'middle', marginRight: 5 }} />
                412 going
              </span>
            </div>
          </div>
          <button
            style={{
              background: 'var(--accent-3)', color: 'white',
              padding: '14px 22px', border: 'none', borderRadius: 12,
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            Get tickets — from ₹1,800 <Icon name="arrow" size={14} />
          </button>
        </div>
      </div>
      {/* Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 32, padding: 40 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>About this event</h2>
          <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: 24 }}>
            A late-night techno experience in Mumbai's largest sound dome. Three rooms, six headliners, and a midnight bloom installation by visual artist Lila Verma. Doors at 9pm sharp — last entry 1:30am.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
            {['18+ only', 'Standing', 'Bar on site', 'Coat check', 'Re-entry allowed'].map((t) => (
              <span
                key={t}
                style={{
                  padding: '5px 12px', background: 'var(--bg-2)',
                  borderRadius: 999, fontSize: 12, color: 'var(--ink-soft)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              { t: 'Doors', v: '9:00 pm' },
              { t: 'Headliner', v: '11:30 pm' },
              { t: 'Sets close', v: '3:00 am' },
              { t: 'Last entry', v: '1:30 am' },
            ].map((s) => (
              <div key={s.t} className="card" style={{ padding: 14 }}>
                <div style={{ fontSize: 11, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {s.t}
                </div>
                <div style={{ fontSize: 17, fontWeight: 600, marginTop: 4 }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Booking */}
        <div className="card" style={{ padding: 24, alignSelf: 'flex-start', position: 'sticky', top: 0 }}>
          <div style={{ fontSize: 14, color: 'var(--ink-soft)' }}>From</div>
          <div style={{ fontSize: 32, fontWeight: 600, marginBottom: 18, letterSpacing: '-0.02em' }}>₹1,800</div>
          {[
            { l: 'General', p: 1800, s: '188 left' },
            { l: 'VIP Lounge', p: 5500, s: '48 left', hot: true },
            { l: 'Couple Pass', p: 4200, s: '60 left' },
          ].map((t) => (
            <div
              key={t.l}
              style={{
                padding: 14, borderRadius: 10,
                border: '1px solid var(--hairline)',
                marginBottom: 8,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 540, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {t.l}{' '}
                  {t.hot && (
                    <span
                      style={{
                        fontSize: 10, padding: '2px 6px',
                        background: 'var(--accent)', color: 'white', borderRadius: 4,
                      }}
                    >
                      HOT
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{t.s}</div>
              </div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>{fmtINR(t.p)}</div>
            </div>
          ))}
          <Button variant="primary" style={{ width: '100%', marginTop: 8 }} iconRight="arrow">
            Continue to booking
          </Button>
        </div>
      </div>
    </div>
  );
}

function PreviewMobile() {
  return (
    <div
      style={{
        width: 380, height: 760, background: 'var(--bg)',
        borderRadius: 36, overflow: 'hidden',
        boxShadow: '0 30px 80px -20px rgba(0,0,0,0.5)',
        border: '10px solid #1a1a1a', position: 'relative',
      }}
    >
      {/* Status bar */}
      <div
        style={{
          height: 38, padding: '10px 22px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 12, fontWeight: 600,
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 5,
        }}
      >
        <span style={{ color: 'white' }}>9:41</span>
        <div
          style={{
            position: 'absolute', left: '50%', top: 6, transform: 'translateX(-50%)',
            width: 92, height: 26, background: '#000', borderRadius: 999,
          }}
        />
        <span style={{ color: 'white', display: 'flex', gap: 5 }}>
          <Icon name="bolt" size={12} /> <Icon name="phone" size={12} />
        </span>
      </div>

      {/* Hero */}
      <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=70"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,11,46,0.3), rgba(14,11,46,0.85))' }} />
        <div style={{ position: 'absolute', left: 20, bottom: 20, right: 20, color: 'white' }}>
          <span
            style={{
              padding: '3px 10px',
              background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)',
              borderRadius: 999, fontSize: 10, fontWeight: 540,
            }}
          >
            ● Live
          </span>
          <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 8, lineHeight: 1.15 }}>
            Neo Rave:{' '}
            <span className="serif" style={{ color: 'var(--accent-2)', fontStyle: 'italic', fontWeight: 400 }}>
              Midnight Bloom
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: '20px 20px 100px',
          display: 'flex', flexDirection: 'column', gap: 14,
          overflow: 'auto', height: 'calc(100% - 320px)',
        }}
      >
        <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>
          <Icon name="calendar" size={11} style={{ verticalAlign: 'middle', marginRight: 4 }} />
          Sat 14 Jun · 9:00 pm
        </div>
        <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>
          <Icon name="pin" size={11} style={{ verticalAlign: 'middle', marginRight: 4 }} />
          Famous Studios, Mumbai
        </div>
        <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
          A late-night techno experience in Mumbai's largest sound dome. Three rooms, six headliners.
        </p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['18+', 'Standing', 'Bar'].map((t) => (
            <span key={t} style={{ padding: '4px 10px', background: 'var(--bg-2)', borderRadius: 999, fontSize: 11 }}>
              {t}
            </span>
          ))}
        </div>

        <div style={{ padding: 14, background: 'var(--bg-2)', borderRadius: 12, marginTop: 6 }}>
          <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>From</div>
          <div style={{ fontSize: 24, fontWeight: 600 }}>₹1,800</div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          padding: 16,
          background: 'color-mix(in oklab, var(--bg) 90%, transparent)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid var(--hairline)',
        }}
      >
        <Button variant="primary" style={{ width: '100%' }} iconRight="arrow">
          Get tickets
        </Button>
      </div>
    </div>
  );
}

export default function DashboardPreview() {
  const go = useGo();
  const [device, setDevice] = useState('desktop');
  return (
    <div style={{ minHeight: '100vh', background: 'var(--ink)', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <header
        style={{
          padding: '14px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          color: 'var(--bg)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            onClick={() => go('dashboard-event')}
            style={{
              background: 'rgba(255,255,255,0.08)', border: 'none', color: 'var(--bg)',
              width: 32, height: 32, borderRadius: 8, cursor: 'pointer',
              display: 'grid', placeItems: 'center',
            }}
          >
            <Icon name="chevLeft" size={14} />
          </button>
          <div>
            <div
              style={{
                fontSize: 11, color: 'rgba(255,255,255,0.55)',
                fontFamily: 'Geist Mono', textTransform: 'uppercase', letterSpacing: '0.06em',
              }}
            >
              Creator preview
            </div>
            <div style={{ fontSize: 14, fontWeight: 540 }}>Neo Rave: Midnight Bloom</div>
          </div>
        </div>

        <div style={{ display: 'flex', padding: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 10 }}>
          {[
            { k: 'desktop', l: 'Desktop', i: 'grid' },
            { k: 'mobile', l: 'Mobile', i: 'phone' },
          ].map((d) => (
            <button
              key={d.k}
              onClick={() => setDevice(d.k)}
              style={{
                padding: '7px 14px',
                display: 'flex', alignItems: 'center', gap: 6,
                background: device === d.k ? 'rgba(255,255,255,0.18)' : 'transparent',
                color: device === d.k ? 'white' : 'rgba(255,255,255,0.7)',
                border: 'none', borderRadius: 7, cursor: 'pointer',
                fontSize: 12.5, fontWeight: 540,
              }}
            >
              <Icon name={d.i} size={13} /> {d.l}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            variant="ghost"
            size="sm"
            icon="settings"
            onClick={() => go('event-create-start')}
            style={{
              background: 'rgba(255,255,255,0.06)', color: 'white',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon="share"
            style={{
              background: 'rgba(255,255,255,0.06)', color: 'white',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            Share preview
          </Button>
          <Button variant="primary" size="sm" icon="bolt" onClick={() => go('event-create-success')}>
            Publish
          </Button>
        </div>
      </header>

      <div
        style={{
          flex: 1,
          padding: device === 'desktop' ? '32px 32px 60px' : '20px 20px 60px',
          display: 'grid', placeItems: device === 'mobile' ? 'center' : 'stretch',
          overflow: 'auto',
        }}
      >
        {device === 'desktop' ? <PreviewDesktop /> : <PreviewMobile />}
      </div>
    </div>
  );
}
