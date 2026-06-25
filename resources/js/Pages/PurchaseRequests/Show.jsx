import { Head, router } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import BackButton from '@/Components/BackButton'
import { useAuth } from '@/hooks/useAuth'
import { formatCurrency } from '@/hooks/useCurrency'
import { useMemo } from 'react'
import confirmToast from '@/utils/confirmToast'

// Unified Light Mode Visual System Tokens
const C = {
    bg: '#ffffff',
    surface: '#ffffff',
    surfaceLow: '#ffffff',
    surfaceHigh: '#f8fafc',    // Used for table headers & detail panel wrappers
    outline: '#e2e8f0',
    borderInput: '#cbd5e1',
    primary: '#17aa54',        // Brand green color
    primaryHover: '#1a8f4b',
    primaryFocus: '#00C488',
    onPrimary: '#ffffff',
    textMain: '#0f172a',       // High-contrast main headings
    textMuted: '#64748b',      // Subdued description / cell value layout
    textLabel: '#475569',      // Clean structural section subtitles
    textSection: '#94a3b8',    // Muted structural descriptors
    error: '#dc2626',          // Accessible destructive alert indicator 
    errorBg: '#fef2f2',
    errorBorder: '#fca5a5',
    tertiary: '#b45309',       // Clean high-contrast amber for badge states
    secondary: '#4338ca',      // Indigo token for decorative structural identifiers (IDs)
}

const STATUS_CONFIG = {
    pending: {
        label: 'Pending', color: C.textMuted, bg: '#f1f5f9', border: '#cbd5e1',
    },
    awaiting_approval: {
        label: 'Awaiting Approval', color: C.tertiary, bg: '#fffbeb', border: '#fef3c7',
    },
    auto_approved: {
        label: 'Auto Approved', color: C.primary, bg: '#f0fdf4', border: '#bbf7d0',
    },
    approved: {
        label: 'Approved', color: C.primary, bg: '#f0fdf4', border: '#bbf7d0',
    },
    rejected: {
        label: 'Rejected', color: C.error, bg: C.errorBg, border: C.errorBorder,
    },
}

