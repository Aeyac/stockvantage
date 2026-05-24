import { Head, Link, useForm } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

const C = {
    bg:          '#0D0E11',
    surface:     '#16171B',
    surfaceLow:  '#1b1b1f',
    surfaceHigh: '#292a2d',
    outline:     '#23252B',
    primary:     '#4edea3',
    secondary:   '#d0bcff',
    tertiary:    '#ffb95f',
    onSurface:   '#e3e2e6',
    onSurfaceVar:'#bbcabf',
    onPrimary:   '#003824',
    error:       '#ffb4ab',
}

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        location: '',
    })

    function handleSubmit(e) {
        e.preventDefault()
        post('/warehouses')
    }

    return (
        <AuthenticatedLayout header="Add Warehouse">
            <Head title="Add Warehouse" />

            <style>{`
                .wh-card {
                    background: ${C.surface}; border: 1px solid ${C.outline};
                    border-radius: 16px; padding: 28px; max-width: 560px;
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
                    border-color: ${C.primary}70;
                    box-shadow: 0 0 0 3px ${C.primary}10;
                }
                .wh-input::placeholder { color: ${C.onSurfaceVar}40; }
                .wh-error { font-size: 12px; color: ${C.error}; margin-top: 3px; }
                .wh-btn-primary {
                    display: inline-flex; align-items: center; gap: 7px;
                    background: ${C.primary}; color: ${C.onPrimary};
                    border: none; border-radius: 12px; padding: 11px 22px;
                    font-size: 14px; font-weight: 600; cursor: pointer;
                    text-decoration: none; transition: filter 0.15s; font-family: inherit;
                }
                .wh-btn-primary:hover { filter: brightness(1.08); }
                .wh-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
                .wh-btn-ghost {
                    display: inline-flex; align-items: center;
                    background: none; color: ${C.onSurfaceVar};
                    border: 1px solid ${C.outline}; border-radius: 12px;
                    padding: 11px 22px; font-size: 14px; font-weight: 500;
                    cursor: pointer; text-decoration: none; transition: all 0.15s; font-family: inherit;
                }
                .wh-btn-ghost:hover { color: ${C.onSurface}; border-color: ${C.onSurfaceVar}50; }
                .wh-section {
                    font-size: 11px; font-weight: 700; color: ${C.onSurfaceVar}60;
                    text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; margin-top: 6px;
                }
            `}</style>

            <Link href="/warehouses" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13,
                color: C.onSurfaceVar, textDecoration: 'none', marginBottom: 24, transition: 'color 0.15s',
            }}
                onMouseEnter={e => e.currentTarget.style.color = C.onSurface}
                onMouseLeave={e => e.currentTarget.style.color = C.onSurfaceVar}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                </svg>
                Back to Warehouses
            </Link>

            <div className="wh-card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                    <div className="wh-section">Warehouse Details</div>

                    <div className="wh-field">
                        <label className="wh-label">Warehouse Name *</label>
                        <input
                            className="wh-input" type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            placeholder="e.g. Main Warehouse"
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

                    <div style={{ display: 'flex', gap: 10, paddingTop: 20, borderTop: `1px solid ${C.outline}` }}>
                        <button type="submit" disabled={processing} className="wh-btn-primary">
                            {processing ? 'Saving...' : 'Save Warehouse'}
                        </button>
                        <Link href="/warehouses" className="wh-btn-ghost">Cancel</Link>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    )
}