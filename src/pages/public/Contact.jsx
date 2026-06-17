/* Contact page */
import { useState } from 'react';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { Field } from '../../components/ui/Field';
import { useToast } from '../../stores/toastStore';

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

export default function Contact() {
  const { push } = useToast();
  const [form, setForm] = useState({ name: "", email: "", topic: "general", msg: "" });
  const [errs, setErrs] = useState({});
  const submit = e => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Required";
    if (!/^.+@.+\..+$/.test(form.email)) next.email = "Looks invalid";
    if (form.msg.trim().length < 10) next.msg = "A bit more detail?";
    setErrs(next);
    if (Object.keys(next).length === 0) {
      push("Message sent — we'll reply within a few hours", { icon: "check" });
      setForm({ name: "", email: "", topic: "general", msg: "" });
    }
  };

  return (
    <div className="page-enter">
      <section style={{ padding: "80px 0 32px", background: "var(--grad-hero)" }}>
        <div className="container-narrow" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span className="eyebrow">Help & support</span>
          <h1 className="display">
            We're here. <span className="serif" style={{ color: "var(--accent)" }}>Always.</span>
          </h1>
          <p className="lead" style={{ maxWidth: 540 }}>
            Real humans, fast replies. Median response time is under 9 minutes during event hours.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 56 }}>
            {[
              { icon: "chat", t: "Live chat", s: "Avg 2 min · Mon–Sun", a: "Start chat" },
              { icon: "mail", t: "Email support", s: "hello@eventpro.io · 9 min avg", a: "Send email" },
              { icon: "phone", t: "On-event hotline", s: "1800-PRO-EVNT · 24/7 during events", a: "Call now" },
            ].map(c => (
              <div key={c.t} className="card hover-lift" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--primary-tint)", color: "var(--primary)", display: "grid", placeItems: "center" }}>
                  <Icon name={c.icon} size={18} />
                </div>
                <h3 className="h3">{c.t}</h3>
                <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>{c.s}</p>
                <button className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-start", marginTop: 4 }}>{c.a} <Icon name="arrow" size={12} /></button>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "flex-start" }}>
            <form onSubmit={submit} className="card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 18 }}>
              <h2 className="h2">Send us a message</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="Your name" error={errs.name}>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Aanya Rao" />
                </Field>
                <Field label="Email" error={errs.email}>
                  <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@team.com" />
                </Field>
              </div>
              <Field label="What's this about?">
                <select value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })}>
                  <option value="general">General question</option>
                  <option value="organizer">I'm an organizer</option>
                  <option value="attendee">I'm an attendee</option>
                  <option value="sales">Sales · Business plan</option>
                  <option value="press">Press inquiry</option>
                </select>
              </Field>
              <Field label="Message" error={errs.msg}>
                <textarea rows="5" value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} placeholder="Tell us a bit about what you need…" />
              </Field>
              <Button type="submit" variant="primary" size="lg" iconRight="arrow" style={{ alignSelf: "flex-start" }}>Send message</Button>
            </form>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <h3 className="h2">Quick answers</h3>
              <div>
                {[
                  ["I bought a ticket but didn't get an email", "Check spam first, then sign in with the same email — your tickets live in your account too."],
                  ["I want to refund my ticket", "Most events allow self-refund up to 48 hours before. Open the event in your account → 'Manage ticket'."],
                  ["I'm an organizer and need help mid-event", "Call the on-event hotline. We have a dedicated team during weekends."],
                  ["Can I integrate via API?", "Yes — Business plan only. We provide REST + webhooks. Docs at docs.eventpro.io."],
                ].map(([q, a]) => (
                  <FAQItem key={q} q={q} a={a} />
                ))}
              </div>
              <div className="card" style={{ padding: 20, background: "var(--bg-2)", border: "1px solid var(--hairline)" }}>
                <div style={{ fontSize: 11, color: "var(--ink-soft)", fontFamily: "Geist Mono", letterSpacing: "0.06em", marginBottom: 10 }}>OFFICE</div>
                <div style={{ fontSize: 14, fontWeight: 540 }}>EventPro Technologies Pvt. Ltd.</div>
                <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 4 }}>1207 Kemp's Corner, Mumbai 400026</div>
                <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>India</div>
                <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                  {["twitter", "instagram", "linkedin"].map(s => (
                    <a key={s} href="#" style={{ width: 32, height: 32, borderRadius: 999, background: "var(--surface)", display: "grid", placeItems: "center", color: "var(--ink-soft)" }}><Icon name={s} size={13} /></a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
