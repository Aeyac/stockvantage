import { Head, Link, usePage } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import { ViewActionButton } from '@/Components/ActionButtons'
import { useAuth } from '@/hooks/useAuth'

// Soft, readable text colors with subtle background pills for light mode statuses
const STATUS_CONFIG = {
    pending: {
        label: 'Pending',
        text: '#64748b', // Slate
        bg: '#f8fafc',
        border: '#e2e8f0',
    },
    awaiting_approval: {
        label: 'Awaiting Approval',
        text: '#d97706', // Amber
        bg: '#fef3c7',
        border: '#fde68a',
    },
    auto_approved: {
        label: 'Auto Approved',
        text: '#059669', // Emerald
        bg: '#ecfdf5',
        border: '#d1fae5',
    },
    approved: {
        label: 'Approved',
        text: '#00C488', // Accent Green
        bg: '#f0fdf4',
        border: '#bbf7d0',
    },
    rejected: {
        label: 'Rejected',
        text: '#dc2626', // Red
        bg: '#fef2f2',
        border: '#fee2e2',
    },
}

function StatusBadge({ status }) {
    const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending
    return (
        <span
            className="pr-status"
            style={{
                background: config.bg,
                color: config.text,
                border: `1px solid ${config.border}`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11.5px',
                fontWeight: 500,
                padding: '3px 10px',
                borderRadius: '20px'
            }}
        >
            <span style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: config.text,
                display: 'inline-block'
            }} />
            {config.label}
        </span>
    )
}



function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-PH', {
        year: 'numeric', month: 'short', day: 'numeric',
    })
}

function formatPrId(id) {
    return 'PR-' + String(id).padStart(4, '0')
}

export default function Index({ purchaseRequests, flash = "" }) {
    // const { auth } = usePage().props
    // const user = auth.user
    const { currencySymbol } = useAuth();

    function formatCurrency(value) {
        return currencySymbol + parseFloat(value).toLocaleString('en-PH', {
            minimumFractionDigits: 2, maximumFractionDigits: 2,
        })
    }

    return (
        <AuthenticatedLayout header="Purchase Requests">
            <Head title="Purchase Requests" />

            <style>{`
                /* Primary Brand Button - Dashboard accent green */
                .pr-btn-primary {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    background: #00C488;
                    color: #fff;
                    border: none;
                    border-radius: 8px;
                    padding: 9px 16px;
                    font-size: 13px;
                    font-weight: 500;
                    cursor: pointer;
                    text-decoration: none;
                    transition: background 0.15s;
                    font-family: inherit;
                    vertical-align: middle;
                }
                .pr-btn-primary:hover { background: #00a873; }

                /* Crisp Light Mode Table Container */
                .pr-table-wrap {
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
                }
                .pr-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 13.5px;
                }
                .pr-table thead tr {
                    background: #f8fafc;
                    border-bottom: 1px solid #e2e8f0;
                }
                .pr-table th {
                    text-align: left;
                    padding: 14px 18px;
                    font-size: 11px;
                    font-weight: 600;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .pr-table td {
                    padding: 14px 18px;
                    color: #334155;
                    border-bottom: 1px solid #f1f5f9;
                }
                .pr-table tbody tr:last-child td { border-bottom: none; }
                .pr-table tbody tr:hover td { background: #f8fafc; }

                /* Bold ID Badge using inherited layout font family */
                .pr-id-badge {
                    font-family: inherit;
                    font-size: 12px; 
                    font-weight: 700;
                    padding: px 8px; 
                    border-radius: 4px;
                    display: inline-block;
                    letter-spacing: 0.02em;
                }
                
                /* Clean Light Mode Pagination Blocks */
                .pr-pagination-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 32px;
                    height: 32px;
                    padding: 0 10px;
                    border-radius: 6px;
                    font-size: 12.5px;
                    color: #64748b;
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    text-decoration: none;
                    transition: all 0.15s;
                }
                .pr-pagination-btn:hover { color: #1e293b; border-color: #cbd5e1; background: #f8fafc; }
                .pr-pagination-btn.active {
                    background: #00C488;
                    color: #fff;
                    border-color: #00C488;
                    font-weight: 600;
                }
                .pr-pagination-btn.disabled {
                    opacity: 0.4;
                    pointer-events: none;
                    background: #f1f5f9;
                }
                
                .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 64px 24px;
                    gap: 12px;
                    color: #64748b;
                    background: #ffffff;
                }
            `}</style>

            <FlashMessage flash={flash} />

            {/* Header row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
                        {purchaseRequests.total} purchase request{purchaseRequests.total !== 1 ? 's' : ''} registered
                    </p>
                </div>
                <Link href="/purchase-requests/create" className="pr-btn-primary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    New Request
                </Link>
            </div>

            {/* Table wrapper */}
            <div className="pr-table-wrap">
                {purchaseRequests.data.length === 0 ? (
                    <div className="empty-state">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-10.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5-13.5h16.5M6.75 6.75h.008v.008H6.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM11.25 6.75h.008v.008h-.008V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM15.75 6.75h.008v.008h-.008V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <p style={{ fontSize: 14, fontWeight: 500, color: '#475569' }}>No purchase requests yet</p>
                        <Link href="/purchase-requests/create" className="pr-btn-primary" style={{ marginTop: 4 }}>
                            Submit your first request
                        </Link>
                    </div>
                ) : (
                    <table className="pr-table">
                        <thead>
                            <tr>
                                <th>PR ID</th>
                                <th>Requested By</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Date Submitted</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchaseRequests.data.map(pr => (
                                <tr key={pr.id}>
                                    <td>
                                        <span className="pr-id-badge">
                                            {formatPrId(pr.id)}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 600, color: '#0f172a' }}>
                                            {pr.requester?.name ?? '—'}
                                        </div>
                                    </td>
                                    <td>
                                        <span style={{ fontWeight: 600, color: '#334155' }}>
                                            {formatCurrency(pr.total_amount)}
                                        </span>
                                    </td>
                                    <td>
                                        <StatusBadge status={pr.status} />
                                    </td>
                                    <td style={{ color: '#64748b' }}>
                                        {formatDate(pr.created_at)}
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            <ViewActionButton href={`/purchase-requests/${pr.id}`} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            {purchaseRequests.last_page > 1 && (
                <div style={{ display: 'flex', gap: 6, marginTop: 20, justifyContent: 'flex-end' }}>
                    {purchaseRequests.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url ?? '#'}
                            className={`pr-pagination-btn ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    )
}