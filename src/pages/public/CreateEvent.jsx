/* Create Event landing page (creator-focused) */
import { useState } from 'react';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { Field } from '../../components/ui/Field';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { useGo } from '../../hooks/useGo';

const StepDetails = () => (
  <>
    <div>
      <span className="eyebrow">Step 01</span>
      <h2 className="h1" style={{ marginTop: 16, marginBottom: 16 }}>Tell us about it.</h2>
      <p className="lead">Title, date, venue, banner. Smart templates fill the rest. You can change anything later.</p>
    </div>
    <div className="card" style={{ padding: 24, background: "var(--surface)" }}>
      <div style={{ fontSize: 11, color: "var(--ink-soft)", fontFamily: "Geist Mono", letterSpacing: "0.06em", marginBottom: 16 }}>EVENT WIZARD · 1/4</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Field label="Event title">
          <input className="input" defaultValue="Sundowner: Vinyl on the Lawn" />
        </Field>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Date" icon="calendar"><input className="input" defaultValue="Sat, 14 Jun 2026" /></Field>
          <Field label="Time" icon="clock"><input className="input" defaultValue="5:30 PM" /></Field>
        </div>
        <Field label="Venue" icon="pin"><input className="input" defaultValue="Anjuna Beach, Goa" /></Field>
        <div className="img-placeholder" style={{ height: 70, fontSize: 11 }}>Drop banner image · 1920×1080</div>
      </div>
    </div>
  </>
);

const StepTickets = () => (
  <>
    <div>
      <span className="eyebrow">Step 02</span>
      <h2 className="h1" style={{ marginTop: 16, marginBottom: 16 }}>Set your tiers.</h2>
      <p className="lead">Drag to reorder. Set capacity, fees, and discount codes. Group tickets and waitlist toggle, included.</p>
    </div>
    <div className="card" style={{ padding: 24, background: "var(--surface)" }}>
      <div style={{ fontSize: 11, color: "var(--ink-soft)", fontFamily: "Geist Mono", letterSpacing: "0.06em", marginBottom: 16 }}>TICKET TIERS · 2/4</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { n: "Early Bird", p: "₹899", c: "100 / 100", a: "var(--accent-3)" },
          { n: "General Admission", p: "₹1,199", c: "300 / 500", a: "var(--ink)" },
          { n: "VIP Lounge", p: "₹2,500", c: "20 / 50", a: "var(--accent)" },
        ].map(t => (
          <div key={t.n} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 12, alignItems: "center", padding: 12, borderRadius: 12, background: "var(--bg-2)" }}>
            <span style={{ width: 6, height: 28, borderRadius: 3, background: t.a }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 540 }}>{t.n}</div>
              <div style={{ fontSize: 11, color: "var(--ink-soft)" }}>{t.c}</div>
            </div>
            <span style={{ fontWeight: 600, fontSize: 14 }}>{t.p}</span>
            <Icon name="settings" size={14} style={{ color: "var(--ink-soft)" }} />
          </div>
        ))}
        <button className="btn btn-ghost btn-sm" style={{ marginTop: 4, justifyContent: "center" }}>+ Add ticket tier</button>
      </div>
    </div>
  </>
);

const StepPublish = () => (
  <>
    <div>
      <span className="eyebrow">Step 03</span>
      <h2 className="h1" style={{ marginTop: 16, marginBottom: 16 }}>Publish, share, sell.</h2>
      <p className="lead">A vanity URL, social cards, embed code, and SMS invites — all generated automatically.</p>
    </div>
    <div className="card" style={{ padding: 24, background: "var(--surface)" }}>
      <div style={{ fontSize: 11, color: "var(--ink-soft)", fontFamily: "Geist Mono", letterSpacing: "0.06em", marginBottom: 16 }}>PUBLISH · 3/4</div>
      <div style={{ padding: 14, borderRadius: 12, background: "var(--bg-2)", marginBottom: 12, fontFamily: "Geist Mono", fontSize: 13 }}>
        eventpro.io/<strong>sundowner-goa</strong>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        <button className="btn btn-ghost btn-sm" style={{ justifyContent: "flex-start" }}><Icon name="share" size={14} /> Share to social</button>
        <button className="btn btn-ghost btn-sm" style={{ justifyContent: "flex-start" }}><Icon name="mail" size={14} /> Email invites</button>
        <button className="btn btn-ghost btn-sm" style={{ justifyContent: "flex-start" }}><Icon name="phone" size={14} /> SMS blast</button>
        <button className="btn btn-ghost btn-sm" style={{ justifyContent: "flex-start" }}><Icon name="download" size={14} /> Embed code</button>
      </div>
      <button className="btn btn-accent btn-lg" style={{ width: "100%" }}>Publish event <Icon name="arrow" size={16} /></button>
    </div>
  </>
);

