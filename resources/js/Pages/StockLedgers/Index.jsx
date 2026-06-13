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
                /* Fluid layout structure for the page stats metadata and color legend */
                .sl-header-row {
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    margin-bottom: 16px;
                    gap: 16px;
                }
                
                .sl-legend-box {
                    display: flex; 
                    gap: 16px;
                    flex-wrap: wrap;
                }

                .sl-card {
                    background: ${C.surface}; 
                    border: 1px solid ${C.border};
                    border-radius: 10px; 
                    overflow: hidden;
                    width: 100%;
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.02);
                }
                
                .sl-table { 
                    width: 100%; 
                    border-collapse: collapse; 
                    min-width: 850px; /* Safeguards horizontal density on multi-column viewports */
                }
                
                .sl-table th {
                    text-align: left; 
                    padding: 12px 16px;
                    font-size: 10px; 
                    font-weight: 600; 
                    color: ${C.mute2};
                    text-transform: uppercase; 
                    letter-spacing: 0.07em;
                    border-bottom: 1px solid ${C.border};
                    background: ${C.bg}; 
                    white-space: nowrap;
                }
                
                .sl-table td {
                    padding: 14px 16px; 
                    color: ${C.ink2};
                    border-bottom: 1px solid #F2F5F4; 
                    font-size: 13px;
                    vertical-align: middle;
                    white-space: nowrap;
                }
                .sl-table tbody tr:last-child td { border-bottom: none; }
                .sl-table tbody tr:hover td { background: #F8FAF9; }
                
                .sl-sku {
                    font-family: 'DM Mono', monospace; 
                    font-size: 10px;
                    font-weight: 500; 
                    color: ${C.signalDim};
                    background: #ECFDF5; 
                    border: 1px solid #BBF7D0;
                    padding: 1px 5px; 
                    border-radius: 4px; 
                    display: inline-block;
                }

                .sl-pagination-wrap {
                    display: flex; 
                    gap: 6px; 
                    margin-top: 16px; 
                    justify-content: flex-end;
                    flex-wrap: wrap;
                }
                
                .sl-pg-btn {
                    display: inline-flex; 
                    align-items: center; 
                    justify-content: center;
                    min-width: 32px; 
                    height: 32px; 
                    padding: 0 10px; 
                    border-radius: 6px;
                    font-size: 12px; 
                    color: ${C.mute2}; 
                    background: ${C.surface};
                    border: 1px solid ${C.border}; 
                    text-decoration: none; 
                    transition: all 0.15s;
                }
                .sl-pg-btn:hover { color: ${C.ink}; border-color: ${C.mute}; }
                .sl-pg-btn.active {
                    background: ${C.signal}; 
                    color: #fff;
                    border-color: ${C.signal}; 
                    font-weight: 700;
                }
                .sl-pg-btn.disabled { opacity: 0.3; pointer-events: none; }
                
                .sl-empty {
                    display: flex; 
                    flex-direction: column; 
                    align-items: center;
                    justify-content: center; 
                    padding: 64px 24px;
                    gap: 10px; 
                    color: ${C.mute2};
                    text-align: center;
                }
                
                .sl-ref {
                    font-family: 'DM Mono', monospace; 
                    font-size: 11px;
                    font-weight: 500; 
                    color: ${C.mute2};
                }

                /* Mobile Sizing Adjustments */
                @media (max-width: 640px) {
                    .sl-header-row {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 10px;
                    }
                    .sl-legend-box {
                        gap: 12px;
                    }
                }

                @media (max-width: 480px) {
                    .sl-pagination-wrap {
                        justify-content: center;
                    }
                }
            `}</style>

            {/* Header Block */}
            <div className="sl-header-row">
                <div>
                    <p style={{ fontSize: 13, color: C.mute2, margin: 0, fontWeight: 500 }}>
                        {stockLedgers.total} movement{stockLedgers.total !== 1 ? 's' : ''} recorded
                    </p>
                </div>
                {/* Legend Context */}
                <div className="sl-legend-box">
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

            {/* Main Content Layout Card */}
            <div className="sl-card">
                {stockLedgers.data.length === 0 ? (
                    <div className="sl-empty">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.4">
                            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                        </svg>
                        <p style={{ fontSize: 14, fontWeight: 500, color: C.ink, margin: 0 }}>No stock movements yet</p>
                        <p style={{ fontSize: 12, margin: 0, maxWidth: 400 }}>Movements are recorded when GRNs are submitted or PRs are approved</p>
                    </div>
                ) : (
                    <table className="sl-table">
                        <thead>
                            <tr>
                                <th style={{ width: '18%' }}>Date</th>
                                <th style={{ width: '25%' }}>Item</th>
                                <th style={{ width: '17%' }}>Warehouse</th>
                                <th style={{ width: '12%' }}>Movement</th>
                                <th style={{ width: '10%', textAlign: 'center' }}>Qty Change</th>
                                <th style={{ width: '10%' }}>Reference</th>
                                <th style={{ width: '13%' }}>Performed By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stockLedgers.data.map(entry => (
                                <tr key={entry.id}>
                                    <td style={{ color: C.mute2, fontSize: 12 }}>
                                        {formatDate(entry.created_at)}
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 500, color: C.ink, marginBottom: 2 }}>
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

            {/* Pagination Controls Wrapper */}
            {stockLedgers.last_page > 1 && (
                <div className="sl-pagination-wrap">
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