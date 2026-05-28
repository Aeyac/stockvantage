import { Head, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import { ViewActionButton } from '@/Components/ActionButtons'

const C = {
    bg: '#f8fafc', // Slate 50
    surface: '#ffffff', // Pure White
    surfaceLow: '#ffffff',
    surfaceHigh: '#f1f5f9', // Slate 100 (Table hover background)
    outline: '#e2e8f0', // Slate 200
    primary: '#00C488', // Premium Dashboard Accent Green
    secondary: '#d97706', // Amber / Warning
    tertiary: '#ffb95f',
    onSurface: '#1e293b', // Slate 800 (Dark text)
    onSurfaceVar: '#64748b', // Slate 500 (Muted text/labels)
    onPrimary: '#ffffff', // White text on green button
    error: '#dc2626', // Bright Red 600
}

const STATUS_CONFIG = {
    complete: {
        label: 'Complete', color: '#059669', bg: '#ecfdf5', border: '#d1fae5',
    },
    partially_received: {
        label: 'Partial', color: '#d97706', bg: '#fef3c7', border: '#fde68a',
    },
    discrepancy: {
        label: 'Discrepancy', color: '#dc2626', bg: '#fef2f2', border: '#fee2e2',
    },
}

function StatusBadge({ status }) {
    const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.complete
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: '11.5px', fontWeight: 600, padding: '3px 10px',
            borderRadius: 20, background: config.bg, color: config.color,
            border: `1px solid ${config.border}`,
        }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
            {config.label}
        </span>
    )
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-PH', {
        year: 'numeric', month: 'short', day: 'numeric',
    })
}

export default function Index({ grns, flash }) {
    return (
        <AuthenticatedLayout header="Goods Received Notes">
            <Head title="GRN" />

            <style>{`
                /* Primary Dashboard Button styling */
                .grn-btn-primary {
                    display: inline-flex; align-items: center; gap: 7px;
                    background: ${C.primary}; color: ${C.onPrimary};
                    border: none; border-radius: 8px; padding: 9px 16px;
                    font-size: 13px; font-weight: 500; cursor: pointer;
                    text-decoration: none; transition: background 0.15s; font-family: inherit;
                }
                .grn-btn-primary:hover { background: #00a873; }
                
                /* Clean Light Mode Table Container */
                .grn-card {
                    background: ${C.surface}; border: 1px solid ${C.outline};
                    border-radius: 12px; overflow: hidden;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
                }
                .grn-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
                .grn-table thead tr { background: #f8fafc; }
                .grn-table th {
                    text-align: left; padding: 14px 18px;
                    font-size: 11px; font-weight: 600; color: ${C.onSurfaceVar};
                    text-transform: uppercase; letter-spacing: 0.05em;
                    border-bottom: 1px solid ${C.outline};
                }
                .grn-table td {
                    padding: 14px 18px; color: #334155;
                    border-bottom: 1px solid #f1f5f9;
                }
                .grn-table tbody tr:last-child td { border-bottom: none; }
                .grn-table tbody tr:hover td { background: ${C.surfaceHigh}; }
                
                /* Row Action Links */
                .grn-action {
                    font-size: 12.5px; font-weight: 500; color: ${C.onSurfaceVar};
                    text-decoration: none; padding: 5px 10px; border-radius: 6px;
                    transition: all 0.15s; border: 1px solid transparent;
                }
                .grn-action:hover {
                    color: #1e293b; background: #f1f5f9;
                }
                
                /* Light Mode Pagination Elements */
                .grn-pg-btn {
                    display: inline-flex; align-items: center; justify-content: center;
                    min-width: 32px; height: 32px; padding: 0 10px; border-radius: 6px;
                    font-size: 12.5px; color: ${C.onSurfaceVar}; background: ${C.surface};
                    border: 1px solid ${C.outline}; text-decoration: none; transition: all 0.15s;
                }
                .grn-pg-btn:hover { color: #1e293b; border-color: #cbd5e1; background: #f8fafc; }
                .grn-pg-btn.active { background: ${C.primary}; color: ${C.onPrimary}; border-color: ${C.primary}; font-weight: 600; }
                .grn-pg-btn.disabled { opacity: 0.4; pointer-events: none; background: #f1f5f9; }
                
                /* Table Row Badges and Plain Typography */
                .grn-empty {
                    display: flex; flex-direction: column; align-items: center;
                    justify-content: center; padding: 64px 24px; gap: 12px; color: ${C.onSurfaceVar};
                }
                .grn-po-badge {
                    font-family: 'Courier New', monospace; font-size: 11px; font-weight: 700;
                    color: #1e3a8a; background: #eff6ff;
                    border: 1px solid #bfdbfe; padding: 2px 7px; border-radius: 6px;
                }
                .grn-id-badge {
                    font-family: 'Courier New', monospace; font-size: 13px; font-weight: 500;
                    color: #334155; letter-spacing: 0.02em;
                }
            `}</style>

            <FlashMessage flash={flash} />

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <p style={{ fontSize: 13, color: C.onSurfaceVar, fontWeight: 500 }}>
                    {grns.total} record{grns.total !== 1 ? 's' : ''} registered
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
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                            <polyline points="9 11 12 14 22 4" />
                            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                        </svg>
                        <p style={{ fontSize: 14, fontWeight: 500, color: '#475569' }}>No GRN records yet</p>
                        <p style={{ fontSize: 13, color: C.onSurfaceVar, marginTop: -4 }}>Record a goods receipt against an open purchase order</p>
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
                                            ? <span style={{ fontSize: 13, color: '#334155' }}>{grn.notes.substring(0, 50)}{grn.notes.length > 50 ? '...' : ''}</span>
                                            : <span style={{ opacity: 0.4 }}>—</span>
                                        }
                                    </td>
                                    <td style={{ color: C.onSurfaceVar }}>
                                        {formatDate(grn.created_at)}
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            <ViewActionButton href={`/grn/${grn.id}`} />
                                        </div>
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