const StepScan = () => (
  <>
    <div>
      <span className="eyebrow">Step 04</span>
      <h2 className="h1" style={{ marginTop: 16, marginBottom: 16 }}>Scan at the door.</h2>
      <p className="lead">Open the scanner app, point at a QR. Green light = entry granted. Works offline.</p>
    </div>
    <div style={{ display: "grid", placeItems: "center" }}>
      <div className="card" style={{ padding: 24, textAlign: "center", background: "var(--surface)", width: 280 }}>
        <div style={{ width: 88, height: 88, borderRadius: 999, background: "var(--accent-3)", margin: "0 auto 16px", display: "grid", placeItems: "center", color: "white", animation: "pulse-ring 1.6s infinite" }}>
          <Icon name="check" size={44} stroke={3} />
        </div>
        <div style={{ fontSize: 18, fontWeight: 600 }}>Entry granted</div>
        <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6 }}>Aanya R. · GA · 19:42</div>
        <div style={{ marginTop: 16, padding: 12, borderRadius: 12, background: "var(--bg-2)", fontSize: 12, color: "var(--ink-soft)" }}>
          Live: <strong style={{ color: "var(--ink)" }}>847</strong> / 2,400 checked in
        </div>
      </div>
    </div>
  </>
);

const CreatorWizardMockup = () => (
  <div style={{ position: "relative", height: 540 }}>
    {/* Browser frame */}
    <div className="card float-1" style={{ padding: 0, borderRadius: 18, overflow: "hidden", boxShadow: "var(--shadow-xl)", background: "var(--surface)" }}>
      <div style={{ height: 32, background: "var(--bg-2)", display: "flex", alignItems: "center", gap: 6, padding: "0 12px" }}>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: "#FF6B6B" }} />
        <span style={{ width: 10, height: 10, borderRadius: 999, background: "#F59E0B" }} />
        <span style={{ width: 10, height: 10, borderRadius: 999, background: "#10B981" }} />
        <span style={{ marginLeft: 16, fontSize: 11, color: "var(--ink-soft)", fontFamily: "Geist Mono" }}>eventpro.io/create</span>
      </div>
      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--ink-soft)", fontFamily: "Geist Mono", letterSpacing: "0.06em" }}>NEW EVENT</div>
          <div style={{ fontSize: 22, fontWeight: 600, marginTop: 4, letterSpacing: "-0.015em" }}>Skyline Supper Club</div>
        </div>
        <div className="img-placeholder" style={{ height: 140, fontSize: 11 }}>EVENT BANNER · 1920×1080</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div className="card" style={{ padding: 12, background: "var(--bg-2)", border: "none" }}>
            <div style={{ fontSize: 10, color: "var(--ink-soft)" }}>DATE</div>
            <div style={{ fontSize: 13, fontWeight: 540, marginTop: 2 }}>Fri, 20 Jun · 7:30 PM</div>
          </div>
          <div className="card" style={{ padding: 12, background: "var(--bg-2)", border: "none" }}>
            <div style={{ fontSize: 10, color: "var(--ink-soft)" }}>VENUE</div>
            <div style={{ fontSize: 13, fontWeight: 540, marginTop: 2 }}>Atlas Rooftop, Delhi</div>
          </div>
        </div>
        <button className="btn btn-primary btn-sm" style={{ alignSelf: "flex-start" }}>Continue <Icon name="arrow" size={14} /></button>
      </div>
    </div>

    {/* Floating progress card */}
    <div className="card float-2" style={{ position: "absolute", top: 30, right: -20, padding: 16, width: 200, boxShadow: "var(--shadow-lg)" }}>
      <div style={{ fontSize: 10, color: "var(--ink-soft)", fontFamily: "Geist Mono", letterSpacing: "0.06em", marginBottom: 12 }}>SETUP PROGRESS</div>
      {["Details", "Tickets", "Publish", "Scan"].map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", fontSize: 13 }}>
          <span style={{ width: 18, height: 18, borderRadius: 999, background: i < 2 ? "var(--accent-3)" : "var(--hairline)", color: i < 2 ? "white" : "var(--ink-soft)", display: "grid", placeItems: "center", fontSize: 10 }}>
            {i < 2 ? <Icon name="check" size={10} stroke={3} /> : i + 1}
          </span>
          <span style={{ color: i < 2 ? "var(--ink)" : "var(--ink-soft)", fontWeight: i === 2 ? 540 : 400 }}>{s}</span>
        </div>
      ))}
    </div>

    {/* Floating stat card */}
    <div className="card float-3" style={{ position: "absolute", bottom: 0, left: -10, padding: 14, width: 180, boxShadow: "var(--shadow-lg)" }}>
      <div style={{ fontSize: 11, color: "var(--ink-soft)" }}>Setup time</div>
      <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 4 }}>04:32</div>
      <div style={{ fontSize: 11, color: "var(--accent-3)", marginTop: 2 }}>↘ vs avg 11:08</div>
    </div>
  </div>
);

