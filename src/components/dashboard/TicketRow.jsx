export default function TicketRow({
  ticket,
}) {
  const percent =
    ticket.qty > 0
      ? Math.round(
          (ticket.sold /
            ticket.qty) *
            100
        )
      : 0;

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #E2E8F0',
        borderRadius: 20,
        padding: 24,
        marginBottom: 18,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            '2fr 120px 220px 150px 120px',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
            }}
          >
            {ticket.ticketName}
          </h3>

          <div
            style={{
              color: '#64748B',
              fontSize: 13,
            }}
          >
            {ticket.eventName}
          </div>
        </div>

        <div>
          ₹
          {ticket.price.toLocaleString(
            'en-IN'
          )}
        </div>

        <div>
          <div
            style={{
              display: 'flex',
              justifyContent:
                'space-between',
              marginBottom: 6,
            }}
          >
            <span>
              {ticket.sold}/
              {ticket.qty}
            </span>

            <span>
              {percent}%
            </span>
          </div>

          <div
            style={{
              height: 8,
              background: '#E2E8F0',
              borderRadius: 999,
            }}
          >
            <div
              style={{
                width: `${percent}%`,
                height: '100%',
                background:
                  '#4F46E5',
                borderRadius: 999,
              }}
            />
          </div>
        </div>

        <div>
          ₹
          {ticket.revenue.toLocaleString(
            'en-IN'
          )}
        </div>

        <div>
          <button
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            ⚙
          </button>
        </div>
      </div>
    </div>
  );
}