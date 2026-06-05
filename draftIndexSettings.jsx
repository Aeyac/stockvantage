import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';

// ─── Design tokens ────────────────────────────────────────────────────────────
const light = {
    bg: '#F2F5F4',
    surface: '#FFFFFF',
    surfaceHover: '#F9FAFB',
    border: '#E4E9E7',
    borderHover: '#CDD6D2',
    ink: '#0C0F0E',
    ink2: '#2D3A36',
    muted: '#617870',
    faint: '#8FA49D',
    signal: '#00C488',
    signalHover: '#00A872',
    signalFocus: 'rgba(0,196,136,0.15)',
    warn: '#D97706',
    warnBg: '#FFFBEB',
    warnBorder: '#FDE68A',
    danger: '#DC2626',
    dangerBg: '#FEF2F2',
    dangerBorder: '#FECACA',
    successBg: '#ECFDF5',
    successText: '#059669',
};

const dark = {
    bg: '#0E1110',
    surface: '#161B19',
    surfaceHover: '#1C2320',
    border: '#263029',
    borderHover: '#364039',
    ink: '#F3F7F5',
    ink2: '#C8D6D0',
    muted: '#7A9990',
    faint: '#4E6860',
    signal: '#00C488',
    signalHover: '#00E09A',
    signalFocus: 'rgba(0,196,136,0.18)',
    warn: '#FBBF24',
    warnBg: '#1C1608',
    warnBorder: '#78530A',
    danger: '#F87171',
    dangerBg: '#1C0808',
    dangerBorder: '#7F1D1D',
    successBg: '#052E1C',
    successText: '#34D399',
};

const CURRENCY_SYMBOLS = { PHP: '₱', USD: '$', EUR: '€', GBP: '£' };

const NAV_ITEMS = [
    { id: 'general', icon: 'building', label: 'General' },
    { id: 'billing', icon: 'credit-card', label: 'Billing' },
    { id: 'notifications', icon: 'bell', label: 'Notifications' },
    { id: 'security', icon: 'shield-lock', label: 'Security' },
];

// ─── Icon ─────────────────────────────────────────────────────────────────────
function Icon({ name, size = 16, style: extraStyle, 'aria-hidden': ariaHidden = true }) {
    return (
        <i
            className={`ti ti-${name}`}
            style={{ fontSize: size, lineHeight: 1, ...extraStyle }}
            aria-hidden={ariaHidden}
        />
    );
}

// ─── Label ────────────────────────────────────────────────────────────────────
function Label({ children, htmlFor, C }) {
    return (
        <label
            htmlFor={htmlFor}
            style={{ display: 'block', fontSize: 13.5, fontWeight: 500, color: C.ink, marginBottom: 2 }}
        >
            {children}
        </label>
    );
}

// ─── Hint ─────────────────────────────────────────────────────────────────────
function Hint({ children, C }) {
    return (
        <p style={{ fontSize: 12, color: C.faint, lineHeight: 1.5, margin: '3px 0 0' }}>
            {children}
        </p>
    );
}

// ─── TextInput ────────────────────────────────────────────────────────────────
function TextInput({ id, value, onChange, placeholder, C, style: extra }) {
    const [focused, setFocused] = useState(false);
    return (
        <input
            id={id}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
                width: '100%', padding: '9px 12px', fontSize: 14,
                fontFamily: 'inherit', background: C.bg, color: C.ink,
                border: `1px solid ${focused ? C.signal : C.border}`,
                borderRadius: 8, outline: 'none',
                boxShadow: focused ? `0 0 0 3px ${C.signalFocus}` : 'none',
                transition: 'border-color .12s, box-shadow .12s',
                boxSizing: 'border-box', ...extra,
            }}
        />
    );
}

