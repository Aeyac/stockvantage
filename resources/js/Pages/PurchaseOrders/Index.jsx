import { Head, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'

// Unified Light Mode Visual System Tokens
const C = {
    bg: '#ffffff',
    surface: '#ffffff',
    surfaceLow: '#ffffff',
    surfaceHigh: '#f8fafc',    // Used for table header rows and action hovers
    outline: '#e2e8f0',
    borderInput: '#cbd5e1',
    primary: '#17aa54',        // Brand green color
    primaryHover: '#1a8f4b',
    onPrimary: '#ffffff',
    textMain: '#0f172a',       // Strong primary emphasis
    textMuted: '#64748b',      // Subdued values and description labels
    textLabel: '#475569',      // Structured subtitle metrics/subheadings
    error: '#dc2626',          // Accessible deep red alert tone
    errorBg: '#fef2f2',
    errorBorder: '#fca5a5',
    tertiary: '#b45309',       // Deep golden amber for warning/partial states
    secondary: '#4338ca',      // High-contrast indigo for system links and badges
}

const STATUS_CONFIG = {
    open: {
        label: 'Open',
        color: '#2563eb',       // Accessible high-contrast blue text
        bg: '#eff6ff',
        border: '#bfdbfe',
    },
    partially_received: {
        label: 'Partial',
        color: C.tertiary,
        bg: '#fffbeb',
        border: '#fef3c7',
    },
    fully_received: {
        label: 'Fully Received',
        color: C.primary,
        bg: '#f0fdf4',
        border: '#bbf7d0',
    },
    cancelled: {
        label: 'Cancelled',
        color: C.error,
        bg: C.errorBg,
        border: C.errorBorder,
    },
}

function StatusBadge({ status }) {
    const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.open
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 10, fontWeight: 700, padding: '4px 10px',
            borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.05em',
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
                /* Card wrap and table structural frames */
                .po-card {
                    background: ${C.surface} !important; 
                    border: 1px solid ${C.outline} !important;
                    border-radius: 12px !important; 
                    overflow: hidden !important;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05) !important;
                }
                
                .po-table { width: 100% !important; border-collapse: collapse !important; }
                
                .po-table th {
                    padding: 12px 20px !important;
                    font-size: 11px !important; 
                    font-weight: 700 !important; 
                    color: ${C.textLabel} !important;
                    text-transform: uppercase; 
                    letter-spacing: 0.05em;
                    border-bottom: 1px solid ${C.outline} !important;
                    background: ${C.surfaceHigh} !important;
                }
                
                .po-table td {
                    padding: 15px 20px !important; 
                    color: ${C.textMuted} !important;
                    border-bottom: 1px solid ${C.outline} !important; 
                    font-size: 13.5px !important;
                }
                .po-table tbody tr:last-child td { border-bottom: none !important; }
                .po-table tbody tr { transition: background 0.1s; }
                .po-table tbody tr:hover td { background: ${C.surfaceHigh}50 !important; }
                
                /* Standard dynamic table row view link item action buttons */
                .po-action {
                    font-size: 13px !important; 
                    font-weight: 500 !important; 
                    color: #64748b !important;
                    text-decoration: none; 
                    padding: 6px 14px; 
                    transition: all 0.15s; 
                    background: #ffffff !important;
                }
                .po-action:hover {
                    color: ${C.textMain} !important; 
                    background: ${C.surfaceHigh} !important;
                    border-color: ${C.borderInput} !important;
                }
                
                /* Pagination dynamic buttons control links template state wrappers */
                .po-pg-btn {
                    display: inline-flex !important; align-items: center !important; justify-content: center !important;
                    min-width: 34px !important; height: 34px !important; padding: 0 12px !important; 
                    border-radius: 6px !important; font-size: 13px !important; 
                    color: ${C.textMuted} !important; background: #ffffff !important;
                    border: 1px solid ${C.outline} !important; text-decoration: none !important; transition: all 0.15s !important;
                }
                .po-pg-btn:hover { color: ${C.textMain} !important; border-color: ${C.borderInput} !important; background: ${C.surfaceHigh} !important; }
                .po-pg-btn.active {
                    background: ${C.primary} !important; 
                    color: ${C.onPrimary} !important;
                    border-color: ${C.primary} !important; 
                    font-weight: 700 !important;
                }
                .po-pg-btn.disabled { opacity: 0.4 !important; pointer-events: none !important; }
                
                /* Empty state feedback wrapper layout structures */
                .po-empty {
                    display: flex !important; flex-direction: column !important; align-items: center !important;
                    justify-content: center !important; padding: 72px 24px !important; gap: 12px !important;
                    color: ${C.textMuted} !important;
                }
                
                /* Clean code identifiers monospace structural tags */
                .po-number {
                    font-family: 'Courier New', monospace; font-size: 11.5px;
                    font-weight: 700; color: ${C.textMain};
                    background: ${C.surfaceHigh}; border: 1px solid ${C.outline};
                    padding: 3px 8px; border-radius: 4px; letter-spacing: 0.02em;
                }
                
                .po-pr-link {
                    font-family: 'Courier New', monospace; font-size: 11.5px;
                    font-weight: 700; color: ${C.secondary};
                    background: #eef2ff; border: 1px solid #e0e7ff;
                    padding: 3px 8px; border-radius: 4px; text-decoration: none;
                    transition: all 0.15s;
                }
                .po-pr-link:hover { background: #e0e7ff; border-color: #c7d2fe; }
            `}</style>

            <FlashMessage flash={flash} />
            
            {/* Header Metrics Summary */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <p style={{ fontSize: 14, color: C.textMuted, margin: 0, fontWeight: 500 }}>
                    {purchaseOrders.total} order{purchaseOrders.total !== 1 ? 's' : ''} found
                </p>
            </div>

            {/* Table Matrix Framework Card Container */}
            <div className="po-card">
                {purchaseOrders.data.length === 0 ? (
                    <div className="po-empty">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: C.textMuted, opacity: 0.6 }}>
                            <rect x="2" y="3" width="20" height="14" rx="2" />
                            <path d="M8 21h8M12 17v4" />
                        </svg>
                        <p style={{ fontSize: 15, fontWeight: 600, color: C.textMain, margin: 0 }}>
                            No purchase orders yet
                        </p>
                        <p style={{ fontSize: 13, color: C.textMuted, margin: 0, textAlign: 'center' }}>
                            POs are generated automatically when a purchase request is approved.
                        </p>
                    </div>
                ) : (
                    <table className="po-table">
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left', width: '18%' }}>PO Number</th>
                                <th style={{ textAlign: 'left', width: '15%' }}>Linked PR</th>
                                <th style={{ textAlign: 'left', width: '22%' }}>Requested By</th>
                                <th style={{ textAlign: 'right', width: '16%' }}>Total Amount</th>
                                <th style={{ textAlign: 'left', width: '15%', paddingLeft: '24px' }}>Status</th>
                                <th style={{ textAlign: 'left', width: '14%' }}>Date Created</th>
                                <th style={{ textAlign: 'center', width: '10%' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchaseOrders.data.map(po => (
                                <tr key={po.id}>
                                    <td style={{ textAlign: 'left' }}>
                                        <span className="po-number">{po.po_number}</span>
                                    </td>
                                    <td style={{ textAlign: 'left' }}>
                                        <Link
                                            href={`/purchase-requests/${po.purchase_request?.id}`}
                                            className="po-pr-link"
                                        >
                                            {formatPrId(po.purchase_request?.id)}
                                        </Link>
                                    </td>
                                    <td style={{ textAlign: 'left' }}>
                                        <span style={{ fontWeight: 600, color: C.textMain }}>
                                            {po.purchase_request?.requester?.name ?? '—'}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'right', fontWeight: 600, color: C.textMain }}>
                                        {formatCurrency(po.total_amount)}
                                    </td>
                                    <td style={{ textAlign: 'left', paddingLeft: '24px' }}>
                                        <StatusBadge status={po.status} />
                                    </td>
                                    <td style={{ textAlign: 'left', color: C.textMuted }}>
                                        {formatDate(po.created_at)}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
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

            {/* Pagination Controls Footer Segment */}
            {purchaseOrders.last_page > 1 && (
                <div style={{ display: 'flex', gap: 6, marginTop: 24, justifyContent: 'flex-end' }}>
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