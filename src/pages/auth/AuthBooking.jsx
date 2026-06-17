import { useState } from 'react';
import { Icon } from '../../components/ui/Icon';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import { Modal, OTPInput } from '../../components/auth/shared';
import { useGo } from '../../hooks/useGo';

export default function AuthBooking() {
  const go = useGo();
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(["","","","","",""]);

  return (
    <div style={{ minHeight: "100vh", position: "relative", background: "var(--bg)" }}>
      {/* Faux event behind */}
      <div style={{ position: "absolute", inset: 0,
        background: `linear-gradient(180deg, rgba(14,11,46,0.4), rgba(14,11,46,0.85)), url(https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=70) center/cover`,
        filter: "blur(2px)",
      }} />
      <div className="container" style={{ position: "relative", paddingTop: 40, color: "white", opacity: 0.7, pointerEvents: "none" }}>
        <Logo color="white" />
        <h2 style={{ marginTop: 80, fontSize: 32, maxWidth: 520 }}>Neo Rave: Midnight Bloom</h2>
        <div style={{ marginTop: 8, fontSize: 14, opacity: 0.7 }}>Sat 14 Jun · Famous Studios, Mumbai</div>
      </div>

      <Modal open={true} onClose={() => go("event")}>
        <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ width: 32, height: 32, borderRadius: 8, background: "var(--accent)", color: "white", display: "grid", placeItems: "center" }}>
                <Icon name="ticket" size={14} />
              </span>
              <span className="eyebrow">Almost there</span>
            </div>
            <h2 className="h2" style={{ fontSize: 24 }}>Sign in to <span className="serif" style={{ color: "var(--accent)" }}>book your ticket.</span></h2>
            <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6 }}>Quickest way: phone OTP. We'll save your details for next time.</p>
          </div>

          {step === 1 ? (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label className="label">Phone number</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <select className="input" style={{ width: 100, flexShrink: 0 }}><option>+91</option><option>+971</option><option>+65</option></select>
                  <input className="input" inputMode="numeric" placeholder="98765 43210" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g,"").slice(0,10))} style={{ flex: 1 }} autoFocus />
                </div>
              </div>
              <Button variant="primary" size="lg" iconRight="arrow" disabled={phone.length < 10} style={{ opacity: phone.length < 10 ? 0.5 : 1 }} onClick={() => setStep(2)}>
                Send code
              </Button>

              <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "var(--ink-soft)" }}>
                <span style={{ flex: 1, height: 1, background: "var(--hairline)" }} /> OR <span style={{ flex: 1, height: 1, background: "var(--hairline)" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button className="btn btn-ghost" style={{ justifyContent: "center" }}><Icon name="google" size={14} /> Continue with Google</button>
                <button className="btn btn-ghost" style={{ justifyContent: "center" }}><Icon name="apple" size={14} /> Continue with Apple</button>
              </div>
            </>
          ) : (
            <>
              <div style={{ padding: 12, background: "var(--primary-tint)", borderRadius: 10, fontSize: 13, color: "var(--primary)" }}>
                Code sent to <strong>+91 {phone}</strong>. <button onClick={() => setStep(1)} style={{ background:"none", border:"none", color: "var(--primary)", textDecoration:"underline", cursor:"pointer", padding:0 }}>Change</button>
              </div>
              <OTPInput value={otp} onChange={setOtp} />
              <Button variant="primary" size="lg" iconRight="arrow" onClick={() => go("event")}>Verify & continue to checkout</Button>
            </>
          )}

          <div style={{ fontSize: 11, color: "var(--muted)", textAlign: "center" }}>
            <Icon name="lock" size={11} style={{ verticalAlign: "middle", marginRight: 4 }} />
            Quick booking · no password required · we'll only ask for full details if you create paid events.
          </div>
        </div>
      </Modal>
    </div>
  );
}
