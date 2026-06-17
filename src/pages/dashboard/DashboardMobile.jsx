import { Sparkline, StatusBadge } from '../../components/dashboard/widgets';
import { FloatingShapes } from '../../components/dashboard/FloatingShapes';
import { DASH_EVENTS } from '../../components/dashboard/demoData';
import { Icon } from '../../components/ui/Icon';
import { useGo } from '../../hooks/useGo';

export default function DashboardMobile() {
  const go = useGo();
  return (
    <div
      style={{
        minHeight: '100vh', background: 'var(--bg-2)',
        padding: '40px 0', display: 'grid', placeItems: 'center',
      }}
    >
      {/* Mobile frame */}
      <div
        style={{
          width: 390, height: 800, background: 'var(--bg)',
          borderRadius: 44, overflow: 'hidden',
          boxShadow: '0 30px 80px -20px rgba(0,0,0,0.4)',
          border: '10px solid #1a1a1a', position: 'relative',
        }}
      >
        {/* Status bar */}
        <div
          style={{
            height: 44, padding: '12px 28px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontSize: 13, fontWeight: 600, position: 'relative',
          }}
        >
          <span>9:41</span>
          <div
            style={{
              position: 'absolute', left: '50%', top: 8, transform: 'translateX(-50%)',
              width: 96, height: 28, background: '#000', borderRadius: 999,
            }}
          />
          <span style={{ display: 'flex', gap: 5 }}>
            <Icon name="bolt" size={13} /> <Icon name="phone" size={13} />
          </span>
        </div>

        {/* Top header */}
        <div
          style={{
            padding: '8px 20px 14px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>Good evening</div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Anjali Sharma</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              style={{
                width: 38, height: 38, borderRadius: 999,
                background: 'var(--bg-2)', border: 'none',
                display: 'grid', placeItems: 'center',
                color: 'var(--ink-soft)', position: 'relative',
              }}
            >
              <Icon name="info" size={16} />
              <span
                style={{
                  position: 'absolute', top: 9, right: 11,
                  width: 7, height: 7, background: 'var(--accent)', borderRadius: 999,
                }}
              />
            </button>
            <div
              style={{
                width: 38, height: 38, borderRadius: 999,
                background: 'linear-gradient(135deg, var(--accent), var(--accent-3))',
                display: 'grid', placeItems: 'center',
                color: 'white', fontWeight: 600, fontSize: 13,
              }}
            >
              AS
            </div>
          </div>
        </div>

        <div
          style={{
            overflow: 'auto', height: 'calc(100% - 44px - 60px - 70px)',
            padding: '0 20px 20px',
            display: 'flex', flexDirection: 'column', gap: 16,
          }}
        >
          {/* Hero stat */}
          <div
            className="card"
            style={{
              padding: 18, background: 'var(--grad-hero)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <FloatingShapes tone="blue" />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 11, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                This week
              </div>
              <div style={{ fontSize: 28, fontWeight: 600, marginTop: 6, letterSpacing: '-0.02em' }}>
                ₹2.4L{' '}
                <span className="serif" style={{ color: 'var(--accent-3)', fontStyle: 'italic', fontWeight: 400, fontSize: 24 }}>
                  earned
                </span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 4 }}>+32% vs last week · 148 tickets sold</div>
              <div style={{ marginTop: 12 }}>
                <Sparkline data={[3, 5, 4, 7, 6, 9, 8, 11, 10, 13, 12, 15]} w={310} h={50} color="var(--primary)" />
              </div>
            </div>
          </div>

          {/* Mini KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div className="card" style={{ padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--ink-soft)', marginBottom: 6 }}>
                <Icon name="ticket" size={12} /> Sold
              </div>
              <div style={{ fontSize: 20, fontWeight: 600 }}>1,247</div>
              <div style={{ fontSize: 11, color: 'var(--accent-3)', fontWeight: 540 }}>↑ 32%</div>
            </div>
            <div className="card" style={{ padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--ink-soft)', marginBottom: 6 }}>
                <Icon name="eye" size={12} /> Views
              </div>
              <div style={{ fontSize: 20, fontWeight: 600 }}>38.4k</div>
              <div style={{ fontSize: 11, color: 'var(--accent-3)', fontWeight: 540 }}>↑ 9%</div>
            </div>
          </div>

          {/* Section: Upcoming swipe */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Your events</div>
              <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: 12.5, fontWeight: 540, cursor: 'pointer' }}>
                See all
              </button>
            </div>
            <div
              style={{
                display: 'flex', gap: 10, overflow: 'auto',
                margin: '0 -20px', padding: '2px 20px',
                scrollSnapType: 'x mandatory',
              }}
            >
              {DASH_EVENTS.slice(0, 3).map((e) => (
                <button
                  key={e.id}
                  className="card"
                  style={{
                    minWidth: 220, padding: 0, scrollSnapAlign: 'start',
                    overflow: 'hidden', textAlign: 'left',
                    background: 'var(--surface)', border: '1px solid var(--hairline)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ position: 'relative', height: 100 }}>
                    <img src={e.banner} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: 8, left: 8 }}>
                      <StatusBadge status={e.status} />
                    </div>
                  </div>
                  <div style={{ padding: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{e.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 4 }}>{e.date}</div>
                    <div style={{ marginTop: 8 }}>
                      <div style={{ height: 4, background: 'var(--bg-2)', borderRadius: 999, overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${(e.sold / e.capacity) * 100}%`,
                            height: '100%',
                            background: e.sold === e.capacity ? '#EF4444' : 'var(--accent-3)',
                          }}
                        />
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--ink-soft)', marginTop: 4 }}>
                        {e.sold}/{e.capacity} sold
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Activity</div>
            <div className="card" style={{ padding: 0 }}>
              {[
                { c: 'var(--accent-3)', i: 'ticket', t: '12 tickets sold', s: 'Neo Rave', time: '2m' },
                { c: 'var(--primary)', i: 'users', t: 'New attendee', s: 'Rahul B.', time: '18m' },
                { c: 'var(--accent-2)', i: 'info', t: 'Refund issued', s: '₹2,400', time: '1h' },
              ].map((a, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex', gap: 10, padding: '12px 14px',
                    borderTop: i > 0 ? '1px solid var(--hairline)' : 'none',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      width: 32, height: 32, flexShrink: 0, borderRadius: 999,
                      background: `color-mix(in oklab, ${a.c} 12%, transparent)`,
                      color: a.c, display: 'grid', placeItems: 'center',
                    }}
                  >
                    <Icon name={a.i} size={13} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 540 }}>{a.t}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>{a.s}</div>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'Geist Mono' }}>{a.time}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: 12 }} />
        </div>

        {/* Floating Action Button */}
        <button
          onClick={() => go('event-create-start')}
          style={{
            position: 'absolute', right: 20, bottom: 88,
            width: 58, height: 58, borderRadius: 999,
            background: 'var(--accent)', color: 'white',
            border: 'none', cursor: 'pointer',
            boxShadow: '0 12px 28px -6px var(--accent)',
            display: 'grid', placeItems: 'center', zIndex: 10,
          }}
        >
          <Icon name="plus" size={22} />
        </button>

        {/* Bottom nav */}
        <div
          style={{
            position: 'absolute', left: 0, right: 0, bottom: 0,
            background: 'var(--surface)', borderTop: '1px solid var(--hairline)',
            padding: '10px 12px 22px',
            display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4,
          }}
        >
          {[
            { i: 'home', l: 'Home', active: true },
            { i: 'calendar', l: 'Events' },
            { i: 'qr', l: 'Scan' },
            { i: 'bar', l: 'Insights' },
            { i: 'user', l: 'Profile' },
          ].map((b) => (
            <button
              key={b.l}
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                padding: '6px 0',
                color: b.active ? 'var(--primary)' : 'var(--ink-soft)',
              }}
            >
              <Icon name={b.i} size={18} />
              <span style={{ fontSize: 10, fontWeight: b.active ? 600 : 500 }}>{b.l}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