// ─── NumberInput ──────────────────────────────────────────────────────────────
function NumberInput({ id, value, onChange, min, prefix, C }) {
    const [focused, setFocused] = useState(false);
    return (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {prefix && (
                <span style={{
                    position: 'absolute', left: 12, fontSize: 14, color: C.muted,
                    pointerEvents: 'none', userSelect: 'none',
                }}>
                    {prefix}
                </span>
            )}
            <input
                id={id}
                type="number"
                value={value}
                min={min}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                    width: '100%', padding: `9px 12px 9px ${prefix ? 26 : 12}px`,
                    fontSize: 14, fontFamily: 'inherit', background: C.bg, color: C.ink,
                    border: `1px solid ${focused ? C.signal : C.border}`,
                    borderRadius: 8, outline: 'none',
                    boxShadow: focused ? `0 0 0 3px ${C.signalFocus}` : 'none',
                    transition: 'border-color .12s, box-shadow .12s',
                    boxSizing: 'border-box',
                }}
            />
        </div>
    );
}

// ─── SelectInput ──────────────────────────────────────────────────────────────
function SelectInput({ id, value, onChange, options, C }) {
    const [focused, setFocused] = useState(false);
    return (
        <div style={{ position: 'relative' }}>
            <select
                id={id}
                value={value}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                    width: '100%', padding: '9px 36px 9px 12px', fontSize: 14,
                    fontFamily: 'inherit', background: C.bg, color: C.ink,
                    border: `1px solid ${focused ? C.signal : C.border}`,
                    borderRadius: 8, outline: 'none',
                    boxShadow: focused ? `0 0 0 3px ${C.signalFocus}` : 'none',
                    transition: 'border-color .12s, box-shadow .12s',
                    appearance: 'none', cursor: 'pointer', boxSizing: 'border-box',
                }}
            >
                {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <Icon
                name="chevron-down"
                size={14}
                style={{
                    position: 'absolute', right: 12, top: '50%',
                    transform: 'translateY(-50%)', color: C.faint, pointerEvents: 'none',
                }}
            />
        </div>
    );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function Card({ children, C, style: extra }) {
    return (
        <div style={{
            background: C.surface, border: `1px solid ${C.border}`,
            borderRadius: 12, overflow: 'hidden', ...extra,
        }}>
            {children}
        </div>
    );
}

// ─── SettingsRow ──────────────────────────────────────────────────────────────
function SettingsRow({ label, hint, htmlFor, children, C, last }) {
    return (
        <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 24,
            padding: '20px 24px',
            borderBottom: last ? 'none' : `1px solid ${C.border}`,
        }}>
            <div style={{ width: 196, flexShrink: 0, paddingTop: 2 }}>
                <Label htmlFor={htmlFor} C={C}>{label}</Label>
                {hint && <Hint C={C}>{hint}</Hint>}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
        </div>
    );
}

// ─── SectionHeading ───────────────────────────────────────────────────────────
function SectionHeading({ title, desc, C, danger }) {
    return (
        <div style={{ marginBottom: 8 }}>
            <p style={{
                fontSize: 14.5, fontWeight: 600,
                color: danger ? C.danger : C.ink,
                margin: '0 0 2px', letterSpacing: '-0.01em',
            }}>
                {title}
            </p>
            <p style={{ fontSize: 13, color: C.muted, margin: 0, lineHeight: 1.5 }}>{desc}</p>
        </div>
    );
}

// ─── ThemeSegmented ───────────────────────────────────────────────────────────
const THEME_OPTS = [
    { id: 'light', icon: 'sun', label: 'Light' },
    { id: 'dark', icon: 'moon', label: 'Dark' },
    { id: 'system', icon: 'device-laptop', label: 'System' },
];

function ThemeSegmented({ value, onChange, C }) {
    return (
        <div
            style={{
                display: 'inline-flex', background: C.bg,
                border: `1px solid ${C.border}`, borderRadius: 9, padding: 3, gap: 2,
            }}
            role="group"
            aria-label="Theme selection"
        >
            {THEME_OPTS.map(opt => {
                const active = value === opt.id;
                return (
                    <button
                        key={opt.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => onChange(opt.id)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '7px 14px', borderRadius: 7, fontSize: 13,
                            fontFamily: 'inherit', fontWeight: active ? 500 : 400,
                            border: active ? `1px solid ${C.border}` : '1px solid transparent',
                            background: active ? C.surface : 'transparent',
                            color: active ? C.ink : C.muted,
                            cursor: 'pointer', transition: 'all .15s',
                            boxShadow: active ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                        }}
                    >
                        <Icon name={opt.icon} size={15} />
                        {opt.label}
                    </button>
                );
            })}
        </div>
    );
}

