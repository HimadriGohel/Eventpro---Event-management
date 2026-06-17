import { useState } from 'react';
import { Icon } from '../../components/ui/Icon';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import { useGo } from '../../hooks/useGo';

export default function SecuritySettings() {
  const go = useGo();
  const [twoFA, set2FA] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [biometric, setBio] = useState(false);

  const Toggle = ({ on, onChange }) => (
    <button onClick={() => onChange(!on)} style={{
      width: 44, height: 24, borderRadius: 999, position: "relative",
      background: on ? "var(--primary)" : "var(--hairline)", border: "none", cursor: "pointer",
      transition: "background 200ms",
    }}>
      <span style={{
        position: "absolute", top: 2, left: on ? 22 : 2,
        width: 20, height: 20, borderRadius: 999, background: "white",
        boxShadow: "var(--shadow-sm)", transition: "left 200ms",
      }} />
    </button>
  );

  const Row = ({ icon, color, t, b, action, children }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 0", borderTop: "1px solid var(--hairline)" }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: (color || "var(--primary)") + "1A", color: color || "var(--primary)", display: "grid", placeItems: "center" }}>
        <Icon name={icon} size={16} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 540 }}>{t}</div>
        <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>{b}</div>
      </div>
      {children || (action && <button className="btn btn-ghost btn-sm">{action}</button>)}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div style={{ padding: "32px 0", borderBottom: "1px solid var(--hairline)", background: "var(--surface)" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button onClick={() => go("home")} className="btn btn-ghost btn-sm"><Icon name="chevLeft" size={14} /> Back</button>
            <div style={{ width: 1, height: 20, background: "var(--hairline)" }} />
            <Logo size={20} />
          </div>
          <span className="badge badge-emerald">● Account secure</span>
        </div>
      </div>

      <div className="container" style={{ padding: "40px 0", maxWidth: 880 }}>
        <div style={{ marginBottom: 28 }}>
          <span className="eyebrow">Account</span>
          <h1 className="h1" style={{ fontSize: 36, marginTop: 6 }}>Security <span className="serif" style={{ color: "var(--primary)" }}>settings.</span></h1>
          <p className="lead" style={{ marginTop: 8 }}>Manage how you sign in, where you're signed in, and what happens if something looks off.</p>
        </div>

        {/* Authentication */}
        <section className="card" style={{ padding: 28, marginBottom: 18 }}>
          <h2 className="h3" style={{ fontSize: 18, marginBottom: 4 }}>Authentication</h2>
          <p style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 8 }}>Set how you prove it's you.</p>
          <Row icon="lock" t="Password" b="Last changed 23 days ago" action="Change" />
          <Row icon="phone" color="#10B981" t="Two-factor authentication" b={twoFA ? "Active · SMS to +91 98765 43210" : "Off — add an extra layer of protection"}>
            <Toggle on={twoFA} onChange={set2FA} />
          </Row>
          <Row icon="user" color="#7C3AED" t="Biometric sign-in" b="Use Face ID or fingerprint on supported devices">
            <Toggle on={biometric} onChange={setBio} />
          </Row>
          <Row icon="mail" color="#F59E0B" t="Sign-in email alerts" b="Get an email whenever a new device signs in">
            <Toggle on={emailAlerts} onChange={setEmailAlerts} />
          </Row>
        </section>

        {/* Active sessions */}
        <section className="card" style={{ padding: 28, marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <h2 className="h3" style={{ fontSize: 18 }}>Active sessions</h2>
              <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 4 }}>3 devices currently signed in.</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => go("auth-multidevice")}>Sign out all</Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { d: "MacBook Pro · Chrome", l: "Mumbai · Now", current: true, i: "grid" },
              { d: "iPhone 15 · Safari",   l: "Mumbai · 2m ago", i: "phone" },
              { d: "iPad · EventPro app",  l: "Mumbai · Yesterday", i: "grid" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, background: s.current ? "var(--primary-tint)" : "var(--bg-2)", borderRadius: 12 }}>
                <Icon name={s.i} size={16} style={{ color: s.current ? "var(--primary)" : "var(--ink-soft)" }} />
                <div style={{ flex: 1, fontSize: 13 }}>
                  <div style={{ fontWeight: 540 }}>{s.d} {s.current && <span style={{ fontSize: 10, color: "var(--primary)", fontWeight: 700 }}>● ACTIVE</span>}</div>
                  <div style={{ fontSize: 11, color: "var(--ink-soft)" }}>{s.l}</div>
                </div>
                {!s.current && <button className="btn btn-ghost btn-sm">Sign out</button>}
              </div>
            ))}
          </div>
        </section>

        {/* Trusted devices + login history */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
          <section className="card" style={{ padding: 24 }}>
            <h2 className="h3" style={{ fontSize: 16 }}>Trusted devices</h2>
            <p style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 4, marginBottom: 12 }}>Skip 2-step verification on these.</p>
            {["MacBook Pro · Mumbai", "iPhone 15 · Mumbai"].map(d => (
              <div key={d} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", fontSize: 13, borderTop: "1px solid var(--hairline)" }}>
                {d} <button style={{ background: "none", border: "none", fontSize: 12, color: "var(--muted)", cursor: "pointer" }}>Remove</button>
              </div>
            ))}
          </section>
          <section className="card" style={{ padding: 24 }}>
            <h2 className="h3" style={{ fontSize: 16 }}>Recent activity</h2>
            <p style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 4, marginBottom: 12 }}>Last 7 days.</p>
            {[["Signed in", "MacBook · 2m ago", "#10B981"], ["Password changed", "23 days ago", "var(--ink-soft)"], ["Signed in", "iPhone · 1d ago", "#10B981"]].map(([t, s, c], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 13, borderTop: "1px solid var(--hairline)" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><span style={{ width: 6, height: 6, borderRadius: 999, background: c }} /> {t}</span>
                <span style={{ fontSize: 11, color: "var(--ink-soft)" }}>{s}</span>
              </div>
            ))}
          </section>
        </div>

        {/* Danger zone */}
        <section style={{ padding: 22, background: "var(--error-soft)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#7F1D1D" }}>Sign out of all devices</div>
            <div style={{ fontSize: 12, color: "#991B1B", marginTop: 4 }}>Use this if you suspect someone else has access. You'll need to sign in everywhere again.</div>
          </div>
          <Button onClick={() => go("login")} style={{ background: "#EF4444", color: "white" }}>Sign out everywhere</Button>
        </section>
      </div>
    </div>
  );
}
