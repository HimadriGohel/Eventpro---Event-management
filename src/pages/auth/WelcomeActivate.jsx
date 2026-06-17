import { useState, Fragment } from 'react';
import { Icon } from '../../components/ui/Icon';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import { ConfettiBG, FloatingShapes } from '../../components/auth/shared';
import { useGo } from '../../hooks/useGo';

export default function WelcomeActivate() {
  const go = useGo();
  const [hover, setHover] = useState(null);
  const features = [
    { i: "qr",       t: "QR ticket scanning",   b: "Phone-as-scanner. Works offline." , c: "#1E40AF" },
    { i: "bar",      t: "Real-time analytics",  b: "Sales, seat heatmaps, conversion.", c: "#10B981" },
    { i: "phone",    t: "Mobile scanner app",   b: "Hand a teammate a phone, done.",    c: "#F59E0B" },
    { i: "share",    t: "Event sharing",        b: "Auto social cards & embeds.",       c: "#7C3AED" },
    { i: "pin",      t: "Venue management",     b: "Map seats, multiple gates, holds.", c: "#EC4899" },
    { i: "ticket",   t: "Ticket types",         b: "Free, paid, tiered, sliding scale.",c: "#3B82F6" },
  ];
  const flow = [
    { n: "01", t: "Create event",   b: "Name, banner, schedule",     i: "sparkle", c: "#1E40AF" },
    { n: "02", t: "Add tickets",    b: "Tiers, holds, promo codes",  i: "ticket",  c: "#10B981" },
    { n: "03", t: "Publish event",  b: "Custom URL & social cards",  i: "share",   c: "#F59E0B" },
    { n: "04", t: "Attendees book", b: "UPI, cards, wallets",        i: "users",   c: "#7C3AED" },
    { n: "05", t: "Scan entries",   b: "Phone-as-scanner at gate",   i: "qr",      c: "#EC4899" },
  ];
  const verifyBenefits = [
    { i: "bolt",   t: "Accept online payments",       b: "UPI, cards, wallets — RBI-licensed rails." },
    { i: "share",  t: "Publish public paid events",   b: "Listing on the EventPro marketplace." },
    { i: "bar",    t: "Receive payouts securely",     b: "Daily settlements straight to your bank." },
    { i: "trophy", t: "Build trust with attendees",   b: "Verified blue check on your profile." },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", position: "relative" }}>
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 30, padding: "20px 0", borderBottom: "1px solid var(--hairline)", background: "color-mix(in oklab, var(--surface) 88%, transparent)", backdropFilter: "blur(10px)" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Logo />
            <span style={{ width: 1, height: 18, background: "var(--hairline)" }} />
            <span style={{ fontSize: 12, color: "var(--ink-soft)" }}>
              <span className="badge badge-emerald" style={{ marginRight: 8 }}>● Account active</span>
              Welcome, Aanya
            </span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => go("home")} className="btn btn-ghost btn-sm">Set up later</button>
            <Button variant="primary" size="sm" onClick={() => go("event-create-start")} iconRight="arrow">Create event</Button>
          </div>
        </div>
      </div>

      {/* SECTION 1 — Hero */}
      <section style={{ position: "relative", padding: "72px 0 40px", overflow: "hidden", background: "var(--grad-hero)" }}>
        <ConfettiBG />
        <FloatingShapes tone="blue" />
        <div className="container" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 56, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <span className="badge badge-emerald" style={{ alignSelf: "flex-start" }}>✓ You're all set</span>
            <h1 className="display" style={{ fontSize: "clamp(48px, 5.6vw, 84px)", lineHeight: 1.02 }}>
              Ready to launch your <span className="serif" style={{ color: "var(--accent)" }}>first</span> event?
            </h1>
            <p className="lead" style={{ maxWidth: 540 }}>
              Create public or private events, sell tickets, manage attendees, and scan QR entries — all from one platform. Most creators go live in under <strong style={{ color: "var(--ink)" }}>5 minutes</strong>.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
              <Button variant="primary" size="lg" iconRight="arrow" onClick={() => go("event-create-start")}>Start creating</Button>
              <Button variant="ghost" size="lg" onClick={() => go("home")}>Watch 90s demo</Button>
            </div>
          </div>

          {/* Right — floating preview cluster */}
          <div style={{ position: "relative", height: 460 }}>
            {/* Main dashboard mock */}
            <div className="card float-1" style={{ position: "absolute", top: 30, right: 0, width: 360, padding: 18, boxShadow: "var(--shadow-xl)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span className="eyebrow" style={{ fontSize: 10 }}>Your dashboard</span>
                <span className="badge badge-emerald">● Live</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                {[["Sold","247"],["Revenue","₹1.2L"]].map(([t,v]) => (
                  <div key={t} style={{ padding: 12, background: "var(--bg-2)", borderRadius: 10 }}>
                    <div style={{ fontSize: 11, color: "var(--ink-soft)" }}>{t}</div>
                    <div style={{ fontSize: 22, fontWeight: 600 }}>{v}</div>
                  </div>
                ))}
              </div>
              <svg viewBox="0 0 280 70" width="100%" height="70" style={{ overflow: "visible" }}>
                <path d="M0 50 C 40 45, 60 40, 90 35 S 150 20, 180 18 S 240 12, 280 8" stroke="var(--primary)" strokeWidth="2" fill="none" />
                <path d="M0 50 C 40 45, 60 40, 90 35 S 150 20, 180 18 S 240 12, 280 8 L 280 70 L 0 70 Z" fill="var(--primary)" opacity="0.1" />
                <circle cx="280" cy="8" r="4" fill="var(--primary)" />
              </svg>
            </div>
            {/* Ticket */}
            <div className="card float-2" style={{ position: "absolute", top: 0, left: 0, width: 240, padding: 16, boxShadow: "var(--shadow-lg)", display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, background: "linear-gradient(135deg, #F59E0B, #EC4899)", display: "grid", placeItems: "center", color: "white" }}>
                <Icon name="ticket" size={22} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>VIP · Row A</div>
                <div style={{ fontSize: 11, color: "var(--ink-soft)" }}>Aanya R · Sat 14 Jun</div>
              </div>
            </div>
            {/* QR pulse */}
            <div className="card float-3" style={{ position: "absolute", bottom: 30, left: 30, padding: 14, boxShadow: "var(--shadow-lg)", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ position: "relative", width: 44, height: 44, borderRadius: 10, background: "var(--ink)", display: "grid", placeItems: "center", color: "white" }}>
                <Icon name="qr" size={20} />
                <span style={{ position: "absolute", inset: -4, borderRadius: 14, border: "2px solid #10B981", animation: "pulse-ring 2s infinite", opacity: 0.5 }} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>Entry granted</div>
                <div style={{ fontSize: 10, color: "var(--ink-soft)" }}>847 / 2,400 in</div>
              </div>
            </div>
            {/* Sale toast */}
            <div className="card float-1" style={{ position: "absolute", bottom: 0, right: 30, padding: 12, display: "flex", alignItems: "center", gap: 10, boxShadow: "var(--shadow-md)" }}>
              <span style={{ width: 28, height: 28, borderRadius: 999, background: "var(--success-soft)", color: "#10B981", display: "grid", placeItems: "center" }}>
                <Icon name="check" size={13} stroke={3} />
              </span>
              <div style={{ fontSize: 11 }}>
                <div style={{ fontWeight: 600 }}>+1 ticket sold</div>
                <div style={{ color: "var(--ink-soft)" }}>just now</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Primary action cards */}
      <section style={{ padding: "40px 0" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 18 }}>
          {/* Create event — primary */}
          <button
            onMouseEnter={() => setHover("create")}
            onMouseLeave={() => setHover(null)}
            onClick={() => go("event-create-start")}
            className="card"
            style={{
              padding: 36, textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", gap: 18,
              position: "relative", overflow: "hidden", minHeight: 320,
              border: "1.5px solid var(--primary)",
              background: "linear-gradient(135deg, var(--surface), var(--primary-tint))",
              boxShadow: hover === "create" ? "0 30px 60px -20px color-mix(in oklab, var(--primary) 40%, transparent)" : "var(--shadow-lg)",
              transform: hover === "create" ? "translateY(-4px)" : "translateY(0)",
              transition: "all 280ms cubic-bezier(.2,.7,.2,1)",
            }}
          >
            <div aria-hidden style={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)", opacity: hover === "create" ? 0.25 : 0.15, transition: "all 400ms" }} />
            <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span className="eyebrow">Recommended · most chosen</span>
              <span className="badge" style={{ background: "var(--ink)", color: "var(--bg)", fontSize: 11 }}>5 min</span>
            </div>
            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 64, height: 64, borderRadius: 18, background: "var(--primary)", color: "white",
                display: "grid", placeItems: "center",
                transform: hover === "create" ? "rotate(-6deg) scale(1.05)" : "rotate(0)",
                transition: "transform 280ms",
                boxShadow: "0 16px 30px -6px color-mix(in oklab, var(--primary) 50%, transparent)",
              }}>
                <Icon name="sparkle" size={28} />
              </div>
              <div>
                <h2 className="h1" style={{ fontSize: 30 }}>Create your <span className="serif" style={{ color: "var(--primary)" }}>first event.</span></h2>
                <p style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 4 }}>Set up your event, add tickets, and publish in just a few steps.</p>
              </div>
            </div>

            {/* Mini workflow */}
            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 8, padding: 14, background: "var(--surface)", borderRadius: 14, border: "1px solid var(--hairline)" }}>
              {[
                { t: "Event details", i: "calendar" },
                { t: "Add tickets",   i: "ticket" },
                { t: "Publish & share", i: "share" },
              ].map((s, i, arr) => (
                <Fragment key={i}>
                  <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 28, height: 28, borderRadius: 8, background: "var(--primary-tint)", color: "var(--primary)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                      <Icon name={s.i} size={13} />
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 10, color: "var(--ink-soft)", fontFamily: "Geist Mono" }}>0{i+1}</div>
                      <div style={{ fontSize: 12, fontWeight: 540, whiteSpace: "nowrap" }}>{s.t}</div>
                    </div>
                  </div>
                  {i < arr.length - 1 && <Icon name="chevRight" size={14} style={{ color: "var(--muted)", flexShrink: 0 }} />}
                </Fragment>
              ))}
            </div>

            <div style={{ position: "relative", marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "var(--ink-soft)" }}>No payment required · publish for free</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 999, background: "var(--primary)", color: "white", fontSize: 14, fontWeight: 540, transform: hover === "create" ? "translateX(4px)" : "translateX(0)", transition: "transform 280ms" }}>
                Start creating <Icon name="arrow" size={14} stroke={2.4} />
              </span>
            </div>
          </button>

          {/* Skip — secondary */}
          <button
            onMouseEnter={() => setHover("dash")}
            onMouseLeave={() => setHover(null)}
            onClick={() => go("explore")}
            className="card"
            style={{
              padding: 32, textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", gap: 14,
              minHeight: 320,
              transform: hover === "dash" ? "translateY(-2px)" : "translateY(0)",
              transition: "all 240ms",
              boxShadow: hover === "dash" ? "var(--shadow-lg)" : "var(--shadow-md)",
            }}
          >
            <span className="eyebrow" style={{ color: "var(--muted)" }}>Or take a look around first</span>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: "var(--bg-2)", color: "var(--ink-soft)", display: "grid", placeItems: "center" }}>
              <Icon name="grid" size={24} />
            </div>
            <div>
              <h2 className="h2" style={{ fontSize: 22 }}>Explore platform</h2>
              <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.5 }}>
                Browse events, see how booking and scanning work, and explore creator tools first. You can set up your own event whenever you're ready.
              </p>
            </div>
            <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid var(--hairline)" }}>
              <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 540 }}>Explore platform</span>
              <Icon name="arrow" size={16} style={{ transition: "transform 240ms", transform: hover === "dash" ? "translateX(4px)" : "translateX(0)" }} />
            </div>
          </button>
        </div>
      </section>

      {/* SECTION 3 — Verification intro */}
      <section style={{ padding: "32px 0" }}>
        <div className="container">
          <div className="card" style={{ padding: 36, position: "relative", overflow: "hidden", background: "var(--surface)", borderTop: "3px solid #10B981" }}>
            <div aria-hidden style={{ position: "absolute", bottom: -100, right: -80, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, #10B98120, transparent 70%)" }} />

            <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 40, alignItems: "center" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{ width: 36, height: 36, borderRadius: 10, background: "var(--success-soft)", color: "#10B981", display: "grid", placeItems: "center" }}>
                    <Icon name="lock" size={16} />
                  </span>
                  <span className="eyebrow" style={{ color: "#10B981" }}>Optional · for paid public events</span>
                </div>
                <h2 className="h2" style={{ fontSize: 30 }}>Verify your account for <span className="serif" style={{ color: "#10B981" }}>paid public</span> events.</h2>
                <p style={{ color: "var(--ink-soft)", fontSize: 15, marginTop: 12, lineHeight: 1.55, maxWidth: 460 }}>
                  To protect attendees and enable secure payments, creators verify their identity before selling public paid tickets. Free, draft, and private events don't need verification.
                </p>

                <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
                  <Button variant="primary" iconRight="arrow" onClick={() => go("auth-creator")} style={{ background: "#10B981" }}>Start verification</Button>
                  <Button variant="ghost" onClick={() => go("event-create-start")}>Skip — create a free event</Button>
                </div>
                <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 14 }}>
                  <Icon name="info" size={11} style={{ verticalAlign: "middle", marginRight: 4 }} />
                  You can still create draft, free, or private events without verification.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {verifyBenefits.map(b => (
                  <div key={b.t} style={{ padding: 18, background: "var(--bg-2)", borderRadius: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--success-soft)", color: "#10B981", display: "grid", placeItems: "center" }}>
                      <Icon name={b.i} size={14} />
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{b.t}</div>
                    <div style={{ fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.5 }}>{b.b}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Quick features */}
      <section style={{ padding: "60px 0 32px" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 24, gap: 24, flexWrap: "wrap" }}>
            <div>
              <span className="eyebrow">Everything you need</span>
              <h2 className="h2" style={{ fontSize: 30, marginTop: 8 }}>Built for the moment doors open.</h2>
            </div>
            <p style={{ fontSize: 14, color: "var(--ink-soft)", maxWidth: 360 }}>Six things that ship the day you create your account. No add-ons, no upsells.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {features.map(f => (
              <div
                key={f.t}
                onMouseEnter={() => setHover(f.t)}
                onMouseLeave={() => setHover(null)}
                className="card"
                style={{
                  padding: 22, display: "flex", flexDirection: "column", gap: 10, position: "relative", overflow: "hidden",
                  transition: "all 240ms",
                  transform: hover === f.t ? "translateY(-3px)" : "translateY(0)",
                  boxShadow: hover === f.t ? `0 20px 40px -16px ${f.c}40` : "var(--shadow-sm)",
                }}
              >
                <div aria-hidden style={{
                  position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%",
                  background: `radial-gradient(circle, ${f.c}30, transparent 70%)`,
                  opacity: hover === f.t ? 1 : 0.4,
                  transition: "opacity 300ms",
                }} />
                <div style={{ position: "relative", width: 40, height: 40, borderRadius: 12, background: f.c + "1A", color: f.c, display: "grid", placeItems: "center" }}>
                  <Icon name={f.i} size={18} />
                </div>
                <div style={{ position: "relative", fontSize: 15, fontWeight: 600 }}>{f.t}</div>
                <div style={{ position: "relative", fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.5 }}>{f.b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — How it works */}
      <section style={{ padding: "40px 0 60px" }}>
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <span className="eyebrow">How it works</span>
            <h2 className="h2" style={{ fontSize: 30, marginTop: 8 }}>From idea to <span className="serif" style={{ color: "var(--accent)" }}>doors open</span> in five steps.</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0, position: "relative" }}>
            <div aria-hidden style={{ position: "absolute", top: 28, left: "10%", right: "10%", height: 2, background: "linear-gradient(to right, #1E40AF, #10B981, #F59E0B, #7C3AED, #EC4899)", borderRadius: 999, opacity: 0.25 }} />
            {flow.map((s, i) => (
              <div key={i} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "0 8px" }}>
                <div style={{ position: "relative", width: 56, height: 56, borderRadius: 999, background: s.c, color: "white", display: "grid", placeItems: "center", boxShadow: `0 12px 24px -8px ${s.c}80` }}>
                  <Icon name={s.i} size={20} />
                  <span style={{ position: "absolute", top: -4, right: -4, width: 22, height: 22, borderRadius: 999, background: "var(--surface)", color: s.c, display: "grid", placeItems: "center", fontSize: 10, fontWeight: 700, fontFamily: "Geist Mono", border: `2px solid ${s.c}` }}>{i+1}</span>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{s.t}</div>
                  <div style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 4, lineHeight: 1.4 }}>{s.b}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — Help / support */}
      <section style={{ padding: "32px 0 80px" }}>
        <div className="container">
          <div style={{
            padding: 28, borderRadius: 20,
            background: "var(--ink)", color: "white",
            display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center",
          }}>
            <div>
              <h3 className="h3" style={{ color: "white", fontSize: 22 }}>Need a hand getting started?</h3>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, marginTop: 6 }}>
                Watch a 90-second creator demo, browse the help center, or chat with a real human — we usually reply within 5 minutes.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={() => go("home")} className="btn btn-ghost btn-sm" style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.15)" }}>
                <Icon name="play" size={12} /> Watch demo
              </button>
              <button onClick={() => go("contact")} className="btn btn-ghost btn-sm" style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.15)" }}>
                <Icon name="info" size={12} /> Help center
              </button>
              <button onClick={() => go("contact")} className="btn btn-sm" style={{ background: "var(--accent)", color: "white" }}>
                <Icon name="chat" size={12} /> Chat now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="welcome-sticky-cta" style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 30,
        padding: "12px 16px",
        background: "color-mix(in oklab, var(--surface) 92%, transparent)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid var(--hairline)",
        display: "none",
      }}>
        <Button variant="primary" size="lg" iconRight="arrow" onClick={() => go("event-create-start")} style={{ width: "100%", justifyContent: "center" }}>
          Create your first event
        </Button>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .welcome-sticky-cta { display: block !important; }
        }
      `}</style>
    </div>
  );
}
