import { Icon } from './Icon';

const SIZE_TO_H = { lg: 220, sm: 140, md: 180 };

export function EventCard({ event, onClick, size = 'md' }) {
  const h = SIZE_TO_H[size] || SIZE_TO_H.md;
  return (
    <div
      onClick={onClick}
      className="card hover-lift feature-card"
      style={{ cursor: 'pointer', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ height: h, position: 'relative', overflow: 'hidden' }}>
        <img
          src={event.img}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 600ms cubic-bezier(.2,.7,.2,1)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55))',
          }}
        />
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
          <span className="badge" style={{ background: 'rgba(255,255,255,0.92)', color: 'var(--ink)' }}>
            {event.category}
          </span>
          {event.trending && (
            <span className="badge badge-coral" style={{ background: 'rgba(255,107,107,0.95)', color: 'white' }}>
              🔥 Trending
            </span>
          )}
        </div>
        <div style={{ position: 'absolute', top: 12, right: 12 }}>
          <button
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              border: 'none',
              background: 'rgba(255,255,255,0.92)',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              color: 'var(--ink)',
            }}
          >
            <Icon name="bookmark" size={14} />
          </button>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            color: 'white',
            fontSize: 12,
            display: 'flex',
            gap: 12,
            opacity: 0.95,
          }}
        >
          <span>
            <Icon name="calendar" size={12} style={{ verticalAlign: -2, marginRight: 4 }} />
            {event.date}
          </span>
          <span>
            <Icon name="pin" size={12} style={{ verticalAlign: -2, marginRight: 4 }} />
            {event.city}
          </span>
        </div>
      </div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <h3 className="h4" style={{ textWrap: 'pretty' }}>{event.title}</h3>
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>by {event.organizer}</div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>
            {event.free || event.price === 0 ? (
              <span style={{ color: 'var(--accent-3)' }}>Free</span>
            ) : (
              <>₹{event.price.toLocaleString()}</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
