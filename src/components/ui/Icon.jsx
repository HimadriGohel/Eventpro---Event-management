/* Inline-SVG icon system. Names match the prototype. */

const PATHS = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  check: <path d="M5 12l4 4 10-10" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  search: <g><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></g>,
  calendar: <g><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></g>,
  clock: <g><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></g>,
  pin: <g><path d="M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></g>,
  user: <g><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0116 0" /></g>,
  users: <g><circle cx="9" cy="8" r="3.5" /><path d="M2 20a7 7 0 0114 0M17 11a3 3 0 100-6M22 20a6 6 0 00-5-6" /></g>,
  ticket: <g><path d="M3 9V6a1 1 0 011-1h16a1 1 0 011 1v3a2 2 0 100 4v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3a2 2 0 100-4z" /><path d="M14 5v14" strokeDasharray="2 3" /></g>,
  qr: <g><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h2v2M18 14v3M14 18h1M21 14v7M16 21h5M14 21h0" /></g>,
  sparkle: <path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3zM19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" />,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  bar: <g><path d="M3 21h18" /><rect x="6" y="11" width="3" height="8" rx="1" /><rect x="11" y="6" width="3" height="13" rx="1" /><rect x="16" y="14" width="3" height="5" rx="1" /></g>,
  lock: <g><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" /></g>,
  share: <g><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M8.2 11l7.6-4M8.2 13l7.6 4" /></g>,
  heart: <path d="M12 21s-7-4.5-9.3-9.4C.9 8 3.5 4 7 4c2 0 3.7 1 5 2.5C13.3 5 15 4 17 4c3.5 0 6.1 4 4.3 7.6C19 16.5 12 21 12 21z" />,
  bookmark: <path d="M6 3h12v18l-6-4-6 4V3z" />,
  star: <path d="M12 3l2.9 6 6.6.6-5 4.5 1.5 6.4L12 17.3 5.9 20.5l1.5-6.4-5-4.5 6.6-.6L12 3z" />,
  play: <path d="M7 5l12 7-12 7V5z" />,
  pause: <g><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></g>,
  chevDown: <path d="M6 9l6 6 6-6" />,
  chevRight: <path d="M9 6l6 6-6 6" />,
  chevLeft: <path d="M15 6l-6 6 6 6" />,
  grid: <g><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></g>,
  list: <g><path d="M8 6h13M8 12h13M8 18h13" /><circle cx="4" cy="6" r="1" /><circle cx="4" cy="12" r="1" /><circle cx="4" cy="18" r="1" /></g>,
  filter: <path d="M3 5h18l-7 9v6l-4-2v-4L3 5z" />,
  mic: <g><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0014 0M12 18v3" /></g>,
  music: <g><path d="M9 17V5l11-2v12" /><circle cx="6" cy="17" r="3" /><circle cx="17" cy="15" r="3" /></g>,
  fire: <path d="M12 3s4 4 4 8a4 4 0 11-8 0c0-2 1-3 1-3s-3 1-3 5a6 6 0 1012 0c0-5-6-10-6-10z" />,
  party: <g><path d="M3 21l7-18 11 11-18 7z" /><path d="M14 7l1 1M16 4l1 2M19 8l2 1" /></g>,
  food: <g><path d="M3 11h18M5 11v8a2 2 0 002 2h10a2 2 0 002-2v-8" /><path d="M8 6c0-1 1-2 2-2s2 1 2 2-1 2-2 2M14 4c0 1 1 2 2 2" /></g>,
  palette: <g><path d="M12 3a9 9 0 100 18c1 0 2-1 2-2s-1-2-1-3 1-2 2-2h2a4 4 0 004-4 9 9 0 00-9-7z" /><circle cx="7.5" cy="11" r="1" /><circle cx="9" cy="7" r="1" /><circle cx="14" cy="7" r="1" /><circle cx="17" cy="11" r="1" /></g>,
  brief: <g><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" /></g>,
  trophy: <g><path d="M8 4h8v4a4 4 0 11-8 0V4z" /><path d="M5 4H3v3a3 3 0 003 3M19 4h2v3a3 3 0 01-3 3M9 14v3M15 14v3M7 21h10" /></g>,
  school: <g><path d="M3 10l9-5 9 5-9 5-9-5z" /><path d="M7 12v4c0 1.5 2.5 3 5 3s5-1.5 5-3v-4M21 10v6" /></g>,
  mail: <g><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 7 9-7" /></g>,
  phone: <path d="M5 4h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 6a2 2 0 012-2z" />,
  chat: <path d="M21 12a8 8 0 01-12 7l-5 1 1-5A8 8 0 1121 12z" />,
  google: (
    <g>
      <path d="M21.5 12.3c0-.6-.1-1.3-.2-1.9H12v3.6h5.4c-.2 1.3-1 2.4-2 3.1v2.5h3.3c1.9-1.7 3-4.3 3-7.3z" fill="#4285F4" stroke="none" />
      <path d="M12 21.5c2.7 0 5-1 6.7-2.5L15.4 17a5.5 5.5 0 01-8.3-2.9H3.7v2.6A9.5 9.5 0 0012 21.5z" fill="#34A853" stroke="none" />
      <path d="M7.1 14.1a5.7 5.7 0 010-3.7V7.7H3.7a9.5 9.5 0 000 8.7l3.4-2.3z" fill="#FBBC05" stroke="none" />
      <path d="M12 6.4c1.5 0 2.8.5 3.9 1.5l2.9-2.9A9.5 9.5 0 003.7 7.7L7.1 10A5.7 5.7 0 0112 6.4z" fill="#EA4335" stroke="none" />
    </g>
  ),
  apple: <path fill="currentColor" stroke="none" d="M16.4 12.4c0-2.6 2.1-3.9 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.3 2.5 1.3-.1 1.8-.9 3.4-.9s2 .9 3.4.8c1.4 0 2.3-1.2 3.2-2.5.6-.9 1.1-1.9 1.4-2.9-1.6-.6-3-2.2-3-4zM13.7 4.5c.7-.9 1.2-2.1 1.1-3.4-1 .1-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.2 1.1.1 2.3-.6 3-1.4z" />,
  info: <g><circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" /></g>,
  settings: <g><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9c.4.1.8.4 1.1.7.3.3.5.7.6 1.1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" /></g>,
  home: <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9z" />,
  flame: <path d="M12 3s5 5 5 9-2.5 7-5 7-5-3-5-7c0-2.5 2-3 2-5 1 0 3 1 3-4z" />,
  eye: <g><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></g>,
  download: <path d="M12 4v12m0 0l-5-5m5 5l5-5M4 20h16" />,
  refresh: <path d="M3 12a9 9 0 0115-6.7L21 8M21 4v4h-4M21 12a9 9 0 01-15 6.7L3 16M3 20v-4h4" />,
  twitter: <path fill="currentColor" stroke="none" d="M22 5.8c-.7.3-1.5.6-2.4.7a4.2 4.2 0 001.8-2.3 8.4 8.4 0 01-2.6 1A4.1 4.1 0 0011.7 9c0 .3 0 .6.1.9A11.7 11.7 0 013 4.7a4.1 4.1 0 001.3 5.5c-.7 0-1.3-.2-1.9-.5a4.1 4.1 0 003.3 4c-.6.2-1.3.2-2 .1a4.1 4.1 0 003.8 2.9A8.3 8.3 0 012 18.4 11.7 11.7 0 008.3 20c7.6 0 11.8-6.3 11.8-11.8v-.5c.8-.6 1.5-1.3 2-2z" />,
  instagram: <g><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="0.5" fill="currentColor" /></g>,
  linkedin: <g><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v8M8 7v.01M12 18v-5a2 2 0 014 0v5M12 11v7" /></g>,
  camera: <g><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" /></g>,
  trash: <g><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" /><path d="M10 11v6M14 11v6" /></g>,
  copy: <g><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></g>,
  logout: (
  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
),

bell: (
  <g>
    <path d="M18 8a6 6 0 10-12 0c0 7-3 8-3 8h18s-3-1-3-8" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </g>
),

folder: (
  <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
),
};

export function Icon({ name, size = 18, stroke = 1.6, className = '', style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {PATHS[name] || null}
    </svg>
  );
}
