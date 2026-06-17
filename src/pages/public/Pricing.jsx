/* Pricing page */
import { useState } from 'react';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { useGo } from '../../hooks/useGo';

const FAQItem = ({ q, a, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen || false);
  return (
    <div style={{ borderBottom: "1px solid var(--hairline)" }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", padding: "20px 0", border: "none", background: "transparent", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: "left" }}>
        <span style={{ fontSize: 16, fontWeight: 540 }}>{q}</span>
        <Icon name="plus" size={16} style={{ transform: open ? "rotate(45deg)" : "none", transition: "transform 220ms cubic-bezier(.2,.7,.2,1)", color: "var(--ink-soft)" }} />
      </button>
      <div style={{
        display: "grid", gridTemplateRows: open ? "1fr" : "0fr",
        transition: "grid-template-rows 240ms ease-out", overflow: "hidden",
      }}>
        <div style={{ minHeight: 0 }}>
          <p style={{ paddingBottom: 20, fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6 }}>{a}</p>
        </div>
      </div>
    </div>
  );
};

export default function Pricing() {
  const go = useGo();
  const [billing, setBilling] = useState("monthly");
  const plans = [
    {
      id: "free", name: "Free",
      tagline: "For first events",
      price: { monthly: 0, annual: 0 },
      fee: "2.9% + ₹10 per ticket",
      cta: "Start free",
      ctaVariant: "ghost",
      features: ["Unlimited free events", "QR ticketing", "Basic analytics", "Email support", "1 organizer seat", "Mobile scanner"],
    },
    {
      id: "pro", name: "Pro",
      tagline: "Most popular for growing organizers",
      price: { monthly: 1499, annual: 14990 },
      fee: "1.9% + ₹5 per ticket",
      cta: "Go Pro",
      ctaVariant: "accent",
      featured: true,
      features: [
        "Everything in Free",
        "Advanced analytics & cohorts",
        "Custom branding & domains",
        "Up to 5 team seats",
        "Priority email + chat support",
        "Discount codes & bundles",
        "Waitlists & early-bird tiers",
        "Embeddable booking widget",
      ],
    },
    {
      id: "biz", name: "Business",
      tagline: "For festivals and recurring series",
      price: { monthly: 4999, annual: 49990 },
      fee: "0.9% + ₹3 per ticket",
      cta: "Talk to sales",
      ctaVariant: "primary",
      features: [
        "Everything in Pro",
        "Unlimited team seats",
        "SSO & role-based access",
        "Dedicated success manager",
        "Custom integrations & API",
        "Volume discount on fees",
        "On-site staffing add-ons",
        "99.99% SLA",
      ],
    },
  ];

  const compare = [
    { feat: "Public event page", f: true, p: true, b: true },
    { feat: "QR ticketing & scanner", f: true, p: true, b: true },
    { feat: "Mobile-optimized checkout", f: true, p: true, b: true },
    { feat: "Custom branding", f: false, p: true, b: true },
    { feat: "Discount codes", f: false, p: true, b: true },
    { feat: "Cohort analytics", f: false, p: true, b: true },
    { feat: "Embeddable widget", f: false, p: true, b: true },
    { feat: "Custom domain", f: false, p: true, b: true },
    { feat: "Team seats", f: "1", p: "5", b: "Unlimited" },
    { feat: "API access", f: false, p: false, b: true },
    { feat: "SSO + SCIM", f: false, p: false, b: true },
    { feat: "Dedicated support", f: false, p: false, b: true },
    { feat: "Uptime SLA", f: "99.9%", p: "99.95%", b: "99.99%" },
  ];

  return (
    <div className="page-enter">
      <section style={{ padding: "80px 0 40px", background: "var(--grad-hero)" }}>
        <div className="container" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          <span className="eyebrow">Pricing</span>
          <h1 className="display" style={{ maxWidth: 900 }}>
            Simple <span className="serif" style={{ color: "#10B981" }}>pricing</span> that<br />grows with you.
          </h1>
          <p className="lead" style={{ maxWidth: 540 }}>
            Free until your first sale. No hidden fees. Switch plans whenever you like — even mid-event.
          </p>
          <div style={{ display: "inline-flex", gap: 4, padding: 4, borderRadius: 999, background: "var(--bg-2)", border: "1px solid var(--hairline)" }}>
            {[["monthly", "Monthly"], ["annual", "Annual · save 20%"]].map(([id, label]) => (
              <button key={id} onClick={() => setBilling(id)} style={{
                padding: "8px 18px", borderRadius: 999, border: "none",
                background: billing === id ? "var(--surface)" : "transparent",
                color: billing === id ? "var(--ink)" : "var(--ink-soft)",
                fontWeight: 540, fontSize: 13, cursor: "pointer",
                boxShadow: billing === id ? "var(--shadow-sm)" : "none",
                transition: "all 200ms",
              }}>{label}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section style={{ padding: "40px 0 80px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, alignItems: "stretch" }}>
            {plans.map(p => (
              <div
                key={p.id}
                className={`card ${p.featured ? "ring-glow" : ""}`}
                style={{
                  padding: 32,
                  position: "relative",
                  background: p.featured ? "var(--ink)" : "var(--surface)",
                  color: p.featured ? "var(--bg)" : "var(--ink)",
                  border: p.featured ? "none" : "1px solid var(--hairline)",
                  boxShadow: p.featured ? "var(--shadow-xl)" : "var(--shadow-sm)",
                  display: "flex", flexDirection: "column", gap: 18,
                  transform: p.featured ? "translateY(-12px)" : "none",
                }}
              >
                {p.featured && (
                  <div style={{ position: "absolute", top: -12, left: 32, padding: "4px 10px", background: "var(--accent)", color: "white", borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>Most popular</div>
                )}
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 540, letterSpacing: "-0.015em" }}>{p.name}</h3>
                  <p style={{ fontSize: 13, color: p.featured ? "rgba(255,255,255,0.65)" : "var(--ink-soft)", marginTop: 4 }}>{p.tagline}</p>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span style={{ fontSize: 48, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>
                      ₹{(billing === "annual" ? p.price.annual / 12 : p.price.monthly).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                    <span style={{ fontSize: 14, color: p.featured ? "rgba(255,255,255,0.6)" : "var(--ink-soft)" }}>/ mo</span>
                  </div>
                  <div style={{ fontSize: 12, color: p.featured ? "rgba(255,255,255,0.55)" : "var(--muted)", marginTop: 8 }}>
                    + {p.fee}
                  </div>
                </div>
                <Button variant={p.ctaVariant} size="lg" style={{ width: "100%" }} onClick={() => go(p.id === "biz" ? "contact" : "signup")}>{p.cta}</Button>
                <div style={{ height: 1, background: p.featured ? "rgba(255,255,255,0.1)" : "var(--hairline)" }} />
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {p.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14 }}>
                      <Icon name="check" size={14} stroke={3} style={{ color: p.featured ? "var(--accent)" : "var(--accent-3)", marginTop: 4, flexShrink: 0 }} />
                      <span style={{ color: p.featured ? "rgba(255,255,255,0.92)" : "var(--ink-2)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compare */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <SectionHeader
            eyebrow="Compare"
            title={<>Feature <span className="serif" style={{ color: "#EC4899" }}>by feature.</span></>}
            align="center"
          />
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", borderBottom: "1px solid var(--hairline)", padding: "20px 24px", background: "var(--bg-2)" }}>
              <div style={{ fontSize: 12, color: "var(--ink-soft)", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "Geist Mono" }}>Feature</div>
              {["Free", "Pro", "Business"].map((n, i) => (
                <div key={n} style={{ fontSize: 14, fontWeight: 600, textAlign: "center", color: i === 1 ? "var(--ink)" : "var(--ink-soft)" }}>{n}{i === 1 && <span className="badge badge-coral" style={{ marginLeft: 6 }}>Popular</span>}</div>
              ))}
            </div>
            {compare.map((row, i) => {
              const cell = v => v === true ? <Icon name="check" size={14} stroke={3} style={{ color: "var(--accent-3)" }} /> : v === false ? <span style={{ color: "var(--hairline-2)" }}>—</span> : v;
              return (
                <div key={row.feat} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "16px 24px", borderTop: i === 0 ? "none" : "1px solid var(--hairline)", alignItems: "center", fontSize: 14 }}>
                  <div style={{ color: "var(--ink-2)" }}>{row.feat}</div>
                  <div style={{ textAlign: "center" }}>{cell(row.f)}</div>
                  <div style={{ textAlign: "center", fontWeight: 540 }}>{cell(row.p)}</div>
                  <div style={{ textAlign: "center" }}>{cell(row.b)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-narrow">
          <SectionHeader eyebrow="FAQ" title="Pricing, briefly." align="center" />
          <div>
            {[
              ["What's the per-ticket fee?", "Per-ticket fees only apply to paid tickets — you can publish unlimited free events on any plan, fee-free."],
              ["Do I need a credit card to start?", "No. Sign up, build your event, and only add a card when you're ready to take payments."],
              ["Can I switch plans?", "Yes — upgrade or downgrade anytime. Pro-rated to the day. Mid-event switches are fine."],
              ["What about refunds?", "We pass your refund policy directly to attendees. Our fees are fully refunded along with the ticket value."],
              ["Is there a yearly discount?", "Yes — annual billing saves 20% across Pro and Business."],
            ].map(([q, a], i) => (
              <FAQItem key={q} q={q} a={a} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
