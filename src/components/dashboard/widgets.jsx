import { Icon } from '../ui/Icon';

export function Sparkline({ data, w = 110, h = 36, color = 'var(--primary)', fill = true }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`)
    .join(' ');
  const area = `0,${h} ${pts} ${w},${h}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      {fill && <polygon points={area} fill={color} opacity="0.12" />}
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function KPI({ label, value, delta, deltaPositive = true, spark, color = 'var(--primary)', icon }) {
  return (
    <div className="card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--ink-soft)', fontSize: 12, fontWeight: 500, marginBottom: 8 }}>
            {icon && <Icon name={icon} size={13} />}
            {label}
          </div>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em' }}>{value}</div>
        </div>
        {delta && (
          <span
            style={{
              fontSize: 11, fontWeight: 600,
              padding: '3px 8px', borderRadius: 999,
              background: deltaPositive ? 'var(--success-soft)' : 'var(--error-soft)',
              color: deltaPositive ? '#059669' : '#DC2626',
              display: 'inline-flex', alignItems: 'center', gap: 3,
            }}
          >
            <Icon
              name={deltaPositive ? 'arrowUp' : 'arrow'}
              size={11}
              style={deltaPositive ? {} : { transform: 'rotate(135deg)' }}
            />
            {delta}
          </span>
        )}
      </div>
      {spark && (
        <div style={{ marginTop: 4 }}>
          <Sparkline data={spark} color={color} w={260} h={42} />
        </div>
      )}
    </div>
  );
}

export function Donut({ size = 120, segments }) {
  const total = segments.reduce((a, b) => a + b.v, 0);
  const r = size / 2 - 12;
  const cx = size / 2;
  const cy = size / 2;
  const C = 2 * Math.PI * r;
  let off = 0;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--hairline)" strokeWidth="14" />
        {segments.map((s, i) => {
          const len = (s.v / total) * C;
          const node = (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={s.c}
              strokeWidth="14"
              strokeDasharray={`${len} ${C}`}
              strokeDashoffset={-off}
              strokeLinecap="round"
            />
          );
          off += len + 2;
          return node;
        })}
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>{total}</div>
          <div style={{ fontSize: 10, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>sold</div>
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ status }) {
  const map = {
    Published: { bg: 'var(--success-soft)', c: '#059669' },
    Scheduled: { bg: '#DBEAFE', c: '#1E40AF' },
    Draft: { bg: 'var(--warning-soft)', c: '#B45309' },
    'Sold Out': { bg: '#FEE2E2', c: '#DC2626' },
    Ended: { bg: '#F1F5F9', c: '#475569' },
    Cancelled: { bg: '#FEE2E2', c: '#DC2626' },
  };
  const m = map[status] || map.Draft;
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: 11, fontWeight: 600,
        padding: '3px 9px', borderRadius: 999,
        background: m.bg, color: m.c,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 999, background: m.c }} />
      {status}
    </span>
  );
}

export const fmtINR = (n) =>
  '₹' + (n >= 100000 ? (n / 100000).toFixed(n % 100000 === 0 ? 0 : 1) + 'L' : n.toLocaleString('en-IN'));
