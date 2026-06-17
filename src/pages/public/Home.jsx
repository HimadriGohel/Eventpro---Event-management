/* Home page — EventPro */
import { useState, useEffect, useMemo, Fragment } from 'react';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { Counter } from '../../components/ui/Counter';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { EventCard } from '../../components/ui/EventCard';
import { EVENTS, CATEGORIES } from '../../data/events';
import { useGo } from '../../hooks/useGo';

/* Cheap fake QR */
const QRBlock = ({ size = 96, seed = "abc" }) => {
  const cells = 11;
  // deterministic pattern from seed
  const grid = useMemo(() => {
    let h = 0; for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    const r = () => { h = (h * 1664525 + 1013904223) >>> 0; return (h >>> 16) / 65535; };
    return Array.from({ length: cells }, () => Array.from({ length: cells }, () => r() > 0.55 ? 1 : 0));
  }, [seed]);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${cells} ${cells}`} style={{ shapeRendering: "crispEdges" }}>
      <rect width={cells} height={cells} fill="white" />
      {grid.map((row, y) => row.map((c, x) => c ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="var(--ink)" /> : null))}
      {/* Corner anchors */}
      {[[0, 0], [cells - 3, 0], [0, cells - 3]].map(([x, y], i) => (
        <Fragment key={i}>
          <rect x={x} y={y} width="3" height="3" fill="var(--ink)" />
          <rect x={x + 0.5} y={y + 0.5} width="2" height="2" fill="white" />
          <rect x={x + 1} y={y + 1} width="1" height="1" fill="var(--ink)" />
        </Fragment>
      ))}
    </svg>
  );
};

const FloatingMockups = () => (
  <div style={{ position: "relative", width: "100%", height: 560 }}>
    {/* Big event card */}
    <div className="card float-1" style={{
      position: "absolute", top: 30, right: 0, width: 340,
      borderRadius: 22, overflow: "hidden", boxShadow: "var(--shadow-xl)",
    }}>
      <div style={{ height: 200, position: "relative", backgroundImage: `url(${EVENTS[0].img})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7))" }} />
        <span className="badge" style={{ position: "absolute", top: 14, left: 14, background: "rgba(255,255,255,0.95)", color: "var(--ink)" }}>Concerts · Mumbai</span>
        <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, color: "white" }}>
          <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.2 }}>Neo Rave: Midnight Bloom</div>
          <div style={{ fontSize: 12, opacity: 0.9, marginTop: 4 }}>Sat, 14 Jun · 9:00 PM</div>
        </div>
      </div>
      <div style={{ padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--ink-soft)" }}>From</div>
          <div style={{ fontWeight: 600, fontSize: 18 }}>₹1,499</div>
        </div>
        <span className="btn btn-accent btn-sm">Book ticket</span>
      </div>
    </div>

    {/* Analytics card */}
    <div className="card float-2" style={{
      position: "absolute", top: 0, left: 0, width: 270, padding: 16,
      borderRadius: 18, boxShadow: "var(--shadow-lg)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ fontSize: 12, color: "var(--ink-soft)" }}>Tickets sold today</span>
        <span className="badge badge-emerald">+24%</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 12 }}>
        <Counter to={1842} />
      </div>
      <svg viewBox="0 0 240 60" style={{ width: "100%", height: 60 }}>
        <defs>
          <linearGradient id="sparkG" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q30,30 60,32 T120,20 T180,18 T240,8 L240,60 L0,60 Z" fill="url(#sparkG)" />
        <path d="M0,40 Q30,30 60,32 T120,20 T180,18 T240,8" stroke="#10B981" strokeWidth="2" fill="none" />
      </svg>
    </div>

    {/* QR ticket */}
    <div className="card float-3" style={{
      position: "absolute", bottom: 30, left: 60, width: 240, padding: 16,
      borderRadius: 18, boxShadow: "var(--shadow-lg)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 11, color: "var(--ink-soft)", fontFamily: "Geist Mono" }}>TICKET · A-014</span>
        <span className="badge badge-emerald">Valid</span>
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Sundowner: Vinyl on the Lawn</div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <QRBlock size={70} />
        <div style={{ fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.5 }}>
          <div>Sat, 14 Jun</div>
          <div>5:30 PM · Goa</div>
          <div style={{ color: "var(--ink)", fontWeight: 600, marginTop: 4 }}>Aanya R.</div>
        </div>
      </div>
    </div>

    {/* Scanner success */}
    <div className="card float-2" style={{
      position: "absolute", bottom: 110, right: 30, width: 200, padding: 18, borderRadius: 18,
      boxShadow: "var(--shadow-lg)", textAlign: "center", background: "var(--surface)",
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: 999, background: "var(--accent-3)",
        margin: "0 auto 10px", display: "grid", placeItems: "center", color: "white",
        animation: "pulse-ring 2s infinite",
      }}>
        <Icon name="check" size={26} stroke={3} />
      </div>
      <div style={{ fontSize: 15, fontWeight: 600 }}>Check-in successful</div>
      <div style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 4 }}>Aanya · Section A · 09:42</div>
    </div>
  </div>
);

const PhoneScannerDemo = () => {
  const states = [
    { id: "valid", title: "Valid ticket", color: "#10B981", icon: "check", sub: "Aanya R · Section A" },
    { id: "used", title: "Already used", color: "#F59E0B", icon: "info", sub: "Scanned at 19:42" },
    { id: "invalid", title: "Invalid ticket", color: "#FF6B6B", icon: "close", sub: "QR not recognized" },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % 3), 2400);
    return () => clearInterval(t);
  }, []);
  const st = states[idx];
  return (
    <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
      {/* Phone bezel */}
      <div style={{
        width: 300, height: 600, borderRadius: 48, background: "var(--ink)", padding: 12,
        boxShadow: "var(--shadow-xl)", position: "relative",
      }}>
        <div style={{
          width: "100%", height: "100%", borderRadius: 38, overflow: "hidden",
          background: "var(--bg-2)", position: "relative",
        }}>
          {/* Status bar */}
          <div style={{ height: 36, padding: "12px 24px 0", display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600 }}>
            <span>9:41</span>
            <span style={{ display: "flex", gap: 4 }}>● ● ●</span>
          </div>
          {/* Notch */}
          <div style={{ position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)", width: 90, height: 24, borderRadius: 999, background: "var(--ink)" }} />

          {/* Title */}
          <div style={{ padding: "20px 20px 8px" }}>
            <div style={{ fontSize: 11, color: "var(--ink-soft)", fontFamily: "Geist Mono", letterSpacing: "0.06em" }}>SCANNING · GATE A</div>
            <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>Neo Rave</div>
          </div>

          {/* Camera viewport */}
          <div style={{
            margin: "12px 20px", borderRadius: 20, height: 280, position: "relative",
            background: `linear-gradient(135deg, ${st.color}22, transparent), var(--ink)`,
            overflow: "hidden",
          }}>
            {/* corner brackets */}
            {[[12, 12, "tl"], [12, 12, "tr"], [12, 12, "bl"], [12, 12, "br"]].map(([w, h, p], i) => (
              <span key={i} style={{
                position: "absolute",
                ...(p[0] === "t" ? { top: 12 } : { bottom: 12 }),
                ...(p[1] === "l" ? { left: 12 } : { right: 12 }),
                width: 24, height: 24,
                borderTop: p[0] === "t" ? `2px solid ${st.color}` : "none",
                borderBottom: p[0] === "b" ? `2px solid ${st.color}` : "none",
                borderLeft: p[1] === "l" ? `2px solid ${st.color}` : "none",
                borderRight: p[1] === "r" ? `2px solid ${st.color}` : "none",
                borderRadius: 4,
              }} />
            ))}
            {/* scanline */}
            <div style={{
              position: "absolute", left: 24, right: 24, height: 2, background: st.color,
              boxShadow: `0 0 18px ${st.color}`, top: "50%",
              animation: "scan-line 2s ease-in-out infinite",
            }} />
            {/* QR fading */}
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", opacity: 0.35 }}>
              <QRBlock size={140} seed={st.id} />
            </div>
          </div>

          {/* Status card */}
          <div style={{ margin: "16px 20px", padding: 18, borderRadius: 18, background: "var(--surface)", border: "1px solid var(--hairline)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 999, background: st.color, color: "white", display: "grid", placeItems: "center", animation: st.id === "valid" ? "pulse-ring 1.6s infinite" : "none" }}>
                <Icon name={st.icon} size={22} stroke={3} />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{st.title}</div>
                <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>{st.sub}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* state pills */}
      <div style={{ position: "absolute", bottom: -8, display: "flex", gap: 6 }}>
        {states.map((s, i) => (
          <button key={s.id} onClick={() => setIdx(i)} style={{
            width: 24, height: 6, borderRadius: 999, border: "none", cursor: "pointer",
            background: i === idx ? "var(--ink)" : "var(--hairline-2)",
            transition: "all 200ms",
          }} />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const go = useGo();
  const hero = "split";
  return (
    <div className="page-enter">
      {/* HERO */}
      <section style={{
        position: "relative", overflow: "hidden",
        background: "var(--grad-hero)",
        paddingTop: 64, paddingBottom: 80,
      }}>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          {hero === "split" && (
            <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 64, alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                <span className="eyebrow">Now in 18 cities · v3.2</span>
                <h1 className="display">
                  Create, manage <span className="serif" style={{ color: "#10B981" }}>&amp; sell</span><br />
                  event tickets <span className="serif" style={{ color: "#7C3AED" }}>in minutes.</span>
                </h1>
                <p className="lead" style={{ maxWidth: 520 }}>
                  Launch public or private events with QR ticketing, instant bookings, easy check-ins, and a dashboard organizers actually love.
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Button variant="primary" size="xl" onClick={() => go("create")} iconRight="arrow">Create event</Button>
                  <Button variant="ghost" size="xl" onClick={() => go("explore")}>Explore events</Button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 18, paddingTop: 8 }}>
                  <div style={{ display: "flex" }}>
                    {[0, 1, 2, 3].map(i => (
                      <div key={i} style={{
                        width: 32, height: 32, borderRadius: 999, marginLeft: i === 0 ? 0 : -8,
                        border: "2px solid var(--bg)",
                        backgroundImage: `url(https://i.pravatar.cc/64?img=${i + 11})`, backgroundSize: "cover",
                      }} />
                    ))}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>
                    <strong style={{ color: "var(--ink)" }}>22,400+ organizers</strong> hosting this month
                  </div>
                </div>
              </div>
              <FloatingMockups />
            </div>
          )}
        </div>
      </section>

      {/* TRUSTED BY MARQUEE */}
      <section style={{ padding: "32px 0", borderBlock: "1px solid var(--hairline)", overflow: "hidden", background: "var(--bg)" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: 56, opacity: 0.7, fontSize: 13, color: "var(--ink-soft)", whiteSpace: "nowrap", overflow: "hidden" }}>
          <span style={{ fontFamily: "Geist Mono", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>Trusted by organizers at</span>
          <div style={{ display: "flex", gap: 48, fontWeight: 600, fontSize: 18, letterSpacing: "-0.02em" }}>
            {["Phantom Records", "TEDx IIT-B", "Atlas Kitchen", "Soft Static", "Hungry City", "Stride Co.", "Foyer Gallery", "ScaleUp Forum"].map(n => (
              <span key={n}>{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Discover"
            title={<>What's on, <span className="serif" style={{ color: "#7C3AED" }}>tonight.</span></>}
            lead="From dance floors to design jams. Pick a vibe."
            action={<Button variant="ghost" iconRight="arrow" onClick={() => go("explore")}>See all events</Button>}
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                onClick={() => go("explore")}
                className="card hover-lift"
                style={{
                  padding: "24px 18px", border: "1px solid var(--hairline)", display: "flex", flexDirection: "column",
                  alignItems: "flex-start", gap: 18, cursor: "pointer", textAlign: "left", background: "var(--surface)"
                }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 12, background: c.color, color: "white", display: "grid", placeItems: "center" }}>
                  <Icon name={c.icon} size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 540, fontSize: 14 }}>{c.label}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 4 }}>
                    {Math.floor(40 + Math.random() * 200)} events
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CREATORS LOVE IT */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <SectionHeader
            eyebrow="Built for organizers"
            title={<>Everything you need.<br /><span className="serif" style={{ color: "#1E40AF" }}>Nothing you don't.</span></>}
            lead="Six tools that turn an idea into a sold-out night."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { icon: "bolt", title: "Create in minutes", body: "Drag, drop, publish. Our setup wizard takes you from blank canvas to live event in under five minutes.", tint: "#1E40AF", soft: "#EFF6FF" },
              { icon: "qr", title: "QR ticketing", body: "Every ticket is a tamper-proof QR. Send by SMS, email, or wallet. No printing, no fuss.", tint: "#7C3AED", soft: "#F5F3FF" },
              { icon: "bar", title: "Real-time analytics", body: "Watch ticket sales, refunds, and check-ins update live. Drill into any cohort in two clicks.", tint: "#10B981", soft: "#D1FAE5" },
              { icon: "phone", title: "Mobile scanner app", body: "Light up the door with our iOS/Android scanner. Works offline. One tap = green light.", tint: "#F59E0B", soft: "#FEF3C7" },
              { icon: "lock", title: "Secure payments", body: "PCI-compliant checkout, instant settlements to your bank, and 12 currencies supported.", tint: "#0E7490", soft: "#CFFAFE" },
              { icon: "share", title: "Easy sharing", body: "One-tap social cards, custom landing pages, vanity URLs, and UTM tracking out of the box.", tint: "#EC4899", soft: "#FCE7F3" },
            ].map(f => (
              <div key={f.title} className="card feature-card hover-lift" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: f.soft, color: f.tint, display: "grid", placeItems: "center", boxShadow: `inset 0 0 0 1px ${f.tint}22` }}>
                  <Icon name={f.icon} size={22} stroke={1.8} />
                </div>
                <h3 className="h3">{f.title}</h3>
                <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.6 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="How it works"
            title={<>Three steps. <span className="serif" style={{ color: "#F59E0B" }}>That's it.</span></>}
            lead="From concept to capacity-crowd in an afternoon."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, position: "relative" }}>
            {/* Connector line */}
            <svg style={{ position: "absolute", top: 100, left: "16%", width: "68%", height: 30, pointerEvents: "none" }} viewBox="0 0 800 30" preserveAspectRatio="none">
              <path d="M0,15 Q200,-10 400,15 T800,15" stroke="var(--accent)" strokeDasharray="6 6" strokeWidth="1.5" fill="none" />
            </svg>
            {[
              { n: "01", title: "Create event", body: "Add details, upload a banner, set venue & schedule.", icon: "sparkle" },
              { n: "02", title: "Add tickets", body: "Build tiers, tax rules, capacity, and discount codes.", icon: "ticket" },
              { n: "03", title: "Publish & scan", body: "Share your link, take payments, scan at the door.", icon: "qr" },
            ].map((s, i) => (
              <div key={s.n} className="card" style={{ padding: 28, position: "relative", background: "var(--surface)", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                  <div style={{ width: 64, height: 64, borderRadius: 18, background: i === 1 ? "var(--accent)" : "var(--ink)", color: "white", display: "grid", placeItems: "center" }}>
                    <Icon name={s.icon} size={28} stroke={1.6} />
                  </div>
                  <span style={{ fontFamily: "Geist Mono", fontSize: 12, color: "var(--ink-soft)", letterSpacing: "0.08em" }}>STEP / {s.n}</span>
                </div>
                <h3 className="h3" style={{ marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: "var(--ink-soft)", fontSize: 14 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENT SHOWCASE */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <SectionHeader
            eyebrow="Trending now"
            title={<>Events <span className="serif" style={{ color: "#EC4899" }}>people</span> are talking about.</>}
            lead="Hand-picked from this week's most-booked, in your city."
            action={<Button variant="ghost" iconRight="arrow" onClick={() => go("explore")}>See all</Button>}
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {EVENTS.slice(0, 8).map(e => (
              <EventCard key={e.id} event={e} onClick={() => go("event")} />
            ))}
          </div>
        </div>
      </section>

      {/* SCANNER DEMO */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <span className="eyebrow">Scanner app</span>
              <h2 className="h1">A <span className="serif" style={{ color: "#10B981" }}>green light</span> at the door — every time.</h2>
              <p className="lead">Phone-native scanner with offline mode, fraud detection, and a refreshingly tactile feel. Onboard your gate team in 30 seconds.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
                {[
                  ["Offline-first scanning at the gate", "check"],
                  ["Real-time sync to dashboard", "check"],
                  ["Fraud & duplicate detection", "check"],
                  ["Multi-staff with role permissions", "check"],
                ].map(([t, i]) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 22, height: 22, borderRadius: 999, background: "var(--accent-3)", color: "white", display: "grid", placeItems: "center" }}>
                      <Icon name={i} size={12} stroke={3} />
                    </span>
                    <span style={{ fontSize: 14, color: "var(--ink)" }}>{t}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <Button variant="ghost" size="sm" icon="apple">Download iOS</Button>
                <Button variant="ghost" size="sm">Download Android</Button>
              </div>
            </div>
            <PhoneScannerDemo />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section-tight" style={{ background: "var(--grad-stats)", color: "#F8FAFC", position: "relative", overflow: "hidden" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, padding: "40px 0" }}>
            {[
              { v: 4200000, suffix: "+", label: "Tickets processed" },
              { v: 22400, suffix: "+", label: "Events hosted" },
              { v: 18, suffix: "", label: "Cities covered" },
              { v: 99.99, suffix: "%", label: "Scanner uptime" },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 56, fontWeight: 540, letterSpacing: "-0.03em", lineHeight: 1 }}>
                  <Counter to={s.v} suffix={s.suffix} />
                </div>
                <div style={{ marginTop: 10, fontSize: 13, color: "rgba(255,255,255,0.6)", letterSpacing: "0.04em", textTransform: "uppercase", fontFamily: "Geist Mono" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Loved by organizers"
            title={<>"It just <span className="serif" style={{ color: "#10B981" }}>works.</span>"</>}
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { quote: "Sold 1,400 tickets in 36 hours. The scanner team was set up in under a minute.", name: "Aanya Rao", role: "Phantom Records" },
              { quote: "Switched from spreadsheets and never looked back. The analytics paid for themselves on event one.", name: "Karan Mehta", role: "TEDx IIT-B" },
              { quote: "Our supper-club community lives here now. Clean, fast, and the receipts look beautiful.", name: "Lina Joseph", role: "Atlas Kitchen" },
            ].map(t => (
              <figure key={t.name} className="card feature-card" style={{ padding: 28, margin: 0, display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ display: "flex", gap: 4, color: "var(--accent-2)" }}>
                  {[0, 1, 2, 3, 4].map(i => <Icon key={i} name="star" size={14} stroke={0} style={{ fill: "currentColor" }} />)}
                </div>
                <blockquote style={{ margin: 0, fontSize: 18, lineHeight: 1.4, letterSpacing: "-0.01em", textWrap: "pretty" }}>"{t.quote}"</blockquote>
                <figcaption style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 999, background: "var(--bg-2)", border: "1px solid var(--hairline)", display: "grid", placeItems: "center", fontWeight: 600, fontSize: 14 }}>
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 540 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section">
        <div className="container">
          <div style={{
            position: "relative", overflow: "hidden", borderRadius: 32, padding: "80px 64px",
            background: "#0B1024", color: "#F8FAFC",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "var(--grad-cta)",
              pointerEvents: "none",
            }} />
            <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 48, alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <h2 className="display" style={{ color: "#F8FAFC", fontSize: "clamp(40px, 5vw, 72px)" }}>
                  Ready to launch<br /><span className="serif" style={{ color: "#FBBF24" }}>your next</span> event?
                </h2>
                <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: 460, fontSize: 16 }}>
                  Free to publish. Pay nothing until you sell. Set up takes about as long as making coffee.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Button variant="accent" size="xl" onClick={() => go("create")} iconRight="arrow">Create your event — free</Button>
                <Button variant="ghost" size="xl" onClick={() => go("explore")} style={{ borderColor: "rgba(255,255,255,0.2)", color: "white" }}>I'm here to attend</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
