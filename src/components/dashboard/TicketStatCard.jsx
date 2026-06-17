import React from 'react';

export default function TicketStatCard({
  title,
  value,
  growth,
}) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #E2E8F0',
        borderRadius: 20,
        padding: 24,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <span
          style={{
            color: '#64748B',
            fontSize: 14,
          }}
        >
          {title}
        </span>

        {growth && (
          <span
            style={{
              color: '#16A34A',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            ↑ {growth}
          </span>
        )}
      </div>

      <h2
        style={{
          margin: 0,
          fontSize: 36,
        }}
      >
        {value}
      </h2>
    </div>
  );
}