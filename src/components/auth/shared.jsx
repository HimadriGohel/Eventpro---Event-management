/* Shared building blocks for the EventPro auth module screens */

import { useState, useEffect, useRef, Fragment } from 'react';
import { Icon } from '../ui/Icon';
import { Logo } from '../ui/Logo';
import { EVENTS } from '../../data/events';

/* Compact centered shell — used for status / error / single-action screens */
export const AuthCenter = ({ children, navigate, max = 520, accent }) => (
  <div style={{
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "var(--bg)",
    position: "relative",
    overflow: "hidden",
    padding: "32px 20px",
  }}>
    {/* Soft gradient backdrop */}
    <div aria-hidden style={{
      position: "absolute", inset: 0,
      background: "var(--grad-hero)",
      opacity: 0.9,
      pointerEvents: "none",
    }} />
    {accent !== false && (
      <div aria-hidden style={{
        position: "absolute", top: -120, right: -120, width: 480, height: 480, borderRadius: "50%",
        background: `radial-gradient(circle at center, ${accent || "#1E40AF"}22, transparent 70%)`, filter: "blur(40px)",
        pointerEvents: "none",
      }} />
    )}
    {/* Top mini-nav */}
    <div style={{
      position: "absolute", top: 24, left: 24, right: 24,
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <button onClick={() => navigate?.("home")} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
        <Logo />
      </button>
      <button onClick={() => navigate?.("login")} className="btn btn-ghost btn-sm">Back to login</button>
    </div>
    <div className="page-enter" style={{ width: "100%", maxWidth: max, position: "relative", zIndex: 1 }}>
      {children}
    </div>
  </div>
);

/* Big icon badge (used on status screens) */
export const IconBadge = ({ icon, color = "#1E40AF", soft, size = 88, pulse, glow }) => (
  <div style={{
    width: size, height: size, borderRadius: 999,
    background: soft || `${color}1A`,
    color,
    display: "grid", placeItems: "center",
    boxShadow: glow ? `0 0 0 12px ${color}10, 0 0 0 24px ${color}06` : "inset 0 0 0 1px " + color + "33",
    animation: pulse ? "pulse-ring 2s infinite" : "none",
    position: "relative",
  }}>
    <Icon name={icon} size={size * 0.42} stroke={2} />
  </div>
);

/* Reusable centered status card layout */
export const StatusCard = ({ icon, color, soft, eyebrow, title, body, primary, secondary, children, glow }) => (
  <div className="card" style={{
    padding: 40,
    display: "flex", flexDirection: "column", alignItems: "center", gap: 22,
    textAlign: "center",
    boxShadow: "var(--shadow-xl)",
    background: "var(--surface)",
  }}>
    <IconBadge icon={icon} color={color} soft={soft} glow={glow} />
    {eyebrow && <span className="eyebrow">{eyebrow}</span>}
    <h1 className="h1" style={{ fontSize: 32, textWrap: "balance" }}>{title}</h1>
    {body && <p className="lead" style={{ fontSize: 16, maxWidth: 420, textWrap: "pretty" }}>{body}</p>}
    {children}
    {(primary || secondary) && (
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginTop: 4, width: "100%" }}>
        {primary}
        {secondary}
      </div>
    )}
  </div>
);

/* OTP input with auto-advance, paste handling, focus glow */
export const OTPInput = ({ length = 6, value, onChange, autoFocus, error }) => {
  const refs = useRef([]);
  const set = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const arr = [...value]; arr[i] = v; onChange(arr);
    if (v && refs.current[i + 1]) refs.current[i + 1].focus();
  };
  const onKey = (i, e) => {
    if (e.key === "Backspace" && !value[i] && i > 0) refs.current[i - 1].focus();
    if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1].focus();
    if (e.key === "ArrowRight" && i < length - 1) refs.current[i + 1].focus();
  };
  const onPaste = e => {
    const t = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!t) return;
    e.preventDefault();
    const arr = Array.from({ length }, (_, i) => t[i] || "");
    onChange(arr);
    refs.current[Math.min(t.length, length - 1)]?.focus();
  };
  return (
    <div className="otp-row" style={{ display: "flex", gap: 10, justifyContent: "center" }}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={el => refs.current[i] = el}
          value={value[i] || ""}
          onChange={e => set(i, e.target.value)}
          onKeyDown={e => onKey(i, e)}
          onPaste={onPaste}
          autoFocus={autoFocus && i === 0}
          inputMode="numeric"
          maxLength={1}
          className="otp-cell"
          style={{
            width: 52, height: 60, borderRadius: 14, border: `1.5px solid ${error ? "#EF4444" : (value[i] ? "var(--primary)" : "var(--hairline-2)")}`,
            background: "var(--surface)",
            textAlign: "center", fontSize: 24, fontWeight: 600, fontFamily: "Geist Mono",
            color: "var(--ink)", outline: "none",
            transition: "border-color 160ms, box-shadow 160ms, transform 120ms",
            boxShadow: value[i] ? "0 0 0 4px color-mix(in oklab, var(--primary) 14%, transparent)" : "none",
          }}
          onFocus={e => {
            e.target.style.borderColor = "var(--primary)";
            e.target.style.boxShadow = "0 0 0 4px color-mix(in oklab, var(--primary) 18%, transparent)";
          }}
          onBlur={e => {
            e.target.style.borderColor = error ? "#EF4444" : (value[i] ? "var(--primary)" : "var(--hairline-2)");
            e.target.style.boxShadow = value[i] ? "0 0 0 4px color-mix(in oklab, var(--primary) 14%, transparent)" : "none";
          }}
        />
      ))}
    </div>
  );
};

