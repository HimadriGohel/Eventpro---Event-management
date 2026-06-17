import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { AuthCenter, IconBadge } from '../../components/auth/shared';
import { useGo } from '../../hooks/useGo';

export default function MultiDeviceWarning() {
  const go = useGo();
  const sessions = [
    { d: "MacBook Pro · Chrome",  loc: "Mumbai, IN",      t: "Now · this device",   ip: "103.21.58.12", current: true,  icon: "grid" },
    { d: "iPhone 15 · Safari",     loc: "Mumbai, IN",     t: "2 minutes ago",       ip: "103.21.58.12", icon: "phone" },
    { d: "Windows · Firefox",      loc: "Bengaluru, IN",  t: "12 minutes ago",      ip: "49.207.193.4", suspicious: true, icon: "grid" },
  ];
  return (
    <AuthCenter navigate={go} max={620} accent="#F59E0B">
      <div className="card" style={{ padding: 36, boxShadow: "var(--shadow-xl)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 22 }}>
          <IconBadge icon="info" color="#F59E0B" soft="var(--warning-soft)" size={56} />
          <div>
            <span className="badge badge-amber">Security alert</span>
            <h1 className="h1" style={{ fontSize: 24, marginTop: 8 }}>New sign-in <span className="serif" style={{ color: "#F59E0B" }}>detected.</span></h1>
            <p style={{ color: "var(--ink-soft)", fontSize: 14, marginTop: 6 }}>We noticed a new device signing into your account. Review the activity below.</p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
          {sessions.map((s, i) => (
            <div key={i} style={{
              padding: 16, borderRadius: 14,
              background: s.current ? "var(--primary-tint)" : s.suspicious ? "var(--warning-soft)" : "var(--bg-2)",
              border: s.current ? "1px solid var(--primary)" : s.suspicious ? "1px solid #F59E0B" : "1px solid transparent",
              display: "flex", gap: 14, alignItems: "center",
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: "var(--surface)",
                color: s.current ? "var(--primary)" : s.suspicious ? "#F59E0B" : "var(--ink-soft)",
                display: "grid", placeItems: "center",
              }}>
                <Icon name={s.icon} size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 540 }}>
                  {s.d}
                  {s.current && <span style={{ fontSize: 10, color: "var(--primary)", fontWeight: 700, letterSpacing: "0.06em" }}>● THIS DEVICE</span>}
                  {s.suspicious && <span style={{ fontSize: 10, color: "#F59E0B", fontWeight: 700, letterSpacing: "0.06em" }}>● UNUSUAL</span>}
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>{s.loc} · {s.t} · IP {s.ip}</div>
              </div>
              {!s.current && (
                <button className="btn btn-ghost btn-sm" style={{ color: s.suspicious ? "#EF4444" : "var(--ink-soft)" }}>
                  <Icon name="close" size={12} /> Sign out
                </button>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <Button variant="primary" iconRight="arrow" onClick={() => go("auth-security")} style={{ flex: 1 }}>Secure my account</Button>
          <Button variant="ghost" onClick={() => go("home")}>That was me</Button>
        </div>
      </div>
    </AuthCenter>
  );
}
