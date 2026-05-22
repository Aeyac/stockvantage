import { Head, Link, router, usePage } from '@inertiajs/react'
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

const STATUS_CONFIG = {
    pending: {
        label: 'Pending', color: C.onSurfaceVar, bg: '#23252B', border: '#343538',
    },
    awaiting_approval: {
        label: 'Awaiting Approval', color: C.tertiary, bg: '#ffb95f12', border: '#ffb95f25',
    },
    auto_approved: {
        label: 'Auto Approved', color: C.primary, bg: '#4edea312', border: '#4edea325',
    },
    approved: {
        label: 'Approved', color: C.primary, bg: '#4edea312', border: '#4edea325',
    },
    rejected: {
        label: 'Rejected', color: C.error, bg: '#ffb4ab12', border: '#ffb4ab25',
    },
}

function StatusBadge({ status }) {
    const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending
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

export default function Show({ purchaseRequest }) {
    const { auth } = usePage().props
    const user = auth.user

    const canActOnRequest =
        purchaseRequest.status === 'awaiting_approval' &&
        (user.role === 'tenant_admin' || user.role === 'department_manager')

    function handleApprove() {
        if (confirm('Approve this purchase request?')) {
            router.patch(`/purchase-requests/${purchaseRequest.id}/approve`)
        }
    }

    function handleReject() {
        if (confirm('Reject this purchase request? This cannot be undone.')) {
            router.patch(`/purchase-requests/${purchaseRequest.id}/reject`)
        }
    }

    return (
        <AuthenticatedLayout header={formatPrId(purchaseRequest.id)}>
            <Head title={`Purchase Request ${formatPrId(purchaseRequest.id)}`} />

            <style>{`
                .pr-card {
                    background: ${C.surface}; border: 1px solid ${C.outline};
                    border-radius: 16px; overflow: hidden;
                }
                .pr-card-pad { padding: 24px 28px; }
                .pr-meta-grid {
                    display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
                    gap: 20px;
                }
                .pr-meta-item { display: flex; flex-direction: column; gap: 5px; }
                .pr-meta-label {
                    font-size: 11px; font-weight: 600; color: ${C.onSurfaceVar}60;
                    text-transform: uppercase; letter-spacing: 0.08em;
                }
                .pr-meta-value { font-size: 14px; font-weight: 500; color: ${C.onSurface}; }
                .pr-table { width: 100%; border-collapse: collapse; }
                .pr-table th {
                    text-align: left; padding: 12px 20px;
                    font-size: 11px; font-weight: 600; color: ${C.onSurfaceVar};
                    text-transform: uppercase; letter-spacing: 0.07em;
                    border-bottom: 1px solid ${C.outline};
                    background: ${C.surfaceLow};
                }
                .pr-table td {
                    padding: 14px 20px; color: ${C.onSurfaceVar};
                    border-bottom: 1px solid ${C.outline}15; font-size: 14px;
                }
                .pr-table tbody tr:last-child td { border-bottom: none; }
                .pr-table tbody tr:hover td { background: ${C.surfaceHigh}40; }
                .pr-table tfoot td {
                    padding: 16px 20px; border-top: 1px solid ${C.outline};
                    background: ${C.surfaceLow};
                }
                .pr-btn-approve {
                    display: inline-flex; align-items: center; gap: 7px;
                    background: ${C.primary}; color: ${C.onPrimary};
                    border: none; border-radius: 12px; padding: 11px 22px;
                    font-size: 14px; font-weight: 600; cursor: pointer;
                    transition: filter 0.15s; font-family: inherit;
                }
                .pr-btn-approve:hover { filter: brightness(1.08); }
                .pr-btn-reject {
                    display: inline-flex; align-items: center; gap: 7px;
                    background: ${C.error}15; color: ${C.error};
                    border: 1px solid ${C.error}30; border-radius: 12px; padding: 11px 22px;
                    font-size: 14px; font-weight: 600; cursor: pointer;
                    transition: all 0.15s; font-family: inherit;
                }
                .pr-btn-reject:hover { background: ${C.error}25; border-color: ${C.error}50; }
                .pr-btn-back {
                    display: inline-flex; align-items: center; gap: 6px;
                    background: none; color: ${C.onSurfaceVar};
                    border: 1px solid ${C.outline}; border-radius: 12px;
                    padding: 11px 18px; font-size: 14px; font-weight: 500;
                    cursor: pointer; text-decoration: none; transition: all 0.15s;
                }
                .pr-btn-back:hover { color: ${C.onSurface}; border-color: ${C.onSurfaceVar}50; }
                .pr-sku {
                    font-family: 'Courier New', monospace; font-size: 11px; font-weight: 700;
                    color: ${C.tertiary}; background: ${C.tertiary}12;
                    border: 1px solid ${C.tertiary}25; padding: '2px 7px'; border-radius: 5px;
                }
                .pr-section-title {
                    font-size: 11px; font-weight: 700; color: ${C.onSurfaceVar}60;
                    text-transform: uppercase; letter-spacing: 0.1em;
                }

                @media (max-width: 600px) {
                    .pr-card-pad { padding: 18px 16px; }
                    .pr-meta-grid { grid-template-columns: 1fr 1fr; }
                }
            `}</style>

            {/* Back */}
            <Link href="/purchase-requests" className="pr-btn-back" style={{ marginBottom: 24, display: 'inline-flex' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                </svg>
                Back to Purchase Requests
            </Link>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 860 }}>

                {/* Header card */}
                <div className="pr-card">
                    <div className="pr-card-pad">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                            <div>
                                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 13, fontWeight: 700, color: C.secondary, marginBottom: 6 }}>
                                    {formatPrId(purchaseRequest.id)}
                                </div>
                                <div style={{ fontSize: 20, fontWeight: 700, color: C.onSurface }}>
                                    {formatCurrency(purchaseRequest.total_amount)}
                                </div>
                            </div>
                            <StatusBadge status={purchaseRequest.status} />
                        </div>

                        {/* Meta info */}
                        <div className="pr-meta-grid">
                            <div className="pr-meta-item">
                                <span className="pr-meta-label">Requested By</span>
                                <span className="pr-meta-value">{purchaseRequest.requester?.name ?? '—'}</span>
                            </div>
                            <div className="pr-meta-item">
                                <span className="pr-meta-label">Date Submitted</span>
                                <span className="pr-meta-value">{formatDate(purchaseRequest.created_at)}</span>
                            </div>
                            {purchaseRequest.approver && (
                                <div className="pr-meta-item">
                                    <span className="pr-meta-label">
                                        {purchaseRequest.status === 'rejected' ? 'Rejected By' : 'Approved By'}
                                    </span>
                                    <span className="pr-meta-value">{purchaseRequest.approver?.name}</span>
                                </div>
                            )}
                            {purchaseRequest.approved_at && (
                                <div className="pr-meta-item">
                                    <span className="pr-meta-label">Action Date</span>
                                    <span className="pr-meta-value">{formatDate(purchaseRequest.approved_at)}</span>
                                </div>
                            )}
                        </div>

                        {/* Justification */}
                        {purchaseRequest.justification && (
                            <div style={{
                                marginTop: 20, padding: '14px 16px',
                                background: C.surfaceLow, borderRadius: 10,
                                border: `1px solid ${C.outline}`,
                            }}>
                                <div className="pr-section-title" style={{ marginBottom: 8 }}>Justification</div>
                                <p style={{ fontSize: 14, color: C.onSurfaceVar, lineHeight: 1.6 }}>
                                    {purchaseRequest.justification}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Line items card */}
                <div className="pr-card">
                    <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.outline}` }}>
                        <span className="pr-section-title">Line Items</span>
                    </div>
                    <table className="pr-table">
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
                            {purchaseRequest.line_items?.map((line, i) => (
                                <tr key={i}>
                                    <td>
                                        <span style={{ fontWeight: 500, color: C.onSurface }}>
                                            {line.catalog_item?.name ?? '—'}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{
                                            fontFamily: 'Courier New, monospace', fontSize: 11,
                                            fontWeight: 700, color: C.tertiary,
                                            background: `${C.tertiary}12`, border: `1px solid ${C.tertiary}25`,
                                            padding: '2px 7px', borderRadius: 5,
                                        }}>
                                            {line.catalog_item?.sku ?? '—'}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        {formatCurrency(line.unit_cost)}
                                    </td>
                                    <td style={{ textAlign: 'right', fontWeight: 600, color: C.onSurface }}>
                                        {line.quantity}
                                    </td>
                                    <td style={{ textAlign: 'right', fontWeight: 600, color: C.onSurface }}>
                                        {formatCurrency(line.line_total)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4} style={{ fontWeight: 600, color: C.onSurfaceVar, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                    Total
                                </td>
                                <td style={{ textAlign: 'right', fontWeight: 700, fontSize: 16, color: C.onSurface }}>
                                    {formatCurrency(purchaseRequest.total_amount)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Approve / Reject actions */}
                {canActOnRequest && (
                    <div style={{
                        display: 'flex', gap: 12, padding: '20px 24px',
                        background: C.surface, border: `1px solid ${C.outline}`,
                        borderRadius: 16, alignItems: 'center', flexWrap: 'wrap',
                    }}>
                        <div style={{ flex: 1, minWidth: 200 }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: C.onSurface }}>
                                Action Required
                            </div>
                            <div style={{ fontSize: 13, color: C.onSurfaceVar, marginTop: 3 }}>
                                This request is awaiting your approval.
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <button onClick={handleApprove} className="pr-btn-approve">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                Approve
                            </button>
                            <button onClick={handleReject} className="pr-btn-reject">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <line x1="18" y1="6" x2="6" y2="18"/>
                                    <line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                                Reject
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    )
}