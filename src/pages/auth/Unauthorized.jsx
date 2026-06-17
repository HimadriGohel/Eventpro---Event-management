import { Button } from '../../components/ui/Button';
import { AuthCenter } from '../../components/auth/shared';
import { useGo } from '../../hooks/useGo';

export default function Unauthorized() {
  const go = useGo();
  return (
    <AuthCenter navigate={go} max={500} accent="#7C3AED">
      <div className="card" style={{ padding: 48, textAlign: "center", boxShadow: "var(--shadow-xl)", display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        {/* Shield illustration */}
        <div style={{ position: "relative", width: 110, height: 110 }}>
          <svg viewBox="0 0 110 110" width={110} height={110}>
            <defs>
              <linearGradient id="shield" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#7C3AED" />
                <stop offset="1" stopColor="#1E40AF" />
              </linearGradient>
            </defs>
            <path d="M55 8 L96 22 L96 56 C96 80 76 96 55 102 C34 96 14 80 14 56 L14 22 Z" fill="url(#shield)" opacity="0.12" />
            <path d="M55 14 L88 26 L88 56 C88 76 73 90 55 94 C37 90 22 76 22 56 L22 26 Z" stroke="url(#shield)" strokeWidth="2" fill="none" />
            <g transform="translate(55 55)" stroke="#7C3AED" strokeWidth="2.5" fill="none" strokeLinecap="round">
              <rect x="-12" y="-4" width="24" height="20" rx="3" fill="#7C3AED" fillOpacity="0.1" />
              <path d="M-8 -4 V-12 a 8 8 0 0 1 16 0 V-4" />
            </g>
          </svg>
          <span style={{ position: "absolute", top: -4, right: -4, width: 28, height: 28, borderRadius: 999, background: "#EF4444", color: "white", display: "grid", placeItems: "center", fontSize: 14, fontWeight: 700, boxShadow: "0 4px 12px rgba(239,68,68,0.4)" }}>!</span>
        </div>

        <div>
          <h1 className="h1" style={{ fontSize: 28 }}>Access <span className="serif" style={{ color: "#7C3AED" }}>denied.</span></h1>
          <p style={{ color: "var(--ink-soft)", fontSize: 15, marginTop: 10, maxWidth: 380, marginInline: "auto" }}>
            You don't have permission to view this page. If you think this is a mistake, ask the event owner to invite you.
          </p>
        </div>

        <div style={{ fontFamily: "Geist Mono", fontSize: 11, color: "var(--muted)", letterSpacing: "0.08em" }}>
          ERROR · 401 UNAUTHORIZED
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <Button variant="primary" size="lg" iconRight="arrow" onClick={() => go("home")}>Return home</Button>
          <Button variant="ghost" size="lg" onClick={() => go("login")}>Sign in with another account</Button>
        </div>
      </div>
    </AuthCenter>
  );
}
