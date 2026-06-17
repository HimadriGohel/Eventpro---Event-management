import { useState } from 'react';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { AuthCenter, FloatingShapes, OTPInput } from '../../components/auth/shared';
import { useGo } from '../../hooks/useGo';
import { useAuthStore } from '../../stores/authStore';
import { useVerifyEmail, useResendVerification } from '../../api/auth';
import { unwrapError } from '../../api/client';

export default function EmailVerify() {
  const go = useGo();
  // Email comes from the auth store (set after signup/login) or a fallback
  const email = useAuthStore((s) => s.user?.email) ?? '';

  const { mutate: verify, isPending: verifying } = useVerifyEmail();
  const { mutate: resend, isPending: resending } = useResendVerification();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [resentMsg, setResentMsg] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  const filled = otp.every((d) => d !== '');
  const code = otp.join('');

  const handleVerify = (e) => {
    e?.preventDefault?.();
    if (!filled) { setOtpError('Enter the full 6-digit code'); return; }
    setOtpError('');
    verify(
      { email, code },
      {
        onSuccess: () => go('auth-success'),
        onError: (err) => {
          const { message, code: errCode } = unwrapError(err);
          if (errCode === 'OTP_EXPIRED') {
            setOtpError('Code has expired — please resend.');
          } else if (errCode === 'OTP_INVALID') {
            setOtpError('Incorrect code. Try again.');
          } else {
            setOtpError(message);
          }
          // Clear the inputs so user can re-enter
          setOtp(['', '', '', '', '', '']);
        },
      }
    );
  };

  const handleResend = () => {
    if (resendCooldown > 0 || resending) return;
    resend(
      { email },
      {
        onSuccess: () => {
          setResentMsg('Code resent — check your inbox.');
          setOtp(['', '', '', '', '', '']);
          setOtpError('');
          // 60-second cooldown
          setResendCooldown(60);
          const tick = setInterval(() => {
            setResendCooldown((c) => {
              if (c <= 1) { clearInterval(tick); return 0; }
              return c - 1;
            });
          }, 1000);
        },
        onError: (err) => {
          const { message } = unwrapError(err);
          setOtpError(message);
        },
      }
    );
  };

  return (
    <AuthCenter navigate={go} max={540}>
      <FloatingShapes tone="amber" />
      <div className="card" style={{ padding: 48, boxShadow: 'var(--shadow-xl)', textAlign: 'center' }}>
        {/* Envelope illustration */}
        <div style={{ position: 'relative', height: 160, marginBottom: 8 }}>
          <div
            className="float-2"
            style={{
              position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
              width: 130, height: 90, borderRadius: 14, background: 'white',
              boxShadow: 'var(--shadow-lg)', border: '1px solid var(--hairline)',
              display: 'grid', placeItems: 'center', overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, #EFF6FF, #FEF3C7)', opacity: 0.6 }} />
            <Icon name="mail" size={42} stroke={1.6} style={{ color: '#1E40AF', position: 'relative' }} />
          </div>
          <div className="float-1" style={{ position: 'absolute', top: 60, left: '30%', width: 20, height: 20, borderRadius: 6, background: '#10B981', opacity: 0.7 }} />
          <div className="float-3" style={{ position: 'absolute', top: 0, right: '30%', width: 14, height: 14, borderRadius: '50%', background: '#F59E0B' }} />
          <div className="float-2" style={{ position: 'absolute', bottom: 6, left: '20%', width: 12, height: 12, borderRadius: 4, background: '#EC4899', transform: 'rotate(35deg)' }} />
        </div>

        <h1 className="h1" style={{ fontSize: 28 }}>
          Check your <span className="serif" style={{ color: '#F59E0B' }}>inbox.</span>
        </h1>
        <p style={{ color: 'var(--ink-soft)', fontSize: 15, marginTop: 10, marginBottom: 24 }}>
          We sent a 6-digit code to<br />
          <strong style={{ color: 'var(--ink)' }}>{email || 'your email address'}</strong>
        </p>

        {/* Code entry */}
        <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <OTPInput
            value={otp}
            onChange={(v) => { setOtp(v); setOtpError(''); setResentMsg(''); }}
            autoFocus
            error={!!otpError}
          />
          {otpError && (
            <p style={{ fontSize: 13, color: '#EF4444', margin: 0 }}>{otpError}</p>
          )}
          {resentMsg && !otpError && (
            <p style={{ fontSize: 13, color: '#10B981', margin: 0 }}>{resentMsg}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            iconRight={verifying ? undefined : 'arrow'}
            disabled={verifying || !filled}
            style={{ width: '100%', opacity: filled ? 1 : 0.55 }}
          >
            {verifying ? 'Verifying…' : 'Confirm & continue'}
          </Button>
        </form>

        {/* Resend + change email */}
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <button
            type="button"
            onClick={handleResend}
            disabled={resending || resendCooldown > 0}
            style={{
              background: 'none', border: 'none', fontSize: 13, cursor: resendCooldown > 0 ? 'default' : 'pointer',
              color: resendCooldown > 0 ? 'var(--ink-soft)' : 'var(--ink)',
              textDecoration: resendCooldown > 0 ? 'none' : 'underline',
            }}
          >
            {resending
              ? 'Sending…'
              : resendCooldown > 0
              ? `Resend in ${resendCooldown}s`
              : 'Resend code'}
          </button>
          <button
            type="button"
            onClick={() => go('signup')}
            style={{ background: 'none', border: 'none', fontSize: 13, color: 'var(--ink-soft)', cursor: 'pointer' }}
          >
            Use a different email
          </button>
        </div>

        <div style={{
          marginTop: 28, padding: 14, background: 'var(--bg-2)', borderRadius: 12,
          fontSize: 12, color: 'var(--ink-soft)', textAlign: 'left',
          display: 'flex', gap: 10, alignItems: 'flex-start',
        }}>
          <Icon name="info" size={14} style={{ marginTop: 1, flexShrink: 0 }} />
          <span>
            Can't find it? Check spam or promotions.{' '}
            In <strong>dev mode</strong>, the code is printed to the API server console.
          </span>
        </div>
      </div>
    </AuthCenter>
  );
}
