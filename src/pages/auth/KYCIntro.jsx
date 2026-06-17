import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { AuthCenter, IconBadge, StepProgress } from '../../components/auth/shared';
import { useGo } from '../../hooks/useGo';

export default function KYCIntro() {
  const go = useGo();
  const sections = [
    { i: "lock",    t: "Security",            b: "Bank-grade encryption.\nDocs are stored on RBI-licensed infrastructure and deleted post-approval." },
    { i: "ticket",  t: "Payment protection",  b: "Verified bank rails.\nPayouts settle daily once you go live, with instant chargeback resolution." },
    { i: "trophy",  t: "Platform trust",      b: "Buyers see your blue check.\nVerified creators earn 2.4× more in their first 30 days." },
  ];
  const timeline = [
    { t: "Submit documents", s: "~ 4 min", icon: "download" },
    { t: "Automated checks", s: "~ 15 min", icon: "bolt" },
    { t: "Manual review",    s: "Within 24 h", icon: "user" },
    { t: "You're live",       s: "Instant", icon: "check" },
  ];
  return (
    <AuthCenter navigate={go} max={760}>
      <div className="card" style={{ padding: 40, boxShadow: "var(--shadow-xl)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <IconBadge icon="lock" color="#1E40AF" soft="var(--primary-tint)" size={56} />
          <div>
            <span className="eyebrow">Step 1 of 4 · KYC introduction</span>
            <h1 className="h1" style={{ fontSize: 30, marginTop: 6 }}>Why we verify <span className="serif" style={{ color: "var(--primary)" }}>creators.</span></h1>
          </div>
        </div>

        <div style={{ marginBottom: 32 }}>
          <StepProgress steps={["Intro", "Documents", "Bank", "Review"]} current={0} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
          {sections.map(s => (
            <div key={s.t} style={{ padding: 18, background: "var(--bg-2)", borderRadius: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--surface)", color: "var(--primary)", display: "grid", placeItems: "center", marginBottom: 10 }}>
                <Icon name={s.i} size={16} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{s.t}</div>
              <div style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.5, whiteSpace: "pre-line" }}>{s.b}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 28 }}>
          <span className="eyebrow" style={{ marginBottom: 16, display: "block" }}>Approximate timeline</span>
          <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
            <div style={{ position: "absolute", top: 16, left: 16, right: 16, height: 2, background: "var(--hairline)", borderRadius: 999 }} />
            {timeline.map((t, i) => (
              <div key={i} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1 }}>
                <div style={{ width: 32, height: 32, borderRadius: 999, background: "var(--surface)", border: "2px solid var(--primary)", color: "var(--primary)", display: "grid", placeItems: "center", zIndex: 1 }}>
                  <Icon name={t.icon} size={13} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 540, textAlign: "center" }}>{t.t}</div>
                <div style={{ fontSize: 11, color: "var(--ink-soft)" }}>{t.s}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <Button variant="ghost" onClick={() => go("auth-creator")}>Back</Button>
          <Button variant="primary" size="lg" iconRight="arrow" onClick={() => go("auth-kyc-upload")} style={{ flex: 1 }}>I'm ready — upload documents</Button>
        </div>
      </div>
    </AuthCenter>
  );
}
