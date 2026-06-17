export function SectionHeader({ eyebrow, title, lead, action, align = 'left' }) {
  const isCenter = align === 'center';
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isCenter ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isCenter ? 'center' : 'end',
        gap: 24,
        marginBottom: 40,
        textAlign: align,
      }}
    >
      <div
        style={{
          maxWidth: 640,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          alignItems: isCenter ? 'center' : 'flex-start',
        }}
      >
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 className="h1" style={{ textWrap: 'balance' }}>{title}</h2>
        {lead && <p className="lead">{lead}</p>}
      </div>
      {action}
    </div>
  );
}
