import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { AuthCenter, IconBadge, StepProgress } from '../../components/auth/shared';
import { useGo } from '../../hooks/useGo';

export default function AccountPending() {
  const go = useGo();
  return (
    <AuthCenter navigate={go} max={560} accent="#F59E0B">
      <div className="card" style={{ padding: 40, boxShadow: "var(--shadow-xl)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 28 }}>
          <IconBadge icon="info" color="#F59E0B" soft="var(--warning-soft)" size={64} />
          <div style={{ flex: 1 }}>
            <span className="badge badge-amber" style={{ marginBottom: 8 }}>● Under review</span>
            <h1 className="h1" style={{ fontSize: 26 }}>Your account is <span className="serif" style={{ color: "#F59E0B" }}>under review.</span></h1>
            <p style={{ color: "var(--ink-soft)", fontSize: 14, marginTop: 8 }}>
              Hi Aanya — we received your creator application. Our trust team usually reviews within <strong style={{ color: "var(--ink)" }}>1–2 business days</strong>.
            </p>
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <StepProgress steps={["Submitted", "In review", "Decision", "Live"]} current={1} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 18, background: "var(--bg-2)", borderRadius: 14, marginBottom: 24 }}>
          <span className="eyebrow" style={{ fontSize: 10 }}>What happens next</span>
          {[
            ["We verify your business documents and PAN", "check"],
            ["Identity check on the primary contact", "user"],
            ["Decision delivered to your registered email", "mail"],
          ].map(([t, i], k) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13 }}>
              <span style={{ width: 22, height: 22, borderRadius: 999, background: "var(--surface)", color: "var(--primary)", display: "grid", placeItems: "center" }}>
                <Icon name={i} size={11} />
              </span>
              {t}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Button variant="primary" iconRight="arrow" onClick={() => go("explore")} style={{ flex: 1 }}>Explore events while you wait</Button>
          <Button variant="ghost" onClick={() => go("contact")}>Contact support</Button>
        </div>
      </div>
    </AuthCenter>
  );
}
