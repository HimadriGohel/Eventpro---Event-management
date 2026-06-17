import { useState } from 'react';
import './styles.css';

/* Floating Tweaks panel shell. Toggle-open via the launcher pill. */
export function TweaksPanel({ title = 'Tweaks', children }) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button type="button" className="twk-launcher" onClick={() => setOpen(true)}>
        ✦ {title}
      </button>
    );
  }

  return (
    <div className="twk-panel" data-noncommentable="">
      <div className="twk-hd">
        <b>{title}</b>
        <button
          className="twk-x"
          aria-label="Close tweaks"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>
      </div>
      <div className="twk-body">{children}</div>
    </div>
  );
}
