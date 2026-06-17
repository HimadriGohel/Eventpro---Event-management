import { useState } from 'react';
import { DashboardShell } from '../../components/dashboard/DashboardShell';
import { KPI, Donut, StatusBadge, fmtINR } from '../../components/dashboard/widgets';
import { BigChart } from '../../components/dashboard/BigChart';
import { DASH_EVENTS } from '../../components/dashboard/demoData';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { Field } from '../../components/ui/Field';
import { useGo } from '../../hooks/useGo';

function EventOverview({ ev }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {/* KPI row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <KPI label="Revenue" value={fmtINR(ev.revenue)} delta="+18%" spark={[3, 5, 4, 7, 6, 9, 8, 11, 10, 13, 12, 15]} color="var(--primary)" icon="bar" />
          <KPI label="Tickets sold" value={`${ev.sold}/${ev.capacity}`} delta="+24" spark={[1, 2, 4, 3, 6, 5, 8, 7, 10, 9, 12, 11]} color="var(--accent-3)" icon="ticket" />
          <KPI label="Conversion" value="4.6%" delta="+0.8%" spark={[3, 4, 5, 4, 5, 6, 5, 6, 7, 6, 7, 8]} color="var(--accent-2)" icon="bolt" />
        </div>

        {/* Revenue chart */}
        <div className="card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>Revenue trend</div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>Last 14 days</div>
            </div>
            <span className="badge badge-emerald">+18% vs. last period</span>
          </div>
          <BigChart />
        </div>

        {/* Attendance + ticket breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="card" style={{ padding: 22 }}>
            <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 14 }}>Attendance progress</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 14 }}>
              <div style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em' }}>{ev.sold}</div>
              <div style={{ fontSize: 14, color: 'var(--ink-soft)' }}>/ {ev.capacity}</div>
              <div style={{ marginLeft: 'auto', fontSize: 14, fontWeight: 600, color: 'var(--accent-3)' }}>
                {Math.round((ev.sold / ev.capacity) * 100)}%
              </div>
            </div>
            <div style={{ height: 12, borderRadius: 999, background: 'var(--bg-2)', overflow: 'hidden', marginBottom: 16 }}>
              <div
                style={{
                  width: `${(ev.sold / ev.capacity) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--primary), var(--accent-3))',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-soft)' }}>
              <span>{ev.capacity - ev.sold} seats remaining</span>
              <span>Avg pace · 14/day</span>
            </div>
          </div>
          <div className="card" style={{ padding: 22 }}>
            <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 14 }}>Ticket breakdown</div>
            {[
              { l: 'General', s: 220, t: 300, c: 'var(--primary)' },
              { l: 'Early bird', s: 150, t: 150, c: 'var(--accent-2)' },
              { l: 'VIP', s: 32, t: 80, c: 'var(--accent-3)' },
              { l: 'Couple', s: 10, t: 70, c: 'var(--accent)' },
            ].map((t) => (
              <div key={t.l} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                  <span style={{ fontWeight: 540 }}>{t.l}</span>
                  <span style={{ color: 'var(--ink-soft)' }}>
                    {t.s}/{t.t}
                  </span>
                </div>
                <div style={{ height: 5, borderRadius: 999, background: 'var(--bg-2)', overflow: 'hidden' }}>
                  <div style={{ width: `${(t.s / t.t) * 100}%`, height: '100%', background: t.c }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent attendees */}
        <div className="card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Recent bookings</div>
            <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: 12.5, cursor: 'pointer', fontWeight: 540 }}>
              View all →
            </button>
          </div>
          {[
            { n: 'Priya Mehta', t: '2× General', p: '₹3,600', time: '12m' },
            { n: 'Raghav Bose', t: '1× VIP', p: '₹5,500', time: '44m' },
            { n: 'Aisha Khan', t: '1× Couple pass', p: '₹4,200', time: '1h' },
            { n: 'Vikram S.', t: '4× General', p: '₹7,200', time: '3h' },
          ].map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: i > 0 ? '1px solid var(--hairline)' : 'none' }}>
              <div
                style={{
                  width: 32, height: 32, borderRadius: 999,
                  background: `hsl(${i * 80} 60% 80%)`,
                  color: 'var(--ink)', display: 'grid', placeItems: 'center',
                  fontSize: 12, fontWeight: 600,
                }}
              >
                {a.n.split(' ').map((x) => x[0]).join('').slice(0, 2)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 540 }}>{a.n}</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>{a.t}</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 540 }}>{a.p}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'Geist Mono', width: 28, textAlign: 'right' }}>
                {a.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky action sidebar */}
      <EventSidebar />
    </div>
  );
}

