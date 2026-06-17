import { useState } from 'react';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { Field } from '../../components/ui/Field';
import { AuthShell } from '../../components/auth/shared';
import { useToast } from '../../stores/toastStore';
import { useGo } from '../../hooks/useGo';
import { useSignup } from '../../api/auth';
import { unwrapError } from '../../api/client';

export default function Signup() {
  const go = useGo();
  const toast = useToast();
  const { mutate: signup, isPending } = useSignup();

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [errs, setErrs] = useState({});

  const validate = () => {
    const en = {};
    if (!form.name.trim()) en.name = 'Required';
    if (!/^.+@.+\..+$/.test(form.email)) en.email = 'Enter a valid email';
    if (!/^\d{10}$/.test(form.phone)) en.phone = '10-digit number';
    if (form.password.length < 8) en.password = 'At least 8 characters';
    setErrs(en);
    return Object.keys(en).length === 0;
  };

  const next = (e) => {
    e?.preventDefault?.();
    if (!validate()) return;

    signup(
      {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone,
        password: form.password,
      },
      {
        onSuccess: (data) => {
          toast.push(`Hey ${form.name.split(' ')[0]} — let's personalize EventPro`);
          // Account created — continue to role selection
          go('auth-role');
        },
        onError: (err) => {
          const { message, code, details } = unwrapError(err);
          if (code === 'EMAIL_TAKEN' || code === 'DUPLICATE' || message?.toLowerCase().includes('email')) {
            setErrs({ email: 'This email is already registered' });
            return;
          }
          // Joi / validation details
          if (details && Array.isArray(details)) {
            const fieldErrs = {};
            details.forEach((d) => {
              const key = d.path?.[0];
              if (key) fieldErrs[key] = d.message;
            });
            if (Object.keys(fieldErrs).length > 0) { setErrs(fieldErrs); return; }
          }
          toast.push(message, { icon: 'info' });
        },
      }
    );
  };

  return (
    <AuthShell mode="signup" navigate={go}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h1 className="h1" style={{ fontSize: 40 }}>
            Join <span className="serif" style={{ color: 'var(--accent)' }}>EventPro.</span>
          </h1>
          <p style={{ marginTop: 12, color: 'var(--ink-soft)' }}>
            Already have an account?{' '}
            <button
              onClick={() => go('login')}
              style={{ background: 'none', border: 'none', padding: 0, color: 'var(--ink)', textDecoration: 'underline', cursor: 'pointer', fontWeight: 540 }}
            >
              Sign in
            </button>
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>
            <Icon name="google" size={16} /> Continue with Google
          </button>
          <button className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>
            <Icon name="apple" size={16} /> Continue with Apple
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--ink-soft)', fontSize: 12 }}>
          <span style={{ flex: 1, height: 1, background: 'var(--hairline)' }} />
          OR USE EMAIL
          <span style={{ flex: 1, height: 1, background: 'var(--hairline)' }} />
        </div>

        <form onSubmit={next} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Field label="Full name" icon="user" error={errs.name}>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Aanya Rao"
              autoFocus
              disabled={isPending}
            />
          </Field>
          <Field label="Email" icon="mail" error={errs.email} hint="We'll send a verification link">
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@team.com"
              disabled={isPending}
            />
          </Field>
          <Field label="Phone number" icon="phone" error={errs.phone} hint="OTP-verified for security">
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
              placeholder="98765 43210"
              inputMode="numeric"
              disabled={isPending}
            />
          </Field>
          <Field label="Set a password" icon="lock" error={errs.password} hint="At least 8 characters">
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              disabled={isPending}
            />
          </Field>

          <Button type="submit" variant="primary" size="lg" iconRight={isPending ? undefined : 'arrow'} disabled={isPending} style={{ marginTop: 4 }}>
            {isPending ? 'Creating account…' : 'Create my account'}
          </Button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ink-soft)', marginTop: -4 }}>
            <Icon name="info" size={12} />
            Next: choose how you'll use EventPro, then verify your phone & email.
          </div>
        </form>

        <p style={{ fontSize: 12, color: 'var(--muted)' }}>
          By signing up, you agree to our{' '}
          <a href="#" className="link">Terms</a> and{' '}
          <a href="#" className="link">Privacy Policy</a>.
        </p>
      </div>
    </AuthShell>
  );
}
