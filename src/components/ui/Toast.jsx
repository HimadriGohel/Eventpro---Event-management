import { useToastStore } from '../../stores/toastStore';
import { Icon } from './Icon';

/* Renders the toast queue from the Zustand store. */
export function ToastProvider({ children }) {
  const toasts = useToastStore((s) => s.toasts);
  return (
    <>
      {children}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1000 }}>
        {toasts.map((t, i) => (
          <div
            key={t.id}
            className="toast"
            style={{ bottom: 32 + i * 56, pointerEvents: 'auto' }}
          >
            {t.icon && <Icon name={t.icon} size={14} style={{ marginRight: 8, verticalAlign: -2 }} />}
            {t.msg}
          </div>
        ))}
      </div>
    </>
  );
}
