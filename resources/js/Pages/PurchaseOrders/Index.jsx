import { Head, Link } from '@inertiajs/react'
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

const STATUS_CONFIG = {
    open: {
        label: 'Open',
        color: '#60a5fa',
        bg: '#60a5fa12',
        border: '#60a5fa25',
    },
    partially_received: {
        label: 'Partial',
        color: C.tertiary,
        bg: '#ffb95f12',
        border: '#ffb95f25',
    },
    fully_received: {
        label: 'Fully Received',
        color: C.primary,
        bg: '#4edea312',
        border: '#4edea325',
    },
    cancelled: {
        label: 'Cancelled',
        color: C.error,
        bg: '#ffb4ab12',
        border: '#ffb4ab25',
    },
}

function StatusBadge({ status }) {
    const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.open
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontSize: 11, fontWeight: 700, padding: '3px 10px',
            borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.05em',
            background: config.bg, color: config.color, border: `1px solid ${config.border}`,
        }}>
            <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: 'currentColor', display: 'inline-block',
            }} />
            {config.label}
        </span>
    )
}

function formatCurrency(value) {
    return '₱' + parseFloat(value).toLocaleString('en-PH', {
        minimumFractionDigits: 2, maximumFractionDigits: 2,
    })
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-PH', {
        year: 'numeric', month: 'short', day: 'numeric',
    })
}

function formatPrId(id) {
    return 'PR-' + String(id).padStart(4, '0')
}

export default function Index({ purchaseOrders, flash }) {
    return (
        <AuthenticatedLayout header="Purchase Orders">
            <Head title="Purchase Orders" />

            <style>{`
                .po-card {
                    background: ${C.surface}; border: 1px solid ${C.outline};
                    border-radius: 16px; overflow: hidden;
                }
                .po-table { width: 100%; border-collapse: collapse; }
                .po-table th {
                    text-align: left; padding: 12px 20px;
                    font-size: 11px; font-weight: 600; color: ${C.onSurfaceVar};
                    text-transform: uppercase; letter-spacing: 0.07em;
                    border-bottom: 1px solid ${C.outline};
                }
                .po-table td {
                    padding: 15px 20px; color: ${C.onSurfaceVar};
                    border-bottom: 1px solid ${C.outline}15; font-size: 14px;
                }
                .po-table tbody tr:last-child td { border-bottom: none; }
                .po-table tbody tr { transition: background 0.1s; }
                .po-table tbody tr:hover td { background: ${C.surfaceHigh}40; }
                .po-action {
                    font-size: 13px; font-weight: 500; color: ${C.onSurfaceVar};
                    text-decoration: none; padding: 5px 12px; border-radius: 8px;
                    transition: all 0.15s; border: 1px solid transparent;
                }
                .po-action:hover {
                    color: ${C.onSurface}; background: ${C.surfaceHigh};
                    border-color: ${C.outline};
                }
                .po-pg-btn {
                    display: inline-flex; align-items: center; justify-content: center;
                    min-width: 34px; height: 34px; padding: 0 10px; border-radius: 8px;
                    font-size: 13px; color: ${C.onSurfaceVar}; background: ${C.surface};
                    border: 1px solid ${C.outline}; text-decoration: none; transition: all 0.15s;
                }
                .po-pg-btn:hover { color: ${C.onSurface}; border-color: ${C.onSurfaceVar}50; }
                .po-pg-btn.active {
                    background: ${C.primary}; color: ${C.onPrimary};
                    border-color: ${C.primary}; font-weight: 700;
                }
                .po-pg-btn.disabled { opacity: 0.3; pointer-events: none; }
                .po-empty {
                    display: flex; flex-direction: column; align-items: center;
                    justify-content: center; padding: 72px 24px; gap: 14px;
                    color: ${C.onSurfaceVar};
                }
                .po-number {
                    font-family: 'Courier New', monospace; font-size: 12px;
                    font-weight: 700; color: ${C.primary};
                    background: ${C.primary}12; border: 1px solid ${C.primary}25;
                    padding: 3px 9px; border-radius: 6px; letter-spacing: 0.03em;
                }
                .po-pr-link {
                    font-family: 'Courier New', monospace; font-size: 11px;
                    font-weight: 700; color: ${C.secondary};
                    background: ${C.secondary}12; border: 1px solid ${C.secondary}20;
                    padding: 2px 8px; border-radius: 5px; text-decoration: none;
                    transition: all 0.15s;
                }
                .po-pr-link:hover { background: ${C.secondary}20; }
            `}</style>

            <FlashMessage flash={flash} />
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <p style={{ fontSize: 14, color: C.onSurfaceVar }}>
                    {purchaseOrders.total} order{purchaseOrders.total !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Table */}
            <div className="po-card">
                {purchaseOrders.data.length === 0 ? (
                    <div className="po-empty">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.4">
                            <rect x="2" y="3" width="20" height="14" rx="2" />
                            <path d="M8 21h8M12 17v4" />
                        </svg>
                        <p style={{ fontSize: 15, fontWeight: 500, color: C.onSurface }}>
                            No purchase orders yet
                        </p>
                        <p style={{ fontSize: 13 }}>
                            POs are generated automatically when a purchase request is approved
                        </p>
                    </div>
                ) : (
                    <table className="po-table">
                        <thead>
                            <tr>
                                <th>PO Number</th>
                                <th>Linked PR</th>
                                <th>Requested By</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Date Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchaseOrders.data.map(po => (
                                <tr key={po.id}>
                                    <td>
                                        <span className="po-number">{po.po_number}</span>
                                    </td>
                                    <td>
                                        <Link
                                            href={`/purchase-requests/${po.purchase_request?.id}`}
                                            className="po-pr-link"
                                        >
                                            {formatPrId(po.purchase_request?.id)}
                                        </Link>
                                    </td>
                                    <td>
                                        <span style={{ fontWeight: 500, color: C.onSurface }}>
                                            {po.purchase_request?.requester?.name ?? '—'}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{ fontWeight: 600, color: C.onSurface }}>
                                            {formatCurrency(po.total_amount)}
                                        </span>
                                    </td>
                                    <td><StatusBadge status={po.status} /></td>
                                    <td style={{ color: C.onSurfaceVar }}>
                                        {formatDate(po.created_at)}
                                    </td>
                                    <td>
                                        <Link
                                            href={`/purchase-orders/${po.id}`}
                                            className="po-action"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            {purchaseOrders.last_page > 1 && (
                <div style={{ display: 'flex', gap: 6, marginTop: 20, justifyContent: 'flex-end' }}>
                    {purchaseOrders.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url ?? '#'}
                            className={`po-pg-btn ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    )
}