/* Resend timer hook */
export const useResend = (initial = 30) => {
  const [t, setT] = useState(initial);
  useEffect(() => {
    if (t <= 0) return;
    const id = setTimeout(() => setT(s => s - 1), 1000);
    return () => clearTimeout(id);
  }, [t]);
  return { t, reset: () => setT(initial) };
};

/* Step progress bar (numbered with connectors) */
export const StepProgress = ({ steps, current }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 0, width: "100%" }}>
    {steps.map((s, i) => (
      <Fragment key={i}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, minWidth: 0, flex: i === steps.length - 1 ? "0 0 auto" : "0 0 auto" }}>
          <div style={{
            width: 32, height: 32, borderRadius: 999,
            background: i < current ? "var(--accent-3)" : i === current ? "var(--primary)" : "var(--bg-2)",
            color: i <= current ? "white" : "var(--ink-soft)",
            display: "grid", placeItems: "center",
            fontSize: 13, fontWeight: 600,
            border: i === current ? "3px solid color-mix(in oklab, var(--primary) 30%, transparent)" : "none",
            transition: "all 200ms",
          }}>
            {i < current ? <Icon name="check" size={14} stroke={3} /> : i + 1}
          </div>
          <span style={{ fontSize: 11, color: i <= current ? "var(--ink)" : "var(--ink-soft)", fontWeight: 540, whiteSpace: "nowrap" }}>{s}</span>
        </div>
        {i < steps.length - 1 && (
          <div style={{ flex: 1, height: 2, background: i < current ? "var(--accent-3)" : "var(--hairline)", margin: "0 8px", marginBottom: 22, borderRadius: 999, transition: "background 200ms" }} />
        )}
      </Fragment>
    ))}
  </div>
);

/* Password strength meter + checklist */
export const PasswordStrength = ({ value }) => {
  const checks = [
    { id: "len", t: "At least 8 characters", ok: value.length >= 8 },
    { id: "num", t: "Contains a number", ok: /\d/.test(value) },
    { id: "upper", t: "Mix of upper & lower case", ok: /[a-z]/.test(value) && /[A-Z]/.test(value) },
    { id: "sym", t: "A symbol (!@#$…)", ok: /[^A-Za-z0-9]/.test(value) },
  ];
  const score = checks.filter(c => c.ok).length;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["var(--hairline)", "#EF4444", "#F59E0B", "#3B82F6", "#10B981"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", gap: 4 }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i < score ? colors[score] : "var(--hairline)", transition: "background 200ms" }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
        <span style={{ color: "var(--ink-soft)" }}>Password strength</span>
        <span style={{ color: colors[score], fontWeight: 600 }}>{labels[score] || "—"}</span>
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
        {checks.map(c => (
          <li key={c.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: c.ok ? "var(--ink)" : "var(--ink-soft)" }}>
            <span style={{
              width: 18, height: 18, borderRadius: 999,
              background: c.ok ? "var(--success-soft)" : "var(--bg-2)",
              color: c.ok ? "#10B981" : "var(--muted)",
              display: "grid", placeItems: "center",
            }}>
              {c.ok ? <Icon name="check" size={11} stroke={3} /> : <Icon name="close" size={11} stroke={2} />}
            </span>
            {c.t}
          </li>
        ))}
      </ul>
    </div>
  );
};

/* Confetti background (decorative) */
export const ConfettiBG = () => (
  <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
    {Array.from({ length: 28 }).map((_, i) => {
      const colors = ["#1E40AF", "#10B981", "#F59E0B", "#EC4899", "#7C3AED", "#3B82F6"];
      const c = colors[i % colors.length];
      const left = (i * 47) % 100;
      const top = (i * 31) % 100;
      const delay = (i * 0.13) % 2;
      return (
        <span key={i} style={{
          position: "absolute",
          left: left + "%", top: top + "%",
          width: 8, height: 8 + (i % 4) * 3,
          background: c, borderRadius: i % 3 === 0 ? "50%" : 2,
          transform: `rotate(${i * 33}deg)`,
          opacity: 0.6,
          animation: `float ${4 + (i % 4)}s ease-in-out -${delay}s infinite`,
        }} />
      );
    })}
  </div>
);

