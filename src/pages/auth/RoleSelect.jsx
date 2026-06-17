import { useState } from 'react';
import { Icon } from '../../components/ui/Icon';
import { AuthCenter } from '../../components/auth/shared';
import { useGo } from '../../hooks/useGo';

export default function RoleSelect() {
  const go = useGo();
  const [hover, setHover] = useState(null);
  const cards = [
    {
      id: "attendee", t: "I'm here to attend", icon: "ticket",
      sub: "Book and manage event tickets",
      bullets: ["Discover concerts, workshops, food", "Save events and follow creators", "Mobile QR tickets, instant entry"],
      colour: "#F59E0B", target: "auth-otp",
    },
    {
      id: "creator", t: "I'm here to create", icon: "sparkle",
      sub: "Create and manage your own events",
      bullets: ["Sell tickets in 90 seconds", "Phone-as-scanner at the door", "Daily payouts to your bank"],
      colour: "#1E40AF", target: "auth-otp",
    },
  ];
  return (
    <AuthCenter navigate={go} max={920}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <span className="eyebrow">Step 1 of 4 · personalize your account</span>
        <h1 className="display" style={{ fontSize: "clamp(40px, 4.5vw, 60px)", marginTop: 12 }}>
          What brings you to <span className="serif" style={{ color: "var(--primary)" }}>EventPro?</span>
        </h1>
        <p className="lead" style={{ marginTop: 12 }}>Pick your starting point — you can switch later, both modes share one account.</p>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 20, maxWidth: 240, margin: "20px auto 0" }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i === 1 ? "var(--ink)" : "var(--hairline)" }} />
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {cards.map(c => {
          const active = hover === c.id;
          return (
            <button
              key={c.id}
              onMouseEnter={() => setHover(c.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => go(c.target)}
              className="card"
              style={{
                padding: 32, textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", gap: 16,
                border: `1.5px solid ${active ? c.colour : "var(--hairline)"}`,
                background: active ? "var(--surface)" : "var(--surface)",
                boxShadow: active ? `0 20px 50px -20px ${c.colour}55` : "var(--shadow-md)",
                transform: active ? "translateY(-4px) scale(1.01)" : "translateY(0)",
                transition: "all 240ms cubic-bezier(.2,.7,.2,1)",
                position: "relative", overflow: "hidden",
              }}
            >
              <div aria-hidden style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${c.colour}22, transparent 70%)`, transition: "transform 400ms", transform: active ? "scale(1.4)" : "scale(1)" }} />
              <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: c.colour, color: "white",
                  display: "grid", placeItems: "center",
                  transition: "transform 240ms",
                  transform: active ? "rotate(-6deg) scale(1.06)" : "rotate(0)",
                  boxShadow: `0 12px 30px -8px ${c.colour}80`,
                }}>
                  <Icon name={c.icon} size={26} />
                </div>
                <div>
                  <h2 className="h2" style={{ fontSize: 24 }}>{c.t}</h2>
                  <p style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 2 }}>{c.sub}</p>
                </div>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8, position: "relative" }}>
                {c.bullets.map(b => (
                  <li key={b} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--ink-soft)" }}>
                    <span style={{ width: 18, height: 18, borderRadius: 999, background: c.colour + "1A", color: c.colour, display: "grid", placeItems: "center" }}>
                      <Icon name="check" size={11} stroke={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid var(--hairline)", position: "relative" }}>
                <span style={{ fontSize: 13, color: c.colour, fontWeight: 600 }}>Continue as {c.t.replace("I'm here to ", "")}</span>
                <span style={{ width: 36, height: 36, borderRadius: 999, background: c.colour, color: "white", display: "grid", placeItems: "center", transition: "transform 240ms", transform: active ? "translateX(4px)" : "translateX(0)" }}>
                  <Icon name="arrow" size={16} stroke={2.4} />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </AuthCenter>
  );
}
