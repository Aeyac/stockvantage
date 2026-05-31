import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { light } from '../tokens'
import AuthPanel from '../../Components/AuthPanel';

function Icon({ name, size = 16, style: s }) {
    return <i className={`ti ti-${name}`} style={{ fontSize: size, lineHeight: 1, ...s }} aria-hidden />;
}

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

export default function Login({ status, canResetPassword }) {
    const C = light;

    const { data, setData, post, processing, errors, reset } = useForm({
        email:    '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <AuthPanel C={C} tagline="Welcome back">

            {status && (
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: C.successBg, color: C.successText,
                    border: `1px solid ${C.signal}`,
                    borderRadius: 8, padding: '10px 14px',
                    fontSize: 13, fontWeight: 500,
                }}>
                    <Icon name="circle-check" size={15} />
                    {status}
                </div>
            )}

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Field
                    id="email"
                    label="Email address"
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
                        autoComplete="current-password"
                        C={C}
                    />
                    {canResetPassword && (
                        <div style={{ textAlign: 'right', marginTop: 6 }}>
                            <Link
                                href={route('password.request')}
                                style={{ fontSize: 12.5, color: C.signal, textDecoration: 'none', fontWeight: 500 }}
                                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                            >
                                Forgot password?
                            </Link>
                        </div>
                    )}
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer', userSelect: 'none' }}>
                    <div
                        onClick={() => setData('remember', !data.remember)}
                        style={{
                            width: 17, height: 17, borderRadius: 5,
                            border: `1.5px solid ${data.remember ? C.signal : C.borderHover}`,
                            background: data.remember ? C.signal : 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0, transition: 'all .12s', cursor: 'pointer',
                        }}
                    >
                        {data.remember && <Icon name="check" size={11} style={{ color: '#fff' }} />}
                    </div>
                    <span style={{ fontSize: 13.5, color: C.muted }}>Remember me for 30 days</span>
                </label>

                <button
                    type="submit"
                    disabled={processing}
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        width: '100%', padding: '11px 16px',
                        fontSize: 14, fontWeight: 600,
                        background: C.signal, color: '#fff',
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
                    <Icon name={processing ? 'loader' : 'login-2'} size={16} />
                    {processing ? 'Signing in…' : 'Sign in'}
                </button>
            </form>

            <p style={{ textAlign: 'center', fontSize: 13.5, color: C.muted, margin: 0 }}>
                Don't have an account?{' '}
                <Link
                    href={route('register')}
                    style={{ color: C.signal, fontWeight: 600, textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                >
                    Create one
                </Link>
            </p>

        </AuthPanel>
    );
}