function StatusBadge({ status }) {
    const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 11, fontWeight: 700, padding: '4px 12px',
            borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.05em',
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

function formatPrId(id) {
    return 'PR-' + String(id).padStart(4, '0')
}

export default function Show({ purchaseRequest }) {
    const { user } = useAuth();

    const canActOnRequest =
        purchaseRequest.status === 'awaiting_approval' &&
        (user.role === 'tenant_admin' || user.role === 'department_manager')


    async function handleApprove() {
        const confirmed = await confirmToast("Are you sure you want to delete this catalog item?", "Do not show this warning again.");
        if (confirmed) {
            router.patch(`/purchase-requests/${purchaseRequest.id}/approve`);
        }
    }

    async function handleReject() {
        const confirmed = await confirmToast("Are you sure you want to delete this catalog item?", "Do not show this warning again.");
        if (confirmed) {
            router.patch(`/purchase-requests/${purchaseRequest.id}/reject`)
        }
    }

    return (
        <AuthenticatedLayout header={purchaseRequest.pr_number}>
            <Head title={`Purchase Request ${formatPrId(purchaseRequest.id)}`} />

            <style>{`
                /* Unified structural layout card frames override global defaults */
                .pr-card {
                    background: ${C.surface} !important; 
                    border: 1px solid ${C.outline} !important;
                    border-radius: 12px !important; 
                    overflow: hidden !important;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05) !important;
                }
                .pr-card-pad { padding: 24px 28px !important; }
                
                .pr-meta-grid {
                    display: grid; 
                    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
                    gap: 20px;
                }
                .pr-meta-item { display: flex; flex-direction: column; gap: 4px; }
                
                /* High-visibility uppercase labels metadata fields */
                .pr-meta-label {
                    font-size: 11px !important; 
                    font-weight: 700 !important; 
                    color: ${C.textLabel} !important;
                    text-transform: uppercase; 
                    letter-spacing: 0.05em;
                }
                .pr-meta-value { font-size: 14px !important; font-weight: 500 !important; color: ${C.textMain} !important; }
                
                /* Crisp custom data table architecture specifications */
                .pr-table { width: 100% !important; border-collapse: collapse !important; }
                .pr-table th {
                    text-align: left !important; 
                    padding: 12px 20px !important;
                    font-size: 11px !important; 
                    font-weight: 700 !important; 
                    color: ${C.textLabel} !important;
                    text-transform: uppercase; 
                    letter-spacing: 0.05em;
                    border-bottom: 1px solid ${C.outline} !important;
                    background: ${C.surfaceHigh} !important;
                }
                .pr-table td {
                    padding: 14px 20px !important; 
                    color: ${C.textMuted} !important;
                    border-bottom: 1px solid ${C.outline} !important; 
                    font-size: 13.5px !important;
                }
                .pr-table tbody tr:last-child td { border-bottom: none !important; }
                
                /* Fixed background opacity styling syntax rule safety */
                .pr-table tbody tr:hover td { 
                    background: ${C.surfaceHigh} !important; 
                    opacity: 0.85; 
                }
                
                .pr-table tfoot td {
                    padding: 16px 20px !important; 
                    border-top: 2px solid ${C.outline} !important;
                    background: ${C.surfaceHigh} !important;
                }
                
                /* Green Confirmation CTA Action Control Button */
                .pr-btn-approve {
                    display: inline-flex !important; align-items: center !important; gap: 7px !important;
                    background: ${C.primary} !important; color: ${C.onPrimary} !important; border: none !important;
                    border-radius: 8px !important; padding: 10px 20px !important;
                    font-size: 13.5px !important; font-weight: 600 !important; cursor: pointer !important;
                    transition: background-color 0.15s !important; font-family: inherit !important;
                }
                .pr-btn-approve:hover { background: ${C.primaryHover} !important; }
                
                /* Red Structural Destructive Dismissal Action Button */
                .pr-btn-reject {
                    display: inline-flex !important; align-items: center !important; gap: 7px !important;
                    background: ${C.errorBg} !important; color: ${C.error} !important;
                    border: 1px solid ${C.errorBorder} !important; border-radius: 8px !important; 
                    padding: 10px 20px !important; font-size: 13.5px !important; 
                    font-weight: 600 !important; cursor: pointer !important;
                    transition: all 0.15s !important; font-family: inherit !important;
                }
                .pr-btn-reject:hover { background: #fee2e2 !important; border-color: ${C.error} !important; }
                
                /* Clear structural context badges for code identifiers text styling mapping */
                .pr-sku {
                    font-family: 'Courier New', monospace; font-size: 11.5px; font-weight: 700;
                    color: ${C.tertiary}; background: #fffbeb;
                    border: 1px solid #fef3c7; padding: 2px 6px; border-radius: 4px;
                }
                .pr-section-title {
                    font-size: 11.5px !important; font-weight: 700 !important; color: ${C.textLabel} !important;
                    text-transform: uppercase; letter-spacing: 0.05em;
                }

                @media (max-width: 600px) {
                    .pr-card-pad { padding: 18px 16px !important; }
                    .pr-meta-grid { grid-template-columns: 1fr 1fr; }
                }
            `}</style>

            <BackButton link={"/purchase-requests"} text={"Back to Purchase Requests"} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 860 }}>

                {/* Main Purchase Order Header Segment Card */}
                <div className="pr-card">
                    <div className="pr-card-pad">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                            <div>
                                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 13, fontWeight: 700, color: C.secondary, marginBottom: 4 }}>
                                    {purchaseRequest.pr_number}
                                </div>
                                <div style={{ fontSize: 22, fontWeight: 700, color: C.textMain }}>
                                    {formatCurrency(purchaseRequest.total_amount)}
                                </div>
                            </div>
                            <StatusBadge status={purchaseRequest.status} />
                        </div>

                        {/* Order Metadata Metadata System Attributes Information Block */}
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

                        {/* Justification Field Text Wrapper */}
                        {purchaseRequest.justification && (
                            <div style={{
                                marginTop: 24, padding: '16px 18px',
                                background: C.surfaceHigh, borderRadius: 8,
                                border: `1px solid ${C.outline}`,
                            }}>
                                <div className="pr-section-title" style={{ marginBottom: 8 }}>Justification</div>
                                <p style={{ fontSize: 14, color: C.textMain, lineHeight: 1.6, margin: 0 }}>
                                    {purchaseRequest.justification}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Line Items Functional Matrix Table Card Block */}
                <div className="pr-card">
                    <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.outline}`, background: '#ffffff' }}>
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
                                        <span style={{ fontWeight: 600, color: C.textMain }}>
                                            {line.catalog_item?.name ?? '—'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="pr-sku">
                                            {line.catalog_item?.sku ?? '—'}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'right', color: C.textMain }}>
                                        {formatCurrency(line.unit_cost)}
                                    </td>
                                    <td style={{ textAlign: 'right', fontWeight: 600, color: C.textMain }}>
                                        {line.quantity}
                                    </td>
                                    <td style={{ textAlign: 'right', fontWeight: 600, color: C.textMain }}>
                                        {formatCurrency(line.line_total)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4} style={{ fontWeight: 700, color: C.textLabel, fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Total Amount
                                </td>
                                <td style={{ textAlign: 'right', fontWeight: 700, fontSize: 16, color: C.textMain }}>
                                    {formatCurrency(purchaseRequest.total_amount)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Contextual Management Review Decision Actions Bar Panel */}
                {canActOnRequest && (
                    <div style={{
                        display: 'flex', gap: 16, padding: '20px 24px',
                        background: '#ffffff', border: `1px solid ${C.outline}`,
                        borderRadius: 12, alignItems: 'center', flexWrap: 'wrap',
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
                    }}>
                        <div style={{ flex: 1, minWidth: 200 }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: C.textMain }}>
                                Action Required
                            </div>
                            <div style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>
                                This request is awaiting your verification assessment choice.
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <button onClick={handleApprove} className="pr-btn-approve">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Approve
                            </button>
                            <button onClick={handleReject} className="pr-btn-reject">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
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