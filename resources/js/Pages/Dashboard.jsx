import { Head, Link, usePage } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useRef } from 'react'
import { formatCurrency } from '@/hooks/useCurrency'

const C = {
    bg: '#F2F5F4',
    surface: '#FFFFFF',
    border: '#E2E8E6',
    ink: '#0A0C0B',
    ink2: '#2C3833',
    mute: '#5A6E67',
    mute2: '#7A9189',
    signal: '#00C488',
    signalDim: '#007A55',
    warn: '#F59B00',
    danger: '#E84040',
    safe: '#22C55E',
}


function formatPrId(id) {
    return 'PR-' + String(id).padStart(4, '0')
}

function Badge({ type }) {
    const map = {
        auto_approved: { bg: '#DCFCE7', color: '#15803D', label: 'Auto-Approved' },
        approved: { bg: '#DCFCE7', color: '#15803D', label: 'Approved' },
        awaiting_approval: { bg: '#FEF3C7', color: '#92400E', label: 'Awaiting Approval' },
        pending: { bg: '#F1F5F9', color: '#475569', label: 'Pending' },
        rejected: { bg: '#FEE2E2', color: '#991B1B', label: 'Rejected' },
    }
    const s = map[type] ?? map.pending
    return (
        <span style={{
            display: 'inline-block', padding: '2px 8px', borderRadius: 100,
            fontSize: 10, fontWeight: 500, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            background: s.bg, color: s.color, whiteSpace: 'nowrap',
        }}>
            {s.label}
        </span>
    )
}

