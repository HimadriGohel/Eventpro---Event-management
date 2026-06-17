import { useState } from 'react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';

export default function DashboardScanner() {
  const [selectedEvent, setSelectedEvent] =
    useState('Future Tech 2026');

  const recentScans = [
    {
      name: 'Rahul Patel',
      ticket: 'VIP Pass',
      time: '10:25 AM',
      status: 'Valid',
    },
    {
      name: 'Priya Shah',
      ticket: 'General Pass',
      time: '10:31 AM',
      status: 'Valid',
    },
    {
      name: 'Amit Shah',
      ticket: 'VIP Pass',
      time: '10:42 AM',
      status: 'Duplicate',
    },
  ];

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
          overflowX: 'hidden',
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
            Workspace &gt; Scanner
          </div>

          <h1
            style={{
              margin: 0,
              marginTop: 8,
              fontSize: '42px',
              fontWeight: 700,
            }}
          >
            Ticket Scanner
          </h1>
        </div>
                                                                                                                      
        {/* Event Selector */}
        <div
          style={{
            marginBottom: '30px',
          }}
        >
          <select
            value={selectedEvent}
            onChange={(e) =>
              setSelectedEvent(e.target.value)
            }
            style={{
              width: '300px',
              height: '48px',
              borderRadius: '12px',
              border: '1px solid #CBD5E1',
              padding: '0 14px',
            }}
          >
            <option>
              Future Tech 2026
            </option>
            <option>
              Startup Summit
            </option>
            <option>
              Music Fest
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
            title="Total Check-ins"
            value="248"
          />

          <StatCard
            title="VIP Entries"
            value="64"
          />

          <StatCard
            title="Pending Guests"
            value="152"
          />

          <StatCard
            title="Rejected Scans"
            value="7"
          />
        </div>

        {/* Scanner Area */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '24px',
            marginBottom: '30px',
          }}
        >
          {/* Camera */}
          <div
            style={{
              background: '#fff',
              borderRadius: '20px',
              border: '1px solid #E2E8F0',
              padding: '24px',
            }}
          >
            <h2
              style={{
                marginTop: 0,
              }}
            >
              QR Scanner
            </h2>

            <div
              style={{
                height: '420px',
                border: '2px dashed #CBD5E1',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748B',
                fontSize: '18px',
              }}
            >
              Camera Scanner Area
            </div>

            <button
              style={{
                marginTop: '20px',
                background: '#4F46E5',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 20px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Start Scanner
            </button>
          </div>

          {/* Ticket Details */}
          <div
            style={{
              background: '#fff',
              borderRadius: '20px',
              border: '1px solid #E2E8F0',
              padding: '24px',
            }}
          >
            <h2
              style={{
                marginTop: 0,
              }}
            >
              Ticket Details
            </h2>

            <div
              style={{
                marginTop: '20px',
                lineHeight: '2',
              }}
            >
              <p>
                <strong>Name:</strong>{' '}
                Waiting...
              </p>

              <p>
                <strong>Email:</strong> -
              </p>

              <p>
                <strong>Ticket:</strong> -
              </p>

              <p>
                <strong>Status:</strong>{' '}
                Not Scanned
              </p>
            </div>
          </div>
        </div>

        {/* Recent Scans */}
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
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Ticket</th>
                <th style={thStyle}>Time</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentScans.map(
                (scan, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom:
                        '1px solid #E2E8F0',
                    }}
                  >
                    <td style={tdStyle}>
                      {scan.name}
                    </td>

                    <td style={tdStyle}>
                      {scan.ticket}
                    </td>

                    <td style={tdStyle}>
                      {scan.time}
                    </td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          background:
                            scan.status ===
                            'Valid'
                              ? '#DCFCE7'
                              : '#FEE2E2',

                          color:
                            scan.status ===
                            'Valid'
                              ? '#15803D'
                              : '#DC2626',

                          padding:
                            '6px 12px',

                          borderRadius:
                            '999px',

                          fontSize:
                            '12px',

                          fontWeight:
                            600,
                        }}
                      >
                        {scan.status}
                      </span>
                    </td>
                  </tr>
                )
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