import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { AuthCenter, StatusCard } from '../../components/auth/shared';
import { useGo } from '../../hooks/useGo';

export default function SessionExpired() {
  const go = useGo();
  return (
    <AuthCenter navigate={go} max={460}>
      <StatusCard
        icon="info" color="#3B82F6" soft="#DBEAFE"
        eyebrow="For your security"
        title={<>Your session has <span className="serif" style={{ color: "#3B82F6" }}>expired.</span></>}
        body="You've been signed out after 30 minutes of inactivity. Sign back in to pick up where you left off."
        primary={<Button variant="primary" size="lg" iconRight="arrow" onClick={() => go("login")}>Sign in again</Button>}
        secondary={<Button variant="ghost" size="lg" onClick={() => go("home")}>Back to home</Button>}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 12, background: "var(--bg-2)", borderRadius: 12, fontSize: 12, color: "var(--ink-soft)", width: "100%" }}>
          <Icon name="lock" size={14} />
          <span>We don't store your password between sessions. Your data stays safe.</span>
        </div>
      </StatusCard>
    </AuthCenter>
  );
}
