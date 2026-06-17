import { useState, useRef } from 'react';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { AuthCenter, StepProgress } from '../../components/auth/shared';
import { useGo } from '../../hooks/useGo';

export default function KYCUpload() {
  const go = useGo();
  const [docs, setDocs] = useState({
    pan:  { name: "PAN card",       file: "pan-card.pdf",  size: "1.4 MB", status: "uploaded" },
    id:   { name: "Government ID",  file: "aadhaar.jpg",   size: "2.1 MB", status: "uploading", progress: 64 },
    gst:  { name: "GST certificate (optional)", file: null, status: "idle" },
    bank: { name: "Bank account proof", file: null, status: "idle" },
  });
  const fileInput = useRef(null);
  const [active, setActive] = useState(null);

  const onDrop = id => {
    setDocs(d => ({ ...d, [id]: { ...d[id], file: "uploaded.pdf", size: "1.8 MB", status: "uploaded" } }));
  };

  return (
    <AuthCenter navigate={go} max={780}>
      <div className="card" style={{ padding: 40, boxShadow: "var(--shadow-xl)" }}>
        <div style={{ marginBottom: 20 }}>
          <span className="eyebrow">Step 2 of 4 · KYC documents</span>
          <h1 className="h1" style={{ fontSize: 28, marginTop: 6 }}>Upload your <span className="serif" style={{ color: "var(--primary)" }}>documents.</span></h1>
          <p style={{ color: "var(--ink-soft)", fontSize: 14, marginTop: 6 }}>Drag and drop, or click to browse. PDF, JPG, or PNG · max 10 MB each.</p>
        </div>

        <div style={{ marginBottom: 28 }}>
          <StepProgress steps={["Intro", "Documents", "Bank", "Review"]} current={1} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
          {Object.entries(docs).map(([id, d]) => (
            <div
              key={id}
              onDragOver={e => { e.preventDefault(); setActive(id); }}
              onDragLeave={() => setActive(null)}
              onDrop={e => { e.preventDefault(); onDrop(id); setActive(null); }}
              style={{
                padding: 20, borderRadius: 16, cursor: "pointer",
                border: `2px dashed ${active === id ? "var(--primary)" : d.status === "uploaded" ? "var(--success-soft)" : "var(--hairline-2)"}`,
                background: active === id ? "var(--primary-tint)" : d.status === "uploaded" ? "var(--success-soft)" : "var(--bg-2)",
                transition: "all 200ms",
                position: "relative",
              }}
              onClick={() => fileInput.current?.click()}
            >
              {d.status === "uploaded" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className="badge badge-emerald">✓ Uploaded</span>
                    <button onClick={e => { e.stopPropagation(); setDocs(dd => ({ ...dd, [id]: { ...dd[id], file: null, status: "idle" } })); }} style={{ background: "none", border: "none", color: "var(--ink-soft)", cursor: "pointer", padding: 4 }}>
                      <Icon name="close" size={14} />
                    </button>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 44, background: "var(--surface)", borderRadius: 6, display: "grid", placeItems: "center", color: "#10B981", fontSize: 10, fontWeight: 700, fontFamily: "Geist Mono" }}>PDF</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 540, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.name}</div>
                      <div style={{ fontSize: 11, color: "var(--ink-soft)" }}>{d.file} · {d.size}</div>
                    </div>
                  </div>
                </div>
              ) : d.status === "uploading" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 540 }}>{d.name}</div>
                  <div style={{ fontSize: 11, color: "var(--ink-soft)" }}>{d.file} · uploading…</div>
                  <div style={{ height: 6, background: "var(--hairline)", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ width: `${d.progress}%`, height: "100%", background: "var(--primary)", transition: "width 400ms" }} />
                  </div>
                  <div style={{ fontSize: 11, color: "var(--primary)", fontWeight: 540 }}>{d.progress}%</div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--surface)", color: "var(--ink-soft)", display: "grid", placeItems: "center" }}>
                    <Icon name="download" size={16} style={{ transform: "rotate(180deg)" }} />
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 540 }}>{d.name}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>Drop file or click to upload</div>
                </div>
              )}
            </div>
          ))}
        </div>
        <input ref={fileInput} type="file" style={{ display: "none" }} onChange={() => onDrop("gst")} />

        <div style={{ padding: 14, background: "var(--bg-2)", borderRadius: 12, marginBottom: 22, display: "flex", gap: 12 }}>
          <Icon name="info" size={16} style={{ color: "var(--primary)", flexShrink: 0, marginTop: 2 }} />
          <div style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.5 }}>
            <strong style={{ color: "var(--ink)" }}>Tip:</strong> bright, glare-free photos work best. Keep all four corners visible — clipped edges fail automated checks.
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <Button variant="ghost" onClick={() => go("auth-kyc-intro")}>Back</Button>
          <Button variant="primary" size="lg" iconRight="arrow" onClick={() => go("auth-review")} style={{ flex: 1 }}>Submit for review</Button>
        </div>
      </div>
    </AuthCenter>
  );
}
