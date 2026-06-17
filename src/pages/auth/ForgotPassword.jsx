import { useState } from 'react';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { Field } from '../../components/ui/Field';
import { AuthCenter, IconBadge, StatusCard, FloatingShapes } from '../../components/auth/shared';
import { useGo } from '../../hooks/useGo';
import { useForgotPassword } from '../../api/auth';
import { unwrapError } from '../../api/client';

export default function ForgotPassword() {
  const go = useGo();
  const { mutate: forgot, isPending } = useForgotPassword();

  const [val, setVal] = useState('');
  const [err, setErr] = useState('');
  const [sent, setSent] = useState(false);

  const validate = () => {
    if (!val.trim()) { setErr('Enter your email address'); return false; }
    if (!/^.+@.+\..+$/.test(val)) { setErr('Enter a valid email'); return false; }
    return true;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setErr('');
    forgot(
      { email: val.trim() },
      {
        // API always returns { sent: true } regardless (avoids user enumeration).
        // We show the success state unconditionally.
        onSuccess: () => setSent(true),
        onError: (err) => {
          const { message } = unwrapError(err);
          setErr(message);
        },
      }
    );
  };

  if (sent) return (
    <AuthCenter navigate={go} accent="#10B981">
      <StatusCard
        icon="mail" color="#10B981" soft="var(--success-soft)" glow
        eyebrow="Check your inbox"
        title="Reset link sent"
        body={
          <>
            If <strong style={{ color: 'var(--ink)' }}>{val}</strong> is registered, we've
            emailed a secure reset link. The link expires in 10 minutes.
            <br /><br />
            <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>
              <strong>Dev tip:</strong> the reset token is printed to the API server console.
            </span>
          </>
        }
        primary={
          <Button variant="primary" size="lg" iconRight="arrow" onClick={() => go('auth-reset')}>
            Enter reset token
          </Button>
        }
        secondary={
          <Button variant="ghost" size="lg" onClick={() => { setSent(false); setVal(''); }}>
            Use a different email
          </Button>
        }
      />
    </AuthCenter>
  );

  return (
    <AuthCenter navigate={go}>
      <FloatingShapes tone="blue" />
      <div className="card" style={{ padding: 40, boxShadow: 'var(--shadow-xl)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
          <IconBadge icon="lock" color="#1E40AF" soft="var(--primary-tint)" size={64} />
          <h1 className="h1" style={{ fontSize: 30, marginTop: 12 }}>
            Reset your <span className="serif" style={{ color: '#1E40AF' }}>password.</span>
          </h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: 15 }}>
            Enter your email and we'll send you a secure reset link.
          </p>
        </div>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Field label="Email address" icon="mail" hint="We'll send a reset link" error={err}>
            <input
              value={val}
              onChange={(e) => { setVal(e.target.value); setErr(''); }}
              placeholder="you@team.com"
              autoFocus
              inputMode="email"
              disabled={isPending}
            />
          </Field>
          <Button type="submit" variant="primary" size="lg" iconRight={isPending ? undefined : 'arrow'} disabled={isPending}>
            {isPending ? 'Sending…' : 'Send reset link'}
          </Button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 13, color: 'var(--ink-soft)' }}>
          Remembered it?{' '}
          <button
            onClick={() => go('login')}
            style={{ background: 'none', border: 'none', color: 'var(--ink)', textDecoration: 'underline', cursor: 'pointer', fontWeight: 540 }}
          >
            Back to sign in
          </button>
        </div>
      </div>
    </AuthCenter>
  );
}