function EventSidebar() {
  const go = useGo();
  return (
    <div style={{ position: 'sticky', top: 90, alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="card" style={{ padding: 20 }}>
        <div style={{ fontSize: 12, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
          Share & promote
        </div>
        <div
          style={{
            width: '100%', height: 100, background: 'white',
            borderRadius: 10, border: '1px solid var(--hairline)',
            display: 'grid', placeItems: 'center', marginBottom: 12,
          }}
        >
          <Icon name="qr" size={56} style={{ color: 'var(--ink)' }} />
        </div>
        <div style={{ fontSize: 11, color: 'var(--ink-soft)', textAlign: 'center', marginBottom: 12, fontFamily: 'Geist Mono' }}>
          eventpro.io/neo-rave
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <Button variant="ghost" size="sm" icon="share" style={{ flex: 1 }}>
            Copy link
          </Button>
          <Button variant="primary" size="sm" icon="download">
            QR
          </Button>
        </div>
      </div>

      <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 12, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Quick actions
        </div>
        {[
          { l: 'Edit details', i: 'settings', go: 'event-create-start' },
          { l: 'Manage tickets', i: 'ticket', go: 'dashboard-tickets' },
          { l: 'Open scanner', i: 'qr', go: 'create' },
          { l: 'Email attendees', i: 'mail', go: 'create' },
          { l: 'Duplicate event', i: 'plus', go: 'event-create-start' },
        ].map((a) => (
          <button
            key={a.l}
            onClick={() => go(a.go)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
              background: 'transparent', border: '1px solid var(--hairline)',
              borderRadius: 10, fontSize: 13, cursor: 'pointer', textAlign: 'left',
            }}
          >
            <Icon name={a.i} size={14} style={{ color: 'var(--ink-soft)' }} />
            <span style={{ flex: 1 }}>{a.l}</span>
            <Icon name="chevRight" size={12} style={{ color: 'var(--muted)' }} />
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: 20 }}>
        <div style={{ fontSize: 12, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
          Timeline
        </div>
        {[
          { t: 'Published', d: '10 May · 11:24', c: 'var(--accent-3)' },
          { t: 'Edited', d: '11 May · 16:08', c: 'var(--primary)' },
          { t: 'First sale', d: '10 May · 14:02', c: 'var(--accent-2)' },
          { t: 'Created', d: '8 May · 09:11', c: 'var(--muted)' },
        ].map((t, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, padding: '6px 0', position: 'relative' }}>
            <div style={{ width: 8, height: 8, borderRadius: 999, background: t.c, marginTop: 6, flexShrink: 0, position: 'relative', zIndex: 1 }} />
            {i < 3 && <div style={{ position: 'absolute', left: 3, top: 14, width: 2, height: 18, background: 'var(--hairline)' }} />}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 540 }}>{t.t}</div>
              <div style={{ fontSize: 10.5, color: 'var(--muted)', fontFamily: 'Geist Mono' }}>{t.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventTicketsTab() {
  const go = useGo();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>4 ticket types</div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>Manage pricing, inventory and sales windows</div>
        </div>
        <Button variant="primary" size="sm" icon="plus" onClick={() => go('dashboard-tickets')}>
          Add ticket type
        </Button>
      </div>

      {[
        { name: 'General Admission', price: 1800, sold: 220, total: 300, c: 'var(--primary)', w: '9–14 Jun' },
        { name: 'Early Bird (closed)', price: 1200, sold: 150, total: 150, c: 'var(--accent-2)', w: 'Closed · ended 8 Jun' },
        { name: 'VIP Lounge', price: 5500, sold: 32, total: 80, c: 'var(--accent-3)', w: '9 Jun onwards' },
        { name: 'Couple Pass', price: 4200, sold: 10, total: 70, c: 'var(--accent)', w: '9 Jun onwards' },
      ].map((t) => (
        <div
          key={t.name}
          className="card"
          style={{
            padding: 18, display: 'grid',
            gridTemplateColumns: '8px 1fr auto auto auto auto',
            gap: 18, alignItems: 'center',
          }}
        >
          <div style={{ width: 8, height: 40, borderRadius: 4, background: t.c }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>{t.w}</div>
          </div>
          <div style={{ minWidth: 80 }}>
            <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>Price</div>
            <div style={{ fontSize: 14, fontWeight: 540 }}>{fmtINR(t.price)}</div>
          </div>
          <div style={{ minWidth: 140 }}>
            <div style={{ fontSize: 11, color: 'var(--ink-soft)', display: 'flex', justifyContent: 'space-between' }}>
              <span>
                {t.sold}/{t.total}
              </span>
              <span>{Math.round((t.sold / t.total) * 100)}%</span>
            </div>
            <div style={{ height: 5, borderRadius: 999, background: 'var(--bg-2)', overflow: 'hidden', marginTop: 4 }}>
              <div style={{ width: `${(t.sold / t.total) * 100}%`, height: '100%', background: t.c }} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>Revenue</div>
            <div style={{ fontSize: 14, fontWeight: 540 }}>{fmtINR(t.sold * t.price)}</div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button
              style={{
                width: 32, height: 32, display: 'grid', placeItems: 'center',
                background: 'var(--bg-2)', border: 'none', borderRadius: 8,
                cursor: 'pointer', color: 'var(--ink-soft)',
              }}
            >
              <Icon name="settings" size={14} />
            </button>
            <button
              style={{
                width: 32, height: 32, display: 'grid', placeItems: 'center',
                background: 'var(--bg-2)', border: 'none', borderRadius: 8,
                cursor: 'pointer', color: 'var(--ink-soft)',
              }}
            >
              <Icon name="pause" size={13} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function EventAttendeesTab() {
  const rows = [
    { n: 'Priya Mehta', e: 'priya@gmail.com', t: '2× General', p: '₹3,600', c: 'Checked in', time: '12m ago' },
    { n: 'Raghav Bose', e: 'raghav@bose.io', t: '1× VIP', p: '₹5,500', c: 'Confirmed', time: '44m ago' },
    { n: 'Aisha Khan', e: 'aisha@khan.co', t: '1× Couple', p: '₹4,200', c: 'Confirmed', time: '1h ago' },
    { n: 'Vikram S.', e: 'vikram@s.com', t: '4× General', p: '₹7,200', c: 'Refunded', time: '3h ago' },
    { n: 'Sara Cohen', e: 'sara@cohen.com', t: '1× General', p: '₹1,800', c: 'Confirmed', time: '4h ago' },
    { n: 'Rohan Pillai', e: 'rohan@pillai.in', t: '2× VIP', p: '₹11,000', c: 'Checked in', time: '5h ago' },
  ];
  const statusC = { 'Checked in': 'var(--success-soft)', Confirmed: '#DBEAFE', Refunded: '#FEE2E2' };
  const statusF = { 'Checked in': '#059669', Confirmed: '#1E40AF', Refunded: '#DC2626' };
  return (
    <div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Icon name="search" size={14} style={{ position: 'absolute', left: 12, top: 11, color: 'var(--muted)' }} />
          <input placeholder="Search attendees…" className="input" style={{ paddingLeft: 36, height: 38 }} />
        </div>
        <Button variant="ghost" size="sm" icon="download">
          Export
        </Button>
        <Button variant="ghost" size="sm" icon="mail">
          Email all
        </Button>
      </div>
      <div className="card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr
              style={{
                background: 'var(--bg-2)', textAlign: 'left',
                color: 'var(--ink-soft)', fontSize: 11,
                textTransform: 'uppercase', letterSpacing: '0.06em',
              }}
            >
              <th style={{ padding: '12px 18px', fontWeight: 600 }}>
                <input type="checkbox" />
              </th>
              <th style={{ padding: '12px 12px', fontWeight: 600 }}>Attendee</th>
              <th style={{ padding: '12px 12px', fontWeight: 600 }}>Tickets</th>
              <th style={{ padding: '12px 12px', fontWeight: 600 }}>Paid</th>
              <th style={{ padding: '12px 12px', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '12px 12px', fontWeight: 600 }}>Booked</th>
              <th style={{ padding: '12px 18px', fontWeight: 600 }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderTop: '1px solid var(--hairline)' }}>
                <td style={{ padding: '12px 18px' }}>
                  <input type="checkbox" />
                </td>
                <td style={{ padding: '12px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 32, height: 32, borderRadius: 999,
                        background: `hsl(${i * 70} 65% 82%)`,
                        display: 'grid', placeItems: 'center',
                        fontSize: 11, fontWeight: 600,
                      }}
                    >
                      {r.n.split(' ').map((x) => x[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 540 }}>{r.n}</div>
                      <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>{r.e}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 12px' }}>{r.t}</td>
                <td style={{ padding: '12px 12px', fontWeight: 540 }}>{r.p}</td>
                <td style={{ padding: '12px 12px' }}>
                  <span
                    style={{
                      fontSize: 11, fontWeight: 600, padding: '3px 9px',
                      borderRadius: 999, background: statusC[r.c], color: statusF[r.c],
                    }}
                  >
                    {r.c}
                  </span>
                </td>
                <td style={{ padding: '12px 12px', color: 'var(--ink-soft)', fontFamily: 'Geist Mono', fontSize: 11.5 }}>{r.time}</td>
                <td style={{ padding: '12px 18px' }}>
                  <Icon name="chevRight" size={13} style={{ color: 'var(--ink-soft)' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EventAnalyticsTab() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
      <KPI label="Page views" value="12.4k" delta="+9%" spark={[5, 6, 4, 8, 6, 10, 8, 12, 10, 14, 12, 16]} color="var(--primary)" icon="eye" />
      <KPI label="Conversion" value="4.6%" delta="+0.8%" spark={[3, 4, 3, 5, 4, 5, 4, 5, 5, 6, 5, 6]} color="var(--accent-2)" icon="bolt" />
      <KPI label="Avg order" value="₹2,140" delta="+₹190" spark={[2, 3, 3, 4, 3, 4, 5, 4, 5, 5, 6, 5]} color="var(--accent-3)" icon="ticket" />
      <div className="card" style={{ padding: 22, gridColumn: 'span 2' }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Sales by source</div>
        {[
          { l: 'Instagram', v: 38, c: 'var(--accent)' },
          { l: 'WhatsApp', v: 26, c: 'var(--accent-3)' },
          { l: 'Direct link', v: 18, c: 'var(--primary)' },
          { l: 'Discover feed', v: 12, c: 'var(--accent-2)' },
          { l: 'Other', v: 6, c: 'var(--muted)' },
        ].map((s) => (
          <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, fontSize: 12.5 }}>
            <span style={{ width: 110 }}>{s.l}</span>
            <div style={{ flex: 1, height: 14, background: 'var(--bg-2)', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
              <div style={{ width: `${s.v}%`, height: '100%', background: s.c }} />
            </div>
            <span style={{ width: 36, textAlign: 'right', fontWeight: 540 }}>{s.v}%</span>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding: 22 }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Devices</div>
        <Donut
          size={130}
          segments={[
            { v: 72, c: 'var(--primary)' },
            { v: 22, c: 'var(--accent-2)' },
            { v: 6, c: 'var(--muted)' },
          ]}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
            <span>
              <span style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--primary)', marginRight: 6, borderRadius: 2 }} />
              Mobile
            </span>
            <span>72%</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
            <span>
              <span style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--accent-2)', marginRight: 6, borderRadius: 2 }} />
              Desktop
            </span>
            <span>22%</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
            <span>
              <span style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--muted)', marginRight: 6, borderRadius: 2 }} />
              Tablet
            </span>
            <span>6%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventSettingsTab() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 28 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {['General', 'Visibility', 'Payments', 'Refund policy', 'Team & roles', 'Danger zone'].map((s, i) => (
          <button
            key={s}
            style={{
              textAlign: 'left', padding: '8px 12px',
              background: i === 0 ? 'var(--bg-2)' : 'transparent',
              border: 'none', borderRadius: 8, cursor: 'pointer',
              fontSize: 13, fontWeight: i === 0 ? 600 : 500,
              color: i === 5 ? 'var(--accent)' : 'var(--ink)',
            }}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>General</div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>Event name, category and description</div>
        </div>
        <Field label="Event name">
          <input defaultValue="Neo Rave: Midnight Bloom" />
        </Field>
        <Field label="Category">
          <select defaultValue="music">
            <option value="music">Music & Concerts</option>
            <option value="tech">Tech</option>
          </select>
        </Field>
        <Field label="Description" hint="Markdown supported">
          <textarea rows={4} defaultValue="A late-night techno experience in Mumbai's largest sound dome..." />
        </Field>
        <div style={{ display: 'flex', gap: 14, padding: 14, background: 'var(--bg-2)', borderRadius: 10, alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 540 }}>Public event</div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>Show on EventPro discover and search</div>
          </div>
          <div style={{ width: 40, height: 22, borderRadius: 999, background: 'var(--accent-3)', position: 'relative', cursor: 'pointer' }}>
            <div style={{ position: 'absolute', top: 2, right: 2, width: 18, height: 18, background: 'white', borderRadius: 999, boxShadow: 'var(--shadow-sm)' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          <Button variant="primary" size="sm">
            Save changes
          </Button>
          <Button variant="ghost" size="sm">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardEventDetail() {
  const go = useGo();
  const [tab, setTab] = useState('Overview');
  const ev = DASH_EVENTS[0];
  const tabs = ['Overview', 'Tickets', 'Attendees', 'Analytics', 'Settings'];

  return (
    <DashboardShell
      active="dashboard-events"
      crumb={[
        <button
          key="events"
          onClick={() => go('dashboard-events')}
          style={{ background: 'none', border: 'none', color: 'var(--ink-soft)', cursor: 'pointer', padding: 0, fontSize: 'inherit' }}
        >
          Events
        </button>,
        ev.name,
      ]}
      title={ev.name}
      actions={
        <>
          <Button variant="ghost" size="sm" icon="eye" onClick={() => go('dashboard-preview')}>
            Preview
          </Button>
          <Button variant="ghost" size="sm" icon="share">
            Share
          </Button>
          <Button variant="primary" size="sm" icon="bolt">
            Publish toggle
          </Button>
        </>
      }
    >
      {/* Hero card */}
      <div
        className="card"
        style={{
          overflow: 'hidden', marginBottom: 22,
          display: 'grid', gridTemplateColumns: '240px 1fr auto', gap: 0,
        }}
      >
        <div style={{ position: 'relative', height: 160 }}>
          <img src={ev.banner} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <StatusBadge status={ev.status} />
            <span style={{ fontSize: 11, color: 'var(--ink-soft)', fontFamily: 'Geist Mono' }}>
              EVT-{String(ev.id).padStart(4, '0')}
            </span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>{ev.name}</div>
          <div style={{ display: 'flex', gap: 16, fontSize: 13, color: 'var(--ink-soft)' }}>
            <span>
              <Icon name="calendar" size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
              {ev.date}
            </span>
            <span>
              <Icon name="pin" size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
              {ev.venue}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 4, alignItems: 'center', fontSize: 12, color: 'var(--ink-soft)' }}>
            <span>Public URL · </span>
            <code style={{ background: 'var(--bg-2)', padding: '2px 8px', borderRadius: 6, fontSize: 11.5, fontFamily: 'Geist Mono' }}>
              eventpro.io/neo-rave
            </code>
            <button
              style={{
                background: 'none', border: 'none', color: 'var(--primary)',
                cursor: 'pointer', fontSize: 12, display: 'inline-flex',
                alignItems: 'center', gap: 3,
              }}
            >
              <Icon name="share" size={12} /> copy
            </button>
          </div>
        </div>
        <div
          style={{
            padding: 20, borderLeft: '1px solid var(--hairline)',
            background: 'var(--bg-2)', display: 'flex', flexDirection: 'column',
            justifyContent: 'center', gap: 10, minWidth: 180,
          }}
        >
          <div style={{ fontSize: 11, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Days to event
          </div>
          <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--primary)' }}>
            33
            <span style={{ fontSize: 14, color: 'var(--ink-soft)', fontWeight: 500, marginLeft: 4 }}>days</span>
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>Last edit · 2h ago</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid var(--hairline)', marginBottom: 24 }}>
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '11px 16px',
              background: 'transparent', border: 'none',
              borderBottom: tab === t ? '2px solid var(--primary)' : '2px solid transparent',
              color: tab === t ? 'var(--ink)' : 'var(--ink-soft)',
              fontSize: 13.5, fontWeight: 540,
              cursor: 'pointer', marginBottom: -1,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Overview' && <EventOverview ev={ev} />}
      {tab === 'Tickets' && <EventTicketsTab />}
      {tab === 'Attendees' && <EventAttendeesTab />}
      {tab === 'Analytics' && <EventAnalyticsTab />}
      {tab === 'Settings' && <EventSettingsTab />}
    </DashboardShell>
  );
}
