import { useEffect, useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { light } from '../tokens';
import AuthPanel from '@/Components/AuthPanel';

// ─── Icon helper ──────────────────────────────────────────────────────────────
function Icon({ name, size = 16, style: s }) {
    return <i className={`ti ti-${name}`} style={{ fontSize: size, lineHeight: 1, ...s }} aria-hidden />;
}

// ─── Floating-label field ─────────────────────────────────────────────────────
function Field({ id, label, type = 'text', value, onChange, error, autoComplete, C }) {
    const [focused, setFocused] = useState(false);
    const filled = value?.length > 0;

    return (
        <div style={{ position: 'relative', marginBottom: error ? 6 : 0 }}>
            <label
                htmlFor={id}
                style={{
                    position: 'absolute',
                    left: 13,
                    top: focused || filled ? 7 : '50%',
                    transform: focused || filled ? 'none' : 'translateY(-50%)',
                    fontSize: focused || filled ? 10.5 : 14,
                    fontWeight: focused || filled ? 600 : 400,
                    letterSpacing: focused || filled ? '0.04em' : 0,
                    textTransform: focused || filled ? 'uppercase' : 'none',
                    color: focused ? C.signal : error ? C.danger : C.faint,
                    pointerEvents: 'none',
                    transition: 'all .15s cubic-bezier(0.4,0,0.2,1)',
                    zIndex: 1,
                }}
            >
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                    width: '100%',
                    padding: filled || focused ? '22px 13px 8px' : '15px 13px',
                    fontSize: 14,
                    fontFamily: 'inherit',
                    background: C.bg,
                    color: C.ink,
                    border: `1px solid ${error ? C.danger : focused ? C.signal : C.border}`,
                    borderRadius: 9,
                    outline: 'none',
                    boxShadow: focused
                        ? `0 0 0 3px ${error ? 'rgba(220,38,38,0.1)' : C.signalFocus}`
                        : 'none',
                    transition: 'border-color .15s, box-shadow .15s, padding .15s',
                    boxSizing: 'border-box',
                }}
            />
            {error && (
                <p style={{ fontSize: 12, color: C.danger, margin: '4px 0 0 2px', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Icon name="alert-circle" size={13} style={{ color: C.danger }} />
                    {error}
                </p>
            )}
        </div>
    );
}

// ─── Password strength meter ──────────────────────────────────────────────────
function strengthScore(pw) {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score; // 0-4
}

const STRENGTH_META = [
    { label: 'Too short', color: '#DC2626' },
    { label: 'Weak', color: '#D97706' },
    { label: 'Fair', color: '#FBBF24' },
    { label: 'Good', color: '#4ADE80' },
    { label: 'Strong', color: '#00C488' },
];

function PasswordStrength({ password, C }) {
    if (!password) return null;
    const score = strengthScore(password);
    const meta = STRENGTH_META[score];

    return (
        <div style={{ marginTop: 8 }}>
            <div style={{ display: 'flex', gap: 4, marginBottom: 5 }}>
                {[0, 1, 2, 3].map(i => (
                    <div
                        key={i}
                        style={{
                            flex: 1, height: 3, borderRadius: 99,
                            background: i < score ? meta.color : C.border,
                            transition: 'background .2s',
                        }}
                    />
                ))}
            </div>
            <p style={{ fontSize: 11.5, color: meta.color, margin: 0, fontWeight: 500 }}>
                {meta.label}
            </p>
        </div>
    );
}

// ─── Google button ────────────────────────────────────────────────────────────
function GoogleButton({ C }) {
    return (
        <a
            href="/auth/google/redirect"
            style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                width: '100%', padding: '10px 16px',
                fontSize: 14, fontWeight: 500, fontFamily: 'inherit',
                background: C.surface, color: C.ink2,
                border: `1px solid ${C.border}`,
                borderRadius: 9, cursor: 'pointer', textDecoration: 'none',
                transition: 'background .12s, border-color .12s',
                boxSizing: 'border-box',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.surfaceHover; e.currentTarget.style.borderColor = C.borderHover; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.borderColor = C.border; }}
        >
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.4 33.2 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l6-6C34.3 6.5 29.4 4.5 24 4.5 12.7 4.5 3.5 13.7 3.5 25S12.7 45.5 24 45.5 44.5 36.3 44.5 25c0-1.7-.2-3.3-.5-5z" />
                <path fill="#34A853" d="M6.3 14.7l7 5.1C15 16.1 19.2 13 24 13c3 0 5.8 1.1 7.9 3l6-6C34.3 6.5 29.4 4.5 24 4.5 16 4.5 9.1 9.6 6.3 14.7z" />
                <path fill="#FBBC05" d="M24 45.5c5.3 0 10.1-1.9 13.8-5l-6.4-5.3C29.4 37 26.8 38 24 38c-5.7 0-10.3-3.7-12-8.8l-7 5.4C8.8 40.9 15.9 45.5 24 45.5z" />
                <path fill="#EA4335" d="M44.5 25c0-1.7-.2-3.3-.5-5H24v8.5h11.8c-.7 2.1-2 3.9-3.7 5.2l6.4 5.3C41.6 36.2 44.5 31 44.5 25z" />
            </svg>
            Continue with Google
        </a>
    );
}

