import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { AuthCenter, IconBadge } from '../../components/auth/shared';
import { useGo } from '../../hooks/useGo';

export default function AccountBlocked() {
  const go = useGo();
  return (
    <AuthCenter navigate={go} max={520} accent="#EF4444">
      <div className="card" style={{ padding: 40, boxShadow: "var(--shadow-xl)", borderTop: "4px solid #EF4444" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 24 }}>
          <IconBadge icon="info" color="#EF4444" soft="var(--error-soft)" size={64} />
          <div style={{ flex: 1 }}>
            <span className="badge badge-coral" style={{ marginBottom: 8 }}>Action needed</span>
            <h1 className="h1" style={{ fontSize: 26 }}>Your account has been <span className="serif" style={{ color: "#EF4444" }}>suspended.</span></h1>
          </div>
        </div>

        <div style={{ padding: 18, background: "var(--error-soft)", borderRadius: 14, marginBottom: 22, color: "#7F1D1D" }}>
          <div style={{ fontSize: 12, fontFamily: "Geist Mono", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>Reason · Policy review</div>
          <div style={{ fontSize: 14, fontWeight: 540, marginBottom: 4 }}>Unusual ticket-sales activity on May 2, 2026</div>
          <div style={{ fontSize: 13, opacity: 0.85 }}>Your last 3 events were flagged by our fraud-detection system. Sign-in is paused until the review completes.</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24, fontSize: 13, color: "var(--ink-soft)" }}>
          <div style={{ display: "flex", gap: 10 }}>
            <Icon name="lock" size={14} style={{ marginTop: 2 }} />
            <span>While suspended, your event pages remain visible but tickets cannot be sold.</span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Icon name="info" size={14} style={{ marginTop: 2 }} />
            <span>You can submit an appeal or contact our trust team for a manual review.</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Button variant="primary" iconRight="arrow" onClick={() => go("contact")} style={{ flex: 1 }}>Submit an appeal</Button>
          <Button variant="ghost" onClick={() => go("contact")}>Contact support</Button>
        </div>

        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 18, textAlign: "center" }}>Reference ID · <span className="mono">EP-9F4C-2026</span></p>
      </div>
    </AuthCenter>
  );
}
