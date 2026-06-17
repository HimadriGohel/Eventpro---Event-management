import { useEffect, useState } from 'react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import { getAllEvents } from '../../api/events';

export default function DashboardVenues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadVenues();
  }, []);

  const loadVenues = async () => {
  try {
    const events = await getAllEvents();

    console.log('EVENTS =>', events);

    const allVenues = [];

    events.forEach((event) => {
      const venueData =
        event.venue ||
        event.newVenue ||
        {};

      allVenues.push({
        _id:
          event._id +
          '_' +
          Math.random(),

        eventId: event._id,

        eventName:
          event.title ||
          'Untitled Event',

        name:
          venueData.name ||
          'Venue Not Available',

        address:
          venueData.address ||
          '',

        city:
          venueData.city ||
          event.location ||
          '',

        area:
          venueData.area ||
          event.location ||
          '',

        capacity:
          Number(
            venueData.capacity
          ) || 0,

        image:
          venueData.image ||
          venueData.images?.[0] ||
          event.banner ||
          event.image ||
          'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200',

        tags: [
          event.category,
          event.organizer,
        ].filter(Boolean),

        upcomingEvents: 1,
        pastEvents: 0,
      });
    });

    console.log(
      'ALL VENUES =>',
      allVenues
    );

    setVenues(allVenues);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  const filteredVenues = venues.filter((venue) =>
    `${venue.name} ${venue.city} ${venue.area}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalVenues = venues.length;

  const totalCapacity = venues.reduce(
    (sum, venue) => sum + (venue.capacity || 0),
    0
  );

  const activeVenues = venues.filter(
    (venue) => venue.capacity > 0
  ).length;

  const totalEvents = venues.length;

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#F8FAFC',
      }}
    >
      <DashboardSidebar />

      <main style={{ padding: '32px', flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <div>
            <div
              style={{
                color: '#64748B',
                fontSize: '14px',
              }}
            >
              Workspace &gt; Venues
            </div>

            <h1
              style={{
                margin: 0,
                marginTop: '8px',
                fontSize: '42px',
                fontWeight: '700',
              }}
            >
              Venues
            </h1>
          </div>

          <button
            style={{
              background: '#0F172A',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 20px',
              cursor: 'pointer',
            }}
          >
            + Add Venue
          </button>
        </div>

        <input
          type="text"
          placeholder="Search venues..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: '100%',
            height: '52px',
            border: '1px solid #CBD5E1',
            borderRadius: '12px',
            padding: '0 16px',
            marginBottom: '24px',
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit,minmax(240px,1fr))',
            gap: '20px',
            marginBottom: '30px',
          }}
        >
          <StatCard
            title="Total Venues"
            value={totalVenues}
          />

          <StatCard
            title="Total Capacity"
            value={totalCapacity.toLocaleString()}
          />

          <StatCard
            title="Active Venues"
            value={activeVenues}
          />

          <StatCard
            title="Total Events"
            value={totalEvents}
          />
        </div>

        {loading ? (
          <div
            style={{
              background: '#fff',
              padding: '40px',
              borderRadius: '20px',
              textAlign: 'center',
            }}
          >
            Loading venues...
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fill,minmax(420px,1fr))',
              gap: '24px',
            }}
          >
            {filteredVenues.map((venue) => (
              <div
                key={venue._id}
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid #E2E8F0',
                }}
              >
                <img
                  src={venue.image}
                  alt={venue.name}
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover',
                  }}
                />

                <div style={{ padding: '20px' }}>
                  <h3>{venue.name}</h3>

                  <p
                    style={{
                      color: '#64748B',
                    }}
                  >
                    {venue.address}
                  </p>

                  <div
                    style={{
                      marginTop: '12px',
                      display: 'flex',
                      gap: '8px',
                      flexWrap: 'wrap',
                    }}
                  >
                    {(venue.tags || []).map(
                      (tag, index) => (
                        <span
                          key={index}
                          style={{
                            background:
                              '#EEF2FF',
                            color: '#4F46E5',
                            padding:
                              '6px 12px',
                            borderRadius:
                              '999px',
                            fontSize: '12px',
                          }}
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>

                  <div
                    style={{
                      marginTop: '16px',
                      display: 'flex',
                      justifyContent:
                        'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>
                      Capacity:{' '}
                      {venue.capacity}
                    </span>

                    <button
                      style={{
                        border: 'none',
                        background:
                          '#F1F5F9',
                        padding:
                          '8px 14px',
                        borderRadius:
                          '10px',
                        cursor: 'pointer',
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div
              style={{
                border:
                  '2px dashed #CBD5E1',
                borderRadius: '20px',
                minHeight: '320px',
                display: 'flex',
                justifyContent:
                  'center',
                alignItems: 'center',
                background: '#fff',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              + Add Venue
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '20px',
        padding: '24px',
        border: '1px solid #E2E8F0',
      }}
    >
      <div
        style={{
          color: '#64748B',
          marginBottom: '12px',
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: '32px',
          fontWeight: 700,
        }}
      >
        {value}
      </div>
    </div>
  );
}