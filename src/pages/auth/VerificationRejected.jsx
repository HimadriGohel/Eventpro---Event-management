import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { AuthCenter, IconBadge } from '../../components/auth/shared';
import { useGo } from '../../hooks/useGo';

export default function VerificationRejected() {
  const go = useGo();
  const issues = [
    { t: "Government ID — image too blurry", b: "We couldn't read your name and DOB. Please re-upload a sharper photo." },
    { t: "Bank proof — name mismatch", b: "The name on the cancelled cheque doesn't match the PAN card name." },
  ];
  return (
    <AuthCenter navigate={go} max={580} accent="#F59E0B">
      <div className="card" style={{ padding: 40, boxShadow: "var(--shadow-xl)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 18, marginBottom: 24 }}>
          <IconBadge icon="info" color="#F59E0B" soft="var(--warning-soft)" size={64} />
          <div style={{ flex: 1 }}>
            <span className="badge badge-amber">Action needed</span>
            <h1 className="h1" style={{ fontSize: 26, marginTop: 8 }}>Almost there — a couple of <span className="serif" style={{ color: "#F59E0B" }}>fixes</span>.</h1>
            <p style={{ color: "var(--ink-soft)", fontSize: 14, marginTop: 8 }}>
              We couldn't approve your application as-is. Update the items below and resubmit — most fixes go through on the second try.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {issues.map((s, i) => (
            <div key={i} style={{ padding: 16, background: "var(--warning-soft)", borderRadius: 12, borderLeft: "3px solid #F59E0B" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#92400E", marginBottom: 4 }}>{s.t}</div>
              <div style={{ fontSize: 13, color: "#78350F", lineHeight: 1.5 }}>{s.b}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: 14, background: "var(--bg-2)", borderRadius: 12, fontSize: 12, color: "var(--ink-soft)", marginBottom: 22, display: "flex", gap: 10 }}>
          <Icon name="info" size={14} style={{ flexShrink: 0, marginTop: 2 }} />
          <span>Reference ID · <span className="mono" style={{ color: "var(--ink)" }}>EP-2C8B-2026</span> — quote this if you contact support.</span>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <Button variant="primary" iconRight="arrow" onClick={() => go("auth-kyc-upload")} style={{ flex: 1 }}>Re-upload documents</Button>
          <Button variant="ghost" onClick={() => go("contact")}>Get help</Button>
        </div>
      </div>
    </AuthCenter>
  );
}
