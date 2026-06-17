/* Event Details page */
import { useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { EVENTS } from '../../data/events';
import { useGo } from '../../hooks/useGo';
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

export default function EventDetails() {
  const go = useGo();
  const [params] = useSearchParams();
  const soldOut = params.get('soldout') === '1';
  const { id } = useParams();
  const event = EVENTS.find(e => e.id === id) || EVENTS[0];
  const { push } = useToast();
  const [waitlisted, setWaitlisted] = useState(false);
  const [notify, setNotify] = useState(false);

  const tickets = [
    { id: "general", name: "General Admission", desc: "Standing access · all common areas", price: event.free ? 0 : event.price, avail: 312, max: 4, fee: 49 },
    { id: "early", name: "Early Bird (last 12)", desc: "Same as GA, with priority entry", price: event.free ? 0 : Math.max(0, event.price - 300), avail: 12, max: 2, fee: 49, soldOut: false, tag: "Almost gone" },
    { id: "vip", name: "VIP Lounge", desc: "Reserved table · welcome drink · meet & greet", price: event.free ? 1500 : event.price * 2.5, avail: 28, max: 6, fee: 149 },
    { id: "table", name: "Table for 6", desc: "Group bottle service in front zone", price: (event.free ? 1500 : event.price) * 6, avail: 4, max: 1, fee: 299, tag: "Group" },
  ];

  const [qty, setQty] = useState(tickets.reduce((acc, t) => ({ ...acc, [t.id]: 0 }), {}));
  const [activeTab, setActiveTab] = useState("about");
  const [saved, setSaved] = useState(false);

  const subtotal = tickets.reduce((s, t) => s + qty[t.id] * t.price, 0);
  const fees = tickets.reduce((s, t) => s + qty[t.id] * t.fee, 0);
  const total = subtotal + fees;
  const totalQty = Object.values(qty).reduce((a, b) => a + b, 0);

  const setTQ = (id, delta, max) => setQty(q => ({ ...q, [id]: Math.max(0, Math.min(max, (q[id] || 0) + delta)) }));

  return (
    <div className="page-enter">
      {/* Banner */}
      <section style={{ position: "relative", height: 480, overflow: "hidden" }}>
        <img src={event.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(14,11,46,0.2) 0%, rgba(14,11,46,0.85) 100%)" }} />
        <div className="container" style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 32px 48px", color: "white" }}>
          <button onClick={() => go("explore")} style={{ background: "rgba(255,255,255,0.12)", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 999, padding: "6px 14px", fontSize: 12, marginBottom: 24, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start" }}>
            <Icon name="chevLeft" size={12} /> Back to explore
          </button>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <span className="badge" style={{ background: "rgba(255,255,255,0.95)", color: "var(--ink)" }}>{event.category}</span>
            {event.trending && !soldOut && <span className="badge" style={{ background: "var(--accent)", color: "white" }}>🔥 Trending</span>}
            {soldOut && <span className="badge" style={{ background: "#EF4444", color: "white" }}>● Sold out</span>}
          </div>
          <h1 className="h1" style={{ color: "white", fontSize: "clamp(40px, 4.5vw, 64px)", maxWidth: 800 }}>
            {event.title}
          </h1>
          <div style={{ display: "flex", gap: 28, marginTop: 18, fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
            <span><Icon name="calendar" size={14} style={{ verticalAlign: -2, marginRight: 6 }} />{event.date} · {event.time}</span>
            <span><Icon name="pin" size={14} style={{ verticalAlign: -2, marginRight: 6 }} />Phoenix Marketcity, {event.city}</span>
            <span><Icon name="users" size={14} style={{ verticalAlign: -2, marginRight: 6 }} />2,400 going · 380 interested</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container" style={{ padding: "48px 32px 80px", display: "grid", gridTemplateColumns: "1.5fr 480px", gap: 48, alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {/* Organizer card + actions */}
          <div className="card" style={{ padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: event.color, color: "white", display: "grid", placeItems: "center", fontWeight: 600, fontSize: 14 }}>
                {event.organizer.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.04em", textTransform: "uppercase", fontFamily: "Geist Mono" }}>Hosted by</div>
                <div style={{ fontSize: 16, fontWeight: 540 }}>{event.organizer}</div>
                <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>4.9 ★ · 142 events hosted</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="ghost" size="sm">Follow</Button>
              <Button variant="ghost" size="sm" icon="share" onClick={() => push("Link copied to clipboard", { icon: "check" })}>Share</Button>
              <Button
                variant="ghost" size="sm" icon={saved ? "heart" : "bookmark"}
                onClick={() => { setSaved(s => !s); push(saved ? "Removed from saved" : "Saved to your list", { icon: saved ? "info" : "check" }); }}
                style={saved ? { color: "var(--accent)", borderColor: "var(--accent)" } : {}}
              >
                {saved ? "Saved" : "Save"}
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--hairline)", overflowX: "auto" }} className="carousel">
            {[
              { id: "about", label: "About" },
              { id: "schedule", label: "Schedule" },
              { id: "venue", label: "Venue" },
              { id: "sponsors", label: "Sponsors" },
              { id: "faq", label: "FAQs" },
              { id: "reviews", label: "Reviews · 412" },
            ].map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                background: "none", border: "none", padding: "12px 16px", fontSize: 14, fontWeight: 500, cursor: "pointer",
                borderBottom: activeTab === t.id ? "2px solid var(--ink)" : "2px solid transparent",
                color: activeTab === t.id ? "var(--ink)" : "var(--ink-soft)",
                marginBottom: -1, whiteSpace: "nowrap",
              }}>{t.label}</button>
            ))}
          </div>

          {activeTab === "about" && (
            <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--ink-2)", textWrap: "pretty" }}>
                A six-hour bloom of bass, lights, and people who actually want to be there. Three rooms, two stages, one rooftop. Headliners and surprise guests. Doors at 9:00 PM, last entry 11:30.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--ink-soft)", textWrap: "pretty" }}>
                The {event.title} returns to {event.city} after a sold-out run last winter. Expect a curated lineup, four bars, an open-air smoke garden, and a redesigned main-room rig. 18+. Government ID required at the door.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 8 }}>
                {[
                  { t: "Capacity", v: "2,400" },
                  { t: "Doors", v: "9:00 PM" },
                  { t: "Last entry", v: "11:30 PM" },
                  { t: "Age", v: "18+" },
                ].map(s => (
                  <div key={s.t} className="card" style={{ padding: 16 }}>
                    <div style={{ fontSize: 11, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "Geist Mono" }}>{s.t}</div>
                    <div style={{ fontSize: 20, fontWeight: 600, marginTop: 6, letterSpacing: "-0.01em" }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "schedule" && (
            <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { t: "9:00 PM", title: "Doors open · Welcome cocktail", body: "Lobby bar, photo wall, registration." },
                { t: "10:00 PM", title: "Opening set — DJ Halcyon", body: "Main room, 60-minute warm-up set." },
                { t: "11:30 PM", title: "Headliner: Midnight Bloom", body: "Two-hour live set. Visual show by Studio Pulse." },
                { t: "1:30 AM", title: "B2B set — surprise guest", body: "Late session, rooftop only." },
                { t: "3:00 AM", title: "Last call · close", body: "Coat check & rideshare zone outside Gate B." },
              ].map((s, i, a) => (
                <div key={s.t} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 24, padding: "16px 0", borderBottom: i < a.length - 1 ? "1px solid var(--hairline)" : "none", position: "relative" }}>
                  <div style={{ fontFamily: "Geist Mono", fontSize: 14, color: "var(--ink-soft)" }}>{s.t}</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 540 }}>{s.title}</div>
                    <div style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 4 }}>{s.body}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "venue" && (
            <div className="fade-up">
              <div className="img-placeholder" style={{ height: 300, marginBottom: 16, position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #EFEEFB, #E0DDD1)" }}>
                {/* Fake map */}
                <svg width="100%" height="100%" viewBox="0 0 600 300" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
                  <path d="M0,100 Q200,80 400,140 T600,180 M0,200 Q150,160 300,200 T600,140 M100,0 L100,300 M300,0 L300,300 M500,0 L500,300" stroke="rgba(30,27,75,0.18)" strokeWidth="1" fill="none" />
                  <path d="M0,150 L600,150" stroke="var(--accent)" strokeWidth="3" fill="none" />
                </svg>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -100%)", color: "var(--accent)", filter: "drop-shadow(0 4px 12px rgba(255,107,107,0.4))" }}>
                  <Icon name="pin" size={36} stroke={2} />
                </div>
              </div>
              <h3 className="h3" style={{ marginBottom: 8 }}>Phoenix Marketcity, {event.city}</h3>
              <p style={{ color: "var(--ink-soft)", fontSize: 14 }}>L.B.S. Marg, Kurla West, {event.city} — Easy access via Kurla station (1.2 km) and dedicated rideshare drop at Gate 4.</p>
            </div>
          )}

          {activeTab === "sponsors" && (
            <div className="fade-up" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {["Stripe", "Notion", "Linear", "Vercel", "Figma", "Loom", "Arc", "Raycast"].map(s => (
                <div key={s} className="card" style={{ padding: 28, display: "grid", placeItems: "center", fontWeight: 600, fontSize: 16, letterSpacing: "-0.02em", color: "var(--ink-soft)" }}>{s}</div>
              ))}
            </div>
          )}

          {activeTab === "faq" && (
            <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                ["Are tickets refundable?", "Yes — full refund up to 48 hours before doors. After that, you can transfer to anyone for free."],
                ["Is there parking?", "Limited paid parking at the venue. We strongly recommend rideshare; drop-off zone at Gate 4."],
                ["Re-entry?", "No re-entry once you're inside. Smoke garden and rooftop are within the venue, accessible all night."],
                ["Dress code?", "Smart-casual or whatever makes you dance. No flip-flops or shorts at the door."],
                ["ID requirement?", "Government photo ID. 18+. Driver's license, Aadhaar, or passport accepted."],
              ].map(([q, a], i) => (
                <FAQItem key={q} q={q} a={a} defaultOpen={i === 0} />
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <div style={{ fontSize: 64, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>4.9</div>
                <div>
                  <div style={{ display: "flex", gap: 4, color: "var(--accent-2)" }}>{[0, 1, 2, 3, 4].map(i => <Icon key={i} name="star" size={18} stroke={0} style={{ fill: "currentColor" }} />)}</div>
                  <div style={{ marginTop: 6, fontSize: 13, color: "var(--ink-soft)" }}>412 reviews · 96% would attend again</div>
                </div>
              </div>
              {[
                { n: "Aanya R.", r: 5, t: "Best Saturday in months. Sound system was unreal." },
                { n: "Karan M.", r: 5, t: "Smooth check-in, beautiful crowd. Will be back." },
                { n: "Lina J.", r: 4, t: "Loved it overall. Wished the rooftop opened earlier." },
              ].map(r => (
                <div key={r.n} className="card" style={{ padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 999, background: "var(--bg-2)", display: "grid", placeItems: "center", fontWeight: 600, fontSize: 12 }}>{r.n.split(" ").map(s => s[0]).join("")}</div>
                      <span style={{ fontSize: 14, fontWeight: 540 }}>{r.n}</span>
                    </div>
                    <div style={{ display: "flex", gap: 2, color: "var(--accent-2)" }}>
                      {[0, 1, 2, 3, 4].map(i => <Icon key={i} name="star" size={12} stroke={0} style={{ fill: i < r.r ? "currentColor" : "var(--hairline-2)" }} />)}
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: "var(--ink-2)" }}>"{r.t}"</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sticky booking card */}
        <aside style={{ position: "sticky", top: 96, alignSelf: "start" }}>
          {soldOut ? (
            <div className="card" style={{ overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
              <div style={{ padding: 24, background: "linear-gradient(135deg, #FEE2E2, #FECACA)", borderBottom: "1px solid var(--hairline)", textAlign: "center" }}>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 60, height: 60, borderRadius: 999, background: "#EF4444", color: "white", marginBottom: 14, boxShadow: "0 10px 30px -8px #EF444480" }}>
                  <Icon name="info" size={26} />
                </div>
                <div style={{ fontSize: 11, color: "#991B1B", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "Geist Mono", fontWeight: 600 }}>All tickets sold</div>
                <div style={{ fontSize: 28, fontWeight: 600, marginTop: 8, color: "#991B1B", letterSpacing: "-0.02em" }}>Sold out.</div>
                <div style={{ fontSize: 13, color: "#7F1D1D", marginTop: 6 }}>2,400 / 2,400 tickets gone in 48 hours.</div>
              </div>
              <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 540, marginBottom: 4 }}>Join the waitlist</div>
                  <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>Get first access if a ticket is released. {waitlisted ? "412" : "411"} people in line.</div>
                </div>
                <Button
                  variant={waitlisted ? "ghost" : "primary"} size="lg" icon={waitlisted ? "check" : "bell"}
                  style={{ width: "100%" }}
                  onClick={() => { setWaitlisted(w => !w); push(waitlisted ? "Removed from waitlist" : "You're #412 on the waitlist", { icon: waitlisted ? "info" : "check" }); }}
                >
                  {waitlisted ? "You're on the waitlist" : "Join the waitlist"}
                </Button>
                <button
                  onClick={() => { setNotify(n => !n); push(notify ? "Notifications off" : "We'll ping you for the next show", { icon: notify ? "info" : "check" }); }}
                  className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}
                >
                  <Icon name={notify ? "check" : "bell"} size={14} /> {notify ? "Notifying you" : "Notify me of similar events"}
                </button>
                <div style={{ display: "flex", gap: 8 }}>
                  <Button variant="ghost" size="sm" icon="share" style={{ flex: 1, justifyContent: "center" }} onClick={() => push("Link copied", { icon: "check" })}>Share</Button>
                  <Button variant="ghost" size="sm" icon="calendar" style={{ flex: 1, justifyContent: "center" }} onClick={() => go("explore")}>See similar</Button>
                </div>
                <div style={{ marginTop: 4, fontSize: 11, color: "var(--ink-soft)", textAlign: "center", lineHeight: 1.5 }}>
                  <Icon name="info" size={11} style={{ verticalAlign: "middle", marginRight: 4 }} />
                  Be careful of resale scams. Tickets are non-transferable; only buy here.
                </div>
              </div>
            </div>
          ) : (
          <div className="card" style={{ overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
            <div style={{ padding: 24, borderBottom: "1px solid var(--hairline)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <div style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "Geist Mono" }}>Tickets from</div>
                  <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 4 }}>
                    {event.free ? <span style={{ color: "var(--accent-3)" }}>Free</span> : <>₹{event.price.toLocaleString()}</>}
                  </div>
                </div>
                <span className="badge badge-amber">Going fast</span>
              </div>
            </div>
            <div style={{ padding: "8px 8px 0", display: "flex", flexDirection: "column" }}>
              {tickets.map(t => (
                <div key={t.id} style={{
                  padding: 16, borderRadius: 14, marginBottom: 6,
                  background: qty[t.id] > 0 ? "var(--bg-2)" : "transparent",
                  transition: "background 200ms",
                  display: "flex", flexDirection: "column", gap: 12,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 14, fontWeight: 540 }}>{t.name}</span>
                        {t.tag && <span className={`badge ${t.tag === "Group" ? "" : "badge-amber"}`}>{t.tag}</span>}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{t.desc}</div>
                      <div style={{ fontSize: 12, color: "var(--ink)", marginTop: 4, fontWeight: 540 }}>
                        ₹{t.price.toLocaleString()} <span style={{ color: "var(--ink-soft)", fontWeight: 400 }}>+ ₹{t.fee} fee</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, padding: 4, borderRadius: 999, background: "var(--surface)", border: "1px solid var(--hairline-2)" }}>
                      <button onClick={() => setTQ(t.id, -1, t.max)} disabled={(qty[t.id] || 0) === 0} style={{
                        width: 28, height: 28, borderRadius: 999, border: "none", background: "transparent", cursor: "pointer", display: "grid", placeItems: "center", color: (qty[t.id] || 0) === 0 ? "var(--hairline-2)" : "var(--ink)",
                      }}><Icon name="minus" size={14} /></button>
                      <span style={{ minWidth: 16, textAlign: "center", fontWeight: 540, fontSize: 14 }}>{qty[t.id] || 0}</span>
                      <button onClick={() => setTQ(t.id, 1, t.max)} disabled={(qty[t.id] || 0) >= t.max} style={{
                        width: 28, height: 28, borderRadius: 999, border: "none", background: (qty[t.id] || 0) >= t.max ? "transparent" : "var(--ink)", color: (qty[t.id] || 0) >= t.max ? "var(--hairline-2)" : "var(--bg)", cursor: (qty[t.id] || 0) >= t.max ? "not-allowed" : "pointer", display: "grid", placeItems: "center",
                      }}><Icon name="plus" size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: 24, borderTop: "1px solid var(--hairline)", background: "var(--bg-2)" }}>
              {totalQty > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16, fontSize: 13, color: "var(--ink-soft)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>Subtotal · {totalQty} ticket{totalQty > 1 ? "s" : ""}</span><span>₹{subtotal.toLocaleString()}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>Platform fee</span><span>₹{fees.toLocaleString()}</span></div>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontSize: 14, fontWeight: 540 }}>Total</span>
                <span style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em" }}>₹{total.toLocaleString()}</span>
              </div>
              <Button
                variant="accent" size="lg" iconRight="arrow"
                style={{ width: "100%" }}
                onClick={() => { if (totalQty === 0) push("Add a ticket first", { icon: "info" }); else push(`Booking ${totalQty} ticket${totalQty > 1 ? "s" : ""}…`, { icon: "check" }); }}
              >
                {totalQty === 0 ? "Select tickets" : `Book ${totalQty} ticket${totalQty > 1 ? "s" : ""}`}
              </Button>
              <div style={{ marginTop: 12, fontSize: 11, color: "var(--ink-soft)", display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
                <Icon name="lock" size={11} /> Secure checkout · Free transfer · Refundable up to 48h
              </div>
            </div>
          </div>
          )}
          {!soldOut && (
            <div style={{ marginTop: 12, fontSize: 12, color: "var(--ink-soft)", textAlign: "center" }}>
              <Icon name="users" size={12} style={{ verticalAlign: -2 }} /> 47 people viewing this event right now
            </div>
          )}
          {soldOut && (
            <div style={{ marginTop: 12, fontSize: 12, color: "var(--ink-soft)", textAlign: "center" }}>
              <Icon name="users" size={12} style={{ verticalAlign: -2 }} /> 412 people on the waitlist · 8.4k watching
            </div>
          )}
        </aside>
      </section>
    </div>
  );
}
