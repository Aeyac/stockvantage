import { Head } from '@inertiajs/react'
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

export default function Index({ catalogItems, warehouses }) {
    // count items below safety stock across all warehouses
    const lowStockCount = catalogItems.filter(item =>
        item.stock_by_warehouse?.some(w => w.below_safety)
    ).length

    return (
        <AuthenticatedLayout header="Inventory">
            <Head title="Inventory" />

            <style>{`
                .inv-card {
                    background: ${C.surface}; border: 1px solid ${C.outline};
                    border-radius: 16px; overflow: hidden;
                }
                .inv-table { width: 100%; border-collapse: collapse; min-width: 600px; }
                .inv-table th {
                    text-align: left; padding: 12px 20px;
                    font-size: 11px; font-weight: 600; color: ${C.onSurfaceVar};
                    text-transform: uppercase; letter-spacing: 0.07em;
                    border-bottom: 1px solid ${C.outline};
                    white-space: nowrap;
                }
                .inv-table th.warehouse-col { text-align: center; }
                .inv-table td {
                    padding: 14px 20px; color: ${C.onSurfaceVar};
                    border-bottom: 1px solid ${C.outline}15; font-size: 14px;
                    vertical-align: middle;
                }
                .inv-table tbody tr:last-child td { border-bottom: none; }
                .inv-table tbody tr:hover td { background: ${C.surfaceHigh}40; }
                .inv-stock-cell {
                    text-align: center; font-weight: 600;
                    font-size: 14px;
                }
                .inv-stock-ok { color: ${C.onSurface}; }
                .inv-stock-warn {
                    color: ${C.tertiary};
                    display: inline-flex; align-items: center; gap: 4px;
                }
                .inv-stock-danger {
                    color: ${C.error};
                    display: inline-flex; align-items: center; gap: 4px;
                }
                .inv-sku {
                    font-family: 'Courier New', monospace; font-size: 11px; font-weight: 700;
                    color: ${C.tertiary}; background: ${C.tertiary}12;
                    border: 1px solid ${C.tertiary}25; padding: 2px 7px; border-radius: 5px;
                }
                .inv-alert-bar {
                    display: flex; align-items: center; gap: 12px;
                    padding: 14px 18px; border-radius: 12px;
                    background: ${C.tertiary}10; border: 1px solid ${C.tertiary}25;
                    margin-bottom: 20px;
                }
                .inv-empty {
                    display: flex; flex-direction: column; align-items: center;
                    justify-content: center; padding: 72px 24px; gap: 14px; color: ${C.onSurfaceVar};
                }
                .inv-scroll { overflow-x: auto; }
                .inv-safety-badge {
                    font-size: 11px; font-weight: 600; padding: 2px 8px;
                    border-radius: 20px; background: ${C.outline};
                    color: ${C.onSurfaceVar}; white-space: nowrap;
                }
            `}</style>


            {/* Low stock alert banner */}
            {lowStockCount > 0 && (
                <div className="inv-alert-bar">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.tertiary} strokeWidth="2" style={{ flexShrink: 0 }}>
                        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.tertiary }}>
                            {lowStockCount} item{lowStockCount !== 1 ? 's' : ''} below safety stock threshold
                        </span>
                        <span style={{ fontSize: 12, color: C.onSurfaceVar, marginLeft: 8 }}>
                            Review and reorder as needed
                        </span>
                    </div>
                </div>
            )}

            {/* Summary row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <p style={{ fontSize: 14, color: C.onSurfaceVar }}>
                    {catalogItems.length} item{catalogItems.length !== 1 ? 's' : ''} across {warehouses.length} warehouse{warehouses.length !== 1 ? 's' : ''}
                </p>
            </div>

            <div className="inv-card">
                {catalogItems.length === 0 ? (
                    <div className="inv-empty">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.4">
                            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                        </svg>
                        <p style={{ fontSize: 15, fontWeight: 500, color: C.onSurface }}>No inventory data</p>
                        <p style={{ fontSize: 13 }}>Add catalog items and warehouses to track stock</p>
                    </div>
                ) : (
                    <div className="inv-scroll">
                        <table className="inv-table">
                            <thead>
                                <tr>
                                    <th>SKU</th>
                                    <th>Item</th>
                                    <th>Supplier</th>
                                    <th>Safety Stock</th>
                                    {warehouses.map(wh => (
                                        <th key={wh.id} className="warehouse-col">
                                            {wh.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {catalogItems.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            <span className="inv-sku">{item.sku}</span>
                                        </td>
                                        <td>
                                            <span style={{ fontWeight: 600, color: C.onSurface }}>
                                                {item.name}
                                            </span>
                                        </td>
                                        <td>
                                            {item.supplier?.name ?? <span style={{ opacity: 0.3 }}>—</span>}
                                        </td>
                                        <td>
                                            <span className="inv-safety-badge">
                                                min {item.safety_stock}
                                            </span>
                                        </td>
                                        {item.stock_by_warehouse?.map(stock => {
                                            const isZero = stock.current_stock === 0
                                            const isLow = stock.below_safety && stock.current_stock > 0

                                            return (
                                                <td key={stock.warehouse_id} className="inv-stock-cell">
                                                    {isZero ? (
                                                        <span className="inv-stock-danger">
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                                            </svg>
                                                            0
                                                        </span>
                                                    ) : isLow ? (
                                                        <span className="inv-stock-warn">
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                                                <line x1="12" y1="9" x2="12" y2="13" />
                                                            </svg>
                                                            {stock.current_stock}
                                                        </span>
                                                    ) : (
                                                        <span className="inv-stock-ok">
                                                            {stock.current_stock}
                                                        </span>
                                                    )}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 20, marginTop: 16, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.onSurfaceVar }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.onSurface, display: 'inline-block' }} />
                    Sufficient stock
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.onSurfaceVar }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.tertiary, display: 'inline-block' }} />
                    Below safety threshold
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.onSurfaceVar }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.error, display: 'inline-block' }} />
                    Out of stock
                </div>
            </div>
        </AuthenticatedLayout>
    )
}