export default function CreateEvent() {
  const go = useGo();
  const [step, setStep] = useState(1);
  const steps = ["Details", "Tickets", "Publish", "Scan"];

  return (
    <div className="page-enter">
      <section style={{ padding: "80px 0 48px", background: "var(--grad-hero)" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <span className="eyebrow">For organizers</span>
            <h1 className="display">
              Host events <span className="serif" style={{ color: "#F59E0B" }}>without</span><br /> complicated tools.
            </h1>
            <p className="lead" style={{ maxWidth: 540 }}>
              Free to launch. Pay only when you sell. Built by people who've actually run events — and got tired of bad software.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <Button variant="accent" size="xl" iconRight="arrow" onClick={() => go("signup")}>Start for free</Button>
              <Button variant="ghost" size="xl" icon="play">Watch 2-min demo</Button>
            </div>
            <div style={{ display: "flex", gap: 32, fontSize: 13, color: "var(--ink-soft)", marginTop: 8 }}>
              <span><Icon name="check" size={12} stroke={3} style={{ verticalAlign: -1, marginRight: 4, color: "var(--accent-3)" }} /> No credit card</span>
              <span><Icon name="check" size={12} stroke={3} style={{ verticalAlign: -1, marginRight: 4, color: "var(--accent-3)" }} /> Free until first sale</span>
              <span><Icon name="check" size={12} stroke={3} style={{ verticalAlign: -1, marginRight: 4, color: "var(--accent-3)" }} /> Setup in 5 min</span>
            </div>
          </div>
          <CreatorWizardMockup />
        </div>
      </section>

      {/* Workflow visual */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="The flow"
            title={<>From idea to <span className="serif" style={{ color: "#10B981" }}>sold-out</span> in four moves.</>}
            align="center"
          />
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 40, flexWrap: "wrap" }}>
            {steps.map((s, i) => (
              <button
                key={s}
                onClick={() => setStep(i + 1)}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 20px", borderRadius: 999,
                  border: `1px solid ${step === i + 1 ? "var(--ink)" : "var(--hairline-2)"}`,
                  background: step === i + 1 ? "var(--ink)" : "var(--surface)",
                  color: step === i + 1 ? "var(--bg)" : "var(--ink)",
                  cursor: "pointer", fontWeight: 540, fontSize: 14, transition: "all 200ms",
                }}
              >
                <span style={{
                  width: 22, height: 22, borderRadius: 999,
                  background: step === i + 1 ? "var(--accent)" : "var(--bg-2)",
                  color: step === i + 1 ? "white" : "var(--ink-soft)",
                  display: "grid", placeItems: "center", fontSize: 11, fontWeight: 600,
                }}>{i + 1}</span>
                {s}
                {i < steps.length - 1 && <Icon name="arrow" size={14} style={{ marginLeft: 6, opacity: 0.5 }} />}
              </button>
            ))}
          </div>

          <div className="card" style={{ padding: 48, minHeight: 480, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", background: "var(--bg-2)" }}>
            {step === 1 && <StepDetails />}
            {step === 2 && <StepTickets />}
            {step === 3 && <StepPublish />}
            {step === 4 && <StepScan />}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <SectionHeader
            eyebrow="Why creators choose us"
            title={<>The toolkit, <span className="serif" style={{ color: "#7C3AED" }}>all-in.</span></>}
            lead="No more spreadsheets, lost tickets, or 'Did they pay?' messages."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { icon: "bolt", title: "5-minute setup", body: "Smart templates by event type. Concert, workshop, dinner — pre-filled fields, just edit." },
              { icon: "qr", title: "Tamper-proof QR", body: "Encrypted tickets, fraud detection, and one-tap transfer. Scalpers hate us." },
              { icon: "bar", title: "Live analytics", body: "Track sales by hour, source, and ticket type. Re-target soft-yes guests in one click." },
              { icon: "share", title: "Auto social cards", body: "Beautiful share images for Instagram, WhatsApp, and X. Custom UTM parameters built in." },
              { icon: "users", title: "Team roles", body: "Add gate staff, ushers, and accountants. Granular permissions, no shared logins." },
              { icon: "lock", title: "Instant payouts", body: "Daily settlements direct to your bank. 12 currencies. No hidden fees." },
            ].map(b => (
              <div key={b.title} className="card feature-card hover-lift" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--primary-tint)", color: "var(--primary)", display: "grid", placeItems: "center" }}>
                  <Icon name={b.icon} size={18} />
                </div>
                <h3 className="h3">{b.title}</h3>
                <p style={{ fontSize: 14, color: "var(--ink-soft)" }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator testimonial */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ padding: 64, display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 48, alignItems: "center", background: "var(--ink)", color: "var(--bg)" }}>
            <div>
              <div style={{ display: "flex", gap: 4, color: "var(--accent-2)", marginBottom: 20 }}>
                {[0, 1, 2, 3, 4].map(i => <Icon key={i} name="star" size={18} stroke={0} style={{ fill: "currentColor" }} />)}
              </div>
              <blockquote style={{ margin: 0, fontSize: 28, fontWeight: 500, letterSpacing: "-0.015em", lineHeight: 1.3, textWrap: "pretty" }}>
                "Switched from a spreadsheet + Google Form combo and instantly got our weekends back. The scanner alone is worth the move."
              </blockquote>
              <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 999, background: "var(--accent)", display: "grid", placeItems: "center", fontWeight: 600 }}>AR</div>
                <div>
                  <div style={{ fontWeight: 540 }}>Aanya Rao</div>
                  <div style={{ fontSize: 13, opacity: 0.7 }}>Founder, Phantom Records</div>
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: 24, background: "var(--bg)", color: "var(--ink)" }}>
              <div style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "Geist Mono", marginBottom: 12 }}>Phantom Records · Last 90 days</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { l: "Tickets sold", v: "14,820", d: "+38%" },
                  { l: "Gross revenue", v: "₹1.2 Cr", d: "+22%" },
                  { l: "Avg sell-through", v: "92%", d: "+11%" },
                  { l: "Re-attend rate", v: "61%", d: "+8%" },
                ].map(s => (
                  <div key={s.l}>
                    <div style={{ fontSize: 11, color: "var(--ink-soft)" }}>{s.l}</div>
                    <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 4 }}>{s.v}</div>
                    <div style={{ fontSize: 11, color: "var(--accent-3)", marginTop: 2 }}>{s.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0" }}>
        <div className="container" style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
          <h2 className="h1">Your audience is waiting.</h2>
          <p className="lead" style={{ maxWidth: 480 }}>Build your event page in five minutes. We'll handle the rest.</p>
          <Button variant="accent" size="xl" iconRight="arrow" onClick={() => go("signup")}>Create your first event</Button>
        </div>
      </section>
    </div>
  );
}