function MetricTile({ label, value, sub, subType }) {
    const colors = { up: '#22C55E', warn: '#F59B00', danger: '#E84040', default: '#7A9189' }
    return (
        <div style={{
            background: C.surface, border: `1px solid ${C.border}`,
            borderRadius: 10, padding: 14,
            transition: 'border-color 0.2s', cursor: 'default',
        }}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.signal}
            onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
        >
            <div style={{ fontSize: 11, color: C.mute2, marginBottom: 6, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
                {label}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.ink, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", marginBottom: 3 }}>
                {value}
            </div>
            {sub && (
                <div style={{ fontSize: 11, color: colors[subType] ?? colors.default }}>
                    {sub}
                </div>
            )}
        </div>
    )
}

function SpendChart({ data }) {
    const svgRef = useRef(null)

    const { currencySymbol } = useAuth();

    useEffect(() => {
        if (!svgRef.current || !data?.length) return
        const W = 680, H = 140, padL = 8, padR = 8, padT = 10, padB = 28
        const chartW = W - padL - padR, chartH = H - padT - padB
        const maxVal = Math.max(...data.map(d => parseFloat(d.spend || 0)), 1)
        const barW = Math.floor((chartW / data.length) * 0.55)
        const gap = (chartW - barW * data.length) / (data.length + 1)

        let html = ''
        html += `<line x1="${padL}" y1="${padT}" x2="${padL}" y2="${H - padB}" stroke="${C.border}" stroke-width="0.5"/>`
            ;[0, 0.25, 0.5, 0.75, 1].forEach(pct => {
                const y = padT + chartH * (1 - pct)
                html += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="${C.border}" stroke-width="0.5" stroke-dasharray="3 4"/>`
                if (pct > 0) html += `<text x="${padL + 2}" y="${y - 3}" font-size="9" fill="${C.mute2}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif">${currencySymbol}${Math.round(maxVal * pct / 1000)}k</text>`
            })

        data.forEach((d, i) => {
            const val = parseFloat(d.spend || 0)
            const x = padL + gap + i * (barW + gap)
            const cx = x + barW / 2
            html += `<rect class="chart-bar" x="${x}" y="${H - padB}" width="${barW}" height="0" rx="3" fill="${C.signal}" data-val="${val}" data-month="${d.month}" style="cursor:pointer"/>`
            html += `<text x="${cx}" y="${H - 8}" text-anchor="middle" font-size="10" fill="${C.mute2}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif">${d.month}</text>`
        })

        svgRef.current.innerHTML = html

        const fullHMap = data.map(d => (parseFloat(d.spend || 0) / maxVal) * chartH)
        setTimeout(() => {
            svgRef.current?.querySelectorAll('.chart-bar').forEach((bar, i) => {
                const fH = fullHMap[i]
                bar.style.transition = 'y 0.6s ease, height 0.6s ease'
                bar.setAttribute('y', padT + chartH - fH)
                bar.setAttribute('height', fH)
            })
        }, 150)

        const tooltip = svgRef.current.parentElement.querySelector('.sv-chart-tip')
        svgRef.current.querySelectorAll('.chart-bar').forEach(bar => {
            bar.addEventListener('mouseenter', () => {
                if (tooltip) { tooltip.textContent = `${bar.dataset.month}: ${formatCurrency(bar.dataset.val)}`; tooltip.style.opacity = '1' }
                bar.style.fill = C.signalDim
            })
            bar.addEventListener('mouseleave', () => {
                if (tooltip) tooltip.style.opacity = '0'
                bar.style.fill = C.signal
            })
        })
    }, [data])

    return (
        <div style={{ position: 'relative' }}>
            <div className="sv-chart-tip" style={{
                position: 'absolute', background: C.ink, color: '#F7FAF9',
                padding: '5px 10px', borderRadius: 6, fontSize: 11,
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", pointerEvents: 'none',
                opacity: 0, transition: 'opacity 0.15s', top: 0, left: '40%', zIndex: 10,
            }} />
            <svg ref={svgRef} style={{ display: 'block', width: '100%' }} height="140" viewBox="0 0 680 140" preserveAspectRatio="none" />
        </div>
    )
}

export default function Dashboard({ metrics, recentRequests, spendChart }) {
    const { auth } = usePage().props
    const { isAdmin, hasRole } = useAuth()

    console.log(recentRequests)

    // const greeting = () => {
    //     const h = new Date().getHours()
    //     if (h < 12) return 'Good morning'
    //     if (h < 18) return 'Good afternoon'
    //     return 'Good evening'
    // }

    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard" />

            <style>{`
                .db-metric-grid {
                    display: grid; grid-template-columns: repeat(4, 1fr);
                    gap: 10px; margin-bottom: 16px;
                }
                @media (max-width: 900px) { .db-metric-grid { grid-template-columns: repeat(2,1fr); } }
                @media (max-width: 500px) { .db-metric-grid { grid-template-columns: 1fr; } }

                .db-chart-wrap {
                    background: ${C.surface}; border: 1px solid ${C.border};
                    border-radius: 10px; padding: 16px; margin-bottom: 16px;
                }
                .db-bottom { display: grid; grid-template-columns: 1.4fr 1fr; gap: 10px; }
                @media (max-width: 768px) { .db-bottom { grid-template-columns: 1fr; } }

                .db-panel {
                    background: ${C.surface}; border: 1px solid ${C.border};
                    border-radius: 10px; padding: 14px;
                }
                .db-panel-title {
                    font-size: 12px; font-weight: 600; color: ${C.ink};
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; letter-spacing: 0.04em;
                    text-transform: uppercase;
                }
                .db-section-label {
                    font-size: 11px; color: ${C.signal}; letter-spacing: 0.12em;
                    text-transform: uppercase; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    margin-bottom: 6px;
                    font-weight: 600;
                }
                .db-table { width: 100%; border-collapse: collapse; }
                .db-table th {
                    font-size: 10px; font-weight: 500; color: ${C.mute2};
                    text-align: left; padding: 0 0 8px;
                    border-bottom: 1px solid ${C.border};
                    text-transform: uppercase; letter-spacing: 0.06em;
                }
                .db-table td {
                    font-size: 11px; color: ${C.ink2};
                    padding: 7px 0; border-bottom: 1px solid #F2F5F4;
                }
                .db-table tr:last-child td { border-bottom: none; }
                .db-table tbody tr:hover td { background: #F8FAF9; }
                .db-pr-link {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: ${C.signalDim};
                    font-weight: 500; text-decoration: none;
                }
                .db-pr-link:hover { text-decoration: underline; }
                .db-view-all {
                    font-size: 12px; color: ${C.signal}; text-decoration: none;
                    font-weight: 500;
                }
                .db-view-all:hover { color: ${C.signalDim}; }
                .db-alert-item {
                    display: flex; align-items: flex-start; gap: 9px;
                    padding: 8px 0; border-bottom: 1px solid #F2F5F4;
                }
                .db-alert-item:last-child { border-bottom: none; }
                .db-alert-dot {
                    width: 7px; height: 7px; border-radius: 50%;
                    flex-shrink: 0; margin-top: 3px;
                }
                .db-alert-text { font-size: 11px; color: ${C.ink2}; flex: 1; line-height: 1.5; }
                .db-alert-text strong { font-weight: 600; display: block; }
                .db-small-link {
                    font-size: 11px; color: ${C.signal}; text-decoration: none;
                    font-weight: 500; white-space: nowrap; flex-shrink: 0;
                }
                .db-small-link:hover { color: ${C.signalDim}; }
            `}</style>

            {/* Greeting */}
            <div style={{ marginBottom: 20 }}>
                <div className="db-section-label">
                    Overview / {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>

            </div>

            {/* Metric tiles */}
            <div className="db-metric-grid">
                {hasRole('tenant_admin', 'department_manager') && (
                    <MetricTile
                        label="Month-to-Date Spend"
                        value={formatCurrency(metrics.mtd_spend)}
                        sub={`${metrics.open_po_count} open orders`}
                        subType="warn"
                    />
                )}
                <MetricTile
                    label="Open Purchase Orders"
                    value={metrics.open_po_count}
                    sub={`${metrics.pending_approvals} awaiting approval`}
                    subType={metrics.pending_approvals > 0 ? 'warn' : 'up'}
                />
                {hasRole('tenant_admin', 'warehouse_staff') && (
                    <MetricTile
                        label="Low Stock Alerts"
                        value={metrics.low_stock_count}
                        sub={metrics.low_stock_count > 0 ? 'Items need reordering' : 'All stock healthy'}
                        subType={metrics.low_stock_count > 0 ? 'danger' : 'up'}
                    />
                )}
                {hasRole('tenant_admin', 'department_manager') && (
                    <MetricTile
                        label="Pending Action Queue"
                        value={metrics.pending_approvals}
                        sub="Items need your review"
                        subType={metrics.pending_approvals > 0 ? 'warn' : 'up'}
                    />
                )}
            </div>

            {/* Spend chart */}
            {hasRole('tenant_admin', 'department_manager') && (
                <div className="db-chart-wrap">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>Spend Overview</span>
                        <span style={{ fontSize: 11, color: C.mute2, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
                            {spendChart?.[0]?.month} – {spendChart?.[spendChart.length - 1]?.month} {new Date().getFullYear()}
                        </span>
                    </div>
                    <SpendChart data={spendChart} />
                </div>
            )}

            {/* Bottom panels */}
            <div className="db-bottom">

                {/* Recent PRs */}
                <div className="db-panel">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <div className="db-panel-title">Recent Purchase Requests</div>
                        <Link href="/purchase-requests" className="db-view-all">View all →</Link>
                    </div>
                    <table className="db-table">
                        <thead>
                            <tr>
                                <th>PR No.</th>
                                <th>Requested By</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentRequests.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center', padding: '24px 0', color: C.mute2, fontSize: 12 }}>
                                        No purchase requests yet
                                    </td>
                                </tr>
                            ) : recentRequests.map(pr => (
                                <tr key={pr.id}>
                                    <td>
                                        <Link href={`/purchase-requests/${pr.id}`} className="db-pr-link">
                                            {formatPrId(pr.id)}
                                        </Link>
                                    </td>
                                    <td>{pr.requester?.name ?? '—'}</td>
                                    <td style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
                                        {formatCurrency(pr.total_amount)}
                                    </td>
                                    <td><Badge type={pr.status} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Right panel */}
                {hasRole('tenant_admin', 'warehouse_staff') ? (
                    <div className="db-panel">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <div className="db-panel-title">Inventory Alerts</div>
                            <Link href="/inventory" className="db-view-all">View all →</Link>
                        </div>
                        {metrics.low_stock_count === 0 ? (
                            <div style={{ textAlign: 'center', padding: '24px 0', color: C.mute2, fontSize: 12 }}>
                                <div style={{ fontSize: 22, marginBottom: 6 }}>✓</div>
                                All items above safety threshold
                            </div>
                        ) : (
                            <>
                                <div className="db-alert-item">
                                    <div className="db-alert-dot" style={{ background: C.danger }} />
                                    <div className="db-alert-text">
                                        <strong>{metrics.low_stock_count} item{metrics.low_stock_count !== 1 ? 's' : ''} below safety stock</strong>
                                        Review inventory and create purchase requests
                                    </div>
                                    <Link href="/inventory" className="db-small-link">View →</Link>
                                </div>
                                {hasRole('tenant_admin', 'department_manager') && metrics.pending_approvals > 0 && (
                                    <div className="db-alert-item">
                                        <div className="db-alert-dot" style={{ background: C.warn }} />
                                        <div className="db-alert-text">
                                            <strong>{metrics.pending_approvals} PR{metrics.pending_approvals !== 1 ? 's' : ''} awaiting approval</strong>
                                            Review and approve or reject
                                        </div>
                                        <Link href="/purchase-requests?page=1&role=&search=&status=awaiting_approval" className="db-small-link">Review →</Link>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ) : (
                    <div className="db-panel">
                        <div className="db-panel-title" style={{ marginBottom: 12 }}>Action Queue</div>
                        {metrics.pending_approvals === 0 ? (
                            <div style={{ textAlign: 'center', padding: '24px 0', color: C.mute2, fontSize: 12 }}>
                                <div style={{ fontSize: 22, marginBottom: 6 }}>✓</div>
                                No pending approvals
                            </div>
                        ) : (
                            <div className="db-alert-item">
                                <div className="db-alert-dot" style={{ background: C.warn }} />
                                <div className="db-alert-text">
                                    <strong>{metrics.pending_approvals} request{metrics.pending_approvals !== 1 ? 's' : ''} awaiting approval</strong>
                                    Review and take action
                                </div>
                                <Link href="/purchase-requests" className="db-small-link">Review →</Link>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    )
}