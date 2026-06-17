/* About page */
import { Button } from '../../components/ui/Button';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { useGo } from '../../hooks/useGo';

export default function About() {
  const go = useGo();
  return (
    <div className="page-enter">
      <section style={{ padding: "80px 0 32px", background: "var(--grad-hero)" }}>
        <div className="container-narrow" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span className="eyebrow">Our story</span>
          <h1 className="display">
            We build the <span className="serif" style={{ color: "#7C3AED" }}>quiet</span><br />software that lets <br />the <span className="serif" style={{ color: "#F59E0B" }}>loud</span> stuff happen.
          </h1>
          <p className="lead" style={{ maxWidth: 640 }}>
            EventPro started in a Mumbai apartment when three friends spent a week wrangling spreadsheets to run one weekend gig. We ship the tool we wished we had.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <span className="eyebrow">Mission</span>
              <h2 className="h1" style={{ marginTop: 16 }}>Make running events feel <span className="serif" style={{ color: "#10B981" }}>good.</span></h2>
              <p className="lead" style={{ marginTop: 20 }}>
                Anyone with a calendar and a venue can put together a weekend. The hard part is the operational tax — payments, manifests, lost guest lists, fraud. We take that tax to zero so organizers can do what they do best: gather people.
              </p>
            </div>
            <div className="img-placeholder" style={{ height: 380, fontSize: 11, background: `url(https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=900&q=80) center/cover`, backgroundBlendMode: "multiply" }}>
              <span style={{ background: "rgba(0,0,0,0.5)", color: "white", padding: "6px 10px", borderRadius: 6 }}>Phantom Records · Mumbai · 2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / numbers */}
      <section className="section-tight" style={{ background: "var(--grad-stats)", color: "#F8FAFC", position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ padding: "40px 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
            {[
              ["Tickets processed", "4.2M+"], ["Events hosted", "22.4K+"], ["Cities", "18"], ["Team members", "47"],
            ].map(([l, v]) => (
              <div key={l}>
                <div style={{ fontSize: 56, fontWeight: 540, letterSpacing: "-0.03em", lineHeight: 1 }}>{v}</div>
                <div style={{ marginTop: 10, fontSize: 12, color: "rgba(255,255,255,0.6)", letterSpacing: "0.04em", textTransform: "uppercase", fontFamily: "Geist Mono" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="What we believe" title={<>Five rules. <span className="serif" style={{ color: "#EC4899" }}>No exceptions.</span></>} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
            {[
              { n: "01", t: "Creator-first", b: "If it's bad for the organizer, it's bad — full stop." },
              { n: "02", t: "Boring on purpose", b: "Reliability is a feature. The scanner just works." },
              { n: "03", t: "Fast over fancy", b: "We optimize for the page that loads in 800ms." },
              { n: "04", t: "Honest fees", b: "What you see is what you pay. No surprise line items." },
              { n: "05", t: "Show up", b: "We dogfood. Every release ships in a real event first." },
            ].map(v => (
              <div key={v.n} className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
                <span style={{ fontFamily: "Geist Mono", fontSize: 12, color: "var(--ink-soft)" }}>{v.n}</span>
                <h3 className="h4">{v.t}</h3>
                <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>{v.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <SectionHeader eyebrow="The team" title={<>The people <span className="serif" style={{ color: "#1E40AF" }}>behind</span> the platform.</>} lead="A small, intentional team. Designers, engineers, and ex-organizers who still run events on weekends." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              ["Aanya Rao", "Co-founder & CEO", "Mumbai", "#1E1B4B"],
              ["Karan Mehta", "Co-founder & CTO", "Bengaluru", "#FF6B6B"],
              ["Lina Joseph", "Head of Design", "Goa", "#10B981"],
              ["Aman Shaikh", "Head of Operations", "Delhi", "#F59E0B"],
              ["Riya Nair", "Engineering", "Pune", "#7C3AED"],
              ["Devansh Khan", "Engineering", "Hyderabad", "#0EA5E9"],
              ["Mira Saxena", "Brand & Content", "Mumbai", "#EC4899"],
              ["Ishaan Verma", "Customer Success", "Bengaluru", "#1E1B4B"],
            ].map(([n, r, c, col]) => (
              <div key={n} className="card hover-lift" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ height: 200, background: col, display: "grid", placeItems: "center", color: "white", fontSize: 36, fontWeight: 600 }}>
                  {n.split(" ").map(s => s[0]).join("")}
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 15, fontWeight: 540 }}>{n}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>{r}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2, fontFamily: "Geist Mono" }}>{c}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why we built */}
      <section className="section">
        <div className="container-narrow" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span className="eyebrow">Why we built this</span>
          <h2 className="h1" style={{ textWrap: "balance" }}>The first event we ran took 47 hours of operational work. <span className="serif" style={{ color: "#F59E0B" }}>It should have taken three.</span></h2>
          <p className="lead" style={{ color: "var(--ink-2)" }}>
            We had three spreadsheets, two payment processors, a printer that died at 8 PM, and a guest list that lived on someone's iPhone Notes. Two-thirds of the work was administrative. The actual event — the part that mattered — was the smallest slice of our weekend.
          </p>
          <p className="lead" style={{ color: "var(--ink-2)" }}>
            We built EventPro because the world has enough beautiful event ideas. It just doesn't have enough time. The platform is our small offering against that gap.
          </p>
          <p style={{ fontSize: 16, color: "var(--ink-soft)" }}>
            — Aanya, Karan, and the EventPro team.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ padding: 64, textAlign: "center", background: "var(--ink)", color: "var(--bg)" }}>
            <h2 className="h1" style={{ color: "var(--bg)" }}>Want to build with us?</h2>
            <p className="lead" style={{ color: "rgba(255,255,255,0.7)", marginTop: 16 }}>We're hiring across engineering, design, and customer success.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28 }}>
              <Button variant="accent" size="lg">See open roles</Button>
              <Button variant="ghost" size="lg" style={{ borderColor: "rgba(255,255,255,0.2)", color: "white" }} onClick={() => go("contact")}>Get in touch</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
