import { Head, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

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

const STATUS_CONFIG = {
    complete: {
        label: 'Complete', color: C.primary, bg: `${C.primary}12`, border: `${C.primary}25`,
    },
    partially_received: {
        label: 'Partial', color: C.tertiary, bg: `${C.tertiary}12`, border: `${C.tertiary}25`,
    },
    discrepancy: {
        label: 'Discrepancy', color: C.error, bg: `${C.error}12`, border: `${C.error}25`,
    },
}

function StatusBadge({ status }) {
    const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.complete
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontSize: 11, fontWeight: 700, padding: '3px 10px',
            borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.05em',
            background: config.bg, color: config.color, border: `1px solid ${config.border}`,
        }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
            {config.label}
        </span>
    )
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-PH', {
        year: 'numeric', month: 'short', day: 'numeric',
    })
}

export default function Index({ grns }) {
    return (
        <AuthenticatedLayout header="Goods Received Notes">
            <Head title="GRN" />

            <style>{`
                .grn-btn-primary {
                    display: inline-flex; align-items: center; gap: 7px;
                    background: ${C.primary}; color: ${C.onPrimary};
                    border: none; border-radius: 12px; padding: 10px 18px;
                    font-size: 14px; font-weight: 600; cursor: pointer;
                    text-decoration: none; transition: filter 0.15s; font-family: inherit;
                }
                .grn-btn-primary:hover { filter: brightness(1.1); }
                .grn-card {
                    background: ${C.surface}; border: 1px solid ${C.outline};
                    border-radius: 16px; overflow: hidden;
                }
                .grn-table { width: 100%; border-collapse: collapse; }
                .grn-table th {
                    text-align: left; padding: 12px 20px;
                    font-size: 11px; font-weight: 600; color: ${C.onSurfaceVar};
                    text-transform: uppercase; letter-spacing: 0.07em;
                    border-bottom: 1px solid ${C.outline};
                }
                .grn-table td {
                    padding: 15px 20px; color: ${C.onSurfaceVar};
                    border-bottom: 1px solid ${C.outline}15; font-size: 14px;
                }
                .grn-table tbody tr:last-child td { border-bottom: none; }
                .grn-table tbody tr:hover td { background: ${C.surfaceHigh}40; }
                .grn-action {
                    font-size: 13px; font-weight: 500; color: ${C.onSurfaceVar};
                    text-decoration: none; padding: 5px 12px; border-radius: 8px;
                    transition: all 0.15s; border: 1px solid transparent;
                }
                .grn-action:hover {
                    color: ${C.onSurface}; background: ${C.surfaceHigh};
                    border-color: ${C.outline};
                }
                .grn-pg-btn {
                    display: inline-flex; align-items: center; justify-content: center;
                    min-width: 34px; height: 34px; padding: 0 10px; border-radius: 8px;
                    font-size: 13px; color: ${C.onSurfaceVar}; background: ${C.surface};
                    border: 1px solid ${C.outline}; text-decoration: none; transition: all 0.15s;
                }
                .grn-pg-btn:hover { color: ${C.onSurface}; border-color: ${C.onSurfaceVar}50; }
                .grn-pg-btn.active { background: ${C.primary}; color: ${C.onPrimary}; border-color: ${C.primary}; font-weight: 700; }
                .grn-pg-btn.disabled { opacity: 0.3; pointer-events: none; }
                .grn-empty {
                    display: flex; flex-direction: column; align-items: center;
                    justify-content: center; padding: 72px 24px; gap: 14px; color: ${C.onSurfaceVar};
                }
                .grn-po-badge {
                    font-family: 'Courier New', monospace; font-size: 12px; font-weight: 700;
                    color: ${C.primary}; background: ${C.primary}12;
                    border: 1px solid ${C.primary}25; padding: 3px 9px; border-radius: 6px;
                }
                .grn-id-badge {
                    font-family: 'Courier New', monospace; font-size: 12px; font-weight: 700;
                    color: ${C.secondary}; background: ${C.secondary}12;
                    border: 1px solid ${C.secondary}20; padding: 3px 9px; border-radius: 6px;
                }
            `}</style>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <p style={{ fontSize: 14, color: C.onSurfaceVar }}>
                    {grns.total} record{grns.total !== 1 ? 's' : ''}
                </p>
                <Link href="/grn/create" className="grn-btn-primary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Record GRN
                </Link>
            </div>

            <div className="grn-card">
                {grns.data.length === 0 ? (
                    <div className="grn-empty">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.4">
                            <polyline points="9 11 12 14 22 4" />
                            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                        </svg>
                        <p style={{ fontSize: 15, fontWeight: 500, color: C.onSurface }}>No GRN records yet</p>
                        <p style={{ fontSize: 13 }}>Record a goods receipt against an open purchase order</p>
                        <Link href="/grn/create" className="grn-btn-primary" style={{ marginTop: 4 }}>
                            Record first GRN
                        </Link>
                    </div>
                ) : (
                    <table className="grn-table">
                        <thead>
                            <tr>
                                <th>GRN ID</th>
                                <th>Purchase Order</th>
                                <th>Status</th>
                                <th>Notes</th>
                                <th>Date Received</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grns.data.map(grn => (
                                <tr key={grn.id}>
                                    <td>
                                        <span className="grn-id-badge">
                                            GRN-{String(grn.id).padStart(4, '0')}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="grn-po-badge">
                                            {grn.purchase_order?.po_number ?? '—'}
                                        </span>
                                    </td>
                                    <td><StatusBadge status={grn.status} /></td>
                                    <td>
                                        {grn.notes
                                            ? <span style={{ fontSize: 13 }}>{grn.notes.substring(0, 50)}{grn.notes.length > 50 ? '...' : ''}</span>
                                            : <span style={{ opacity: 0.3 }}>—</span>
                                        }
                                    </td>
                                    <td style={{ color: C.onSurfaceVar }}>
                                        {formatDate(grn.created_at)}
                                    </td>
                                    <td>
                                        <Link href={`/grn/${grn.id}`} className="grn-action">
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {grns.last_page > 1 && (
                <div style={{ display: 'flex', gap: 6, marginTop: 20, justifyContent: 'flex-end' }}>
                    {grns.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url ?? '#'}
                            className={`grn-pg-btn ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    )
}