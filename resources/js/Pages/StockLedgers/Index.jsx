import { Head, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

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

const MOVEMENT_CONFIG = {
    received_shipment: {
        label: 'Received',
        color: '#15803D',
        bg: '#DCFCE7',
        sign: '+',
    },
    internal_consumption: {
        label: 'Consumed',
        color: '#92400E',
        bg: '#FEF3C7',
        sign: '-',
    },
    manual_adjustment: {
        label: 'Adjustment',
        color: '#1E40AF',
        bg: '#DBEAFE',
        sign: '±',
    },
}

function MovementBadge({ type }) {
    const config = MOVEMENT_CONFIG[type] ?? {
        label: type, color: '#475569', bg: '#F1F5F9', sign: '',
    }
    return (
        <span style={{
            display: 'inline-block', padding: '2px 8px', borderRadius: 100,
            fontSize: 10, fontWeight: 500, fontFamily: "'DM Mono', monospace",
            background: config.bg, color: config.color, whiteSpace: 'nowrap',
        }}>
            {config.label}
        </span>
    )
}

function QuantityCell({ quantity }) {
    const isPositive = quantity > 0
    const isNegative = quantity < 0
    return (
        <span style={{
            fontFamily: "'DM Mono', monospace",
            fontWeight: 700,
            fontSize: 13,
            color: isPositive ? '#15803D' : isNegative ? C.danger : C.mute2,
        }}>
            {isPositive ? '+' : ''}{quantity}
        </span>
    )
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-PH', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
    })
}

function formatReference(type, id) {
    if (!type || !id) return '—'
    const prefixes = {
        PurchaseRequest: 'PR',
        GrnRecord: 'GRN',
        PurchaseOrder: 'PO',
    }
    const prefix = prefixes[type] ?? type
    return `${prefix}-${String(id).padStart(4, '0')}`
}

export default function Index({ stockLedgers }) {
    return (
        <AuthenticatedLayout header="Stock Ledger">
            <Head title="Stock Ledger" />

            <style>{`
                .sl-card {
                    background: ${C.surface}; border: 1px solid ${C.border};
                    border-radius: 10px; overflow: hidden;
                }
                .sl-table { width: 100%; border-collapse: collapse; }
                .sl-table th {
                    text-align: left; padding: 10px 16px;
                    font-size: 10px; font-weight: 500; color: ${C.mute2};
                    text-transform: uppercase; letter-spacing: 0.07em;
                    border-bottom: 1px solid ${C.border};
                    background: ${C.bg}; white-space: nowrap;
                }
                .sl-table td {
                    padding: 12px 16px; color: ${C.ink2};
                    border-bottom: 1px solid #F2F5F4; font-size: 13px;
                    vertical-align: middle;
                }
                .sl-table tbody tr:last-child td { border-bottom: none; }
                .sl-table tbody tr:hover td { background: #F8FAF9; }
                .sl-sku {
                    font-family: 'DM Mono', monospace; font-size: 11px;
                    font-weight: 500; color: ${C.signalDim};
                    background: #ECFDF5; border: 1px solid #BBF7D0;
                    padding: 2px 7px; border-radius: 4px; display: inline-block;
                }
                .sl-pg-btn {
                    display: inline-flex; align-items: center; justify-content: center;
                    min-width: 32px; height: 32px; padding: 0 10px; border-radius: 6px;
                    font-size: 12px; color: ${C.mute2}; background: ${C.surface};
                    border: 1px solid ${C.border}; text-decoration: none; transition: all 0.15s;
                }
                .sl-pg-btn:hover { color: ${C.ink}; border-color: ${C.mute}; }
                .sl-pg-btn.active {
                    background: ${C.signal}; color: #fff;
                    border-color: ${C.signal}; font-weight: 700;
                }
                .sl-pg-btn.disabled { opacity: 0.3; pointer-events: none; }
                .sl-empty {
                    display: flex; flex-direction: column; align-items: center;
                    justify-content: center; padding: 64px 24px;
                    gap: 10px; color: ${C.mute2};
                }
                .sl-ref {
                    font-family: 'DM Mono', monospace; font-size: 11px;
                    font-weight: 500; color: ${C.mute2};
                }
            `}</style>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                    <p style={{ fontSize: 13, color: C.mute2 }}>
                        {stockLedgers.total} movement{stockLedgers.total !== 1 ? 's' : ''} recorded
                    </p>
                </div>
                {/* Legend */}
                <div style={{ display: 'flex', gap: 16 }}>
                    {Object.entries(MOVEMENT_CONFIG).map(([key, config]) => (
                        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: C.mute2 }}>
                            <span style={{
                                width: 7, height: 7, borderRadius: '50%',
                                background: config.color, display: 'inline-block',
                            }} />
                            {config.label}
                        </div>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="sl-card">
                {stockLedgers.data.length === 0 ? (
                    <div className="sl-empty">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.4">
                            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                        </svg>
                        <p style={{ fontSize: 14, fontWeight: 500, color: C.ink }}>No stock movements yet</p>
                        <p style={{ fontSize: 12 }}>Movements are recorded when GRNs are submitted or PRs are approved</p>
                    </div>
                ) : (
                    <table className="sl-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Item</th>
                                <th>Warehouse</th>
                                <th>Movement</th>
                                <th style={{ textAlign: 'center' }}>Qty Change</th>
                                <th>Reference</th>
                                <th>Performed By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stockLedgers.data.map(entry => (
                                <tr key={entry.id}>
                                    <td style={{ color: C.mute2, whiteSpace: 'nowrap', fontSize: 12 }}>
                                        {formatDate(entry.created_at)}
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 500, color: C.ink, marginBottom: 3 }}>
                                            {entry.catalog_item?.name ?? '—'}
                                        </div>
                                        {entry.catalog_item?.sku && (
                                            <span className="sl-sku">{entry.catalog_item.sku}</span>
                                        )}
                                    </td>
                                    <td>
                                        {entry.warehouse?.name ?? (
                                            <span style={{ color: C.mute2, fontSize: 12 }}>No warehouse</span>
                                        )}
                                    </td>
                                    <td>
                                        <MovementBadge type={entry.movement_type} />
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <QuantityCell quantity={entry.quantity_change} />
                                    </td>
                                    <td>
                                        <span className="sl-ref">
                                            {formatReference(entry.reference_type, entry.reference_id)}
                                        </span>
                                    </td>
                                    <td style={{ color: C.mute2 }}>
                                        {entry.performer?.name ?? '—'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            {stockLedgers.last_page > 1 && (
                <div style={{ display: 'flex', gap: 6, marginTop: 16, justifyContent: 'flex-end' }}>
                    {stockLedgers.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url ?? '#'}
                            className={`sl-pg-btn ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    )
}