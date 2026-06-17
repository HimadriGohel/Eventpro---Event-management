import React from 'react';
import { Icon } from './Icon';

export function Field({ label, hint, error, children, style, icon }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <span className="label">{label}</span>}
      <div style={{ position: 'relative' }}>
        {icon && (
          <span
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--muted)',
              pointerEvents: 'none',
            }}
          >
            <Icon name={icon} size={16} />
          </span>
        )}
        {React.cloneElement(children, {
          className: `input ${children.props.className || ''}`.trim(),
          style: {
            ...(icon ? { paddingLeft: 38 } : {}),
            ...(error ? { borderColor: 'var(--accent)' } : {}),
            ...(children.props.style || {}),
          },
        })}
      </div>
      {(hint || error) && (
        <span style={{ fontSize: 12, color: error ? 'var(--accent)' : 'var(--muted)' }}>
          {error || hint}
        </span>
      )}
    </label>
  );
}
