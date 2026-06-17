import { Fragment, useEffect, useRef, useState } from 'react';
import { Icon } from '../ui/Icon';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { useWizardStore } from '../../stores/wizardStore';

/* --- Steps registry --- */
export const WIZARD_STEPS = [
  { id: 'event-create-start', n: 1, t: 'Event basics', i: 'sparkle' },
  { id: 'event-create-schedule', n: 2, t: 'Schedule', i: 'calendar' },
  { id: 'event-create-venue', n: 3, t: 'Venue', i: 'pin' },
  { id: 'event-create-tickets', n: 4, t: 'Tickets', i: 'ticket' },
  { id: 'event-create-preview', n: 5, t: 'Review', i: 'check' },
];

/* --- Autosave indicator: flashes Saving... briefly when the draft changes,
   then settles back to "Draft saved · just now". The store itself persists
   to localStorage synchronously, so this is purely visual. --- */
export const useAutosaveIndicator = () => {
  const draft = useWizardStore((s) => s.draft);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState('just now');
  const tRef = useRef(null);
  const firstRef = useRef(true);

  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false;
      return;
    }
    setSaving(true);
    if (tRef.current) clearTimeout(tRef.current);
    tRef.current = setTimeout(() => {
      setSaving(false);
      setSavedAt('just now');
    }, 500);
    return () => {
      if (tRef.current) clearTimeout(tRef.current);
    };
  }, [draft]);

  return { saving, savedAt };
};

