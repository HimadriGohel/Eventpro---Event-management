import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { Field } from '../../components/ui/Field';
import { AuthShell } from '../../components/auth/shared';
import { useToast } from '../../stores/toastStore';
import { useGo } from '../../hooks/useGo';
import { useLogin } from '../../api/auth';
import { unwrapError } from '../../api/client';

export default function Login() {
  const go = useGo();
  const toast = useToast();
  const location = useLocation();
  const from = location.state?.from?.pathname || 'home';

  const { mutate: login, isPending } = useLogin();

  const [mode, setMode] = useState('password'); // password | otp
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    email: '',
    password: '',
    phone: '',
    otp: ['', '', '', '', '', ''],
  });

  const [errs, setErrs] = useState({});
  const otpRefs = useRef([]);

  const validate = () => {
    const next = {};

    if (mode === 'password') {
      if (!/^.+@.+\..+$/.test(form.email)) {
        next.email = 'Enter a valid email';
      }

      if (!form.password || form.password.length < 6) {
        next.password = 'At least 6 characters';
      }
    } else if (step === 1) {
      if (!/^\d{10}$/.test(form.phone)) {
        next.phone = '10-digit number';
      }
    } else {
      if (form.otp.join('').length < 6) {
        next.otp = 'Enter the full code';
      }
    }

    setErrs(next);

    return Object.keys(next).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // OTP mode
    if (mode === 'otp' && step === 1) {
      setStep(2);
      toast.push('OTP sent to +91 ' + form.phone);
      return;
    }

    if (mode === 'otp' && step === 2) {
      toast.push('Phone OTP login not wired to API yet', {
        icon: 'info',
      });

      return;
    }

    // Password login
    login(
      {
        email: form.email,
        password: form.password,
      },
      {
        onSuccess: (data) => {
          toast.push(
            `Welcome back, ${
              data.user?.name?.split(' ')[0] ?? 'there'
            }`,
            {
              icon: 'check',
            }
          );

          // Redirect after login
          if (from !== 'home' && from !== '/') {
            go(from);
          } else {
            // OPEN DASHBOARD EMPTY
            go('dashboard-empty');
          }
        },

        onError: (err) => {
          const { message, code } = unwrapError(err);

          if (code === 'EMAIL_NOT_VERIFIED') {
            toast.push('Please verify your email first', {
              icon: 'info',
            });

            go('auth-email');
            return;
          }

          if (code === 'ACCOUNT_SUSPENDED') {
            go('auth-blocked');
            return;
          }

          setErrs({
            password: message,
          });
        },
      }
    );
  };

  const setOtp = (i, v) => {
    if (!/^\d?$/.test(v)) return;

    const arr = [...form.otp];

    arr[i] = v;

    setForm({
      ...form,
      otp: arr,
    });

    if (v && otpRefs.current[i + 1]) {
      otpRefs.current[i + 1].focus();
    }
  };

  return (
    <AuthShell mode="login" navigate={go}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
        }}
      >
        <div>
          <h1
            className="h1"
            style={{
              fontSize: 40,
            }}
          >
            Welcome{' '}
            <span
              className="serif"
              style={{
                color: 'var(--accent)',
              }}
            >
              back.
            </span>
          </h1>

          <p
            style={{
              marginTop: 12,
              color: 'var(--ink-soft)',
            }}
          >
            New here?{' '}
            <button
              onClick={() => go('signup')}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: 'var(--ink)',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontWeight: 540,
              }}
            >
              Create an account
            </button>
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 12,
          }}
        >
          <button
            className="btn btn-ghost"
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Icon name="google" size={16} />
            Continue with Google
          </button>

          <button
            className="btn btn-ghost"
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Icon name="apple" size={16} />
            Continue with Apple
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            color: 'var(--ink-soft)',
            fontSize: 12,
          }}
        >
          <span
            style={{
              flex: 1,
              height: 1,
              background: 'var(--hairline)',
            }}
          />

          OR

          <span
            style={{
              flex: 1,
              height: 1,
              background: 'var(--hairline)',
            }}
          />
        </div>

        <div
          style={{
            display: 'inline-flex',
            padding: 4,
            background: 'var(--bg-2)',
            borderRadius: 999,
            alignSelf: 'flex-start',
          }}
        >
          {[
            ['password', 'Email + password'],
            ['otp', 'Phone OTP'],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => {
                setMode(id);
                setStep(1);
                setErrs({});
              }}
              style={{
                padding: '6px 14px',
                borderRadius: 999,
                border: 'none',
                fontSize: 13,
                fontWeight: 540,
                cursor: 'pointer',
                background:
                  mode === id
                    ? 'var(--surface)'
                    : 'transparent',
                color:
                  mode === id
                    ? 'var(--ink)'
                    : 'var(--ink-soft)',
                boxShadow:
                  mode === id
                    ? 'var(--shadow-sm)'
                    : 'none',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <form
          onSubmit={submit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {mode === 'password' && (
            <>
              <Field
                label="Email"
                icon="mail"
                error={errs.email}
              >
                <input
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  placeholder="you@team.com"
                  autoFocus
                  disabled={isPending}
                />
              </Field>

              <Field
                label="Password"
                icon="lock"
                error={errs.password}
              >
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  placeholder="••••••••"
                  disabled={isPending}
                />
              </Field>

              <div
                style={{
                  textAlign: 'right',
                }}
              >
                <button
                  type="button"
                  onClick={() => go('auth-forgot')}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: 13,
                    color: 'var(--ink-soft)',
                    cursor: 'pointer',
                  }}
                >
                  Forgot password?
                </button>
              </div>
            </>
          )}

          {mode === 'otp' && step === 1 && (
            <Field
              label="Phone number"
              icon="phone"
              error={errs.phone}
              hint="We'll send a 6-digit code"
            >
              <input
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value
                      .replace(/\D/g, '')
                      .slice(0, 10),
                  })
                }
                placeholder="98765 43210"
                autoFocus
                inputMode="numeric"
              />
            </Field>
          )}

          {mode === 'otp' && step === 2 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <span className="label">
                Enter the 6-digit code
              </span>

              <div
                style={{
                  display: 'flex',
                  gap: 10,
                }}
              >
                {form.otp.map((v, i) => (
                  <input
                    key={i}
                    ref={(el) => (otpRefs.current[i] = el)}
                    value={v}
                    onChange={(e) =>
                      setOtp(i, e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === 'Backspace' &&
                        !v &&
                        i > 0
                      ) {
                        otpRefs.current[i - 1].focus();
                      }
                    }}
                    className="input"
                    style={{
                      width: 48,
                      height: 56,
                      textAlign: 'center',
                      fontSize: 22,
                      fontWeight: 600,
                      fontFamily: 'Geist Mono',
                    }}
                    inputMode="numeric"
                    maxLength={1}
                  />
                ))}
              </div>

              {errs.otp && (
                <span
                  style={{
                    fontSize: 12,
                    color: 'var(--accent)',
                  }}
                >
                  {errs.otp}
                </span>
              )}

              <div
                style={{
                  fontSize: 12,
                  color: 'var(--ink-soft)',
                }}
              >
                Didn't get the code?{' '}
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--ink)',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  Resend
                </button>
              </div>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            iconRight={isPending ? undefined : 'arrow'}
            disabled={isPending}
          >
            {isPending
              ? 'Signing in…'
              : mode === 'otp' && step === 1
              ? 'Send code'
              : mode === 'otp'
              ? 'Verify & sign in'
              : 'Sign in'}
          </Button>
        </form>

        <p
          style={{
            fontSize: 12,
            color: 'var(--muted)',
            textAlign: 'center',
          }}
        >
          By continuing, you agree to our{' '}
          <a href="#" className="link">
            Terms
          </a>{' '}
          and{' '}
          <a href="#" className="link">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </AuthShell>
  );
}