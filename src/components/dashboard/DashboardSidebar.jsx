
import { Icon } from '../ui/Icon';
import { Logo } from '../ui/Logo';
import { useGo } from '../../hooks/useGo';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useSidebarStore } from '../../stores/sidebarStore';

export default function DashboardSidebar() {
  const go = useGo();
  const location = useLocation();

  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const { isCollapsed, toggleCollapsed } = useSidebarStore();

  const menuItems = [
    {
      t: 'Dashboard',
      i: 'grid',
      path: '/dashboard',
    },
    {
      t: 'Events',
      i: 'calendar',
      path: '/dashboard/events',
    },
    {
      t: 'Tickets',
      i: 'ticket',
      path: '/dashboard/tickets',
    },
    {
      t: 'Venues',
      i: 'pin',
      path: '/dashboard/venues',
    },
    {
      t: 'Scanner',
      i: 'qr',
      path: '/dashboard/scanner',
    },
    {
      t: 'Analytics',
      i: 'bar',
      path: '/dashboard/analytics',
    },
    {
      t: 'Settings',
      i: 'settings',
      path: '/dashboard/settings',
    },
  ];

  const handleLogout = () => {
    logout();
    go('/login');
  };

  const userName =
    user?.fullName ||
    user?.name ||
    'Tajgi Lakhani';

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }

    return location.pathname.startsWith(path);
  };

  return (
    <aside
      style={{
        width: isCollapsed ? 80 : 260,
        minWidth: isCollapsed ? 80 : 260,
        height: '100vh',
        position: 'sticky',
        top: 0,
        background:
          'linear-gradient(180deg,#050816 0%,#071024 100%)',
        borderRight:
          '1px solid rgba(255,255,255,.05)',
        display: 'flex',
        flexDirection: 'column',
        padding: isCollapsed ? '18px 8px' : '18px',
        color: '#fff',
        transition: 'all 0.3s ease',
        overflowX: 'hidden',
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          marginBottom: 24,
        }}
      >
        {!isCollapsed && <Logo color="white" />}

        <button
          onClick={toggleCollapsed}
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            border: 'none',
            cursor: 'pointer',
            background:
              'rgba(255,255,255,.06)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="grid" size={14} />
        </button>
      </div>

      {/* CREATE EVENT */}
      <button
        onClick={() =>
          go('event-create-start')
        }
        style={{
          height: 42,
          border: 'none',
          borderRadius: 12,
          cursor: 'pointer',
          color: '#fff',
          fontWeight: 600,
          fontSize: 13,
          background:
            'linear-gradient(135deg,#7C3AED,#8B5CF6)',
          marginBottom: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isCollapsed ? <Icon name="plus" size={16} /> : '+ Create Event'}
      </button>

      {/* LABEL */}
      {!isCollapsed && (
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color:
              'rgba(255,255,255,.35)',
            marginBottom: 12,
            paddingLeft: 8,
          }}
        >
          Workspace
        </div>
      )}

      {/* MENU */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {menuItems.map((item) => {
          const active = isActive(
            item.path
          );

          return (
              <button
              key={item.t}
              onClick={() =>
                go(item.path)
              }
              style={{
                height: 42,
                border: 'none',
                cursor: 'pointer',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                gap: 12,
                paddingInline: isCollapsed ? 0 : 14,
                position: 'relative',

                background: active
                  ? 'rgba(255,255,255,.08)'
                  : 'transparent',

                color: active
                  ? '#fff'
                  : 'rgba(255,255,255,.62)',

                transition:
                  'all .25s ease',
              }}
            >
              {active && !isCollapsed && (
                <div
                  style={{
                    position:
                      'absolute',
                    left: 0,
                    top: 8,
                    bottom: 8,
                    width: 3,
                    borderRadius: 20,
                    background:
                      '#8B5CF6',
                  }}
                />
              )}

              <Icon
                name={item.i}
                size={15}
              />

              {!isCollapsed && (
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: active
                      ? 600
                      : 500,
                  }}
                >
                  {item.t}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1 }} />

      {/* PROFILE CARD */}
      <div
        style={{
          padding: isCollapsed ? 8 : 12,
          borderRadius: 16,
          background:
            'rgba(255,255,255,.04)',
          border:
            '1px solid rgba(255,255,255,.05)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background:
                'linear-gradient(135deg,#7C3AED,#8B5CF6)',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            {initials}
          </div>

          {!isCollapsed && (
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}
              >
                {userName}
              </div>

              <div
                style={{
                  fontSize: 11,
                  color:
                    'rgba(255,255,255,.45)',
                  whiteSpace: 'nowrap',
                }}
              >
                Event Organizer
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          style={{
            marginTop: 12,
            width: '100%',
            height: 36,
            borderRadius: 10,
            border:
              '1px solid rgba(255,255,255,.06)',
            background:
              'rgba(255,255,255,.03)',
            color:
              'rgba(255,255,255,.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            cursor: 'pointer',
          }}
          title="Logout"
        >
          <Icon
            name="lock"
            size={14}
          />
          {!isCollapsed && 'Logout'}
        </button>
      </div>
    </aside>
  );
}
