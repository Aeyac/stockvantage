import { Head, Link, useForm } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import BackButton from '@/Components/BackButton'

const C = {
    bg: '#f8fafc', // Slate 50
    surface: '#ffffff', // Pure White
    surfaceLow: '#ffffff', // input background
    surfaceHigh: '#cbd5e1', // Slate 300 (Toggle switch track background when off)
    outline: '#e2e8f0', // Slate 200
    primary: '#00C488', // Premium Dashboard Accent Green
    secondary: '#d97706', // Amber
    tertiary: '#ffb95f',
    onSurface: '#1e293b', // Slate 800 (Dark text)
    onSurfaceVar: '#64748b', // Slate 500 (Muted labels/placeholders)
    onPrimary: '#ffffff', // White text on green button
    error: '#dc2626', // Bright Red 600
}

export default function Edit({ warehouse }) {
    const { data, setData, put, processing, errors } = useForm({
        name: warehouse.name,
        location: warehouse.location ?? '',
        is_active: warehouse.is_active,
        updated_at: warehouse.updated_at,
    })

    console.log(warehouse.updated_at)
    function handleSubmit(e) {
        e.preventDefault()
        put(`/warehouses/${warehouse.id}`)
    }

    return (
        <AuthenticatedLayout header="Edit Warehouse">
            <Head title="Edit Warehouse" />

            <style>{`
                .wh-card {
                    background: ${C.surface}; border: 1px solid ${C.outline};
                    border-radius: 16px; padding: 28px; max-width: 560px;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
                }
                .wh-field { display: flex; flex-direction: column; gap: 6px; }
                .wh-label {
                    font-size: 11px; font-weight: 600; color: ${C.onSurfaceVar};
                    text-transform: uppercase; letter-spacing: 0.08em;
                }
                .wh-input {
                    background: ${C.surfaceLow}; border: 1px solid ${C.outline};
                    border-radius: 10px; padding: 11px 14px; color: ${C.onSurface};
                    font-size: 14px; font-family: inherit; outline: none;
                    transition: border-color 0.15s, box-shadow 0.15s; width: 100%;
                }
                .wh-input:focus {
                    border-color: ${C.primary};
                    box-shadow: 0 0 0 3px ${C.primary}20;
                }
                .wh-input::placeholder { color: #94a3b8; }
                .wh-error { font-size: 12px; color: ${C.error}; margin-top: 3px; font-weight: 500; }
                .wh-btn-primary {
                    display: inline-flex; align-items: center; gap: 7px;
                    background: ${C.primary}; color: ${C.onPrimary};
                    border: none; border-radius: 12px; padding: 11px 22px;
                    font-size: 14px; font-weight: 600; cursor: pointer;
                    text-decoration: none; transition: background 0.15s; font-family: inherit;
                }
                .wh-btn-primary:hover { background: #00a873; }
                .wh-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
                .wh-btn-ghost {
                    display: inline-flex; align-items: center;
                    background: none; color: ${C.onSurfaceVar};
                    border: 1px solid ${C.outline}; border-radius: 12px;
                    padding: 11px 22px; font-size: 14px; font-weight: 500;
                    cursor: pointer; text-decoration: none; transition: all 0.15s; font-family: inherit;
                }
                .wh-btn-ghost:hover { color: ${C.onSurface}; background: #f8fafc; border-color: #cbd5e1; }
                .wh-divider { height: 1px; background: ${C.outline}; margin: 6px 0; }
                .wh-section {
                    font-size: 11px; font-weight: 700; color: ${C.onSurfaceVar};
                    opacity: 0.8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; margin-top: 6px;
                }
                .wh-toggle-row {
                    display: flex; align-items: center; gap: 14px;
                    padding: 14px 16px; background: #f8fafc;
                    border: 1px solid ${C.outline}; border-radius: 12px;
                }
                .wh-toggle {
                    position: relative; width: 40px; height: 22px;
                    background: ${C.surfaceHigh}; border-radius: 20px;
                    cursor: pointer; transition: background 0.2s;
                    flex-shrink: 0; border: none; padding: 0;
                }
                .wh-toggle.on { background: ${C.primary}; }
                .wh-toggle::after {
                    content: ''; position: absolute; top: 3px; left: 3px;
                    width: 16px; height: 16px; background: #fff;
                    border-radius: 50%; transition: transform 0.2s;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.15);
                }
                .wh-toggle.on::after { transform: translateX(18px); }
            `}</style>



            <BackButton link={"/warehouses"} text={"Back to Warehouses"} />



            <div className="wh-card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                    <div className="wh-section">Warehouse Details</div>

                    <div className="wh-field">
                        <label className="wh-label">Warehouse Name *</label>
                        <input
                            className="wh-input" type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                        {errors.name && <span className="wh-error">⚠ {errors.name}</span>}
                    </div>

                    <div className="wh-field">
                        <label className="wh-label">Location</label>
                        <input
                            className="wh-input" type="text"
                            value={data.location}
                            onChange={e => setData('location', e.target.value)}
                            placeholder="e.g. Building A, Floor 2"
                        />
                        {errors.location && <span className="wh-error">⚠ {errors.location}</span>}
                    </div>

                    <div className="wh-divider" />
                    <div className="wh-section">Status</div>

                    <div className="wh-toggle-row">
                        <button
                            type="button"
                            className={`wh-toggle ${data.is_active ? 'on' : ''}`}
                            onClick={() => setData('is_active', !data.is_active)}
                        />
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: data.is_active ? '#0f172a' : C.onSurfaceVar }}>
                                {data.is_active ? 'Active' : 'Inactive'}
                            </div>
                            <div style={{ fontSize: 12, color: C.onSurfaceVar, opacity: 0.8, marginTop: 2 }}>
                                {data.is_active
                                    ? 'Warehouse is active and available for inventory'
                                    : 'Warehouse is hidden from inventory operations'}
                            </div>
                        </div>
                        {errors.is_active && <span className="wh-error">⚠ {errors.is_active}</span>}
                    </div>

                    <div style={{ display: 'flex', gap: 10, paddingTop: 20, borderTop: `1px solid ${C.outline}` }}>
                        <button type="submit" disabled={processing} className="wh-btn-primary">
                            {processing ? 'Saving...' : 'Update Warehouse'}
                        </button>
                        <Link href="/warehouses" className="wh-btn-ghost">Cancel</Link>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    )
}