/* Modal shell with blurred backdrop */
export const Modal = ({ open, onClose, children, max = 460 }) => {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "color-mix(in oklab, var(--ink) 40%, transparent)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      display: "grid", placeItems: "center", padding: 20,
      animation: "fadeUp 240ms ease-out",
    }} onClick={onClose}>
      <div className="card" onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: max,
        background: "var(--surface)",
        boxShadow: "var(--shadow-xl)",
        borderRadius: 22,
        animation: "fadeUp 320ms cubic-bezier(.2,.7,.2,1)",
      }}>
        {children}
      </div>
    </div>
  );
};

/* Soft floating stat / device card icons */
export const FloatingShapes = ({ tone = "blue" }) => {
  const c = tone === "blue" ? "#3B82F6" : tone === "amber" ? "#F59E0B" : tone === "emerald" ? "#10B981" : "#EC4899";
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      <span className="float-1" style={{ position: "absolute", top: "12%", right: "8%", width: 14, height: 14, borderRadius: 4, background: c + "80", transform: "rotate(20deg)" }} />
      <span className="float-2" style={{ position: "absolute", top: "70%", left: "10%", width: 10, height: 10, borderRadius: "50%", background: c + "55" }} />
      <span className="float-3" style={{ position: "absolute", top: "30%", left: "6%", width: 18, height: 18, borderRadius: 6, background: c + "30", transform: "rotate(45deg)" }} />
      <span className="float-1" style={{ position: "absolute", bottom: "14%", right: "12%", width: 22, height: 22, borderRadius: 999, border: `2px solid ${c}66` }} />
    </div>
  );
};

/* Two-column auth shell used for Login & Signup */
export const AuthShell = ({ children, mode, navigate }) => (
  <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", background: "var(--bg)" }}>
    {/* Left visual */}
    <div style={{
      position: "relative", overflow: "hidden", padding: 48, color: "white",
      background: "var(--ink)",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(800px 500px at 80% 100%, rgba(255,107,107,0.45), transparent 60%), radial-gradient(700px 400px at 0% 0%, rgba(245,158,11,0.3), transparent 60%)",
        pointerEvents: "none",
      }} />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", height: "100%", gap: 32 }}>
        <button onClick={() => navigate("home")} style={{ background: "none", border: "none", padding: 0, alignSelf: "flex-start", cursor: "pointer" }}>
          <Logo color="white" />
        </button>
        <div style={{ display: "flex", flexDirection: "column", gap: 28, justifyContent: "center", flex: 1, maxWidth: 460 }}>
          <h2 className="display" style={{ color: "white", fontSize: "clamp(36px, 4vw, 56px)" }}>
            {mode === "signup"
              ? <>Build the night people <span className="serif" style={{ color: "var(--accent)" }}>talk about</span> on Monday.</>
              : <>Your next <span className="serif" style={{ color: "var(--accent)" }}>sold-out</span> Saturday is one click away.</>
            }
          </h2>

          {/* Floating event card */}
          <div className="card float-1" style={{ padding: 0, overflow: "hidden", borderRadius: 18, alignSelf: "flex-start", color: "var(--ink)", maxWidth: 320, boxShadow: "var(--shadow-xl)" }}>
            <div style={{ height: 140, backgroundImage: `url(${EVENTS[0].img})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
              <span className="badge" style={{ position: "absolute", top: 12, left: 12, background: "rgba(255,255,255,0.95)", color: "var(--ink)" }}>Concerts</span>
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 540 }}>Neo Rave: Midnight Bloom</div>
              <div style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 4 }}>Sat 14 Jun · Mumbai · ₹1,499</div>
            </div>
          </div>
          <div className="card float-2" style={{ padding: 14, alignSelf: "flex-end", color: "var(--ink)", display: "flex", alignItems: "center", gap: 10, boxShadow: "var(--shadow-lg)" }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: "var(--accent-3)", color: "white", display: "grid", placeItems: "center", animation: "pulse-ring 1.6s infinite" }}>
              <Icon name="check" size={18} stroke={3} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 540 }}>Entry granted</div>
              <div style={{ fontSize: 11, color: "var(--ink-soft)" }}>847 / 2,400 in</div>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
          "Sold 1,400 tickets in 36 hours — the scanner team was set up in under a minute." <br />
          <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 540 }}>— Aanya Rao, Phantom Records</span>
        </div>
      </div>
    </div>
    {/* Right form */}
    <div style={{ display: "grid", placeItems: "center", padding: 48 }}>
      <div style={{ width: "100%", maxWidth: 440 }}>{children}</div>
    </div>
  </div>
);
   