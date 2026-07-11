import { useEffect, useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { light } from '../tokens';
import AuthPanel from '@/Components/AuthPanel';
import FlashMessage from '@/Components/FlashMessage';

// ─── Icon helper ──────────────────────────────────────────────────────────────
function Icon({ name, size = 16, style: s }) {
    return <i className={`ti ti-${name}`} style={{ fontSize: size, lineHeight: 1, ...s }} aria-hidden />;
}

// ─── Floating-label field ─────────────────────────────────────────────────────
function Field({ id, label, type = 'text', value, onChange, error, autoComplete, C, prefix, suffix }) {
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
            <div style={{ display: 'flex', alignItems: 'stretch' }}>
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
                        paddingRight: suffix ? 6 : undefined,
                        fontSize: 14,
                        fontFamily: 'inherit',
                        background: C.bg,
                        color: C.ink,
                        border: `1px solid ${error ? C.danger : focused ? C.signal : C.border}`,
                        borderRight: suffix ? 'none' : undefined,
                        borderRadius: suffix ? '9px 0 0 9px' : 9,
                        outline: 'none',
                        boxShadow: focused
                            ? `0 0 0 3px ${error ? 'rgba(220,38,38,0.1)' : C.signalFocus}`
                            : 'none',
                        transition: 'border-color .15s, box-shadow .15s, padding .15s',
                        boxSizing: 'border-box',
                    }}
                />
                {suffix && (
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 13px',
                            fontSize: 13,
                            color: C.faint,
                            background: C.surface,
                            border: `1px solid ${focused ? C.signal : C.border}`,
                            borderLeft: `1px solid ${C.border}`,
                            borderRadius: '0 9px 9px 0',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {suffix}
                    </span>
                )}
            </div>
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
    return score;
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

