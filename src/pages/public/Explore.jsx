/* Explore Events page */
import { useState, useEffect, useMemo, useRef } from 'react';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { EventCard } from '../../components/ui/EventCard';
import { EVENTS, CITIES } from '../../data/events';
import { useGo } from '../../hooks/useGo';

const SelectMini = ({ value, onChange, options, icon, compact }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const onDoc = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const opts = options.map(o => typeof o === "string" ? { v: o, l: o } : o);
  const cur = opts.find(o => o.v === value) || opts[0];
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(o => !o)} style={{
        display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", border: "none",
        color: "var(--ink)", fontWeight: 500, fontSize: 14, padding: compact ? "8px 12px" : "12px 16px", cursor: "pointer",
        borderRadius: compact ? 8 : 0,
      }}>
        {icon && <Icon name={icon} size={14} style={{ color: "var(--ink-soft)" }} />}
        {cur.l}
        <Icon name="chevDown" size={14} style={{ color: "var(--ink-soft)", transform: open ? "rotate(180deg)" : "none", transition: "transform 160ms" }} />
      </button>
      {open && (
        <div className="card" style={{
          position: "absolute", top: "calc(100% + 6px)", right: 0, minWidth: 180, padding: 4, zIndex: 10,
          boxShadow: "var(--shadow-lg)",
        }}>
          {opts.map(o => (
            <button key={o.v} onClick={() => { onChange(o.v); setOpen(false); }} style={{
              display: "block", width: "100%", textAlign: "left", padding: "8px 12px", border: "none",
              background: o.v === value ? "var(--bg-2)" : "transparent", borderRadius: 8, cursor: "pointer",
              fontSize: 13, color: "var(--ink)",
            }}>{o.l}</button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Explore() {
  const go = useGo();
  const [view, setView] = useState("grid");
  const [city, setCity] = useState("All cities");
  const [cat, setCat] = useState("All");
  const [date, setDate] = useState("Any date");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("trending");

  const filtered = useMemo(() => {
    let r = EVENTS.slice();
    if (city !== "All cities") r = r.filter(e => e.city === city);
    if (cat !== "All") r = r.filter(e => e.category.toLowerCase().includes(cat.toLowerCase()));
    if (q) r = r.filter(e => (e.title + e.organizer).toLowerCase().includes(q.toLowerCase()));
    if (sort === "price-low") r.sort((a, b) => a.price - b.price);
    if (sort === "price-high") r.sort((a, b) => b.price - a.price);
    return r;
  }, [city, cat, q, sort]);

  const cats = ["All", "Concerts", "Comedy", "Workshops", "Food", "Parties", "Exhibitions", "Sports", "Business", "College"];
  const dates = ["Any date", "Today", "This weekend", "This week", "This month"];

  return (
    <div className="page-enter">
      {/* Hero */}
      <section style={{ padding: "64px 0 32px", background: "var(--grad-hero)" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <span className="eyebrow">Explore</span>
          <h1 className="display" style={{ fontSize: "clamp(48px, 5.5vw, 72px)", maxWidth: 900 }}>
            Find your <span className="serif" style={{ color: "#7C3AED" }}>next</span> Saturday night.
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 8, background: "var(--surface)", borderRadius: 18, boxShadow: "var(--shadow-md)", border: "1px solid var(--hairline)" }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12, padding: "0 16px" }}>
              <Icon name="search" size={18} style={{ color: "var(--ink-soft)" }} />
              <input
                value={q} onChange={e => setQ(e.target.value)}
                placeholder="Search events, organizers, venues…"
                style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 16, padding: "16px 0" }}
              />
            </div>
            <div style={{ width: 1, height: 28, background: "var(--hairline)" }} />
            <SelectMini value={city} onChange={setCity} options={CITIES} icon="pin" />
            <div style={{ width: 1, height: 28, background: "var(--hairline)" }} />
            <SelectMini value={date} onChange={setDate} options={dates} icon="calendar" />
            <Button variant="primary" size="lg" icon="search" style={{ borderRadius: 12 }}>Search</Button>
          </div>
        </div>
      </section>

      {/* Filter row + results */}
      <section style={{ padding: "32px 0 80px" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, gap: 24 }}>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", flex: 1 }} className="carousel">
              {cats.map(c => (
                <button key={c} onClick={() => setCat(c)} className={`chip ${cat === c ? "is-active" : ""}`}>{c}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexShrink: 0 }}>
              <SelectMini value={sort} onChange={setSort} options={[
                { v: "trending", l: "Trending" }, { v: "price-low", l: "Price: low to high" }, { v: "price-high", l: "Price: high to low" },
              ]} compact />
              <div style={{ display: "flex", gap: 0, padding: 4, background: "var(--bg-2)", borderRadius: 999 }}>
                <button onClick={() => setView("grid")} style={{
                  width: 30, height: 30, borderRadius: 999, border: "none",
                  background: view === "grid" ? "var(--surface)" : "transparent",
                  color: view === "grid" ? "var(--ink)" : "var(--ink-soft)",
                  display: "grid", placeItems: "center", cursor: "pointer",
                  boxShadow: view === "grid" ? "var(--shadow-sm)" : "none",
                }}><Icon name="grid" size={14} /></button>
                <button onClick={() => setView("list")} style={{
                  width: 30, height: 30, borderRadius: 999, border: "none",
                  background: view === "list" ? "var(--surface)" : "transparent",
                  color: view === "list" ? "var(--ink)" : "var(--ink-soft)",
                  display: "grid", placeItems: "center", cursor: "pointer",
                  boxShadow: view === "list" ? "var(--shadow-sm)" : "none",
                }}><Icon name="list" size={14} /></button>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 16, fontSize: 13, color: "var(--ink-soft)" }}>
            <strong style={{ color: "var(--ink)" }}>{filtered.length}</strong> events match
            {city !== "All cities" && <> in <strong style={{ color: "var(--ink)" }}>{city}</strong></>}
          </div>

          {/* Featured organizers strip */}
          <div className="card" style={{ padding: 20, marginBottom: 32, background: "var(--bg-2)", border: "1px solid var(--hairline)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 className="h3">Featured organizers</h3>
              <button style={{ background: "none", border: "none", fontSize: 13, color: "var(--ink-soft)", cursor: "pointer" }}>See all <Icon name="arrow" size={12} style={{ verticalAlign: -1 }} /></button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
              {[
                { n: "Phantom Records", c: "#1E1B4B", e: "PR" },
                { n: "Atlas Kitchen", c: "#10B981", e: "AK" },
                { n: "TEDx IIT-B", c: "#FF6B6B", e: "TX" },
                { n: "Hungry City", c: "#F59E0B", e: "HC" },
                { n: "Soft Static", c: "#7C3AED", e: "SS" },
                { n: "Foyer Gallery", c: "#0EA5E9", e: "FG" },
              ].map(o => (
                <button key={o.n} className="hover-lift" style={{
                  padding: 14, borderRadius: 14, background: "var(--surface)", border: "1px solid var(--hairline)",
                  display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12, cursor: "pointer", textAlign: "left",
                }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: o.c, color: "white", display: "grid", placeItems: "center", fontWeight: 600, fontSize: 13 }}>{o.e}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 540 }}>{o.n}</div>
                    <div style={{ fontSize: 11, color: "var(--ink-soft)" }}>{Math.floor(8 + Math.random() * 40)} live events</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {view === "grid" ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
              {filtered.map(e => <EventCard key={e.id} event={e} size="lg" onClick={() => go("event")} />)}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {filtered.map(e => (
                <button
                  key={e.id} onClick={() => go("event")}
                  className="card hover-lift"
                  style={{ display: "grid", gridTemplateColumns: "200px 1fr auto", gap: 24, padding: 16, alignItems: "center", cursor: "pointer", textAlign: "left", border: "1px solid var(--hairline)" }}
                >
                  <div style={{ height: 120, borderRadius: 12, backgroundImage: `url(${e.img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span className="badge">{e.category}</span>
                      {e.trending && <span className="badge badge-coral">Trending</span>}
                    </div>
                    <h3 className="h3">{e.title}</h3>
                    <div style={{ display: "flex", gap: 16, fontSize: 13, color: "var(--ink-soft)" }}>
                      <span><Icon name="calendar" size={12} style={{ verticalAlign: -2, marginRight: 4 }} />{e.date} · {e.time}</span>
                      <span><Icon name="pin" size={12} style={{ verticalAlign: -2, marginRight: 4 }} />{e.city}</span>
                      <span><Icon name="user" size={12} style={{ verticalAlign: -2, marginRight: 4 }} />{e.organizer}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "Geist Mono" }}>From</div>
                    <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>
                      {e.free ? <span style={{ color: "var(--accent-3)" }}>Free</span> : <>₹{e.price.toLocaleString()}</>}
                    </div>
                    <span className="btn btn-ghost btn-sm" style={{ marginTop: 8 }}>View <Icon name="arrow" size={12} /></span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
