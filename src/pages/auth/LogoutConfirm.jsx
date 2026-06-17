import { useState } from 'react';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import { Modal, IconBadge } from '../../components/auth/shared';
import { useGo } from '../../hooks/useGo';
import { useLogout } from '../../api/auth';

export default function LogoutConfirm() {
  const go = useGo();
  const [remember, setRemember] = useState(true);
  const { mutate: logout, isPending } = useLogout();
  return (
    <div style={{ minHeight: "100vh", position: "relative", background: "var(--bg)" }}>
      {/* Faux background app */}
      <div style={{ position: "absolute", inset: 0, background: "var(--grad-hero)", opacity: 0.6 }} />
      <div className="container" style={{ position: "relative", paddingTop: 40, opacity: 0.4, pointerEvents: "none", filter: "blur(2px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <Logo />
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ width: 100, height: 36, background: "var(--surface)", borderRadius: 999 }} />
            <div style={{ width: 100, height: 36, background: "var(--surface)", borderRadius: 999 }} />
          </div>
        </div>
        <div className="card" style={{ height: 320, padding: 24 }} />
      </div>

      <Modal open={true} onClose={() => go("home")}>
        <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <IconBadge icon="lock" color="#1E40AF" soft="var(--primary-tint)" size={48} />
            <div>
              <h2 className="h2" style={{ fontSize: 20 }}>Sign out of EventPro?</h2>
              <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 4 }}>You'll need to sign in again to access your dashboard and tickets.</p>
            </div>
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: 10, padding: 14, background: "var(--bg-2)", borderRadius: 12, cursor: "pointer" }}>
            <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ accentColor: "var(--primary)", width: 16, height: 16 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 540 }}>Remember this device</div>
              <div style={{ fontSize: 11, color: "var(--ink-soft)" }}>Skip 2-step verification next time on this browser</div>
            </div>
          </label>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Button variant="ghost" onClick={() => go("home")}>Cancel</Button>
            <Button
              variant="primary"
              disabled={isPending}
              onClick={() => logout(undefined, { onSettled: () => go('login') })}
              style={{ background: '#EF4444' }}
            >
              {isPending ? 'Signing out…' : 'Sign out'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
