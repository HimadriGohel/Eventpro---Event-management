import { useQuery } from '@tanstack/react-query';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import { getAllEvents } from '../../api/events';
import { useGo } from '../../hooks/useGo';
import { useState } from 'react';

export default function DashboardEvents() {
  const go = useGo();
  
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['dashboard-events'],
    queryFn: getAllEvents,
  });

  const counts = {
  All: events.length,
  Published: events.filter(
    (e) => e.status?.toLowerCase() === 'published'
  ).length,
  Scheduled: events.filter(
    (e) => e.status?.toLowerCase() === 'scheduled'
  ).length,
  Draft: events.filter(
    (e) => e.status?.toLowerCase() === 'draft'
  ).length,
  'Sold Out': events.filter(
    (e) => e.status?.toLowerCase() === 'sold out'
  ).length,
  Ended: events.filter(
    (e) => e.status?.toLowerCase() === 'ended'
  ).length,
  Cancelled: events.filter(
    (e) => e.status?.toLowerCase() === 'cancelled'
  ).length,
};

const filteredEvents = events.filter((event) => {
  const matchesTab =
    activeTab === 'All'
      ? true
      : event.status?.toLowerCase() ===
        activeTab.toLowerCase();

  const matchesSearch =
    event.title
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    event.location
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    event.organizer
      ?.toLowerCase()
      .includes(search.toLowerCase());

  return matchesTab && matchesSearch;
});

  return (
    <div
        style={{
          display: 'flex',
          minHeight: '100vh',
        background: '#F8FAFC',
      }}
    >
      {/* Sidebar */}
      <DashboardSidebar active="events" />

      {/* Main Content */}
      <main
        style={{
          padding: '32px',
          flex: 1,
          minWidth: 0,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
          }}
        >
          <div>
            <div
              style={{
                color: '#64748B',
                fontSize: '14px',
              }}
            >
              Workspace &gt; Events
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: '42px',
                fontWeight: 700,
              }}
            >
              Events
            </h1>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '12px',
            }}
          >
            {/* <button
              style={{
                padding: '12px 20px',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                background: '#fff',
                cursor: 'pointer',
              }}
            >
              Export CSV
            </button> */}

            <button
              onClick={() => go('event-create-start')}
              style={{
                padding: '12px 24px',
                borderRadius: '14px',
                border: 'none',
                background: '#315EFB',
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              + Create Event
            </button>
          </div>
        </div>

        

        {/* Search */}
        <input
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search by name, venue or organizer..."
          style={{
            width: '100%',
            height: '56px',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '0 18px',
            marginBottom: '30px',
          }}
        />

<div
  style={{
    display: 'flex',
    gap: 30,
    marginBottom: 25,
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: 15,
  }}
>
 {[
  'All',
  'Published',
  'Scheduled',
  'Draft',
  'Sold Out',
  'Ended',
  'Cancelled',
].map((tab) => (
  <button
    key={tab}
    onClick={() => setActiveTab(tab)}
    style={{
      border: 'none',
      background: 'transparent',
      fontSize: 15,
      fontWeight: 600,
      cursor: 'pointer',
      color:
        activeTab === tab
          ? '#315EFB'
          : '#64748B',
      borderBottom:
        activeTab === tab
          ? '2px solid #315EFB'
          : '2px solid transparent',
      paddingBottom: '10px',
    }}
  >
    {tab} ({counts[tab] || 0})
  </button>
))}

</div>
        {/* Cards */}
        {isLoading ? (
          <h3>Loading events...</h3>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fill,minmax(350px,1fr))',
              gap: '24px',
            }}
          >
            {filteredEvents.map((event) => {
  const eventDate = event.startDate
    ? new Date(event.startDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'No Date';

  return (
    <div
      key={event._id}
      style={{
        background: '#fff',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid #E2E8F0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      }}
    >
      {/* Image */}
      <div
        style={{
          position: 'relative',
        }}
      >
        <img
          src={event.image}
          alt={event.title}
          style={{
            width: '100%',
            height: '180px',
            objectFit: 'cover',
          }}
        />

        {/* Status Badge */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: '#DCFCE7',
            color: '#166534',
            padding: '6px 12px',
            borderRadius: '999px',
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {event.status || 'Draft'} 
        </div>

        {/* Settings */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 34,
            height: 34,
            borderRadius: '10px',
            background: '#fff',
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
          }}
        >
          ⚙️
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: '18px',
        }}
      >
        <h3
          style={{
            margin: 0,
            marginBottom: 12,
            fontSize: 24,
            fontWeight: 700,
            color: '#0F172A',
          }}
        >
          {event.title}
        </h3>

        <div
          style={{
            color: '#64748B',
            fontSize: 14,
            marginBottom: 8,
          }}
        >
          📅 {eventDate}
        </div>

        <div
          style={{
            color: '#64748B',
            fontSize: 14,
            marginBottom: 16,
          }}
        >
          📍 {event.location || event?.venue?.name}
        </div>

        {/* Fake progress UI like screenshot */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 6,
            fontSize: 13,
          }}
        >
          <span>0 / 100 sold</span>
          <strong>0%</strong>
        </div>

        <div
          style={{
            width: '100%',
            height: 6,
            background: '#E2E8F0',
            borderRadius: 20,
            overflow: 'hidden',
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: '0%',
              height: '100%',
              background: '#10B981',
            }}
          />
        </div>

        <div
          style={{
            borderTop: '1px solid #E2E8F0',
            paddingTop: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                color: '#64748B',
              }}
            >
              Revenue
            </div>

            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              ₹{event.price || 0}
            </div>
          </div>

          <button
            style={{
              border: 'none',
              background: 'transparent',
              color: '#315EFB',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Manage →
          </button>
        </div>
      </div>
    </div>
  );
})}
          </div>
        )}
      </main>
    </div>
  );
}