/* Decorative floating squares + circles used behind hero cards. */

export function FloatingShapes({ tone = 'blue' }) {
  const c =
    tone === 'blue'
      ? '#3B82F6'
      : tone === 'amber'
        ? '#F59E0B'
        : tone === 'emerald'
          ? '#10B981'
          : '#EC4899';
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <span
        className="float-1"
        style={{
          position: 'absolute',
          top: '12%',
          right: '8%',
          width: 14,
          height: 14,
          borderRadius: 4,
          background: c + '80',
          transform: 'rotate(20deg)',
        }}
      />
      <span
        className="float-2"
        style={{
          position: 'absolute',
          top: '70%',
          left: '10%',
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: c + '55',
        }}
      />
      <span
        className="float-3"
        style={{
          position: 'absolute',
          top: '30%',
          left: '6%',
          width: 18,
          height: 18,
          borderRadius: 6,
          background: c + '30',
          transform: 'rotate(45deg)',
        }}
      />
      <span
        className="float-1"
        style={{
          position: 'absolute',
          bottom: '14%',
          right: '12%',
          width: 22,
          height: 22,
          borderRadius: 999,
          border: `2px solid ${c}66`,
        }}
      />
    </div>
  );
}