// ─── Divider ──────────────────────────────────────────────────────────────────
function Divider({ label, C }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, height: 1, background: C.border }} />
            <span style={{ fontSize: 12, color: C.faint, fontWeight: 500, letterSpacing: '0.04em' }}>
                {label}
            </span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>
    );
}

// ─── Register Page ────────────────────────────────────────────────────────────
export default function Register() {
    const C = light;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => reset('password', 'password_confirmation');
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <AuthPanel C={C} tagline="Create your account">

            {/* Google */}
            <GoogleButton C={C} />

            <Divider label="or register with email" C={C} />

            {/* Form */}
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Field
                    id="name"
                    label="Full name"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    error={errors.name}
                    autoComplete="name"
                    C={C}
                />
                <Field
                    id="email"
                    label="Work email"
                    type="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    error={errors.email}
                    autoComplete="username"
                    C={C}
                />
                <div>
                    <Field
                        id="password"
                        label="Password"
                        type="password"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        error={errors.password}
                        autoComplete="new-password"
                        C={C}
                    />
                    <PasswordStrength password={data.password} C={C} />
                </div>
                <Field
                    id="password_confirmation"
                    label="Confirm password"
                    type="password"
                    value={data.password_confirmation}
                    onChange={e => setData('password_confirmation', e.target.value)}
                    error={errors.password_confirmation}
                    autoComplete="new-password"
                    C={C}
                />

                {/* Terms notice */}
                <p style={{ fontSize: 12, color: C.faint, margin: 0, lineHeight: 1.6 }}>
                    By creating an account you agree to our{' '}
                    <a href="/terms" style={{ color: C.muted, fontWeight: 500 }}>Terms of Service</a>
                    {' '}and{' '}
                    <a href="/privacy" style={{ color: C.muted, fontWeight: 500 }}>Privacy Policy</a>.
                </p>

                <button
                    type="submit"
                    disabled={processing}
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        width: '100%', padding: '11px 16px',
                        fontSize: 14, fontWeight: 600,
                        background: processing ? C.signalHover : C.signal,
                        color: '#fff',
                        border: 'none', borderRadius: 9,
                        cursor: processing ? 'not-allowed' : 'pointer',
                        fontFamily: 'inherit',
                        opacity: processing ? 0.7 : 1,
                        transition: 'background .12s, opacity .12s',
                        marginTop: 2,
                    }}
                    onMouseEnter={e => { if (!processing) e.currentTarget.style.background = C.signalHover; }}
                    onMouseLeave={e => { if (!processing) e.currentTarget.style.background = C.signal; }}
                >
                    <Icon name={processing ? 'loader' : 'user-plus'} size={16} />
                    {processing ? 'Creating account…' : 'Create account'}
                </button>
            </form>

            {/* Switch to login */}
            <p style={{ textAlign: 'center', fontSize: 13.5, color: C.muted, margin: 0 }}>
                Already have an account?{' '}
                <Link
                    href={route('login')}
                    style={{ color: C.signal, fontWeight: 600, textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                >
                    Sign in
                </Link>
            </p>

        </AuthPanel>
    );
}