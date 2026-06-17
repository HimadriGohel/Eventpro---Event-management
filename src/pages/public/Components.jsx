/* Components / design system page */
import { useState, useMemo, Fragment } from 'react';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { Field } from '../../components/ui/Field';
import { EventCard } from '../../components/ui/EventCard';
import { EVENTS } from '../../data/events';

/* Cheap fake QR — inlined from prototype's home.jsx */
const QRBlock = ({ size = 96, seed = "abc" }) => {
  const cells = 11;
  const grid = useMemo(() => {
    let h = 0; for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    const r = () => { h = (h * 1664525 + 1013904223) >>> 0; return (h >>> 16) / 65535; };
    return Array.from({ length: cells }, () => Array.from({ length: cells }, () => r() > 0.55 ? 1 : 0));
  }, [seed]);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${cells} ${cells}`} style={{ shapeRendering: "crispEdges" }}>
      <rect width={cells} height={cells} fill="white" />
      {grid.map((row, y) => row.map((c, x) => c ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="var(--ink)" /> : null))}
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

const Spec = ({ title, children }) => (
  <section>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
      <h2 className="h2">{title}</h2>
      <span style={{ fontFamily: "Geist Mono", fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{title}</span>
    </div>
    {children}
  </section>
);

const Sample = ({ children, label }) => (
  <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
    {label && <div style={{ fontSize: 11, color: "var(--ink-soft)", fontFamily: "Geist Mono", letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>}
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>{children}</div>
  </div>
);

const ButtonsSpec = () => (
  <Spec title="Buttons">
    <div style={{ display: "grid", gap: 12 }}>
      <Sample label="Variants">
        <Button variant="primary">Primary</Button>
        <Button variant="accent">Accent</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="primary" disabled>Disabled</Button>
      </Sample>
      <Sample label="Sizes">
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="primary">Default</Button>
        <Button variant="primary" size="lg">Large</Button>
        <Button variant="primary" size="xl">Extra large</Button>
      </Sample>
      <Sample label="With icons">
        <Button variant="primary" icon="plus">New event</Button>
        <Button variant="accent" iconRight="arrow">Get started</Button>
        <Button variant="ghost" icon="search">Search</Button>
        <Button variant="ghost" icon="apple">Continue with Apple</Button>
      </Sample>
      <Sample label="Icon-only">
        <button className="btn btn-ghost" style={{ width: 40, height: 40, padding: 0, borderRadius: 999 }}><Icon name="bookmark" size={16} /></button>
        <button className="btn btn-ghost" style={{ width: 40, height: 40, padding: 0, borderRadius: 999 }}><Icon name="share" size={16} /></button>
        <button className="btn btn-primary" style={{ width: 40, height: 40, padding: 0, borderRadius: 999 }}><Icon name="plus" size={16} /></button>
      </Sample>
    </div>
  </Spec>
);

const InputsSpec = () => (
  <Spec title="Inputs">
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <Sample label="Default">
        <Field label="Email" icon="mail" style={{ width: "100%" }}>
          <input placeholder="you@team.com" />
        </Field>
      </Sample>
      <Sample label="Error state">
        <Field label="Phone" icon="phone" error="10-digit number" style={{ width: "100%" }}>
          <input value="987654" onChange={() => {}} />
        </Field>
      </Sample>
      <Sample label="Textarea">
        <Field label="Message" hint="Markdown supported" style={{ width: "100%" }}>
          <textarea placeholder="Tell us a bit…" rows={3} />
        </Field>
      </Sample>
      <Sample label="Select">
        <Field label="Topic" style={{ width: "100%" }}>
          <select defaultValue="general"><option value="general">General question</option><option>Sales</option></select>
        </Field>
      </Sample>
      <Sample label="Search bar">
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 6, background: "var(--surface)", borderRadius: 12, border: "1px solid var(--hairline-2)", width: "100%" }}>
          <Icon name="search" size={16} style={{ color: "var(--ink-soft)", marginLeft: 12 }} />
          <input style={{ flex: 1, border: "none", outline: "none", background: "transparent", padding: "8px 0" }} placeholder="Search events…" />
          <Button variant="primary" size="sm">Search</Button>
        </div>
      </Sample>
      <Sample label="OTP">
        <div style={{ display: "flex", gap: 8 }}>
          {["7", "1", "4", "9", "", ""].map((v, i) => (
            <input key={i} className="input" defaultValue={v} style={{ width: 40, height: 48, textAlign: "center", fontSize: 18, fontWeight: 600, fontFamily: "Geist Mono" }} />
          ))}
        </div>
      </Sample>
    </div>
  </Spec>
);

const ChipsSpec = () => (
  <Spec title="Chips, tags & badges">
    <div style={{ display: "grid", gap: 12 }}>
      <Sample label="Filter chips">
        <button className="chip is-active">All</button>
        <button className="chip">Concerts</button>
        <button className="chip">Comedy</button>
        <button className="chip">Workshops</button>
        <button className="chip">Food</button>
      </Sample>
      <Sample label="Badges">
        <span className="badge">Default</span>
        <span className="badge badge-coral">Trending</span>
        <span className="badge badge-amber">Going fast</span>
        <span className="badge badge-emerald">Free</span>
      </Sample>
      <Sample label="Tags with icons">
        <span className="badge"><Icon name="calendar" size={10} /> Sat, 14 Jun</span>
        <span className="badge"><Icon name="pin" size={10} /> Mumbai</span>
        <span className="badge"><Icon name="user" size={10} /> 2.4k going</span>
      </Sample>
    </div>
  </Spec>
);

const CardsSpec = () => (
  <Spec title="Cards">
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
      <EventCard event={EVENTS[0]} onClick={() => {}} />
      <EventCard event={EVENTS[2]} onClick={() => {}} />
      <EventCard event={EVENTS[5]} onClick={() => {}} />
    </div>
  </Spec>
);

const TicketsSpec = () => (
  <Spec title="Tickets & QR">
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16 }}>
      {/* Ticket card */}
      <div className="card" style={{ padding: 0, overflow: "hidden", display: "grid", gridTemplateColumns: "1fr auto", boxShadow: "var(--shadow-md)" }}>
        <div style={{ padding: 24, position: "relative" }}>
          <div style={{ fontSize: 11, color: "var(--ink-soft)", fontFamily: "Geist Mono", letterSpacing: "0.06em" }}>EVENT TICKET · A-014</div>
          <h3 className="h2" style={{ marginTop: 8, fontSize: 22 }}>Neo Rave: Midnight Bloom</h3>
          <div style={{ display: "flex", gap: 24, marginTop: 14, fontSize: 12 }}>
            <div>
              <div style={{ color: "var(--ink-soft)" }}>Date</div>
              <div style={{ fontWeight: 540, marginTop: 2 }}>Sat, 14 Jun</div>
            </div>
            <div>
              <div style={{ color: "var(--ink-soft)" }}>Doors</div>
              <div style={{ fontWeight: 540, marginTop: 2 }}>9:00 PM</div>
            </div>
            <div>
              <div style={{ color: "var(--ink-soft)" }}>Tier</div>
              <div style={{ fontWeight: 540, marginTop: 2 }}>VIP Lounge</div>
            </div>
            <div>
              <div style={{ color: "var(--ink-soft)" }}>Holder</div>
              <div style={{ fontWeight: 540, marginTop: 2 }}>Aanya R.</div>
            </div>
          </div>
          {/* perforation */}
          <div style={{ position: "absolute", right: -8, top: 16, bottom: 16, width: 16, background: "var(--bg-2)", borderRadius: 8 }} />
        </div>
        <div style={{ padding: 24, background: "var(--bg-2)", display: "grid", placeItems: "center", borderLeft: "2px dashed var(--hairline-2)" }}>
          <QRBlock size={120} />
        </div>
      </div>
      {/* QR card */}
      <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14, alignItems: "center", textAlign: "center" }}>
        <span className="badge badge-emerald">Valid · A-014</span>
        <QRBlock size={140} />
        <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>Scan at Gate B · Phoenix Marketcity</div>
      </div>
    </div>
  </Spec>
);

const FeedbackSpec = () => (
  <Spec title="Feedback & state">
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <Sample label="Toast">
        <div className="toast" style={{ position: "static", transform: "none", animation: "none" }}>
          <Icon name="check" size={14} style={{ verticalAlign: -2, marginRight: 8 }} />Saved to your list
        </div>
      </Sample>
      <Sample label="Empty state">
        <div style={{ width: "100%", padding: 32, borderRadius: 14, background: "var(--bg-2)", textAlign: "center" }}>
          <Icon name="ticket" size={28} style={{ color: "var(--ink-soft)", marginBottom: 10 }} />
          <div style={{ fontSize: 15, fontWeight: 540 }}>No saved events yet</div>
          <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 4 }}>Tap the bookmark on any event to save it.</div>
        </div>
      </Sample>
      <Sample label="Skeleton loader">
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
          <div className="skeleton" style={{ height: 120, borderRadius: 14 }} />
          <div className="skeleton" style={{ height: 14, width: "70%" }} />
          <div className="skeleton" style={{ height: 12, width: "40%" }} />
        </div>
      </Sample>
      <Sample label="Spinner">
        <div style={{ width: 36, height: 36, border: "3px solid var(--hairline)", borderTopColor: "var(--ink)", borderRadius: 999, animation: "spin 800ms linear infinite" }} />
      </Sample>
    </div>
  </Spec>
);

const NavSpec = () => (
  <Spec title="Navigation">
    <div style={{ display: "grid", gap: 12 }}>
      <Sample label="Tabs">
        <div style={{ display: "flex", borderBottom: "1px solid var(--hairline)", width: "100%" }}>
          {["About", "Schedule", "Venue", "FAQ"].map((t, i) => (
            <button key={t} style={{ background: "none", border: "none", padding: "12px 16px", fontSize: 14, fontWeight: 500, cursor: "pointer", borderBottom: i === 0 ? "2px solid var(--ink)" : "2px solid transparent", marginBottom: -1, color: i === 0 ? "var(--ink)" : "var(--ink-soft)" }}>{t}</button>
          ))}
        </div>
      </Sample>
      <Sample label="Pagination / segmented">
        <div style={{ display: "flex", gap: 4, padding: 4, background: "var(--bg-2)", borderRadius: 999 }}>
          {["Trending", "Newest", "Nearest"].map((t, i) => (
            <button key={t} style={{ padding: "6px 14px", borderRadius: 999, border: "none", background: i === 0 ? "var(--surface)" : "transparent", color: i === 0 ? "var(--ink)" : "var(--ink-soft)", fontSize: 13, fontWeight: 540, cursor: "pointer", boxShadow: i === 0 ? "var(--shadow-sm)" : "none" }}>{t}</button>
          ))}
        </div>
      </Sample>
      <Sample label="Mobile bottom nav (preview)">
        <div style={{ width: 320, height: 64, borderRadius: 16, background: "var(--surface)", border: "1px solid var(--hairline)", padding: 8, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4 }}>
          {[
            ["home", "Home", true], ["search", "Explore", false], ["plus", "Create", false], ["ticket", "Tickets", false], ["user", "Me", false]
          ].map(([icon, label, active]) => (
            <button key={label} style={{ background: active ? "var(--bg-2)" : "transparent", border: "none", borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, color: active ? "var(--ink)" : "var(--ink-soft)", cursor: "pointer" }}>
              <Icon name={icon} size={16} />
              <span style={{ fontSize: 10, fontWeight: 540 }}>{label}</span>
            </button>
          ))}
        </div>
      </Sample>
    </div>
  </Spec>
);

export default function Components() {
  const [tab, setTab] = useState("buttons");
  const tabs = [
    { id: "buttons", label: "Buttons" },
    { id: "inputs", label: "Inputs" },
    { id: "chips", label: "Chips & badges" },
    { id: "cards", label: "Cards" },
    { id: "tickets", label: "Ticket & QR" },
    { id: "feedback", label: "Feedback" },
    { id: "nav", label: "Navigation" },
  ];

  return (
    <div className="page-enter" style={{ paddingBottom: 80 }}>
      <section style={{ padding: "64px 0 32px", background: "var(--grad-hero)" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span className="eyebrow">Design system</span>
          <h1 className="display" style={{ fontSize: "clamp(40px, 4.5vw, 64px)", maxWidth: 720 }}>
            The <span className="serif" style={{ color: "var(--accent)" }}>building</span> blocks.
          </h1>
          <p className="lead" style={{ maxWidth: 640 }}>
            Every component used to design EventPro, in one place. Hover, click, and inspect — they're all real.
          </p>
        </div>
      </section>

      <section style={{ padding: "32px 0" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 48 }}>
          <aside style={{ position: "sticky", top: 96, alignSelf: "start", display: "flex", flexDirection: "column", gap: 2 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: "10px 14px", borderRadius: 10, border: "none", background: tab === t.id ? "var(--bg-2)" : "transparent",
                color: tab === t.id ? "var(--ink)" : "var(--ink-soft)", textAlign: "left", fontSize: 13, fontWeight: 540, cursor: "pointer", transition: "all 160ms",
              }}>{t.label}</button>
            ))}
          </aside>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {tab === "buttons" && <ButtonsSpec />}
            {tab === "inputs" && <InputsSpec />}
            {tab === "chips" && <ChipsSpec />}
            {tab === "cards" && <CardsSpec />}
            {tab === "tickets" && <TicketsSpec />}
            {tab === "feedback" && <FeedbackSpec />}
            {tab === "nav" && <NavSpec />}

            {/* Color & type specs always at bottom */}
            <Spec title="Color tokens">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
                {[
                  ["--ink", "#0E0B2E", "Foreground"],
                  ["--bg", "#FAFAF7", "Background"],
                  ["--primary", "#1E1B4B", "Indigo"],
                  ["--accent", "#FF6B6B", "Coral"],
                  ["--accent-2", "#F59E0B", "Amber"],
                  ["--accent-3", "#10B981", "Emerald"],
                ].map(([k, hex, n]) => (
                  <div key={k}>
                    <div style={{ height: 64, borderRadius: 12, background: `var(${k})`, border: "1px solid var(--hairline)" }} />
                    <div style={{ marginTop: 8, fontSize: 12, fontWeight: 540 }}>{n}</div>
                    <div style={{ fontSize: 11, color: "var(--ink-soft)", fontFamily: "Geist Mono" }}>{hex}</div>
                  </div>
                ))}
              </div>
            </Spec>
            <Spec title="Typography">
              <div className="card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <h1 className="display" style={{ fontSize: 56 }}>Display <span className="serif">italic</span></h1>
                  <div style={{ fontSize: 11, color: "var(--ink-soft)", fontFamily: "Geist Mono", marginTop: 6 }}>Geist · 56–88px · -0.035em · Instrument Serif italic accent</div>
                </div>
                <div>
                  <h2 className="h1">Heading 1 — page titles</h2>
                  <div style={{ fontSize: 11, color: "var(--ink-soft)", fontFamily: "Geist Mono", marginTop: 6 }}>Geist · 36–56px · -0.025em</div>
                </div>
                <div>
                  <h3 className="h3">Heading 3 — card titles</h3>
                  <div style={{ fontSize: 11, color: "var(--ink-soft)", fontFamily: "Geist Mono", marginTop: 6 }}>Geist · 22px · -0.015em</div>
                </div>
                <div>
                  <p className="lead">Lead paragraph — supporting text below headlines.</p>
                  <div style={{ fontSize: 11, color: "var(--ink-soft)", fontFamily: "Geist Mono", marginTop: 6 }}>Geist · 18px · 1.5</div>
                </div>
                <div>
                  <span className="eyebrow">Eyebrow — section label</span>
                </div>
                <div>
                  <span className="mono" style={{ fontSize: 14 }}>Geist Mono — codes, IDs, timestamps</span>
                </div>
              </div>
            </Spec>
          </div>
        </div>
      </section>
    </div>
  );
}
