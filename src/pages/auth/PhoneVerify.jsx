import { useState } from 'react';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { AuthCenter, IconBadge, FloatingShapes } from '../../components/auth/shared';
import { useGo } from '../../hooks/useGo';

export default function PhoneVerify() {
  const go = useGo();
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState({ code: '+91', flag: '🇮🇳', label: 'India' });
  const [err, setErr] = useState('');

  const countries = [
    { code: '+91',  flag: '🇮🇳', label: 'India' },
    { code: '+1',   flag: '🇺🇸', label: 'United States' },
    { code: '+44',  flag: '🇬🇧', label: 'United Kingdom' },
    { code: '+971', flag: '🇦🇪', label: 'United Arab Emirates' },
    { code: '+65',  flag: '🇸🇬', label: 'Singapore' },
    { code: '+61',  flag: '🇦🇺', label: 'Australia' },
  ];

  const benefits = [
    ['Secure your account against unauthorized sign-ins', 'lock'],
    ['Get instant booking and check-in confirmations', 'ticket'],
    ['Required for selling tickets and receiving payouts', 'bar'],
  ];

  const submit = (e) => {
    e.preventDefault();
    if (!/^\d{7,}$/.test(phone)) { setErr('Enter a valid phone number'); return; }
    setErr('');
    // Navigate to OTP page, pass phone so it can display it
    go('auth-otp', { state: { phone: `${country.code} ${phone}` } });
  };

  return (
    <AuthCenter navigate={go} max={520}>
      <FloatingShapes tone="blue" />
      <div className="card" style={{ padding: 40, boxShadow: 'var(--shadow-xl)' }}>
        <div style={{ marginBottom: 24 }}>
          <IconBadge icon="phone" color="#7C3AED" soft="#F5F3FF" size={64} />
          <h1 className="h1" style={{ fontSize: 28, marginTop: 14 }}>
            Verify your <span className="serif" style={{ color: '#7C3AED' }}>phone.</span>
          </h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: 14, marginTop: 6 }}>
            Verify your phone to secure your account and continue booking tickets.
          </p>
        </div>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label className="label">Phone number</label>
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <select
                value={country.code}
                onChange={(e) => setCountry(countries.find((c) => c.code === e.target.value))}
                className="input"
                style={{ width: 130, fontWeight: 540 }}
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                ))}
              </select>
              <input
                value={phone}
                onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '').slice(0, 12)); setErr(''); }}
                placeholder="98765 43210"
                inputMode="numeric"
                className="input"
                style={{ flex: 1 }}
                autoFocus
              />
            </div>
            {err && <p style={{ marginTop: 6, fontSize: 12, color: '#EF4444' }}>{err}</p>}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 16, borderRadius: 14, background: 'var(--bg-2)' }}>
            <span className="eyebrow" style={{ fontSize: 10 }}>Why verify</span>
            {benefits.map(([text, icon]) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                <span style={{ width: 22, height: 22, borderRadius: 999, background: 'var(--surface)', color: 'var(--primary)', display: 'grid', placeItems: 'center' }}>
                  <Icon name={icon} size={11} />
                </span>
                <span>{text}</span>
              </div>
            ))}
          </div>

          <Button type="submit" variant="primary" size="lg" iconRight="arrow">
            Send verification code
          </Button>
        </form>
      </div>
    </AuthCenter>
  );
}
