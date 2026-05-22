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
    open: {
        label: 'Open', color: '#60a5fa', bg: '#60a5fa12', border: '#60a5fa25',
    },
    partially_received: {
        label: 'Partially Received', color: C.tertiary, bg: '#ffb95f12', border: '#ffb95f25',
    },
    fully_received: {
        label: 'Fully Received', color: C.primary, bg: '#4edea312', border: '#4edea325',
    },
    cancelled: {
        label: 'Cancelled', color: C.error, bg: '#ffb4ab12', border: '#ffb4ab25',
    },
}

function StatusBadge({ status }) {
    const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.open
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontSize: 12, fontWeight: 700, padding: '4px 12px',
            borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.05em',
            background: config.bg, color: config.color, border: `1px solid ${config.border}`,
        }}>
            <span style={{
                width: 6, height: 6, borderRadius: '50%',
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
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
    })
}

function formatPrId(id) {
    return 'PR-' + String(id).padStart(4, '0')
}

export default function Show({ purchaseOrder }) {
    const pr = purchaseOrder.purchase_request

    return (
        <AuthenticatedLayout header={purchaseOrder.po_number}>
            <Head title={purchaseOrder.po_number} />

            <style>{`
                .po-card {
                    background: ${C.surface}; border: 1px solid ${C.outline};
                    border-radius: 16px; overflow: hidden;
                }
                .po-card-pad { padding: 24px 28px; }
                .po-meta-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
                    gap: 20px;
                }
                .po-meta-item { display: flex; flex-direction: column; gap: 5px; }
                .po-meta-label {
                    font-size: 11px; font-weight: 600;
                    color: ${C.onSurfaceVar}60;
                    text-transform: uppercase; letter-spacing: 0.08em;
                }
                .po-meta-value {
                    font-size: 14px; font-weight: 500; color: ${C.onSurface};
                }
                .po-table { width: 100%; border-collapse: collapse; }
                .po-table th {
                    text-align: left; padding: 12px 20px;
                    font-size: 11px; font-weight: 600; color: ${C.onSurfaceVar};
                    text-transform: uppercase; letter-spacing: 0.07em;
                    border-bottom: 1px solid ${C.outline};
                    background: ${C.surfaceLow};
                }
                .po-table td {
                    padding: 14px 20px; color: ${C.onSurfaceVar};
                    border-bottom: 1px solid ${C.outline}15; font-size: 14px;
                }
                .po-table tbody tr:last-child td { border-bottom: none; }
                .po-table tbody tr:hover td { background: ${C.surfaceHigh}40; }
                .po-table tfoot td {
                    padding: 16px 20px; border-top: 1px solid ${C.outline};
                    background: ${C.surfaceLow};
                }
                .po-section-title {
                    font-size: 11px; font-weight: 700;
                    color: ${C.onSurfaceVar}60;
                    text-transform: uppercase; letter-spacing: 0.1em;
                }
                .po-btn-back {
                    display: inline-flex; align-items: center; gap: 6px;
                    background: none; color: ${C.onSurfaceVar};
                    border: 1px solid ${C.outline}; border-radius: 12px;
                    padding: 9px 16px; font-size: 13px; font-weight: 500;
                    cursor: pointer; text-decoration: none; transition: all 0.15s;
                }
                .po-btn-back:hover { color: ${C.onSurface}; border-color: ${C.onSurfaceVar}50; }
                .po-info-row {
                    display: flex; align-items: center; gap: 10px;
                    padding: 14px 16px; background: ${C.surfaceLow};
                    border: 1px solid ${C.outline}; border-radius: 12px;
                }

                @media (max-width: 600px) {
                    .po-card-pad { padding: 18px 16px; }
                    .po-meta-grid { grid-template-columns: 1fr 1fr; }
                }
            `}</style>

            {/* Back */}
            <Link href="/purchase-orders" className="po-btn-back" style={{ marginBottom: 24, display: 'inline-flex' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
                Back to Purchase Orders
            </Link>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 860 }}>

                {/* Header card */}
                <div className="po-card">
                    <div className="po-card-pad">
                        <div style={{
                            display: 'flex', justifyContent: 'space-between',
                            alignItems: 'flex-start', marginBottom: 24,
                            flexWrap: 'wrap', gap: 12,
                        }}>
                            <div>
                                <div style={{
                                    fontFamily: "'Courier New', monospace",
                                    fontSize: 13, fontWeight: 700,
                                    color: C.primary, marginBottom: 6,
                                    letterSpacing: '0.03em',
                                }}>
                                    {purchaseOrder.po_number}
                                </div>
                                <div style={{ fontSize: 22, fontWeight: 700, color: C.onSurface }}>
                                    {formatCurrency(purchaseOrder.total_amount)}
                                </div>
                            </div>
                            <StatusBadge status={purchaseOrder.status} />
                        </div>

                        {/* Meta */}
                        <div className="po-meta-grid">
                            <div className="po-meta-item">
                                <span className="po-meta-label">Requested By</span>
                                <span className="po-meta-value">
                                    {pr?.requester?.name ?? '—'}
                                </span>
                            </div>
                            <div className="po-meta-item">
                                <span className="po-meta-label">Linked PR</span>
                                <Link
                                    href={`/purchase-requests/${pr?.id}`}
                                    style={{
                                        fontFamily: "'Courier New', monospace",
                                        fontSize: 13, fontWeight: 700,
                                        color: C.secondary,
                                        background: `${C.secondary}12`,
                                        border: `1px solid ${C.secondary}20`,
                                        padding: '3px 9px', borderRadius: 6,
                                        textDecoration: 'none', display: 'inline-block',
                                        transition: 'background 0.15s',
                                    }}
                                >
                                    {formatPrId(pr?.id)}
                                </Link>
                            </div>
                            <div className="po-meta-item">
                                <span className="po-meta-label">Date Created</span>
                                <span className="po-meta-value">
                                    {formatDate(purchaseOrder.created_at)}
                                </span>
                            </div>
                            <div className="po-meta-item">
                                <span className="po-meta-label">PR Status</span>
                                <span className="po-meta-value" style={{ textTransform: 'capitalize' }}>
                                    {pr?.status?.replace(/_/g, ' ') ?? '—'}
                                </span>
                            </div>
                        </div>

                        {/* Justification */}
                        {pr?.justification && (
                            <div style={{
                                marginTop: 20, padding: '14px 16px',
                                background: C.surfaceLow, borderRadius: 10,
                                border: `1px solid ${C.outline}`,
                            }}>
                                <div className="po-section-title" style={{ marginBottom: 8 }}>
                                    Justification
                                </div>
                                <p style={{ fontSize: 14, color: C.onSurfaceVar, lineHeight: 1.6 }}>
                                    {pr.justification}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Line items */}
                <div className="po-card">
                    <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.outline}` }}>
                        <span className="po-section-title">Line Items</span>
                    </div>
                    <table className="po-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>SKU</th>
                                <th style={{ textAlign: 'right' }}>Unit Cost</th>
                                <th style={{ textAlign: 'right' }}>Qty</th>
                                <th style={{ textAlign: 'right' }}>Line Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pr?.line_items?.map((line, i) => (
                                <tr key={i}>
                                    <td>
                                        <span style={{ fontWeight: 500, color: C.onSurface }}>
                                            {line.catalog_item?.name ?? '—'}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{
                                            fontFamily: 'Courier New, monospace',
                                            fontSize: 11, fontWeight: 700,
                                            color: C.tertiary,
                                            background: `${C.tertiary}12`,
                                            border: `1px solid ${C.tertiary}25`,
                                            padding: '2px 7px', borderRadius: 5,
                                        }}>
                                            {line.catalog_item?.sku ?? '—'}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        {formatCurrency(line.unit_cost)}
                                    </td>
                                    <td style={{
                                        textAlign: 'right',
                                        fontWeight: 600, color: C.onSurface,
                                    }}>
                                        {line.quantity}
                                    </td>
                                    <td style={{
                                        textAlign: 'right',
                                        fontWeight: 600, color: C.onSurface,
                                    }}>
                                        {formatCurrency(line.line_total)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4} style={{
                                    fontWeight: 600, color: C.onSurfaceVar,
                                    fontSize: 12, textTransform: 'uppercase',
                                    letterSpacing: '0.06em',
                                }}>
                                    Total
                                </td>
                                <td style={{
                                    textAlign: 'right',
                                    fontWeight: 700, fontSize: 16, color: C.onSurface,
                                }}>
                                    {formatCurrency(purchaseOrder.total_amount)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Info note */}
                <div className="po-info-row">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.onSurfaceVar} strokeWidth="2" style={{ flexShrink: 0, opacity: 0.5 }}>
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <p style={{ fontSize: 13, color: C.onSurfaceVar, opacity: 0.7 }}>
                        PO status is updated automatically when a Goods Received Note (GRN) is submitted against this order.
                    </p>
                </div>

            </div>
        </AuthenticatedLayout>
    )
}