// ─── ThemeBadge ───────────────────────────────────────────────────────────────
const THEME_LABELS = {
    light: 'Light mode active',
    dark: 'Dark mode active',
    system: 'Following system preference',
};

function ThemeBadge({ themeMode, C }) {
    return (
        <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            marginTop: 10, background: C.successBg, color: C.successText,
            fontSize: 12, fontWeight: 500, padding: '4px 10px', borderRadius: 6,
        }}>
            <Icon name="check" size={13} />
            {THEME_LABELS[themeMode]}
        </div>
    );
}

// ─── LogoUploader ─────────────────────────────────────────────────────────────
function LogoUploader({ logoPreview, onLogoChange, C }) {
    const fileRef = useRef(null);
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
                width: 56, height: 56, borderRadius: 8,
                border: `1px dashed ${C.borderHover}`, background: C.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', flexShrink: 0,
            }}>
                {logoPreview
                    ? <img src={logoPreview} alt="Logo preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    : <span style={{ fontSize: 10, fontFamily: 'monospace', color: C.faint }}>NONE</span>
                }
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontSize: 13, fontWeight: 500, background: 'transparent',
                        color: C.ink2, border: `1px solid ${C.border}`,
                        borderRadius: 7, padding: '7px 14px',
                        cursor: 'pointer', fontFamily: 'inherit', transition: 'background .12s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = C.surfaceHover}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                    <Icon name="upload" size={15} />
                    Upload logo
                </button>
                <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={onLogoChange}
                />
                <span style={{ fontSize: 11.5, color: C.faint }}>Recommended: 256 × 256 px, max 2 MB</span>
            </div>
        </div>
    );
}

// ─── ThresholdNote ────────────────────────────────────────────────────────────
function ThresholdNote({ threshold, symbol, C }) {
    const isHigh = threshold > 100000;
    const formatted = `${symbol}${Number(threshold).toLocaleString('en-US', {
        minimumFractionDigits: 2, maximumFractionDigits: 2,
    })}`;
    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            marginTop: 8, fontSize: 12,
            color: isHigh ? C.warn : C.muted,
        }}>
            <Icon name={isHigh ? 'alert-triangle' : 'info-circle'} size={14} />
            Purchase requests under <strong style={{ margin: '0 2px' }}>{formatted}</strong> will auto-approve.
        </div>
    );
}

// ─── DangerZone ───────────────────────────────────────────────────────────────
function DangerZone({ C }) {
    return (
        <div style={{
            background: C.dangerBg, border: `1px solid ${C.dangerBorder}`,
            borderRadius: 12, overflow: 'hidden',
        }}>
            <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '14px 24px', borderBottom: `1px solid ${C.dangerBorder}`,
            }}>
                <Icon name="alert-triangle" size={15} style={{ color: C.danger }} />
                <span style={{ fontSize: 13.5, fontWeight: 500, color: C.danger }}>
                    These actions cannot be undone
                </span>
            </div>
            {[
                {
                    title: 'Delete all procurement data',
                    desc: 'Permanently removes purchase orders, requests, and vendor records.',
                    label: 'Delete data',
                },
                {
                    title: 'Reset organization',
                    desc: 'Removes all members, settings, and configuration. The account itself is kept.',
                    label: 'Reset org',
                },
            ].map((item, i, arr) => (
                <div
                    key={item.title}
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        gap: 16, padding: '18px 24px',
                        borderBottom: i < arr.length - 1 ? `1px solid ${C.dangerBorder}` : 'none',
                    }}
                >
                    <div>
                        <p style={{ fontSize: 13.5, fontWeight: 500, color: C.ink, margin: '0 0 2px' }}>{item.title}</p>
                        <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>{item.desc}</p>
                    </div>
                    <button
                        type="button"
                        style={{
                            flexShrink: 0, fontSize: 13, fontWeight: 500,
                            background: C.dangerBg, color: C.danger,
                            border: `1px solid ${C.dangerBorder}`,
                            borderRadius: 7, padding: '7px 14px',
                            cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
                        }}
                    >
                        {item.label}
                    </button>
                </div>
            ))}
        </div>
    );
}

