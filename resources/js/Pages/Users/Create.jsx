import { Head, Link, useForm } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import BackButton from '@/Components/BackButton'

const C = {
    bg: '#F4F5F8',
    surface: '#FFFFFF',
    surfaceLow: '#F8F9FC',
    surfaceHigh: '#E9EBF0',
    outline: '#DDE2E5',
    primary: '#00875A',       // High-contrast clean green for light mode
    secondary: '#6554C0',     // Deep Indigo
    tertiary: '#B65C00',      // Warm Amber
    onSurface: '#1A1C1E',     // Charcoal text
    onSurfaceVar: '#5D6166',  // Slate gray subtext
    onPrimary: '#FFFFFF',
    error: '#DE350B',         // Deep accessible red
}

const ROLES = [
    { value: 'tenant_admin', label: 'Admin — Full system access' },
    { value: 'department_manager', label: 'Manager — Approvals & analytics' },
    { value: 'warehouse_staff', label: 'Warehouse — Inventory & GRN' },
    { value: 'employee', label: 'Employee — Purchase requests only' },
]

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'employee',
    })

    function handleSubmit(e) {
        e.preventDefault()
        post('/users')
    }

    return (
        <AuthenticatedLayout header="Add User">
            <Head title="Add User" />

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
                .usr-input, .usr-select {
                    background: ${C.surface}; border: 1px solid ${C.outline};
                    border-radius: 10px; padding: 11px 14px; color: ${C.onSurface};
                    font-size: 14px; font-family: inherit; outline: none;
                    transition: border-color 0.15s, box-shadow 0.15s; width: 100%;
                }
                .usr-input:focus, .usr-select:focus {
                    border-color: ${C.primary};
                    box-shadow: 0 0 0 3px ${C.primary}20;
                }
                .usr-input::placeholder { color: ${C.onSurfaceVar}60; }
                .usr-select option { background: ${C.surface}; }
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
                .usr-role-card {
                    display: flex; flex-direction: column; gap: 8px;
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
                .usr-role-radio {
                    width: 16px; height: 16px; border-radius: 50%;
                    border: 2px solid ${C.outline}; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    transition: all 0.15s; background: ${C.surface};
                }
                .usr-role-option:hover .usr-role-radio { border-color: ${C.onSurfaceVar}50; }
                .usr-role-radio.checked {
                    border-color: ${C.primary};
                    background: ${C.primary};
                }
                .usr-role-radio.checked::after {
                    content: ''; width: 6px; height: 6px;
                    border-radius: 50%; background: ${C.onPrimary};
                }
            `}</style>


            <BackButton link={"/users"} text={"Back to Users"} />


            <div className="usr-card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                    <div className="usr-section">Account Details</div>

                    <div className="usr-field">
                        <label className="usr-label">Full Name *</label>
                        <input
                            className="usr-input" type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            placeholder="e.g. Juan dela Cruz"
                        />
                        {errors.name && <span className="usr-error">⚠ {errors.name}</span>}
                    </div>

                    <div className="usr-field">
                        <label className="usr-label">Email Address *</label>
                        <input
                            className="usr-input" type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            placeholder="juan@company.com"
                        />
                        {errors.email && <span className="usr-error">⚠ {errors.email}</span>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div className="usr-field">
                            <label className="usr-label">Password *</label>
                            <input
                                className="usr-input" type="password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                placeholder="Min. 8 characters"
                            />
                            {errors.password && <span className="usr-error">⚠ {errors.password}</span>}
                        </div>
                        <div className="usr-field">
                            <label className="usr-label">Confirm Password *</label>
                            <input
                                className="usr-input" type="password"
                                value={data.password_confirmation}
                                onChange={e => setData('password_confirmation', e.target.value)}
                                placeholder="Repeat password"
                            />
                            {errors.password_confirmation && <span className="usr-error">⚠ {errors.password_confirmation}</span>}
                        </div>
                    </div>

                    <div className="usr-divider" />
                    <div className="usr-section">Role & Permissions</div>

                    <div className="usr-role-card">
                        {ROLES.map(role => (
                            <div
                                key={role.value}
                                className={`usr-role-option ${data.role === role.value ? 'selected' : ''}`}
                                onClick={() => setData('role', role.value)}
                            >
                                <div className={`usr-role-radio ${data.role === role.value ? 'checked' : ''}`} />
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: C.onSurface }}>
                                        {role.label.split(' — ')[0]}
                                    </div>
                                    <div style={{ fontSize: 12, color: C.onSurfaceVar, marginTop: 1 }}>
                                        {role.label.split(' — ')[1]}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {errors.role && <span className="usr-error">⚠ {errors.role}</span>}
                    </div>

                    <div style={{ display: 'flex', gap: 10, paddingTop: 20, borderTop: `1px solid ${C.outline}` }}>
                        <button type="submit" disabled={processing} className="usr-btn-primary">
                            {processing ? 'Creating...' : 'Create User'}
                        </button>
                        <Link href="/users" className="usr-btn-ghost">Cancel</Link>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    )
}