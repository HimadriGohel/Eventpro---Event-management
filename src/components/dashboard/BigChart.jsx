/* Line + line chart used on dashboard home + event detail overview. */

export function BigChart() {
  const W = 720;
  const H = 220;
  const PAD = 24;
  const days = ['Apr 14', 'Apr 18', 'Apr 22', 'Apr 26', 'Apr 30', 'May 4', 'May 8', 'May 11'];
  const rev = [22, 28, 24, 32, 30, 42, 38, 52];
  const tix = [8, 12, 10, 16, 14, 22, 19, 28];
  const max = 60;
  const xy = (a, i) => [PAD + ((W - PAD * 2) / (a.length - 1)) * i, H - PAD - (a[i] / max) * (H - PAD * 2)];
  const path = (a) => a.map((_, i) => `${i === 0 ? 'M' : 'L'}${xy(a, i).join(',')}`).join(' ');
  const area = (a) =>
    `M${xy(a, 0).join(',')} ` +
    a.map((_, i) => `L${xy(a, i).join(',')}`).join(' ') +
    ` L${PAD + (W - PAD * 2)},${H - PAD} L${PAD},${H - PAD} Z`;

  const [hoverX, hoverY] = xy(rev, 6);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="g-rev" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Y grid */}
      {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
        <g key={i}>
          <line
            x1={PAD}
            y1={H - PAD - p * (H - PAD * 2)}
            x2={W - PAD}
            y2={H - PAD - p * (H - PAD * 2)}
            stroke="var(--hairline)"
            strokeDasharray="3 4"
          />
          <text x={4} y={H - PAD - p * (H - PAD * 2) + 4} fontSize="10" fill="var(--muted)" fontFamily="Geist Mono">
            {Math.round(max * p)}k
          </text>
        </g>
      ))}
      <path d={area(rev)} fill="url(#g-rev)" />
      <path d={path(rev)} fill="none" stroke="var(--primary)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d={path(tix)} fill="none" stroke="var(--accent-3)" strokeWidth="2.4" strokeDasharray="0" strokeLinecap="round" strokeLinejoin="round" />
      {rev.map((v, i) => {
        const [x, y] = xy(rev, i);
        return <circle key={i} cx={x} cy={y} r="3.5" fill="var(--surface)" stroke="var(--primary)" strokeWidth="2" />;
      })}
      {/* Hover marker */}
      <g>
        <line x1={hoverX} y1={PAD} x2={hoverX} y2={H - PAD} stroke="var(--ink-soft)" strokeDasharray="2 3" opacity="0.5" />
        <circle cx={hoverX} cy={hoverY} r="6" fill="var(--primary)" />
        <circle cx={hoverX} cy={hoverY} r="3" fill="white" />
        <g transform={`translate(${hoverX - 60},${hoverY - 50})`}>
          <rect width="120" height="38" rx="8" fill="var(--ink)" />
          <text x="10" y="15" fontSize="10" fill="rgba(255,255,255,0.6)" fontFamily="Geist Mono">
            MAY 8
          </text>
          <text x="10" y="30" fontSize="13" fill="white" fontWeight="600">
            ₹38,400 · 19 tickets
          </text>
        </g>
      </g>
      {/* X labels */}
      {days.map((d, i) => {
        const [x] = xy(rev, i);
        return (
          <text key={i} x={x} y={H - 6} fontSize="10" fill="var(--muted)" fontFamily="Geist Mono" textAnchor="middle">
            {d}
          </text>
        );
      })}
    </svg>
  );
}