// ─── SideNav ──────────────────────────────────────────────────────────────────
function SideNav({ activeSection, onSwitch, C }) {
    return (
        <nav aria-label="Settings navigation" style={{ width: 180, flexShrink: 0 }}>
            <p style={{
                fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: C.faint,
                padding: '0 8px', marginBottom: 6,
            }}>
                Settings
            </p>
            {NAV_ITEMS.map(item => {
                const active = activeSection === item.id;
                return (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => onSwitch(item.id)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            width: '100%', textAlign: 'left', padding: '7px 10px',
                            borderRadius: 8, fontSize: 13.5, fontFamily: 'inherit',
                            fontWeight: active ? 500 : 400,
                            background: active ? C.bg : 'transparent',
                            color: active ? C.ink : C.muted,
                            border: 'none', cursor: 'pointer',
                            transition: 'background .12s, color .12s',
                        }}
                        onMouseEnter={e => { if (!active) e.currentTarget.style.background = C.bg; }}
                        onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                        aria-current={active ? 'page' : undefined}
                    >
                        <Icon name={item.icon} size={16} />
                        {item.label}
                    </button>
                );
            })}
        </nav>
    );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ visible, C }) {
    return (
        <div
            role="status"
            aria-live="polite"
            style={{
                display: 'flex', alignItems: 'center', gap: 7,
                fontSize: 13, color: C.successText,
                opacity: visible ? 1 : 0,
                transition: 'opacity .2s',
                pointerEvents: 'none',
            }}
        >
            <Icon name="circle-check" size={16} />
            Changes saved
        </div>
    );
}

