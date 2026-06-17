import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Field } from '../../components/ui/Field';
import { AuthCenter, IconBadge, StatusCard, FloatingShapes, ConfettiBG, PasswordStrength } from '../../components/auth/shared';
import { useGo } from '../../hooks/useGo';
import { useResetPassword } from '../../api/auth';
import { unwrapError } from '../../api/client';

export default function ResetPassword() {
  const go = useGo();
  const [params] = useSearchParams();
  const { mutate: reset, isPending } = useResetPassword();

  // Token comes from ?token=XXX in the URL (what the reset email link contains).
  // In dev it is printed to the API console — users paste it here.
  const [token, setToken] = useState(params.get('token') ?? '');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [errs, setErrs] = useState({});
  const [done, setDone] = useState(false);

  const match = pw && pw === pw2;
  const strongEnough = pw.length >= 8 && /\d/.test(pw);
  const valid = !!token.trim() && strongEnough && match;

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!token.trim()) next.token = 'Paste the reset token from your email';
    if (!strongEnough) next.pw = 'At least 8 characters with a number';
    if (pw && !match) next.pw2 = "Passwords don't match";
    setErrs(next);
    if (Object.keys(next).length > 0) return;

    reset(
      { token: token.trim(), password: pw },
      {
        onSuccess: () => setDone(true),
        onError: (err) => {
          const { message, code } = unwrapError(err);
          if (code === 'RESET_INVALID') {
            setErrs({ token: 'This reset link is invalid or has expired. Request a new one.' });
          } else {
            setErrs({ pw: message });
          }
        },
      }
    );
  };

  if (done) return (
    <AuthCenter navigate={go} accent="#10B981">
      <ConfettiBG />
      <StatusCard
        icon="check" color="#10B981" soft="var(--success-soft)" glow
        title="Password updated"
        body="Your account is secured with the new password. Sign in to continue."
        primary={
          <Button variant="primary" size="lg" iconRight="arrow" onClick={() => go('login')}>
            Continue to sign in
          </Button>
        }
      />
    </AuthCenter>
  );

  return (
    <AuthCenter navigate={go}>
      <FloatingShapes tone="emerald" />
      <div className="card" style={{ padding: 40, boxShadow: 'var(--shadow-xl)' }}>
        <div style={{ marginBottom: 24 }}>
          <IconBadge icon="lock" color="#10B981" soft="var(--success-soft)" size={56} />
          <h1 className="h1" style={{ fontSize: 28, marginTop: 14 }}>
            Choose a new <span className="serif" style={{ color: '#10B981' }}>password.</span>
          </h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: 14, marginTop: 6 }}>
            Paste the token from your reset email, then set your new password.
          </p>
        </div>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Token field — hidden if already in URL */}
          {!params.get('token') && (
            <Field label="Reset token" icon="lock" error={errs.token} hint="From your reset email (or API console in dev)">
              <input
                value={token}
                onChange={(e) => { setToken(e.target.value); setErrs((p) => ({ ...p, token: '' })); }}
                placeholder="Paste token here"
                autoFocus={!token}
                style={{ fontFamily: 'Geist Mono', fontSize: 13 }}
                disabled={isPending}
              />
            </Field>
          )}

          <Field label="New password" icon="lock" error={errs.pw}>
            <input
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setErrs((p) => ({ ...p, pw: '' })); }}
              placeholder="••••••••"
              autoFocus={!!params.get('token')}
              disabled={isPending}
            />
          </Field>
          {pw && <PasswordStrength value={pw} />}

          <Field label="Confirm password" icon="lock" error={errs.pw2}>
            <input
              type="password"
              value={pw2}
              onChange={(e) => { setPw2(e.target.value); setErrs((p) => ({ ...p, pw2: '' })); }}
              placeholder="••••••••"
              disabled={isPending}
            />
          </Field>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            iconRight={isPending ? undefined : 'arrow'}
            disabled={isPending}
            style={{ opacity: valid ? 1 : 0.55, marginTop: 4 }}
          >
            {isPending ? 'Updating…' : 'Update password'}
          </Button>
        </form>

        <div style={{ marginTop: 20, textAlign: 'center', fontSize: 13, color: 'var(--ink-soft)' }}>
          Token expired?{' '}
          <button
            type="button"
            onClick={() => go('auth-forgot')}
            style={{ background: 'none', border: 'none', color: 'var(--ink)', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Request a new link
          </button>
        </div>
      </div>
    </AuthCenter>
  );
}
