import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { AuthCenter, IconBadge, FloatingShapes, OTPInput, useResend } from '../../components/auth/shared';
import { useGo } from '../../hooks/useGo';
import { useToast } from '../../stores/toastStore';

/**
 * Phone OTP verification — prototype-level (no phone-OTP API endpoint yet).
 * Accepts any 6-digit code and advances the flow.
 * Email: location.state?.phone or the number entered on PhoneVerify.
 */
export default function OTPVerify() {
  const go = useGo();
  const toast = useToast();
  const location = useLocation();
  const phone = location.state?.phone ?? '+91 98765 43210';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const { t, reset: resetTimer } = useResend(60);
  const filled = otp.every((d) => d !== '');

  const submit = (e) => {
    e?.preventDefault?.();
    if (!filled) { setError('Enter the full 6-digit code'); return; }
    setError('');
    toast.push('Phone verified ✓', { icon: 'check' });
    go('auth-email');
  };

  const handleResend = () => {
    resetTimer();
    toast.push('OTP resent to ' + phone);
  };

  return (
    <AuthCenter navigate={go}>
      <FloatingShapes tone="blue" />
      <div className="card" style={{ padding: 40, boxShadow: 'var(--shadow-xl)' }}>
        <div style={{ marginBottom: 24, textAlign: 'center' }}>
          <IconBadge icon="phone" color="#1E40AF" soft="var(--primary-tint)" size={64} />
          <h1 className="h1" style={{ fontSize: 28, marginTop: 14 }}>
            Enter the <span className="serif" style={{ color: '#1E40AF' }}>code.</span>
          </h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: 14, marginTop: 6 }}>
            We sent a 6-digit code to <strong style={{ color: 'var(--ink)' }}>{phone}</strong>
          </p>
        </div>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <OTPInput
            value={otp}
            onChange={(v) => { setOtp(v); setError(''); }}
            autoFocus
            error={!!error}
          />
          {error && (
            <div style={{ fontSize: 13, color: '#EF4444', textAlign: 'center' }}>{error}</div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <button
              type="button"
              onClick={() => go('auth-phone')}
              style={{ background: 'none', border: 'none', color: 'var(--ink)', textDecoration: 'underline', cursor: 'pointer' }}
            >
              Change number
            </button>
            {t > 0 ? (
              <span style={{ color: 'var(--ink-soft)' }}>
                Resend in <span className="mono" style={{ color: 'var(--ink)' }}>
                  {String(Math.floor(t / 60)).padStart(2, '0')}:{String(t % 60).padStart(2, '0')}
                </span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
              >
                Resend code
              </button>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            iconRight="arrow"
            disabled={!filled}
            style={{ opacity: filled ? 1 : 0.55 }}
          >
            Verify & continue
          </Button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 14, background: 'var(--bg-2)', borderRadius: 12, fontSize: 12, color: 'var(--ink-soft)' }}>
            <Icon name="info" size={14} />
            <span>Enter any 6 digits to continue — phone OTP API coming soon.</span>
          </div>
        </form>
      </div>
    </AuthCenter>
  );
}
