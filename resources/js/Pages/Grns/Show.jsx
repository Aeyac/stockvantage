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
        label: 'Partially Received', color: C.tertiary, bg: `${C.tertiary}12`, border: `${C.tertiary}25`,
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
            fontSize: 12, fontWeight: 700, padding: '4px 12px',
            borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.05em',
            background: config.bg, color: config.color, border: `1px solid ${config.border}`,
        }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
            {config.label}
        </span>
    )
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-PH', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
    })
}

export default function Show({ grn }) {
    const po = grn.purchase_order
    const pr = po?.purchase_request

    const hasDiscrepancy = grn.line_items?.some(
        li => li.quantity_received < li.quantity_ordered
    )

    return (
        <AuthenticatedLayout header={`GRN-${String(grn.id).padStart(4, '0')}`}>
            <Head title={`GRN-${String(grn.id).padStart(4, '0')}`} />

            <style>{`
                .grn-card {
                    background: ${C.surface}; border: 1px solid ${C.outline};
                    border-radius: 16px; overflow: hidden;
                }
                .grn-card-pad { padding: 24px 28px; }
                .grn-meta-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
                    gap: 20px;
                }
                .grn-meta-item { display: flex; flex-direction: column; gap: 5px; }
                .grn-meta-label {
                    font-size: 11px; font-weight: 600; color: ${C.onSurfaceVar}60;
                    text-transform: uppercase; letter-spacing: 0.08em;
                }
                .grn-meta-value { font-size: 14px; font-weight: 500; color: ${C.onSurface}; }
                .grn-table { width: 100%; border-collapse: collapse; }
                .grn-table th {
                    text-align: left; padding: 12px 20px;
                    font-size: 11px; font-weight: 600; color: ${C.onSurfaceVar};
                    text-transform: uppercase; letter-spacing: 0.07em;
                    border-bottom: 1px solid ${C.outline};
                    background: ${C.surfaceLow};
                }
                .grn-table td {
                    padding: 14px 20px; color: ${C.onSurfaceVar};
                    border-bottom: 1px solid ${C.outline}15; font-size: 14px;
                    vertical-align: middle;
                }
                .grn-table tbody tr:last-child td { border-bottom: none; }
                .grn-table tbody tr:hover td { background: ${C.surfaceHigh}40; }
                .grn-section-title {
                    font-size: 11px; font-weight: 700; color: ${C.onSurfaceVar}60;
                    text-transform: uppercase; letter-spacing: 0.1em;
                }
                .grn-btn-back {
                    display: inline-flex; align-items: center; gap: 6px;
                    background: none; color: ${C.onSurfaceVar};
                    border: 1px solid ${C.outline}; border-radius: 12px;
                    padding: 9px 16px; font-size: 13px; font-weight: 500;
                    cursor: pointer; text-decoration: none; transition: all 0.15s;
                }
                .grn-btn-back:hover { color: ${C.onSurface}; border-color: ${C.onSurfaceVar}50; }
                .grn-sku {
                    font-family: 'Courier New', monospace; font-size: 11px; font-weight: 700;
                    color: ${C.tertiary}; background: ${C.tertiary}12;
                    border: 1px solid ${C.tertiary}25; padding: 2px 7px; border-radius: 5px;
                }
                .grn-qty-ok { color: ${C.primary}; font-weight: 700; }
                .grn-qty-short {
                    color: ${C.tertiary}; font-weight: 700;
                    display: inline-flex; align-items: center; gap: 4px;
                }
                .grn-discrepancy-note {
                    font-size: 11px; color: ${C.tertiary}; margin-top: 3px;
                    display: flex; align-items: center; gap: 4px;
                }

                @media (max-width: 600px) {
                    .grn-card-pad { padding: 18px 16px; }
                    .grn-meta-grid { grid-template-columns: 1fr 1fr; }
                }
            `}</style>

            {/* Back */}
            <Link href="/grn" className="grn-btn-back" style={{ marginBottom: 24, display: 'inline-flex' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
                Back to GRN
            </Link>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 860 }}>

                {/* Header card */}
                <div className="grn-card">
                    <div className="grn-card-pad">
                        <div style={{
                            display: 'flex', justifyContent: 'space-between',
                            alignItems: 'flex-start', marginBottom: 24,
                            flexWrap: 'wrap', gap: 12,
                        }}>
                            <div>
                                <div style={{
                                    fontFamily: "'Courier New', monospace",
                                    fontSize: 13, fontWeight: 700,
                                    color: C.secondary, marginBottom: 6,
                                }}>
                                    GRN-{String(grn.id).padStart(4, '0')}
                                </div>
                                <div style={{ fontSize: 14, color: C.onSurfaceVar }}>
                                    Goods received against{' '}
                                    <Link
                                        href={`/purchase-orders/${po?.id}`}
                                        style={{
                                            fontFamily: 'Courier New, monospace',
                                            color: C.primary, textDecoration: 'none',
                                            fontWeight: 700,
                                        }}
                                    >
                                        {po?.po_number}
                                    </Link>
                                </div>
                            </div>
                            <StatusBadge status={grn.status} />
                        </div>

                        {/* Meta */}
                        <div className="grn-meta-grid">
                            <div className="grn-meta-item">
                                <span className="grn-meta-label">Received By</span>
                                <span className="grn-meta-value">
                                    {pr?.requester?.name ?? '—'}
                                </span>
                            </div>
                            <div className="grn-meta-item">
                                <span className="grn-meta-label">Linked PO</span>
                                <Link
                                    href={`/purchase-orders/${po?.id}`}
                                    style={{
                                        fontFamily: "'Courier New', monospace",
                                        fontSize: 13, fontWeight: 700,
                                        color: C.primary,
                                        background: `${C.primary}12`,
                                        border: `1px solid ${C.primary}25`,
                                        padding: '3px 9px', borderRadius: 6,
                                        textDecoration: 'none', display: 'inline-block',
                                    }}
                                >
                                    {po?.po_number}
                                </Link>
                            </div>
                            <div className="grn-meta-item">
                                <span className="grn-meta-label">Date Received</span>
                                <span className="grn-meta-value">{formatDate(grn.created_at)}</span>
                            </div>
                            <div className="grn-meta-item">
                                <span className="grn-meta-label">PO Status After</span>
                                <span className="grn-meta-value" style={{ textTransform: 'capitalize' }}>
                                    {po?.status?.replace(/_/g, ' ') ?? '—'}
                                </span>
                            </div>
                        </div>

                        {/* Notes */}
                        {grn.notes && (
                            <div style={{
                                marginTop: 20, padding: '14px 16px',
                                background: C.surfaceLow, borderRadius: 10,
                                border: `1px solid ${C.outline}`,
                            }}>
                                <div className="grn-section-title" style={{ marginBottom: 8 }}>Notes</div>
                                <p style={{ fontSize: 14, color: C.onSurfaceVar, lineHeight: 1.6 }}>
                                    {grn.notes}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Discrepancy alert */}
                {hasDiscrepancy && (
                    <div style={{
                        display: 'flex', alignItems: 'flex-start', gap: 12,
                        padding: '16px 20px',
                        background: `${C.tertiary}10`,
                        border: `1px solid ${C.tertiary}25`,
                        borderRadius: 12,
                    }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.tertiary} strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
                            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: C.tertiary }}>
                                Discrepancy Detected
                            </div>
                            <div style={{ fontSize: 12, color: C.onSurfaceVar, marginTop: 3 }}>
                                One or more items were received short of the ordered quantity. The purchase order has been marked as partially received.
                            </div>
                        </div>
                    </div>
                )}

                {/* Line items */}
                <div className="grn-card">
                    <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.outline}` }}>
                        <span className="grn-section-title">Received Line Items</span>
                    </div>
                    <table className="grn-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>SKU</th>
                                <th style={{ textAlign: 'center' }}>Qty Ordered</th>
                                <th style={{ textAlign: 'center' }}>Qty Received</th>
                                <th>Discrepancy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grn.line_items?.map((line, i) => {
                                const isShort = line.quantity_received < line.quantity_ordered
                                return (
                                    <tr key={i}>
                                        <td>
                                            <span style={{ fontWeight: 500, color: C.onSurface }}>
                                                {line.catalog_item?.name ?? '—'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="grn-sku">
                                                {line.catalog_item?.sku ?? '—'}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'center', fontWeight: 600, color: C.onSurface }}>
                                            {line.quantity_ordered}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {isShort ? (
                                                <span className="grn-qty-short">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                                    </svg>
                                                    {line.quantity_received}
                                                </span>
                                            ) : (
                                                <span className="grn-qty-ok">
                                                    {line.quantity_received}
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            {line.discrepancy_note ? (
                                                <div className="grn-discrepancy-note">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <circle cx="12" cy="12" r="10" />
                                                        <line x1="12" y1="8" x2="12" y2="12" />
                                                        <line x1="12" y1="16" x2="12.01" y2="16" />
                                                    </svg>
                                                    {line.discrepancy_note}
                                                </div>
                                            ) : (
                                                <span style={{ color: C.primary, fontSize: 13, fontWeight: 500 }}>
                                                    ✓ Full
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </AuthenticatedLayout>
    )
}