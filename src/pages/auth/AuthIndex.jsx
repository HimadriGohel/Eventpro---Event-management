import { Icon } from '../../components/ui/Icon';
import { useGo } from '../../hooks/useGo';

export default function AuthIndex() {
  const go = useGo();
  const groups = [
    {
      t: "Sign in & passwords", c: "#1E40AF",
      items: [
        { id: "login",        n: "01", t: "Login",                d: "Email / OTP / social", icon: "lock" },
        { id: "signup",       n: "02", t: "Sign up",              d: "Role-aware multi-step", icon: "user" },
        { id: "auth-forgot",  n: "03", t: "Forgot password",      d: "Email or phone reset", icon: "mail" },
        { id: "auth-reset",   n: "04", t: "Reset password",       d: "Strength meter + checklist", icon: "lock" },
      ],
    },
    {
      t: "Verification", c: "#10B981",
      items: [
        { id: "auth-otp",     n: "05", t: "OTP verification",     d: "6-digit code, auto-detect", icon: "phone" },
        { id: "auth-phone",   n: "06", t: "Phone verification",   d: "Country selector + benefits", icon: "phone" },
        { id: "auth-email",   n: "07", t: "Email verification",   d: "Inbox illustration + resend", icon: "mail" },
        { id: "auth-success", n: "08", t: "Verification success", d: "Confetti + celebration", icon: "check" },
      ],
    },
    {
      t: "Account states", c: "#F59E0B",
      items: [
        { id: "auth-pending",       n: "09", t: "Account pending",   d: "Creator under review", icon: "clock" },
        { id: "auth-blocked",       n: "10", t: "Blocked / suspended", d: "Reason + appeal CTA", icon: "info" },
        { id: "auth-session",       n: "11", t: "Session expired",   d: "Soft timeout modal", icon: "clock" },
        { id: "auth-unauthorized",  n: "12", t: "Unauthorized",      d: "Shield 401 page", icon: "lock" },
      ],
    },
    {
      t: "Creator KYC", c: "#7C3AED",
      items: [
        { id: "auth-creator",     n: "13", t: "Creator verification required", d: "Why & what unlocks", icon: "trophy" },
        { id: "auth-kyc-intro",   n: "14", t: "KYC intro",          d: "Why we verify + timeline", icon: "info" },
        { id: "auth-kyc-upload",  n: "15", t: "KYC upload",         d: "Drag-drop + progress", icon: "download" },
        { id: "auth-review",      n: "16", t: "Under review",       d: "Live status checklist", icon: "clock" },
        { id: "auth-rejected",    n: "17", t: "Rejected",           d: "Friendly fix-and-retry", icon: "info" },
      ],
    },
    {
      t: "Onboarding & security", c: "#EC4899",
      items: [
        { id: "auth-welcome",     n: "18", t: "Welcome onboarding",   d: "Launch first event", icon: "sparkle" },
        { id: "auth-role",        n: "19", t: "Role selection",       d: "Attendee vs creator", icon: "users" },
        { id: "auth-logout",      n: "20", t: "Logout confirmation",  d: "Modal with remember-me", icon: "lock" },
        { id: "auth-multidevice", n: "21", t: "Multi-device warning", d: "Sign-in alert + sessions", icon: "phone" },
        { id: "auth-security",    n: "22", t: "Security settings",    d: "Full account dashboard", icon: "settings" },
      ],
    },
  ];

  return (
    <div className="page-enter" style={{ paddingBottom: 80 }}>
      <section style={{ padding: "60px 0 32px", background: "var(--grad-hero)" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 880 }}>
          <span className="eyebrow">Authentication module · 22 screens</span>
          <h1 className="display" style={{ fontSize: "clamp(40px, 5vw, 72px)" }}>
            The full <span className="serif" style={{ color: "var(--accent)" }}>auth</span> story.
          </h1>
          <p className="lead" style={{ maxWidth: 660 }}>
            Every screen between "I want in" and "I'm signed in for life" — sign-in, OTP, KYC, account states, security. All consistent with the public site, all interactive.
          </p>
        </div>
      </section>

      <section style={{ padding: "32px 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          {groups.map(g => (
            <div key={g.t}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ width: 10, height: 10, borderRadius: 999, background: g.c }} />
                <h2 className="h2" style={{ fontSize: 22 }}>{g.t}</h2>
                <span style={{ fontSize: 12, color: "var(--ink-soft)", fontFamily: "Geist Mono" }}>{g.items.length} screens</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
                {g.items.map(it => (
                  <button key={it.id} onClick={() => go(it.id)} className="card sitemap-card" style={{
                    padding: 18, textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", gap: 10, minHeight: 150, position: "relative",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <span style={{ fontFamily: "Geist Mono", fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.06em" }}>{it.n}</span>
                      <Icon name="arrow" size={14} style={{ color: "var(--ink-soft)", transform: "rotate(-45deg)" }} />
                    </div>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: g.c + "1A", color: g.c, display: "grid", placeItems: "center" }}>
                      <Icon name={it.icon} size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{it.t}</div>
                      <div style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 4, lineHeight: 1.4 }}>{it.d}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
