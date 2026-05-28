import { Head, Link, useForm, usePage } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

const C = {
    bg: '#F4F5F8',
    surface: '#FFFFFF',
    surfaceLow: '#F8F9FC',
    surfaceHigh: '#E9EBF0',
    outline: '#DDE2E5',
    primary: '#00875A',       // Clean, professional green for light mode contrast
    secondary: '#6554C0',     // Deep Indigo
    tertiary: '#B65C00',      // Warm Amber
    onSurface: '#1A1C1E',     // Charcoal text
    onSurfaceVar: '#5D6166',  // Slate gray subtext
    onPrimary: '#FFFFFF',
    error: '#DE350B',         // Deep accessible red
}

const ROLES = [
    { value: 'tenant_admin', label: 'Admin', desc: 'Full system access' },
    { value: 'department_manager', label: 'Manager', desc: 'Approvals & analytics' },
    { value: 'warehouse_staff', label: 'Warehouse', desc: 'Inventory & GRN' },
    { value: 'employee', label: 'Employee', desc: 'Purchase requests only' },
]

export default function Edit({ user }) {
    const { auth } = usePage().props
    const isCurrentUser = auth.user.id === user.id

    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
        is_active: user.is_active,
    })

    function handleSubmit(e) {
        e.preventDefault()
        put(`/users/${user.id}`)
    }

    return (
        <AuthenticatedLayout header="Edit User">
            <Head title="Edit User" />

            <style>{`
                .usr-card {
                    background: ${C.surface}; border: 1px solid ${C.outline};
                    border-radius: 16px; padding: 28px; max-width: 600px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
                }
                .usr-field { display: flex; flex-direction: column; gap: 6px; }
                .usr-label {
                    font-size: 11px; font-weight: 600; color: ${C.onSurfaceVar};
                    text-transform: uppercase; letter-spacing: 0.08em;
                }
                .usr-input {
                    background: ${C.surface}; border: 1px solid ${C.outline};
                    border-radius: 10px; padding: 11px 14px; color: ${C.onSurface};
                    font-size: 14px; font-family: inherit; outline: none;
                    transition: border-color 0.15s, box-shadow 0.15s; width: 100%;
                }
                .usr-input:focus {
                    border-color: ${C.primary};
                    box-shadow: 0 0 0 3px ${C.primary}20;
                }
                .usr-input::placeholder { color: ${C.onSurfaceVar}60; }
                .usr-input:disabled { background: ${C.surfaceLow}; opacity: 0.6; cursor: not-allowed; color: ${C.onSurfaceVar}; }
                .usr-error { font-size: 12px; color: ${C.error}; margin-top: 3px; font-weight: 500; }
                .usr-hint { font-size: 12px; color: ${C.onSurfaceVar}; margin-top: 3px; opacity: 0.7; }
                .usr-btn-primary {
                    display: inline-flex; align-items: center; gap: 7px;
                    background: ${C.primary}; color: ${C.onPrimary};
                    border: none; border-radius: 12px; padding: 11px 22px;
                    font-size: 14px; font-weight: 600; cursor: pointer;
                    text-decoration: none; transition: filter 0.15s; font-family: inherit;
                }
                .usr-btn-primary:hover { filter: brightness(0.92); }
                .usr-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
                .usr-btn-ghost {
                    display: inline-flex; align-items: center;
                    background: none; color: ${C.onSurfaceVar};
                    border: 1px solid ${C.outline}; border-radius: 12px;
                    padding: 11px 22px; font-size: 14px; font-weight: 500;
                    cursor: pointer; text-decoration: none; transition: all 0.15s; font-family: inherit;
                }
                .usr-btn-ghost:hover { color: ${C.onSurface}; background: ${C.surfaceLow}; border-color: ${C.onSurfaceVar}50; }
                .usr-divider { height: 1px; background: ${C.outline}; margin: 6px 0; }
                .usr-section {
                    font-size: 11px; font-weight: 700; color: ${C.onSurfaceVar};
                    text-transform: uppercase; letter-spacing: 0.1em;
                    margin-bottom: 16px; margin-top: 6px; opacity: 0.8;
                }
                .usr-role-option {
                    display: flex; align-items: center; gap: 12px;
                    padding: 12px 14px; background: ${C.surfaceLow};
                    border: 1px solid ${C.outline}; border-radius: 10px;
                    cursor: pointer; transition: all 0.15s;
                }
                .usr-role-option:hover { border-color: ${C.onSurfaceVar}50; background: ${C.surfaceHigh}40; }
                .usr-role-option.selected {
                    border-color: ${C.primary}70;
                    background: ${C.primary}0A;
                }
                .usr-role-option.disabled-opt {
                    opacity: 0.5; cursor: not-allowed; background: ${C.surfaceLow};
                }
                .usr-role-option.disabled-opt:hover { border-color: ${C.outline}; background: ${C.surfaceLow}; }
                .usr-role-radio {
                    width: 16px; height: 16px; border-radius: 50%;
                    border: 2px solid ${C.outline}; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    transition: all 0.15s; background: ${C.surface};
                }
                .usr-role-option:hover .usr-role-radio { border-color: ${C.onSurfaceVar}50; }
                .usr-role-radio.checked { border-color: ${C.primary}; background: ${C.primary}; }
                .usr-role-radio.checked::after {
                    content: ''; width: 6px; height: 6px;
                    border-radius: 50%; background: ${C.onPrimary};
                }
                .usr-toggle-row {
                    display: flex; align-items: center; gap: 14px;
                    padding: 14px 16px; background: ${C.surfaceLow};
                    border: 1px solid ${C.outline}; border-radius: 12px;
                }
                .usr-toggle {
                    position: relative; width: 40px; height: 22px;
                    background: ${C.surfaceHigh}; border-radius: 20px;
                    cursor: pointer; transition: background 0.2s;
                    flex-shrink: 0; border: none; padding: 0;
                    box-shadow: inset 0 1px 2px rgba(0,0,0,0.06);
                }
                .usr-toggle.on { background: ${C.primary}; }
                .usr-toggle::after {
                    content: ''; position: absolute; top: 3px; left: 3px;
                    width: 16px; height: 16px; background: #fff;
                    border-radius: 50%; transition: transform 0.2s;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                }
                .usr-toggle.on::after { transform: translateX(18px); }
                .usr-self-notice {
                    display: flex; align-items: center; gap: 10px;
                    padding: 12px 16px; background: ${C.primary}0D;
                    border: 1px solid ${C.primary}25; border-radius: 10px;
                    font-size: 13px; color: ${C.primary}; font-weight: 500;
                }
            `}</style>

            <Link href="/users" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13,
                color: C.onSurfaceVar, textDecoration: 'none', marginBottom: 24, transition: 'color 0.15s',
            }}
                onMouseEnter={e => e.currentTarget.style.color = C.onSurface}
                onMouseLeave={e => e.currentTarget.style.color = C.onSurfaceVar}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
                Back to Users
            </Link>

            {/* Self-edit notice */}
            {isCurrentUser && (
                <div className="usr-self-notice" style={{ marginBottom: 20, maxWidth: 600 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    You are editing your own account. Role and status changes will take effect on your next login.
                </div>
            )}

            <div className="usr-card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                    <div className="usr-section">Account Details</div>

                    <div className="usr-field">
                        <label className="usr-label">Full Name *</label>
                        <input
                            className="usr-input" type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                        {errors.name && <span className="usr-error">⚠ {errors.name}</span>}
                    </div>

                    <div className="usr-field">
                        <label className="usr-label">Email Address *</label>
                        <input
                            className="usr-input" type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                        />
                        {errors.email && <span className="usr-error">⚠ {errors.email}</span>}
                    </div>

                    <div className="usr-divider" />
                    <div className="usr-section">Role & Permissions</div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {ROLES.map(role => (
                            <div
                                key={role.value}
                                className={`usr-role-option ${data.role === role.value ? 'selected' : ''}`}
                                onClick={() => setData('role', role.value)}
                            >
                                <div className={`usr-role-radio ${data.role === role.value ? 'checked' : ''}`} />
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: C.onSurface }}>
                                        {role.label}
                                    </div>
                                    <div style={{ fontSize: 12, color: C.onSurfaceVar, marginTop: 1 }}>
                                        {role.desc}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {errors.role && <span className="usr-error">⚠ {errors.role}</span>}
                    </div>

                    <div className="usr-divider" />
                    <div className="usr-section">Status</div>

                    <div className="usr-toggle-row">
                        <button
                            type="button"
                            className={`usr-toggle ${data.is_active ? 'on' : ''}`}
                            onClick={() => setData('is_active', !data.is_active)}
                        />
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: data.is_active ? C.primary : C.onSurfaceVar }}>
                                {data.is_active ? 'Active' : 'Inactive'}
                            </div>
                            <div style={{ fontSize: 12, color: C.onSurfaceVar, marginTop: 2, opacity: 0.8 }}>
                                {data.is_active
                                    ? 'User can log in and access the system'
                                    : 'User is blocked from logging in'}
                            </div>
                        </div>
                        {errors.is_active && <span className="usr-error">⚠ {errors.is_active}</span>}
                    </div>

                    <div style={{ display: 'flex', gap: 10, paddingTop: 20, borderTop: `1px solid ${C.outline}` }}>
                        <button type="submit" disabled={processing} className="usr-btn-primary">
                            {processing ? 'Saving...' : 'Update User'}
                        </button>
                        <Link href="/users" className="usr-btn-ghost">Cancel</Link>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    )
}