function Toggle({ id, checked, onChange, C }) {
    return (
        <button
            id={id}
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            style={{
                position: 'relative',
                width: 40, height: 22,
                borderRadius: 20, border: 'none',
                background: checked ? C.signal : C.border,
                cursor: 'pointer', flexShrink: 0,
                transition: 'background 0.2s', padding: 0,
            }}
        >
            <span style={{
                position: 'absolute',
                top: 3, left: checked ? 21 : 3,
                width: 16, height: 16,
                borderRadius: '50%', background: '#fff',
                transition: 'left 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }} />
        </button>
    )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function Index({ settings }) {
    const { flash } = usePage().props;

    const [themeMode, setThemeMode] = useState(() => {
        return localStorage.getItem('sv_interface_theme') || 'light';
    });

    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'POST',
        company_name: settings.company_name ?? '',
        currency: settings.currency ?? 'PHP',
        approval_threshold: settings.approval_threshold ?? 500.00,

        logo: null,
    });

    console.log(data.auto_send_email)

    const [logoPreview, setLogoPreview] = useState(settings.logo_url ?? null);
    const [activeSection, setActiveSection] = useState('general');
    const [toastVisible, setToastVisible] = useState(false);

    const C = themeMode === 'dark' ? dark : light;

    useEffect(() => {
        if (flash?.success) {
            setToastVisible(true);
            const t = setTimeout(() => setToastVisible(false), 2800);
            return () => clearTimeout(t);
        }
    }, [flash]);

    const patch = useCallback((key, val) => setData(key, val), [setData]);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setData('logo', file);
        setLogoPreview(URL.createObjectURL(file));
    };

    const handleThemeChange = (mode) => {
        setThemeMode(mode);
        localStorage.setItem('sv_interface_theme', mode);
    };

    const handleSave = () => {
        post(route('settings.update'), {
            preserveScroll: true,
            onSuccess: () => setData('logo', null),
        });
    };

    const handleReset = () => {
        reset();
        setLogoPreview(settings.logo_url ?? null);
    };

    const currencySymbol = CURRENCY_SYMBOLS[data.currency] ?? '₱';

    return (
        <AuthenticatedLayout header="System Configurations">

            <Head title="Settings" />

            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.30.0/dist/tabler-icons.min.css"
            />

            <div style={{
                fontFamily: '"Instrument Sans", -apple-system, BlinkMacSystemFont, sans-serif',
                background: C.bg, color: C.ink, minHeight: '100vh',
                transition: 'background .2s, color .2s',
            }}>
                <div style={{
                    display: 'flex', maxWidth: 900, margin: '0 auto',
                    padding: '32px 24px', gap: 32, alignItems: 'flex-start',
                    paddingBottom: 80, 
                }}>

                    {/* Sidebar */}
                    <div style={{ position: 'sticky', top: 80 }}>
                        <SideNav activeSection={activeSection} onSwitch={setActiveSection} C={C} />
                    </div>

                    {/* Content */}
                    <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>

                        {activeSection === 'general' && (
                            <>
                                {/* Organization */}
                                <section>
                                    <SectionHeading
                                        title="Organization"
                                        desc="Basic details shown on invoices and purchase orders."
                                        C={C}
                                    />
                                    <Card C={C}>
                                        <SettingsRow label="Name" hint="Your legal or trading entity name." htmlFor="org-name" C={C}>
                                            <TextInput
                                                id="org-name"
                                                value={data.company_name}
                                                onChange={e => patch('company_name', e.target.value)}
                                                placeholder="Enter organization name"
                                                C={C}
                                            />
                                            {errors.company_name && (
                                                <p style={{ fontSize: 12, color: C.danger, marginTop: 4 }}>
                                                    {errors.company_name}
                                                </p>
                                            )}
                                        </SettingsRow>
                                        <SettingsRow label="Logo" hint="PNG, JPEG or SVG · max 2 MB." C={C} last>
                                            <LogoUploader logoPreview={logoPreview} onLogoChange={handleLogoChange} C={C} />
                                            {errors.logo && (
                                                <p style={{ fontSize: 12, color: C.danger, marginTop: 4 }}>
                                                    {errors.logo}
                                                </p>
                                            )}
                                        </SettingsRow>
                                    </Card>
                                </section>

                                {/* Procurement rules */}
                                <section>
                                    <SectionHeading
                                        title="Procurement rules"
                                        desc="Configure auto-approval thresholds and PO generation limits."
                                        C={C}
                                    />
                                    <Card C={C}>
                                        <SettingsRow label="Currency" hint="Applied to all invoices and procurement records." htmlFor="currency" C={C}>
                                            <SelectInput
                                                id="currency"
                                                value={data.currency}
                                                onChange={e => patch('currency', e.target.value)}
                                                options={[
                                                    { value: 'PHP', label: 'PHP (₱) — Philippine Peso' },
                                                    { value: 'USD', label: 'USD ($) — US Dollar' },
                                                    { value: 'EUR', label: 'EUR (€) — Euro' },
                                                    { value: 'GBP', label: 'GBP (£) — British Pound' },
                                                ]}
                                                C={C}
                                            />
                                            {errors.currency && (
                                                <p style={{ fontSize: 12, color: C.danger, marginTop: 4 }}>
                                                    {errors.currency}
                                                </p>
                                            )}
                                        </SettingsRow>
                                        <SettingsRow label="Auto-approval limit" hint="Requests below this skip manager review and auto-generate a PO." htmlFor="threshold" C={C} last>
                                            <NumberInput
                                                id="threshold"
                                                value={data.approval_threshold}
                                                onChange={e => patch('approval_threshold', parseFloat(e.target.value) || '')}
                                                min={0}
                                                prefix={currencySymbol}
                                                C={C}
                                            />
                                            <ThresholdNote threshold={data.approval_threshold} symbol={currencySymbol} C={C} />
                                            {errors.approval_threshold && (
                                                <p style={{ fontSize: 12, color: C.danger, marginTop: 4 }}>
                                                    {errors.approval_threshold}
                                                </p>
                                            )}
                                        </SettingsRow>
                                        <SettingsRow
                                            label="Auto-send PO email"
                                            hint="Automatically email the approved Purchase Order PDF to the supplier's contact when a PR is approved."
                                            C={C}
                                            last
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                <Toggle
                                                    id="auto-send-email"
                                                    checked={data.auto_send_email}
                                                    onChange={val => patch('auto_send_email', val)}
                                                    C={C}
                                                />
                                                <div>
                                                    <span style={{
                                                        fontSize: 13.5, fontWeight: 500,
                                                        color: data.auto_send_email ? C.signal : C.muted,
                                                    }}>
                                                        {data.auto_send_email ? 'Enabled' : 'Disabled'}
                                                    </span>
                                                    {data.auto_send_email && (
                                                        <p style={{
                                                            fontSize: 12, color: C.faint,
                                                            margin: '2px 0 0', lineHeight: 1.4,
                                                        }}>
                                                            Supplier will receive the PO PDF at their registered contact email.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            {errors.auto_send_email && (
                                                <p style={{ fontSize: 12, color: C.danger, marginTop: 4 }}>
                                                    {errors.auto_send_email}
                                                </p>
                                            )}
                                        </SettingsRow>
                                    </Card>
                                </section>

                                {/* Appearance */}
                                <section>
                                    <SectionHeading
                                        title="Appearance"
                                        desc="Choose how the platform looks. Saved in your browser."
                                        C={C}
                                    />
                                    <Card C={C}>
                                        <SettingsRow label="Theme" hint="Applies to this device only." C={C} last>
                                            <ThemeSegmented value={themeMode} onChange={handleThemeChange} C={C} />
                                            <ThemeBadge themeMode={themeMode} C={C} />
                                        </SettingsRow>
                                    </Card>
                                </section>

                                {/* Danger zone */}
                                <section>
                                    <SectionHeading
                                        title="Danger zone"
                                        desc="Irreversible actions — proceed with caution."
                                        C={C}
                                        danger
                                    />
                                    <DangerZone C={C} />
                                </section>

                                {/* Footer actions */}
                                {/* Sticky footer actions */}
                                <div style={{
                                    position: 'fixed',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    zIndex: 100,
                                    background: C.surface,
                                    borderTop: `1px solid ${C.border}`,
                                    padding: '12px 24px',
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    gap: 12,
                                    boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
                                }}>
                                    <Toast visible={toastVisible} C={C} />
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        disabled={processing}
                                        style={{
                                            fontSize: 13.5, fontWeight: 500,
                                            background: 'transparent', color: C.muted,
                                            border: `1px solid ${C.border}`,
                                            borderRadius: 8, padding: '8px 18px',
                                            cursor: processing ? 'not-allowed' : 'pointer',
                                            fontFamily: 'inherit',
                                            opacity: processing ? 0.5 : 1,
                                            transition: 'background .12s, color .12s',
                                        }}
                                        onMouseEnter={e => { if (!processing) { e.currentTarget.style.background = C.surfaceHover; e.currentTarget.style.color = C.ink; } }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.muted; }}
                                    >
                                        Reset
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        disabled={processing}
                                        style={{
                                            display: 'inline-flex', alignItems: 'center', gap: 7,
                                            fontSize: 13.5, fontWeight: 500,
                                            background: processing ? C.signalHover : C.signal,
                                            color: '#fff', border: 'none',
                                            borderRadius: 8, padding: '8px 20px',
                                            cursor: processing ? 'not-allowed' : 'pointer',
                                            fontFamily: 'inherit',
                                            opacity: processing ? 0.7 : 1,
                                            transition: 'background .12s, opacity .12s',
                                        }}
                                    >
                                        <Icon name={processing ? 'loader' : 'device-floppy'} size={15} />
                                        {processing ? 'Saving…' : 'Save changes'}
                                    </button>
                                </div>
                            </>
                        )}

                        {activeSection !== 'general' && (
                            <div style={{
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center',
                                minHeight: 280, gap: 8,
                                color: C.faint, textAlign: 'center',
                            }}>
                                <Icon name="tools" size={32} style={{ color: C.border }} />
                                <p style={{ fontSize: 14, fontWeight: 500, color: C.muted }}>
                                    {NAV_ITEMS.find(n => n.id === activeSection)?.label} settings
                                </p>
                                <p style={{ fontSize: 13, color: C.faint }}>
                                    This section is not yet implemented.
                                </p>
                            </div>
                        )}

                    </main>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}