import { Button } from '../../components/ui/Button';
import { AuthCenter, IconBadge, StepProgress } from '../../components/auth/shared';
import { useGo } from '../../hooks/useGo';

export default function VerificationReview() {
  const go = useGo();
  return (
    <AuthCenter navigate={go} max={620} accent="#3B82F6">
      <div className="card" style={{ padding: 40, boxShadow: "var(--shadow-xl)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 18, marginBottom: 28 }}>
          <div style={{ position: "relative" }}>
            <IconBadge icon="clock" color="#3B82F6" soft="#DBEAFE" size={64} />
            <span style={{ position: "absolute", inset: 0, borderRadius: 999, border: "2px solid #3B82F6", animation: "pulse-ring 2s infinite", opacity: 0.4 }} />
          </div>
          <div style={{ flex: 1 }}>
            <span className="badge" style={{ background: "#DBEAFE", color: "#1E40AF" }}>● In review</span>
            <h1 className="h1" style={{ fontSize: 26, marginTop: 8 }}>We're <span className="serif" style={{ color: "#3B82F6" }}>checking</span> your documents.</h1>
            <p style={{ color: "var(--ink-soft)", fontSize: 14, marginTop: 8 }}>Most reviews finish within <strong style={{ color: "var(--ink)" }}>24 hours</strong>. We'll email you the moment a decision is made.</p>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <StepProgress steps={["Submitted", "Auto-check", "Manual review", "Decision"]} current={2} />
        </div>

        <div style={{ padding: 18, background: "var(--bg-2)", borderRadius: 14, marginBottom: 22 }}>
          <span className="eyebrow" style={{ fontSize: 10, marginBottom: 10, display: "block" }}>Submitted</span>
          {[
            ["PAN card", "Verified", "#10B981"],
            ["Government ID", "Verified", "#10B981"],
            ["Bank account proof", "Reviewing", "#3B82F6"],
            ["GST certificate", "Optional · skipped", "var(--muted)"],
          ].map(([t, s, c], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 3 ? "1px solid var(--hairline)" : "none", fontSize: 13 }}>
              <span>{t}</span>
              <span style={{ color: c, fontWeight: 540, fontSize: 12 }}>● {s}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Button variant="primary" iconRight="arrow" onClick={() => go("explore")} style={{ flex: 1 }}>Explore the platform</Button>
          <Button variant="ghost" onClick={() => go("contact")}>Contact support</Button>
        </div>
      </div>
    </AuthCenter>
  );
}
