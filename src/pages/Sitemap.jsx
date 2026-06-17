import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { useGo } from '../hooks/useGo';

const CARDS = [
  { id: 'home', title: 'Home', sub: 'Hero, categories, features, scanner demo, stats, CTA', color: 'var(--primary)' },
  { id: 'explore', title: 'Explore events', sub: 'Search, filters, city, grid/list, trending', color: 'var(--accent)' },
  { id: 'event', title: 'Event details', sub: 'Banner, sticky booking, schedule, FAQ, reviews', color: 'var(--accent-2)' },
  { id: 'create', title: 'Create event', sub: 'Creator landing — wizard demo, analytics, testimonials', color: 'var(--accent-3)' },
  { id: 'pricing', title: 'Pricing', sub: 'Free / Pro / Business with feature comparison', color: 'var(--primary)' },
  { id: 'about', title: 'About', sub: 'Mission, story, team, philosophy', color: 'var(--accent)' },
  { id: 'contact', title: 'Contact / Support', sub: 'Form, FAQs, email, live chat, socials', color: 'var(--accent-2)' },
  { id: 'login', title: 'Sign in', sub: 'Email + password, phone OTP, social login', color: 'var(--primary)' },
  { id: 'signup', title: 'Sign up', sub: 'Creator vs attendee, multi-step verification', color: 'var(--accent)' },
  { id: 'auth', title: 'Auth module', sub: '22 screens · OTP, KYC, security, onboarding states', color: 'var(--accent-3)' },
  { id: 'event-create-start', title: 'Event wizard', sub: '6-step creation flow · basics, schedule, venue, tickets, preview, publish', color: '#10B981' },
  { id: 'dashboard-empty', title: 'Creator dashboard', sub: 'First-time empty state with quick-start cards', color: '#1E40AF' },
  { id: 'dashboard-home', title: 'Creator HQ', sub: 'Dashboard home · KPIs, sparklines, recent activity', color: '#1D4ED8' },
  { id: 'dashboard-events', title: 'Events list', sub: 'Filterable creator events with status, sales, actions', color: '#10B981' },
  { id: 'dashboard-event', title: 'Event analytics', sub: 'Tabs · overview, attendees, sales, refunds', color: '#F59E0B' },
  { id: 'dashboard-venues', title: 'Venues', sub: 'Venue library · grid view, add venue drawer', color: '#7C3AED' },
  { id: 'dashboard-tickets', title: 'Tickets', sub: 'Ticket types · live preview, sales charts', color: '#EF4444' },
  { id: 'dashboard-preview', title: 'Event preview', sub: 'Desktop & mobile preview before publish', color: '#0EA5E9' },
  { id: 'dashboard-mobile', title: 'Mobile dashboard', sub: 'On-the-go creator app · KPIs, swipe, FAB, scan', color: '#EC4899' },
  { id: 'event-soldout', title: 'Sold-out state', sub: 'Event detail variant · waitlist, notify, similar events', color: '#EF4444' },
  { id: 'event-draft', title: 'Draft · autosave', sub: 'Confirmation that work is saved · resume editing', color: '#F59E0B' },
  { id: 'auth-booking', title: 'Quick booking auth', sub: 'Low-friction modal during checkout', color: '#7C3AED' },
  { id: 'event-404', title: 'Event removed (404)', sub: 'Event unavailable / canceled state', color: '#EC4899' },
  { id: 'components', title: 'Components', sub: 'Buttons, inputs, chips, tickets, QR, navigation', color: 'var(--ink)' },
];

export default function Sitemap() {
  const go = useGo();
  return (
    <div className="page-enter" style={{ paddingBottom: 80 }}>
      <section style={{ padding: '80px 0 32px', background: 'var(--grad-hero)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 880 }}>
          <span className="eyebrow">EventPro · public website</span>
          <h1 className="display" style={{ fontSize: 'clamp(48px, 5.5vw, 84px)' }}>
            Ten pages, one <span className="serif" style={{ color: 'var(--accent)' }}>working</span> prototype.
          </h1>
          <p className="lead" style={{ maxWidth: 660 }}>
            Click any card below to explore that page. Everything's interactive — fill forms, switch tabs, click events,
            run the booking flow. Toggle <strong>Tweaks</strong> in the toolbar to recolor and restyle live.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <Button variant="primary" size="lg" iconRight="arrow" onClick={() => go('home')}>Start at Home</Button>
            <Button variant="ghost" size="lg" onClick={() => go('components')}>See components</Button>
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 20 }}>
          {CARDS.map((c, i) => (
            <button
              key={c.id + i}
              onClick={() => go(c.id)}
              className="card sitemap-card"
              style={{
                padding: 24,
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                minHeight: 200,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--ink-soft)', letterSpacing: '0.08em' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Icon name="arrow" size={16} style={{ color: 'var(--ink-soft)', transform: 'rotate(-45deg)' }} />
              </div>
              <div style={{ flex: 1 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: c.color, opacity: 0.95 }} />
                <h3 className="h3" style={{ fontSize: 22 }}>{c.title}</h3>
              </div>
              <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5 }}>{c.sub}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
