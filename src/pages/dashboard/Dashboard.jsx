import { FloatingShapes } from '../../components/dashboard/FloatingShapes';
import { Icon } from '../../components/ui/Icon';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import { useGo } from '../../hooks/useGo';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';

export default function DashboardEmpty() {
  const go = useGo();

  const cards = [
    {
      t: 'Create event',
      b: 'Set up your first event in 5 min',
      i: 'sparkle', 
      c: '#315EFB',
      to: 'event-create-start',
    },
    {
      t: 'Resume draft',
      b: 'Pick up where you left off',
      i: 'edit',
      c: '#F59E0B',
      to: 'event-draft',
    },
    {
      t: 'Set up payouts',
      b: 'Add bank · enable card payments',
      i: 'bar',
      c: '#10B981',
      to: 'auth-creator',
    },
    {
      t: 'Invite team',
      b: 'Add scanners and co-organizers',
      i: 'users',
      c: '#7C3AED',
      to: 'contact',
    },
  ];

  const menuItems = [
  {
    t: 'Dashboard',
    i: 'grid',
    active: true,
    to: 'dashboard',
  },
  {
    t: 'Events',
    i: 'calendar',
    active: false,
    to: 'events',
  },
  {
    t: 'Tickets',
    i: 'ticket',
    active: false,
    to: 'tickets',
  },
  {
    t: 'Venues',
    i: 'pin',
    active: false,
    to: 'venues',
  },
  {
    t: 'Scanner',
    i: 'qr',
    active: false,
    to: 'scanner',
  },
  {
    t: 'Analytics',
    i: 'bar',
    active: false,
    to: 'analytics',
  },
  {
    t: 'Settings',
    i: 'lock',
    active: false,
    to: 'settings',
  },
];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F8FAFC',
      }}
    >
      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
        }}
      >
        {/* SIDEBAR */}
<DashboardSidebar />

        {/* MAIN CONTENT */}
        <main
          style={{
            padding: '38px 42px',
            flex: 1,
            minWidth: 0,
            background: '#F8FAFC',
          }}
        >
          {/* HEADER */}
          <header
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: 26,
            }}
          >
            <div>
              <span className="eyebrow">Welcome back</span>

              <h1
                style={{
                  fontSize: 32,
                  lineHeight: 1,
                  marginTop: 10,
                  fontWeight: 700,
                  color: '#0F172A',
                }}
              >
                Hello,{' '}
                <span
                  className="serif"
                  style={{
                    color: '#315EFB',
                    fontStyle: 'italic',
                    fontWeight: 500,
                  }}
                >
                  Tajgi.
                </span>
              </h1>
            </div>

            {/* <Button
              variant="primary"
              iconRight="arrow"
              onClick={() => go('event-create-start')}
              style={{
                height: 54,
                paddingInline: 28,
                borderRadius: 18,
                background: '#081028',
                boxShadow: '0 10px 30px rgba(8,16,40,0.18)',
                fontWeight: 600,
              }}
            >
              New event
            </Button> */}
          </header>

          {/* STATS */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 18,
              marginBottom: 28,
            }}
          >
            {[
              ['Tickets sold', '0'],
              ['Revenue', '₹0'],
              ['Live events', '0'],
              ['Drafts', '1'],
            ].map(([t, v]) => (
              <div
                key={t}
                style={{
                  padding: 24,
                  borderRadius: 24,
                  border: '1px solid #E2E8F0',
                  background: '#fff',
                  boxShadow: '0 4px 20px rgba(15,23,42,0.04)',
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: '#64748B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    fontWeight: 600,
                  }}
                >
                  {t}
                </div>

                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    marginTop: 10,
                    color: '#0F172A',
                  }}
                >
                  {v}
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: '#94A3B8',
                    marginTop: 4,
                  }}
                >
                  —
                </div>
              </div>
            ))}
          </div>

          {/* HERO */}
          <div
            style={{
              padding: '70px 40px',
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'center',
              background:
                'linear-gradient(135deg, #EAF2FF 0%, #F8F5FF 50%, #F8FAFC 100%)',
              border: '1px solid #E5E7EB',
              borderRadius: 36,
              minHeight: 360,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FloatingShapes tone="blue" />

            <div
              style={{
                position: 'relative',
                zIndex: 2,
                maxWidth: 650,
              }}
            >
              <div
                style={{
                  width: 82,
                  height: 82,
                  borderRadius: 24,
                  background: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  margin: '0 auto 24px',
                  boxShadow: '0 10px 30px rgba(15,23,42,0.08)',
                }}
              >
                <Icon name="sparkle" size={34} />
              </div>

              <h2
                style={{
                  fontSize: 28,
                  lineHeight: 1.1,
                  fontWeight: 700,
                  color: '#0F172A',
                  marginBottom: 16,
                }}
              >
                Your stage is{' '}
                <span
                  className="serif"
                  style={{
                    color: '#315EFB',
                    fontStyle: 'italic',
                  }}
                >
                  set.
                </span>
              </h2>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: '#64748B',
                  maxWidth: 650,
                  margin: '0 auto',
                }}
              >
                You haven't published anything yet. Create your first
                event and start selling tickets in minutes.
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 14,
                  marginTop: 32,
                }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  iconRight="arrow"
                  onClick={() => go('event-create-start')}
                >
                  Create my first event
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => go('explore')}
                >
                  See live examples
                </Button>
              </div>
            </div>
          </div>

          {/* QUICK START */}
          <div style={{ marginTop: 34 }}>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                marginBottom: 18,
                color: '#0F172A',
              }}
            >
              Quick start
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 18,
              }}
            >
              {cards.map((c) => (
                <button
                  key={c.t}
                  onClick={() => go(c.to)}
                  style={{
                    padding: 24,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                    borderRadius: 24,
                    border: '1px solid #E2E8F0',
                    background: '#fff',
                    transition: '0.25s',
                    minHeight: 170,
                  }}
                >
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 16,
                      background: c.c + '18',
                      color: c.c,
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <Icon name={c.i} size={20} />
                  </div>

                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#0F172A',
                    }}
                  >
                    {c.t}
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      lineHeight: 1.6,
                      color: '#64748B',
                    }}
                  >
                    {c.b}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}