import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { AuthCenter, StatusCard, ConfettiBG } from '../../components/auth/shared';
import { useGo } from '../../hooks/useGo';

export default function VerifySuccess() {
  const go = useGo();
  return (
    <AuthCenter navigate={go} accent="#10B981">
      <ConfettiBG />
      <StatusCard
        icon="check" color="#10B981" soft="var(--success-soft)" glow
        eyebrow="Verified"
        title={<>You're <span className="serif" style={{ color: "#10B981" }}>ready</span> to go.</>}
        body="Phone & email verified, account fully activated. Let's get you set up."
        primary={<Button variant="primary" size="lg" iconRight="arrow" onClick={() => go("auth-welcome")}>Continue setup</Button>}
        secondary={<Button variant="ghost" size="lg" onClick={() => go("explore")}>Explore events instead</Button>}
      >
        {/* Animated check ring */}
        <div style={{ display: "flex", gap: 6, marginTop: -8 }}>
          {["Phone verified", "Email confirmed", "Account ready"].map(t => (
            <span key={t} className="badge badge-emerald" style={{ padding: "5px 12px", fontSize: 11 }}>
              <Icon name="check" size={10} stroke={3} /> {t}
            </span>
          ))}
        </div>
      </StatusCard>
    </AuthCenter>
  );
}