/* ============== SHARED SHELL ============== */
export const WizardShell = ({
  children,
  navigate,
  stepId,
  draft,
  saving,
  savedAt,
  onContinue,
  onBack,
  continueLabel = 'Continue',
  canContinue = true,
  rightPanel,
}) => {
  const idx = WIZARD_STEPS.findIndex((s) => s.id === stepId);
  const step = WIZARD_STEPS[idx];
  const total = WIZARD_STEPS.length;
  const highestStep = useWizardStore((s) => s.step);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 30, padding: '16px 0',
        borderBottom: '1px solid var(--hairline)',
        background: 'color-mix(in oklab, var(--surface) 90%, transparent)',
        backdropFilter: 'blur(10px)',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Logo />
            <span style={{ width: 1, height: 18, background: 'var(--hairline)' }} />
            <span style={{ fontSize: 12, color: 'var(--ink-soft)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="sparkle" size={11} style={{ color: 'var(--primary)' }} />
              New event · <strong style={{ color: 'var(--ink)', fontWeight: 540 }}>{draft.name || 'Untitled'}</strong>
            </span>
          </div>

          {/* Autosave + step badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ink-soft)' }}>
              {saving
                ? <><span style={{ width: 8, height: 8, borderRadius: 999, background: '#F59E0B', animation: 'pulse-ring 1s infinite' }} /> Saving…</>
                : <><span style={{ width: 8, height: 8, borderRadius: 999, background: '#10B981' }} /> Draft saved · {savedAt}</>}
            </span>
            <button onClick={() => navigate('event-draft')} className="btn btn-ghost btn-sm">Save & exit</button>
          </div>
        </div>

        {/* Stepper */}
        <div className="container" style={{ marginTop: 14, display: 'flex', gap: 6, alignItems: 'center' }}>
          {WIZARD_STEPS.map((s, i) => {
            const done = i < idx, active = i === idx;
            const isLocked = s.n > highestStep;
            return (
              <Fragment key={s.id}>
                <button
                  onClick={() => {
                    if (!isLocked) navigate(s.id);
                  }}
                  disabled={isLocked}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 12px', borderRadius: 10,
                    background: active ? 'var(--ink)' : done ? 'var(--success-soft)' : 'var(--bg-2)',
                    color: active ? 'var(--bg)' : done ? '#10B981' : 'var(--ink-soft)',
                    border: 'none', cursor: isLocked ? 'not-allowed' : 'pointer', textAlign: 'left', minWidth: 0,
                    transition: 'all 200ms',
                    opacity: isLocked ? 0.5 : 1,
                  }}
                >
                  <span style={{
                    width: 24, height: 24, borderRadius: 999,
                    background: active ? 'var(--accent)' : done ? '#10B981' : 'var(--hairline)',
                    color: active || done ? 'white' : 'var(--ink-soft)',
                    display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700, fontFamily: 'Geist Mono',
                    flexShrink: 0,
                  }}>
                    {done ? <Icon name="check" size={11} stroke={3} /> : s.n}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 540, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.t}</span>
                </button>
                {i < WIZARD_STEPS.length - 1 && <span style={{ width: 8, height: 1, background: 'var(--hairline)', flexShrink: 0 }} />}
              </Fragment>
            );
          })}
        </div>
      </header>

      {/* Body */}
      <main style={{ flex: 1, padding: '32px 0 120px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: rightPanel ? '1.4fr 1fr' : 'minmax(0, 720px)', gap: 32, justifyContent: rightPanel ? 'stretch' : 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <span className="eyebrow">Step {step.n} of {total}</span>
              {children?.[0]}
            </div>
            {children?.slice(1)}
          </div>
          {rightPanel && <aside style={{ position: 'sticky', top: 140, alignSelf: 'start' }}>{rightPanel}</aside>}
        </div>
      </main>

      {/* Sticky footer */}
      <footer style={{
        position: 'sticky', bottom: 0, zIndex: 30, borderTop: '1px solid var(--hairline)',
        background: 'color-mix(in oklab, var(--surface) 92%, transparent)',
        backdropFilter: 'blur(10px)', padding: '14px 0',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <Button variant="ghost" onClick={onBack || (() => navigate(idx === 0 ? 'create' : WIZARD_STEPS[idx - 1].id))}>
            <Icon name="chevLeft" size={14} /> {idx === 0 ? 'Cancel' : `Back to ${WIZARD_STEPS[idx - 1].t}`}
          </Button>
          <div style={{ fontSize: 12, color: 'var(--ink-soft)', display: 'none' }} className="step-progress-text">
            {step.n} of {total} · {step.t}
          </div>
          <Button variant="primary" iconRight="arrow" onClick={onContinue} disabled={!canContinue} style={{ opacity: canContinue ? 1 : 0.5 }}>
            {continueLabel}
          </Button>
        </div>
      </footer>
    </div>
  );
};

/* --- Helpers --- */
export const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    style={{
      width: 44, height: 26, borderRadius: 999, border: 'none', cursor: 'pointer',
      background: checked ? 'var(--primary)' : 'var(--hairline)',
      position: 'relative', transition: 'all 200ms', padding: 0,
    }}>
    <span style={{
      position: 'absolute', top: 3, left: checked ? 21 : 3,
      width: 20, height: 20, borderRadius: 999, background: 'white',
      transition: 'left 200ms cubic-bezier(.2,.7,.2,1)',
      boxShadow: 'var(--shadow-sm)',
    }} />
  </button>
);

export const SegToggle = ({ value, onChange, options }) => (
  <div style={{ display: 'inline-flex', padding: 3, background: 'var(--bg-2)', borderRadius: 10, border: '1px solid var(--hairline)' }}>
    {options.map((o) => (
      <button key={o.id} type="button" onClick={() => onChange(o.id)} style={{
        padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 540,
        background: value === o.id ? 'var(--surface)' : 'transparent',
        color: value === o.id ? 'var(--ink)' : 'var(--ink-soft)',
        boxShadow: value === o.id ? 'var(--shadow-sm)' : 'none',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        {o.icon && <Icon name={o.icon} size={13} />} {o.label}
      </button>
    ))}
  </div>
);

export const RowField = ({ label, hint, children, error }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <label className="label">{label}</label>
    {children}
    {hint && !error && <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{hint}</span>}
    {error && <span style={{ fontSize: 12, color: 'var(--accent)' }}>{error}</span>}
  </div>
);

/* --- Decorative backgrounds used on the Success page --- */
export const ConfettiBG = () => (
  <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    {Array.from({ length: 28 }).map((_, i) => {
      const colors = ['#1E40AF', '#10B981', '#F59E0B', '#EC4899', '#7C3AED', '#3B82F6'];
      const c = colors[i % colors.length];
      const left = (i * 47) % 100;
      const top = (i * 31) % 100;
      const delay = (i * 0.13) % 2;
      return (
        <span key={i} style={{
          position: 'absolute',
          left: left + '%', top: top + '%',
          width: 8, height: 8 + (i % 4) * 3,
          background: c, borderRadius: i % 3 === 0 ? '50%' : 2,
          transform: `rotate(${i * 33}deg)`,
          opacity: 0.6,
          animation: `float ${4 + (i % 4)}s ease-in-out -${delay}s infinite`,
        }} />
      );
    })}
  </div>
);

export const FloatingShapes = ({ tone = 'blue' }) => {
  const c = tone === 'blue' ? '#3B82F6' : tone === 'amber' ? '#F59E0B' : tone === 'emerald' ? '#10B981' : '#EC4899';
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <span className="float-1" style={{ position: 'absolute', top: '12%', right: '8%', width: 14, height: 14, borderRadius: 4, background: c + '80', transform: 'rotate(20deg)' }} />
      <span className="float-2" style={{ position: 'absolute', top: '70%', left: '10%', width: 10, height: 10, borderRadius: '50%', background: c + '55' }} />
      <span className="float-3" style={{ position: 'absolute', top: '30%', left: '6%', width: 18, height: 18, borderRadius: 6, background: c + '30', transform: 'rotate(45deg)' }} />
      <span className="float-1" style={{ position: 'absolute', bottom: '14%', right: '12%', width: 22, height: 22, borderRadius: 999, border: `2px solid ${c}66` }} />
    </div>
  );
};

/* Default ticket fallback for the live preview if user clears everything. */
export const DEFAULT_PREVIEW_TICKET = {
  id: 't1',
  name: 'General Admission',
  type: 'paid',
  price: 1499,
  qty: 1800,
  perOrder: 4,
  fee: 'absorb',
  saleStart: '2026-04-01',
  saleEnd: '2026-06-14',
};