// ─── Step indicator ────────────────────────────────────────────────────────────
function StepIndicator({ step, C }) {
    const steps = ['Workspace', 'Admin account'];
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            {steps.map((label, i) => {
                const n = i + 1;
                const active = step === n;
                const done = step > n;
                return (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, flex: i === 0 ? 1 : 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div
                                style={{
                                    width: 22, height: 22, borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 11.5, fontWeight: 700,
                                    background: done ? C.signal : active ? C.signal : C.surface,
                                    color: done || active ? '#fff' : C.faint,
                                    border: `1px solid ${done || active ? C.signal : C.border}`,
                                    transition: 'all .15s',
                                    flexShrink: 0,
                                }}
                            >
                                {done ? <Icon name="check" size={12} /> : n}
                            </div>
                            <span style={{ fontSize: 12.5, fontWeight: active ? 600 : 500, color: active || done ? C.ink : C.faint }}>
                                {label}
                            </span>
                        </div>
                        {i === 0 && (
                            <div style={{ flex: 1, height: 1, background: step > 1 ? C.signal : C.border, transition: 'background .2s' }} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

// ─── Plan card ────────────────────────────────────────────────────────────────
const PLANS = [
    {
        id: 'free',
        name: 'Free',
        price: '₱0',
        period: '/mo',
        blurb: 'For trying things out',
        features: ['Up to 3 users', '1 warehouse', 'Basic reporting'],
    },
    {
        id: 'pro',
        name: 'Pro',
        price: '₱1,499',
        period: '/mo',
        blurb: 'For growing teams',
        features: ['Up to 25 users', 'Unlimited warehouses', 'PDF & email exports', 'Priority support'],
        highlight: true,
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        blurb: 'For large organizations',
        features: ['Unlimited users', 'Custom integrations', 'Dedicated support', 'SLA guarantee'],
    },
];

function PlanCard({ plan, selected, onSelect, C }) {
    return (
        <button
            type="button"
            onClick={() => onSelect(plan.id)}
            style={{
                position: 'relative',
                textAlign: 'left',
                padding: '14px 14px 12px',
                borderRadius: 10,
                border: `1.5px solid ${selected ? C.signal : C.border}`,
                background: selected ? C.signalFocus : C.bg,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'border-color .12s, background .12s',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
            }}
        >
            {plan.highlight && (
                <span
                    style={{
                        position: 'absolute', top: -9, right: 12,
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        background: C.signal, color: '#fff',
                        padding: '2px 8px', borderRadius: 99,
                    }}
                >
                    Popular
                </span>
            )}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>{plan.name}</span>
                <div
                    style={{
                        width: 16, height: 16, borderRadius: '50%',
                        border: `1.5px solid ${selected ? C.signal : C.border}`,
                        background: selected ? C.signal : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                    }}
                >
                    {selected && <Icon name="check" size={10} style={{ color: '#fff' }} />}
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: C.ink }}>{plan.price}</span>
                {plan.period && <span style={{ fontSize: 11.5, color: C.faint }}>{plan.period}</span>}
            </div>
            <p style={{ fontSize: 11.5, color: C.muted, margin: 0 }}>{plan.blurb}</p>
            <ul style={{ margin: '2px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 3 }}>
                {plan.features.map(f => (
                    <li key={f} style={{ fontSize: 11.5, color: C.muted, display: 'flex', alignItems: 'center', gap: 5 }}>
                        <Icon name="check" size={11} style={{ color: C.signal, flexShrink: 0 }} />
                        {f}
                    </li>
                ))}
            </ul>
        </button>
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

function slugify(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .slice(0, 40);
}

// ─── Step transition wrapper ───────────────────────────────────────────────────
function StepTransition({ stepKey, direction, children }) {
    return (
        <div key={stepKey} style={{ animation: `${direction === 'forward' ? 'slideInRight' : 'slideInLeft'} .28s cubic-bezier(0.16,1,0.3,1)` }}>
            <style>{`
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(16px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-16px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
            {children}
        </div>
    );
}

// ─── Register Page ────────────────────────────────────────────────────────────
export default function Register({ flash }) {
    const C = light;
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState('forward'); // 'forward' | 'back'
    const [subdomainTouched, setSubdomainTouched] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        company_name: '',
        subdomain: '',
        plan: 'pro',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => reset('password', 'password_confirmation');
    }, []);

    // auto-generate subdomain from company name until the user edits it manually
    useEffect(() => {
        if (!subdomainTouched) {
            setData('subdomain', slugify(data.company_name));
        }
    }, [data.company_name]);

    const stage1Valid = data.company_name.trim().length > 0 && data.subdomain.trim().length > 0 && data.plan;

    const goToStep2 = (e) => {
        e.preventDefault();
        if (stage1Valid) {
            setDirection('forward');
            setStep(2);
        }
    };

    const backToStep1 = () => {
        setDirection('back');
        setStep(1);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <AuthPanel C={C} tagline={step === 1 ? 'Create your workspace' : 'Set up your admin account'}>

            <FlashMessage flash={flash} />
            <StepIndicator step={step} C={C} />

            {step === 1 && (
                <StepTransition stepKey="step1" direction={direction}>
                    <form onSubmit={goToStep2} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <Field
                            id="company_name"
                            label="Company name"
                            value={data.company_name}
                            onChange={e => setData('company_name', e.target.value)}
                            error={errors.company_name}
                            autoComplete="organization"
                            C={C}
                        />

                        <Field
                            id="subdomain"
                            label="Subdomain"
                            value={data.subdomain}
                            onChange={e => {
                                setSubdomainTouched(true);
                                setData('subdomain', slugify(e.target.value));
                            }}
                            error={errors.subdomain}
                            autoComplete="off"
                            suffix=".stockvantage.com"
                            C={C}
                        />
                        <p style={{ fontSize: 11.5, color: C.faint, margin: '-8px 0 0 2px' }}>
                            Reserved for future use — you'll sign in normally for now.
                        </p>

                        <div>
                            <p style={{ fontSize: 12.5, fontWeight: 600, color: C.ink, margin: '4px 0 8px' }}>
                                Choose a plan
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                                {PLANS.map(plan => (
                                    <PlanCard
                                        key={plan.id}
                                        plan={plan}
                                        selected={data.plan === plan.id}
                                        onSelect={(id) => setData('plan', id)}
                                        C={C}
                                    />
                                ))}
                            </div>
                            {errors.plan && (
                                <p style={{ fontSize: 12, color: C.danger, margin: '6px 0 0 2px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Icon name="alert-circle" size={13} style={{ color: C.danger }} />
                                    {errors.plan}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={!stage1Valid}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                width: '100%', padding: '11px 16px',
                                fontSize: 14, fontWeight: 600,
                                background: stage1Valid ? C.signal : C.border,
                                color: '#fff',
                                border: 'none', borderRadius: 9,
                                cursor: stage1Valid ? 'pointer' : 'not-allowed',
                                fontFamily: 'inherit',
                                transition: 'background .12s',
                                marginTop: 2,
                            }}
                            onMouseEnter={e => { if (stage1Valid) e.currentTarget.style.background = C.signalHover; }}
                            onMouseLeave={e => { if (stage1Valid) e.currentTarget.style.background = C.signal; }}
                        >
                            Continue
                            <Icon name="arrow-right" size={16} />
                        </button>
                    </form>
                </StepTransition>
            )}

            {step === 2 && (
                <StepTransition stepKey="step2" direction={direction}>
                    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {/* Workspace summary chip */}
                        <button
                            type="button"
                            onClick={backToStep1}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                padding: '8px 12px',
                                background: C.surface,
                                border: `1px solid ${C.border}`,
                                borderRadius: 8,
                                cursor: 'pointer',
                                fontFamily: 'inherit',
                                width: '100%',
                                textAlign: 'left',
                            }}
                        >
                            <Icon name="arrow-left" size={14} style={{ color: C.faint }} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <span style={{ fontSize: 12.5, fontWeight: 600, color: C.ink }}>
                                    {data.company_name || 'Your workspace'}
                                </span>
                                <span style={{ fontSize: 11, color: C.faint }}>
                                    {data.subdomain}.stockvantage.com · {PLANS.find(p => p.id === data.plan)?.name} plan
                                </span>
                            </div>
                        </button>

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
                            {processing ? 'Creating workspace…' : 'Create workspace'}
                        </button>
                    </form>
                </StepTransition>
            )}

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