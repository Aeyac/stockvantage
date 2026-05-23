import { Head, Link, usePage } from '@inertiajs/react'
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
    pending: {
        label: 'Pending',
        color: C.onSurfaceVar,
        bg: '#23252B',
        border: '#343538',
    },
    awaiting_approval: {
        label: 'Awaiting Approval',
        color: C.tertiary,
        bg: '#ffb95f12',
        border: '#ffb95f25',
    },
    auto_approved: {
        label: 'Auto Approved',
        color: C.primary,
        bg: '#4edea312',
        border: '#4edea325',
    },
    approved: {
        label: 'Approved',
        color: C.primary,
        bg: '#4edea312',
        border: '#4edea325',
    },
    rejected: {
        label: 'Rejected',
        color: C.error,
        bg: '#ffb4ab12',
        border: '#ffb4ab25',
    },
}

function StatusBadge({ status }) {
    const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending
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

export default function Index({ purchaseRequests, flash = "" }) {
    const { auth } = usePage().props
    const user = auth.user

    return (
        <AuthenticatedLayout header="Purchase Requests">
            <Head title="Purchase Requests" />

            <style>{`
                .pr-btn-primary {
                    display: inline-flex; align-items: center; gap: 7px;
                    background: ${C.primary}; color: ${C.onPrimary};
                    border: none; border-radius: 12px; padding: 10px 18px;
                    font-size: 14px; font-weight: 600; cursor: pointer;
                    text-decoration: none; transition: filter 0.15s; font-family: inherit;
                }
                .pr-btn-primary:hover { filter: brightness(1.1); }
                .pr-card {
                    background: ${C.surface}; border: 1px solid ${C.outline};
                    border-radius: 16px; overflow: hidden;
                }
                .pr-table { width: 100%; border-collapse: collapse; }
                .pr-table th {
                    text-align: left; padding: 12px 20px;
                    font-size: 11px; font-weight: 600; color: ${C.onSurfaceVar};
                    text-transform: uppercase; letter-spacing: 0.07em;
                    border-bottom: 1px solid ${C.outline};
                }
                .pr-table td {
                    padding: 15px 20px; color: ${C.onSurfaceVar};
                    border-bottom: 1px solid ${C.outline}15; font-size: 14px;
                }
                .pr-table tbody tr:last-child td { border-bottom: none; }
                .pr-table tbody tr { transition: background 0.1s; }
                .pr-table tbody tr:hover td { background: ${C.surfaceHigh}40; }
                .pr-action {
                    font-size: 13px; font-weight: 500; color: ${C.onSurfaceVar};
                    text-decoration: none; padding: 5px 12px; border-radius: 8px;
                    transition: all 0.15s; border: 1px solid transparent;
                }
                .pr-action:hover {
                    color: ${C.onSurface}; background: ${C.surfaceHigh};
                    border-color: ${C.outline};
                }
                .pr-pg-btn {
                    display: inline-flex; align-items: center; justify-content: center;
                    min-width: 34px; height: 34px; padding: 0 10px; border-radius: 8px;
                    font-size: 13px; color: ${C.onSurfaceVar}; background: ${C.surface};
                    border: 1px solid ${C.outline}; text-decoration: none; transition: all 0.15s;
                }
                .pr-pg-btn:hover { color: ${C.onSurface}; border-color: ${C.onSurfaceVar}50; }
                .pr-pg-btn.active { background: ${C.primary}; color: ${C.onPrimary}; border-color: ${C.primary}; font-weight: 700; }
                .pr-pg-btn.disabled { opacity: 0.3; pointer-events: none; }
                .pr-empty {
                    display: flex; flex-direction: column; align-items: center;
                    justify-content: center; padding: 72px 24px; gap: 14px; color: ${C.onSurfaceVar};
                }
            `}</style>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <p style={{ fontSize: 14, color: C.onSurfaceVar }}>
                    {purchaseRequests.total} request{purchaseRequests.total !== 1 ? 's' : ''}
                </p>
                <Link href="/purchase-requests/create" className="pr-btn-primary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    New Request
                </Link>
            </div>

            <FlashMessage flash={flash} />


            {/* Table */}
            <div className="pr-card">
                {purchaseRequests.data.length === 0 ? (
                    <div className="pr-empty">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.4">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                        </svg>
                        <p style={{ fontSize: 15, fontWeight: 500, color: C.onSurface }}>No purchase requests yet</p>
                        <p style={{ fontSize: 13 }}>Submit your first request to get started</p>
                        <Link href="/purchase-requests/create" className="pr-btn-primary" style={{ marginTop: 4 }}>
                            New Request
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
                                        <span style={{
                                            fontFamily: 'Courier New, monospace',
                                            fontSize: 12, fontWeight: 700,
                                            color: C.secondary, background: `${C.secondary}12`,
                                            border: `1px solid ${C.secondary}20`,
                                            padding: '3px 9px', borderRadius: 6,
                                        }}>
                                            {formatPrId(pr.id)}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 500, color: C.onSurface }}>
                                            {pr.requester?.name ?? '—'}
                                        </div>
                                    </td>
                                    <td>
                                        <span style={{ fontWeight: 600, color: C.onSurface }}>
                                            {formatCurrency(pr.total_amount)}
                                        </span>
                                    </td>
                                    <td><StatusBadge status={pr.status} /></td>
                                    <td style={{ color: C.onSurfaceVar }}>
                                        {formatDate(pr.created_at)}
                                    </td>
                                    <td>
                                        <Link href={`/purchase-requests/${pr.id}`} className="pr-action">
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
            {purchaseRequests.last_page > 1 && (
                <div style={{ display: 'flex', gap: 6, marginTop: 20, justifyContent: 'flex-end' }}>
                    {purchaseRequests.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url ?? '#'}
                            className={`pr-pg-btn ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    )
}