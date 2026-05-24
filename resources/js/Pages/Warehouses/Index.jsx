import { Head, Link, router } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'

const C = {
    bg: '#0D0E11',
    surface: '#16171B',
    surfaceLow: '#1b1b1f',
    surfaceHigh: '#292a2d',
    outline: '#23252B',
    primary: '#4edea3',
    secondary: '#d0bcff',
    tertiary: '#ffb95f',
    onSurface: '#e3e2e6',
    onSurfaceVar: '#bbcabf',
    onPrimary: '#003824',
    error: '#ffb4ab',
}

export default function Index({ warehouses, flash }) {
    function handleDelete(id) {
        if (confirm('Are you sure you want to delete this warehouse?')) {
            router.delete(`/warehouses/${id}`)
        }
    }

    return (
        <AuthenticatedLayout header="Warehouses">
            <Head title="Warehouses" />

            <style>{`
                .wh-btn-primary {
                    display: inline-flex; align-items: center; gap: 7px;
                    background: ${C.primary}; color: ${C.onPrimary};
                    border: none; border-radius: 12px; padding: 10px 18px;
                    font-size: 14px; font-weight: 600; cursor: pointer;
                    text-decoration: none; transition: filter 0.15s; font-family: inherit;
                }
                .wh-btn-primary:hover { filter: brightness(1.1); }
                .wh-card {
                    background: ${C.surface}; border: 1px solid ${C.outline};
                    border-radius: 16px; overflow: hidden;
                }
                .wh-table { width: 100%; border-collapse: collapse; }
                .wh-table th {
                    text-align: left; padding: 12px 20px;
                    font-size: 11px; font-weight: 600; color: ${C.onSurfaceVar};
                    text-transform: uppercase; letter-spacing: 0.07em;
                    border-bottom: 1px solid ${C.outline};
                }
                .wh-table td {
                    padding: 15px 20px; color: ${C.onSurfaceVar};
                    border-bottom: 1px solid ${C.outline}15; font-size: 14px;
                }
                .wh-table tbody tr:last-child td { border-bottom: none; }
                .wh-table tbody tr:hover td { background: ${C.surfaceHigh}40; }
                .wh-status-active {
                    display: inline-flex; align-items: center; gap: 5px;
                    font-size: 11px; font-weight: 700; padding: 3px 10px;
                    border-radius: 20px; text-transform: uppercase; letter-spacing: 0.04em;
                    background: ${C.primary}15; color: ${C.primary};
                    border: 1px solid ${C.primary}25;
                }
                .wh-status-inactive {
                    display: inline-flex; align-items: center; gap: 5px;
                    font-size: 11px; font-weight: 700; padding: 3px 10px;
                    border-radius: 20px; text-transform: uppercase; letter-spacing: 0.04em;
                    background: ${C.error}15; color: ${C.error};
                    border: 1px solid ${C.error}25;
                }
                .wh-action {
                    font-size: 13px; font-weight: 500; color: ${C.onSurfaceVar};
                    text-decoration: none; padding: 5px 12px; border-radius: 8px;
                    transition: all 0.15s; border: 1px solid transparent;
                }
                .wh-action:hover {
                    color: ${C.onSurface}; background: ${C.surfaceHigh};
                    border-color: ${C.outline};
                }
                .wh-action.del:hover {
                    color: ${C.error}; background: ${C.error}10;
                    border-color: ${C.error}25;
                }
                .wh-pg-btn {
                    display: inline-flex; align-items: center; justify-content: center;
                    min-width: 34px; height: 34px; padding: 0 10px; border-radius: 8px;
                    font-size: 13px; color: ${C.onSurfaceVar}; background: ${C.surface};
                    border: 1px solid ${C.outline}; text-decoration: none; transition: all 0.15s;
                }
                .wh-pg-btn:hover { color: ${C.onSurface}; border-color: ${C.onSurfaceVar}50; }
                .wh-pg-btn.active { background: ${C.primary}; color: ${C.onPrimary}; border-color: ${C.primary}; font-weight: 700; }
                .wh-pg-btn.disabled { opacity: 0.3; pointer-events: none; }
                .wh-empty {
                    display: flex; flex-direction: column; align-items: center;
                    justify-content: center; padding: 72px 24px; gap: 14px; color: ${C.onSurfaceVar};
                }
            `}</style>

            <FlashMessage flash={flash} />

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <p style={{ fontSize: 14, color: C.onSurfaceVar }}>
                    {warehouses.total} warehouse{warehouses.total !== 1 ? 's' : ''}
                </p>
                <Link href="/warehouses/create" className="wh-btn-primary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add Warehouse
                </Link>
            </div>

            <div className="wh-card">
                {warehouses.data.length === 0 ? (
                    <div className="wh-empty">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.4">
                            <path d="M1 22V9.5L12 2l11 7.5V22" /><path d="M9 22V12h6v10" />
                        </svg>
                        <p style={{ fontSize: 15, fontWeight: 500, color: C.onSurface }}>No warehouses yet</p>
                        <Link href="/warehouses/create" className="wh-btn-primary" style={{ marginTop: 4 }}>
                            Add first warehouse
                        </Link>
                    </div>
                ) : (
                    <table className="wh-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {warehouses.data.map(warehouse => (
                                <tr key={warehouse.id}>
                                    <td>
                                        <span style={{ fontWeight: 600, color: C.onSurface }}>
                                            {warehouse.name}
                                        </span>
                                    </td>
                                    <td>
                                        {warehouse.location
                                            ? warehouse.location
                                            : <span style={{ opacity: 0.3 }}>—</span>
                                        }
                                    </td>
                                    <td>
                                        {warehouse.is_active
                                            ? <span className="wh-status-active"><span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />Active</span>
                                            : <span className="wh-status-inactive"><span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />Inactive</span>
                                        }
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            <Link href={`/warehouses/${warehouse.id}/edit`} className="wh-action">Edit</Link>
                                            <button
                                                onClick={() => handleDelete(warehouse.id)}
                                                className="wh-action del"
                                                style={{ background: 'none', border: '1px solid transparent', cursor: 'pointer', fontFamily: 'inherit' }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {warehouses.last_page > 1 && (
                <div style={{ display: 'flex', gap: 6, marginTop: 20, justifyContent: 'flex-end' }}>
                    {warehouses.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url ?? '#'}
                            className={`wh-pg-btn ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    )
}