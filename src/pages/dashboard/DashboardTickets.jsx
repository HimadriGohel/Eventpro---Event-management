import { useEffect, useState } from 'react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import { getAllEvents } from '../../api/events';

export default function DashboardTickets() {
const [tickets, setTickets] = useState([]);
const [loading, setLoading] = useState(true);

const [search, setSearch] = useState('');
const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadTickets();
  }, []);
        
const loadTickets = async () => {
  try {
    const events = await getAllEvents();

    console.log('EVENTS =>', events);

    const allTickets = [];

    events.forEach((event) => {
      (event.tickets || []).forEach((ticket) => {
        allTickets.push({
          percentage:
  ticket.qty > 0
    ? Math.round(
        ((ticket.sold || 0) /
          ticket.qty) *
          100
      )
    : 0,
    
          eventId: event._id,
          eventName: event.title,

          ticketName: ticket.name,
          ticketType: ticket.type,

          price: ticket.price || 0,
          qty: ticket.qty || 0,

         sold: ticket.sold || 0,
         available:
         (ticket.qty || 0) -
         (ticket.sold || 0),

        revenue:
         (ticket.price || 0) *
         (ticket.sold || 0),

          saleStart:
            ticket.saleStart,

          saleEnd:
            ticket.saleEnd,
        });
      });
    });

    console.log(
      'ALL TICKETS =>',
      allTickets
    );

    setTickets(allTickets);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const filteredTickets = tickets.filter((ticket) => {
  const matchesSearch =
    ticket.eventName
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    ticket.ticketName
      ?.toLowerCase()
      .includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === 'all'
      ? true
      : statusFilter === 'active'
      ? ticket.available > 0
      : ticket.available === 0;

  return matchesSearch && matchesStatus;
});

const totalTicketTypes = tickets.length;

const totalCapacity = tickets.reduce(
  (sum, ticket) => sum + (ticket.qty || 0),
  0
);

const soldTickets = tickets.reduce(
  (sum, ticket) => sum + (ticket.sold || 0),
  0
);

const totalRevenue = tickets.reduce(
  (sum, ticket) =>
    sum +
    ((ticket.price || 0) *
      (ticket.sold || 0)),
  0
);

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#F8FAFC',
      }}
    >
      <DashboardSidebar />

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
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              color: '#64748B',
              fontSize: '14px',
            }}
          >
            Workspace &gt; Tickets
          </div>

          <h1
            style={{
              margin: 0,
              marginTop: 8,
              fontSize: '42px',
              fontWeight: 700,
            }}
          >
            Ticket Management
          </h1>
        </div>

        <div
  style={{
    display: 'flex',
    gap: '12px',
    marginTop: '20px',
    marginBottom: '30px',
  }}
>
  <input
    placeholder="Search tickets..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    style={{
      flex: 1,
      height: '48px',
      borderRadius: '12px',
      border: '1px solid #CBD5E1',
      padding: '0 16px',
    }}
  />

  <select
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(e.target.value)
    }
    style={{
      width: '180px',
      borderRadius: '12px',
      border: '1px solid #CBD5E1',
      padding: '0 12px',
    }}
  >
    <option value="all">
      All Status
    </option>

    <option value="active">
      Active
    </option>

    <option value="soldout">
      Sold Out
    </option>
  </select>
</div>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit,minmax(250px,1fr))',
            gap: '20px',
            marginBottom: '30px',
          }}
        >
<StatCard
  title="Ticket Types"
  value={totalTicketTypes}
/>

<StatCard
  title="Capacity"
  value={totalCapacity}
/>

<StatCard
  title="Sold Tickets"
  value={soldTickets}
/>

<StatCard
  title="Revenue"
  value={`₹${totalRevenue.toLocaleString(
    'en-IN'
  )}`}
/>
        </div>

        {/* Table */}
        <div
          style={{
            background: '#fff',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid #E2E8F0',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
            }}
          >
            <thead>
              <tr
                style={{
                  background: '#F8FAFC',
                }}
              >

                <th style={thStyle}>Event</th>
                <th style={thStyle}>Ticket Type</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Capacity</th>
                <th style={thStyle}>Sold</th>
                <th style={thStyle}>Revenue</th>
                <th style={thStyle}>Progress</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      textAlign: 'center',
                      padding: '40px',
                    }}
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredTickets.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      textAlign: 'center',
                      padding: '40px',
                    }}
                  >
                    No ticket types available
                  </td>
                </tr>
              ) : (
                filteredTickets.map(
  (ticket, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom:
                        '1px solid #E2E8F0',
                    }}
                  >
                    <td style={tdStyle}>
                      {ticket.eventName}
                    </td>

                    <td style={tdStyle}>
                      {ticket.ticketName}
                    </td>

                    <td style={tdStyle}>
                      ₹{ticket.price}
                    </td>

                    <td style={tdStyle}>
                    {ticket.available}
                    </td>

                    <td style={tdStyle}>
                      {ticket.sold}
                    </td>

                    <td style={tdStyle}>
                      ₹
                      {ticket.revenue.toLocaleString(
                        'en-IN'
                      )}
                    </td>

                    <td style={tdStyle}>
  <div style={{ width: '120px' }}>
    <div
      style={{
        height: '8px',
        background: '#E2E8F0',
        borderRadius: '999px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${ticket.percentage}%`,
          height: '100%',
          background: '#4F46E5',
        }}
      />
    </div>

    <div
      style={{
        fontSize: '12px',
        marginTop: '6px',
      }}
    >
      {ticket.percentage}%
    </div>
  </div>
</td>

                    <td style={tdStyle}>
                      <span
  style={{
    background:
      ticket.available === 0
        ? '#FEE2E2'
        : '#DCFCE7',

    color:
      ticket.available === 0
        ? '#DC2626'
        : '#15803D',

    padding:'6px 12px',
    borderRadius:'999px',
    fontSize:'12px',
    fontWeight:600
  }}
>
  {ticket.available === 0
    ? 'Sold Out'
    : 'Active'}
</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  title,
  value,
}) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #E2E8F0',
        borderRadius: '20px',
        padding: '24px',
      }}
    >
      <div
        style={{
          color: '#64748B',
          fontSize: '14px',
          marginBottom: '12px',
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: '32px',
          fontWeight: 700,
          color: '#0F172A',
        }}
      >
        {value}
      </div>
    </div>
  );
}

const thStyle = {
  textAlign: 'left',
  padding: '16px',
  borderBottom: '1px solid #E2E8F0',
};

const tdStyle = {
  padding: '16px',
};