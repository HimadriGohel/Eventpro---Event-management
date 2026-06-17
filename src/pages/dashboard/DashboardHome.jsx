import { DashboardShell } from '../../components/dashboard/DashboardShell';
import { KPI, Donut, StatusBadge, fmtINR } from '../../components/dashboard/widgets';
import { BigChart } from '../../components/dashboard/BigChart';
import { FloatingShapes } from '../../components/dashboard/FloatingShapes';
import { DASH_EVENTS } from '../../components/dashboard/demoData';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { useGo } from '../../hooks/useGo';

export default function DashboardHome() {
  const go = useGo();
  const upcoming = DASH_EVENTS.filter((e) => e.status === 'Published' || e.status === 'Scheduled').slice(0, 2);

  return (
    <DashboardShell
      active="dashboard-home"
      crumb={['Workspace', 'Dashboard']}
      title="Good evening, Anjali"
      actions={
        <Button variant="primary" size="sm" icon="plus" onClick={() => go('event-create-start')}>
          Create event
        </Button>
      }
    >   
      {/* Welcome banner */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, marginBottom: 28 }}>
        <div className="card" style={{ padding: 28, position: 'relative', overflow: 'hidden', background: 'var(--grad-hero)', border: '1px solid var(--hairline)' }}>
          <FloatingShapes tone="blue" />
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 460 }}>
            <span className="eyebrow">May · Week 19</span>
            <h2 className="h2" style={{ fontSize: 28 }}>
              You sold <span className="serif" style={{ color: 'var(--accent-3)' }}>148 tickets</span> this week.
            </h2>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 4 }}>
              That's +32% from last week. Three of your events are trending — see what's working.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
              <Button variant="primary" size="sm" iconRight="arrow" onClick={() => go('dashboard-event')}>
                See report
              </Button>
              <Button variant="ghost" size="sm" onClick={() => go('dashboard-events')}>
                Manage events
              </Button>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 12, color: 'var(--ink-soft)', fontWeight: 540, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Quick start
          </div>
          {[
            { icon: 'sparkle', title: 'Create event', sub: '5-step guided flow', go: 'event-create-start', c: 'var(--primary)' },
            { icon: 'ticket', title: 'Manage tickets', sub: 'Edit price & inventory', go: 'dashboard-tickets', c: 'var(--accent)' },
            { icon: 'bar', title: 'View analytics', sub: 'Revenue & attendance', go: 'dashboard-event', c: 'var(--accent-3)' },
          ].map((q) => (
            <button
              key={q.title}
              onClick={() => go(q.go)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '10px 12px',
                background: 'transparent', border: '1px solid var(--hairline)', borderRadius: 12,
                cursor: 'pointer', textAlign: 'left',
              }}
            >
              <span style={{
                width: 36, height: 36, borderRadius: 10,
                background: `color-mix(in oklab, ${q.c} 12%, transparent)`,
                color: q.c, display: 'grid', placeItems: 'center', flexShrink: 0,
              }}>
                <Icon name={q.icon} size={16} />
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 540 }}>{q.title}</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>{q.sub}</div>
              </div>
              <Icon name="chevRight" size={14} style={{ color: 'var(--ink-soft)' }} />
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }}>
        <KPI label="Revenue (30d)" value="₹14.2L" delta="+18%" spark={[4, 6, 5, 8, 7, 9, 11, 10, 13, 12, 15, 14, 17, 16, 19]} color="var(--primary)" icon="bar" />
        <KPI label="Tickets sold" value="1,247" delta="+32%" spark={[2, 3, 5, 4, 7, 6, 9, 8, 10, 11, 9, 12, 13, 15, 14]} color="var(--accent-3)" icon="ticket" />
        <KPI label="Page views" value="38.4k" delta="+9%" spark={[10, 12, 9, 15, 11, 17, 14, 18, 15, 19, 17, 20, 18, 22, 21]} color="var(--accent-2)" icon="eye" />
        <KPI label="Conversion" value="3.24%" delta="-0.4%" deltaPositive={false} spark={[5, 4, 6, 5, 7, 5, 6, 4, 5, 4, 5, 4, 3, 4, 3]} color="var(--accent)" icon="bolt" />
      </div>

      {/* Mid grid: chart + activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 24, marginBottom: 28 }}>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 4 }}>Event performance</div>
              <div style={{ fontSize: 22, fontWeight: 600 }}>Sales over time</div>
            </div>
            <div style={{ display: 'flex', gap: 4, padding: 3, background: 'var(--bg-2)', borderRadius: 10 }}>
              {['7D', '30D', '90D', '1Y'].map((t, i) => (
                <button
                  key={t}
                  style={{
                    padding: '6px 12px', fontSize: 12, fontWeight: 540,
                    background: i === 1 ? 'var(--surface)' : 'transparent',
                    color: i === 1 ? 'var(--ink)' : 'var(--ink-soft)',
                    border: 'none', borderRadius: 7, cursor: 'pointer',
                    boxShadow: i === 1 ? 'var(--shadow-sm)' : 'none',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <BigChart />

          <div style={{ display: 'flex', gap: 24, fontSize: 12, marginTop: 14, color: 'var(--ink-soft)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--primary)' }} /> Revenue
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--accent-3)' }} /> Tickets
            </span>
          </div>
        </div>

        {/* Activity feed */}
        <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Recent activity</div>
            <button style={{ background: 'none', border: 'none', color: 'var(--ink-soft)', fontSize: 12, fontWeight: 540, cursor: 'pointer' }}>
              View all
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { c: 'var(--accent-3)', icon: 'ticket', t: '12 tickets sold', sub: 'Neo Rave · 4 VIP + 8 General', time: '2m' },
              { c: 'var(--primary)', icon: 'users', t: 'New attendee', sub: 'Rahul B. registered for Founder Hours', time: '18m' },
              { c: 'var(--accent-2)', icon: 'info', t: 'Refund issued', sub: '₹2,400 to Priya M.', time: '1h' },
              { c: 'var(--accent-3)', icon: 'check', t: 'Event approved', sub: 'Tropical Brunch is live', time: '3h' },
              { c: 'var(--primary)', icon: 'share', t: 'Shared', sub: 'Founder Hours shared 24x on socials', time: '5h' },
            ].map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderTop: i > 0 ? '1px solid var(--hairline)' : 'none' }}>
                <span
                  style={{
                    width: 30, height: 30, flexShrink: 0, borderRadius: 999,
                    background: `color-mix(in oklab, ${a.c} 12%, transparent)`,
                    color: a.c, display: 'grid', placeItems: 'center',
                  }}
                >
                  <Icon name={a.icon} size={13} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 540 }}>{a.t}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>{a.sub}</div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'Geist Mono' }}>{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming + drafts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Upcoming events</div>
            <button
              onClick={() => go('dashboard-events')}
              style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: 13, fontWeight: 540, cursor: 'pointer' }}
            >
              See all →
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {upcoming.map((e) => (
              <button
                key={e.id}
                onClick={() => go('dashboard-event')}
                className="card"
                style={{
                  padding: 14, display: 'flex', gap: 14, textAlign: 'left', cursor: 'pointer',
                  background: 'var(--surface)', border: '1px solid var(--hairline)',
                }}
              >
                <img src={e.banner} alt="" style={{ width: 88, height: 88, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 4 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 600 }}>{e.name}</div>
                    <StatusBadge status={e.status} />
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginBottom: 10 }}>
                    <Icon name="calendar" size={11} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                    {e.date}
                    <span style={{ margin: '0 8px', opacity: 0.4 }}>·</span>
                    <Icon name="pin" size={11} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                    {e.venue}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12 }}>
                    <div style={{ flex: 1, maxWidth: 200 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 11, color: 'var(--ink-soft)' }}>
                        <span>
                          {e.sold} / {e.capacity}
                        </span>
                        <span>{Math.round((e.sold / e.capacity) * 100)}%</span>
                      </div>
                      <div style={{ height: 5, borderRadius: 999, background: 'var(--bg-2)', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${(e.sold / e.capacity) * 100}%`,
                            height: '100%',
                            background: e.sold === e.capacity ? '#EF4444' : 'var(--accent-3)',
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>Revenue</div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{fmtINR(e.revenue)}</div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Ticket breakdown donut */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 18 }}>Ticket mix · 30d</div>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Donut
              size={130}
              segments={[
                { v: 612, c: 'var(--primary)' },
                { v: 384, c: 'var(--accent-2)' },
                { v: 145, c: 'var(--accent-3)' },
                { v: 106, c: 'var(--accent)' },
              ]}
            />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { c: 'var(--primary)', l: 'General', v: 612, pc: '49%' },
                { c: 'var(--accent-2)', l: 'Early bird', v: 384, pc: '31%' },
                { c: 'var(--accent-3)', l: 'VIP', v: 145, pc: '12%' },
                { c: 'var(--accent)', l: 'Couple', v: 106, pc: '8%' },
              ].map((s) => (
                <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: s.c }} />
                  <span style={{ flex: 1, color: 'var(--ink-soft)' }}>{s.l}</span>
                  <span style={{ fontWeight: 540 }}>{s.v}</span>
                  <span style={{ color: 'var(--muted)', fontFamily: 'Geist Mono', fontSize: 11 }}>{s.pc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Drafts section */}
      <div style={{ marginTop: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Drafts</div>
            <span
              style={{
                fontSize: 11, padding: '2px 8px',
                background: 'var(--warning-soft)', color: '#B45309',
                borderRadius: 999, fontWeight: 600,
              }}
            >
              1 needs finishing
            </span>
          </div>
          <button
            onClick={() => go('event-create-start')}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: 13, fontWeight: 540, cursor: 'pointer' }}
          >
            + New draft
          </button>
        </div>
        <div className="card" style={{ padding: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
          <div
            style={{
              width: 56, height: 56, borderRadius: 10,
              background: 'var(--warning-soft)', color: '#B45309',
              display: 'grid', placeItems: 'center', flexShrink: 0,
            }}
          >
            <Icon name="brief" size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <div style={{ fontSize: 14.5, fontWeight: 600 }}>Code & Coffee Meetup</div>
              <span style={{ fontSize: 11, color: 'var(--ink-soft)', fontFamily: 'Geist Mono' }}>· last edited 2h ago</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>Step 4 of 6 · Tickets not set up</div>
            <div
              style={{
                height: 4, borderRadius: 999,
                background: 'var(--bg-2)', overflow: 'hidden',
                marginTop: 8, maxWidth: 280,
              }}
            >
              <div style={{ width: '60%', height: '100%', background: 'var(--accent-2)' }} />
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => go('event-draft')}>
            Continue draft
          </Button>
        </div>
      </div>
    </DashboardShell>
  );
}
