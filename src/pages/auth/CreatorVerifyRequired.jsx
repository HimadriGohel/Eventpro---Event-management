import { Icon } from '../../components/ui/Icon';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import { FloatingShapes } from '../../components/auth/shared';
import { useGo } from '../../hooks/useGo';

export default function CreatorVerifyRequired() {
  const go = useGo();
  const benefits = [
    { icon: "bolt",     t: "Sell paid public events", b: "Unlock listings on the public marketplace and accept payments." },
    { icon: "users",    t: "Higher attendee limits", b: "Scale to 10,000+ tickets per event with priority infrastructure." },
    { icon: "bar",      t: "Direct payouts to your bank", b: "Daily settlements once your event is live." },
    { icon: "trophy",   t: "Verified creator badge", b: "A blue check on your profile and event pages — buyers trust faster." },
  ];
  const docs = [
    "PAN card or business ID",
    "Bank account or UPI for payouts",
    "Government ID of the primary contact",
    "GST certificate (only if applicable)",
  ];
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div style={{ position: "relative", padding: "48px 0 24px", background: "var(--grad-hero)", overflow: "hidden" }}>
        <FloatingShapes tone="blue" />
        <div className="container" style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
          <button onClick={() => go("home")} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}><Logo /></button>
          <button onClick={() => go("home")} className="btn btn-ghost btn-sm">Skip for now</button>
        </div>
        <div className="container" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60, alignItems: "center", paddingBottom: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <span className="eyebrow">Creator verification · Required</span>
            <h1 className="display" style={{ fontSize: "clamp(40px, 4.5vw, 64px)" }}>
              One quick check before you go <span className="serif" style={{ color: "var(--primary)" }}>live.</span>
            </h1>
            <p className="lead" style={{ maxWidth: 520 }}>
              Verification protects your buyers and unlocks paid events, large attendee limits, and bank payouts.
              The whole thing takes about <strong style={{ color: "var(--ink)" }}>4 minutes</strong>.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
              <Button variant="primary" size="lg" iconRight="arrow" onClick={() => go("auth-kyc-intro")}>Start verification</Button>
              <Button variant="ghost" size="lg" onClick={() => go("create")}>Maybe later</Button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 8, fontSize: 12, color: "var(--ink-soft)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="lock" size={14} /> 256-bit encryption</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="check" size={14} /> RBI compliant</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="bolt" size={14} /> 24h decisions</span>
            </div>
          </div>
          {/* Right — verification preview card */}
          <div style={{ position: "relative" }}>
            <div className="card" style={{ padding: 24, boxShadow: "var(--shadow-xl)", display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className="eyebrow" style={{ fontSize: 10 }}>Creator profile</span>
                <span className="badge badge-amber">Unverified</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, #1E40AF, #7C3AED)", color: "white", display: "grid", placeItems: "center", fontWeight: 600, fontSize: 22 }}>P</div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>Phantom Records</div>
                  <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>Mumbai · Concerts & live music</div>
                </div>
              </div>
              <div style={{ height: 1, background: "var(--hairline)" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[["Free events", "✓ Available"], ["Paid events", "✗ Locked"], ["Up to 100 tickets", "✓ Available"], ["10,000+ tickets", "✗ Locked"], ["Direct payouts", "✗ Locked"], ["Verified badge", "✗ Locked"]].map(([t, s], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "var(--bg-2)", borderRadius: 10, fontSize: 12 }}>
                    <span style={{ color: "var(--ink-soft)" }}>{t}</span>
                    <span style={{ color: s.startsWith("✓") ? "#10B981" : "var(--muted)", fontWeight: 540 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card float-2" style={{ position: "absolute", bottom: -14, right: -14, padding: 12, display: "flex", alignItems: "center", gap: 10, boxShadow: "var(--shadow-lg)" }}>
              <div style={{ width: 32, height: 32, borderRadius: 999, background: "var(--success-soft)", color: "#10B981", display: "grid", placeItems: "center" }}>
                <Icon name="check" size={14} stroke={3} />
              </div>
              <div style={{ fontSize: 12 }}>
                <div style={{ fontWeight: 600 }}>+12 unlocks</div>
                <div style={{ color: "var(--ink-soft)" }}>after verification</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <h2 className="h2" style={{ fontSize: 32, marginBottom: 32 }}>What you'll unlock</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 48 }}>
            {benefits.map(b => (
              <div key={b.t} className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--primary-tint)", color: "var(--primary)", display: "grid", placeItems: "center" }}>
                  <Icon name={b.icon} size={20} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{b.t}</div>
                <div style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5 }}>{b.b}</div>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center", background: "var(--ink)", color: "white" }}>
            <div>
              <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>What we'll ask for</span>
              <h3 className="h3" style={{ color: "white", marginTop: 8 }}>Have these ready</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, marginTop: 8 }}>Photos or PDFs are fine — under 10 MB each. We delete sensitive scans after approval.</p>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {docs.map(d => (
                <li key={d} style={{ display: "flex", alignItems: "center", gap: 10, color: "white", fontSize: 14 }}>
                  <span style={{ width: 22, height: 22, borderRadius: 999, background: "rgba(16,185,129,0.2)", color: "#10B981", display: "grid", placeItems: "center" }}>
                    <Icon name="check" size={11} stroke={3} />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: 32, textAlign: "center" }}>
            <Button variant="primary" size="lg" iconRight="arrow" onClick={() => go("auth-kyc-intro")}>Start verification</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
