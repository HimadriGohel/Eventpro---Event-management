import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { AuthCenter, ConfettiBG } from '../../components/auth/shared';
import { useGo } from '../../hooks/useGo';

export default function AuthApproved() {
  const go = useGo();
  return (
    <AuthCenter navigate={go} accent="#10B981">
      <ConfettiBG />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 26, textAlign: "center" }}>
        <div style={{ position: "relative" }}>
          <div style={{ width: 110, height: 110, borderRadius: 999, background: "linear-gradient(135deg, #10B981, #059669)", display: "grid", placeItems: "center", color: "white", boxShadow: "0 30px 60px -20px #10B98180" }}>
            <Icon name="check" size={48} stroke={3} />
          </div>
          <span style={{ position: "absolute", inset: -10, borderRadius: 999, border: "3px solid #10B981", animation: "pulse-ring 2s infinite", opacity: 0.4 }} />
        </div>

        <div>
          <span className="badge badge-emerald">● Verified creator</span>
          <h1 className="h1" style={{ fontSize: 36, marginTop: 14, textWrap: "balance" }}>You're <span className="serif" style={{ color: "#10B981" }}>verified.</span></h1>
          <p style={{ fontSize: 15, color: "var(--ink-soft)", marginTop: 12, maxWidth: 420 }}>
            Your KYC was approved. You can now publish public paid events, accept payments, and receive payouts.
          </p>
        </div>

        <div className="card" style={{ padding: 18, width: "100%", maxWidth: 460, display: "flex", flexDirection: "column", gap: 12, background: "var(--success-soft)", border: "1px solid #10B981" }}>
          <div style={{ fontSize: 11, color: "#065F46", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "Geist Mono", fontWeight: 600 }}>What's now unlocked</div>
          {[
            "Public paid events on the EventPro marketplace",
            "Daily settlement payouts to your bank",
            "Verified blue check on your creator profile",
            "Higher attendee limits (up to 50,000)",
          ].map(t => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#065F46" }}>
              <span style={{ width: 18, height: 18, borderRadius: 999, background: "#10B981", color: "white", display: "grid", placeItems: "center", flexShrink: 0 }}>
                <Icon name="check" size={11} stroke={3} />
              </span>
              {t}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <Button variant="primary" size="lg" iconRight="arrow" onClick={() => go("event-create-start")} style={{ background: "#10B981" }}>Create your first paid event</Button>
          <Button variant="ghost" size="lg" onClick={() => go("dashboard-empty")}>Go to dashboard</Button>
        </div>
      </div>
    </AuthCenter>
  );
}
