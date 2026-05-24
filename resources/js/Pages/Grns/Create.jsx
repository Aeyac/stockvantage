import { Head, Link, useForm } from '@inertiajs/react'
import { useState } from 'react'
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

export default function Create({ openPurchaseOrders, warehouses }) {
    const [selectedPo, setSelectedPo] = useState(null)

    const { data, setData, post, processing, errors } = useForm({
        po_id: '',
        warehouse_id: '',
        notes: '',
        line_items: [],
    })

    // when user selects a PO, auto-populate line items from PO's PR line items
    function handlePoSelect(poId) {
        setData('po_id', poId)

        if (!poId) {
            setSelectedPo(null)
            setData('line_items', [])
            return
        }

        const po = openPurchaseOrders.find(p => p.id == poId)
        setSelectedPo(po)

        // pre-fill line items from the PO's PR line items
        const lineItems = po?.purchase_request?.line_items?.map(li => ({
            catalog_item_id: li.catalog_item_id,
            catalog_item_name: li.catalog_item?.name ?? '—',
            catalog_item_sku: li.catalog_item?.sku ?? '—',
            quantity_ordered: li.quantity,
            quantity_received: li.quantity, // default to full receipt
        })) ?? []

        setData('line_items', lineItems)
    }

    function updateQuantity(index, value) {
        const updated = data.line_items.map((item, i) =>
            i === index ? { ...item, quantity_received: parseInt(value) || 0 } : item
        )
        setData('line_items', updated)
    }

    function handleSubmit(e) {
        e.preventDefault()
        post('/grns')
    }

    return (
        <AuthenticatedLayout header="Record GRN">
            <Head title="Record GRN" />

            <style>{`
                .grn-card {
                    background: ${C.surface}; border: 1px solid ${C.outline};
                    border-radius: 16px; padding: 28px; max-width: 760px;
                }
                .grn-field { display: flex; flex-direction: column; gap: 6px; }
                .grn-label {
                    font-size: 11px; font-weight: 600; color: ${C.onSurfaceVar};
                    text-transform: uppercase; letter-spacing: 0.08em;
                }
                .grn-input, .grn-select, .grn-textarea {
                    background: ${C.surfaceLow}; border: 1px solid ${C.outline};
                    border-radius: 10px; padding: 11px 14px; color: ${C.onSurface};
                    font-size: 14px; font-family: inherit; outline: none;
                    transition: border-color 0.15s, box-shadow 0.15s; width: 100%;
                }
                .grn-input:focus, .grn-select:focus, .grn-textarea:focus {
                    border-color: ${C.primary}70;
                    box-shadow: 0 0 0 3px ${C.primary}10;
                }
                .grn-input::placeholder, .grn-textarea::placeholder { color: ${C.onSurfaceVar}40; }
                .grn-select option { background: ${C.surfaceLow}; }
                .grn-textarea { resize: vertical; min-height: 80px; }
                .grn-error { font-size: 12px; color: ${C.error}; margin-top: 3px; }
                .grn-btn-primary {
                    display: inline-flex; align-items: center; gap: 7px;
                    background: ${C.primary}; color: ${C.onPrimary};
                    border: none; border-radius: 12px; padding: 11px 22px;
                    font-size: 14px; font-weight: 600; cursor: pointer;
                    text-decoration: none; transition: filter 0.15s; font-family: inherit;
                }
                .grn-btn-primary:hover { filter: brightness(1.08); }
                .grn-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
                .grn-btn-ghost {
                    display: inline-flex; align-items: center;
                    background: none; color: ${C.onSurfaceVar};
                    border: 1px solid ${C.outline}; border-radius: 12px;
                    padding: 11px 22px; font-size: 14px; font-weight: 500;
                    cursor: pointer; text-decoration: none; transition: all 0.15s; font-family: inherit;
                }
                .grn-btn-ghost:hover { color: ${C.onSurface}; border-color: ${C.onSurfaceVar}50; }
                .grn-divider { height: 1px; background: ${C.outline}; margin: 6px 0; }
                .grn-section {
                    font-size: 11px; font-weight: 700; color: ${C.onSurfaceVar}60;
                    text-transform: uppercase; letter-spacing: 0.1em;
                    margin-bottom: 16px; margin-top: 6px;
                }
                .grn-line-table { width: 100%; border-collapse: collapse; }
                .grn-line-table th {
                    text-align: left; padding: 10px 14px;
                    font-size: 11px; font-weight: 600; color: ${C.onSurfaceVar};
                    text-transform: uppercase; letter-spacing: 0.06em;
                    border-bottom: 1px solid ${C.outline};
                    background: ${C.surfaceLow};
                }
                .grn-line-table td {
                    padding: 12px 14px; color: ${C.onSurfaceVar};
                    border-bottom: 1px solid ${C.outline}15; font-size: 14px;
                    vertical-align: middle;
                }
                .grn-line-table tbody tr:last-child td { border-bottom: none; }
                .grn-qty-input {
                    background: ${C.surfaceLow}; border: 1px solid ${C.outline};
                    border-radius: 8px; padding: 8px 12px; color: ${C.onSurface};
                    font-size: 14px; font-family: inherit; outline: none;
                    width: 100px; text-align: center;
                    transition: border-color 0.15s, box-shadow 0.15s;
                }
                .grn-qty-input:focus {
                    border-color: ${C.primary}70;
                    box-shadow: 0 0 0 3px ${C.primary}10;
                }
                .grn-qty-short { border-color: ${C.tertiary}50 !important; }
                .grn-sku {
                    font-family: 'Courier New', monospace; font-size: 11px; font-weight: 700;
                    color: ${C.tertiary}; background: ${C.tertiary}12;
                    border: 1px solid ${C.tertiary}25; padding: 2px 7px; border-radius: 5px;
                }
                .grn-po-info {
                    padding: 14px 16px; background: ${C.surfaceLow};
                    border: 1px solid ${C.outline}; border-radius: 10px;
                    display: flex; gap: 20px; flex-wrap: wrap;
                }
                .grn-po-info-item { display: flex; flex-direction: column; gap: 3px; }
                .grn-po-info-label { font-size: 11px; color: ${C.onSurfaceVar}60; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
                .grn-po-info-value { font-size: 13px; color: ${C.onSurface}; font-weight: 500; }
            `}</style>

            <Link href="/grns" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13,
                color: C.onSurfaceVar, textDecoration: 'none', marginBottom: 24, transition: 'color 0.15s',
            }}
                onMouseEnter={e => e.currentTarget.style.color = C.onSurface}
                onMouseLeave={e => e.currentTarget.style.color = C.onSurfaceVar}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
                Back to GRN
            </Link>

            <div className="grn-card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                    <div className="grn-section">Receipt Details</div>

                    {/* PO + Warehouse */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div className="grn-field">
                            <label className="grn-label">Purchase Order *</label>
                            <select
                                className="grn-select"
                                value={data.po_id}
                                onChange={e => handlePoSelect(e.target.value)}
                            >
                                <option value="">Select a PO</option>
                                {openPurchaseOrders.map(po => (
                                    <option key={po.id} value={po.id}>
                                        {po.po_number}
                                    </option>
                                ))}
                            </select>
                            {errors.po_id && <span className="grn-error">⚠ {errors.po_id}</span>}
                        </div>

                        <div className="grn-field">
                            <label className="grn-label">Receiving Warehouse *</label>
                            <select
                                className="grn-select"
                                value={data.warehouse_id}
                                onChange={e => setData('warehouse_id', e.target.value)}
                            >
                                <option value="">Select a warehouse</option>
                                {warehouses.map(wh => (
                                    <option key={wh.id} value={wh.id}>
                                        {wh.name}
                                    </option>
                                ))}
                            </select>
                            {errors.warehouse_id && <span className="grn-error">⚠ {errors.warehouse_id}</span>}
                        </div>
                    </div>

                    {/* PO info summary */}
                    {selectedPo && (
                        <div className="grn-po-info">
                            <div className="grn-po-info-item">
                                <span className="grn-po-info-label">PO Number</span>
                                <span className="grn-po-info-value" style={{ fontFamily: 'Courier New, monospace', color: C.primary }}>
                                    {selectedPo.po_number}
                                </span>
                            </div>
                            <div className="grn-po-info-item">
                                <span className="grn-po-info-label">Status</span>
                                <span className="grn-po-info-value" style={{ textTransform: 'capitalize' }}>
                                    {selectedPo.status.replace(/_/g, ' ')}
                                </span>
                            </div>
                            <div className="grn-po-info-item">
                                <span className="grn-po-info-label">Total Value</span>
                                <span className="grn-po-info-value">
                                    ₱{parseFloat(selectedPo.total_amount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                            <div className="grn-po-info-item">
                                <span className="grn-po-info-label">Items</span>
                                <span className="grn-po-info-value">
                                    {selectedPo.purchase_request?.line_items?.length ?? 0} line item{selectedPo.purchase_request?.line_items?.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Notes */}
                    <div className="grn-field">
                        <label className="grn-label">Notes</label>
                        <textarea
                            className="grn-textarea"
                            value={data.notes}
                            onChange={e => setData('notes', e.target.value)}
                            placeholder="Any remarks about this delivery..."
                        />
                        {errors.notes && <span className="grn-error">⚠ {errors.notes}</span>}
                    </div>

                    {/* Line items — only show when PO is selected */}
                    {data.line_items.length > 0 && (
                        <>
                            <div className="grn-divider" />
                            <div className="grn-section">Received Items</div>

                            <p style={{ fontSize: 12, color: C.onSurfaceVar, opacity: 0.7, marginTop: -12 }}>
                                Enter the actual quantity received for each item. Leave as-is if fully received.
                            </p>

                            <div style={{ border: `1px solid ${C.outline}`, borderRadius: 10, overflow: 'hidden' }}>
                                <table className="grn-line-table">
                                    <thead>
                                        <tr>
                                            <th>SKU</th>
                                            <th>Item</th>
                                            <th style={{ textAlign: 'center' }}>Qty Ordered</th>
                                            <th style={{ textAlign: 'center' }}>Qty Received</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.line_items.map((item, index) => {
                                            const isShort = item.quantity_received < item.quantity_ordered
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <span className="grn-sku">{item.catalog_item_sku}</span>
                                                    </td>
                                                    <td>
                                                        <span style={{ fontWeight: 500, color: C.onSurface }}>
                                                            {item.catalog_item_name}
                                                        </span>
                                                    </td>
                                                    <td style={{ textAlign: 'center', fontWeight: 600, color: C.onSurface }}>
                                                        {item.quantity_ordered}
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                max={item.quantity_ordered}
                                                                value={item.quantity_received}
                                                                onChange={e => updateQuantity(index, e.target.value)}
                                                                className={`grn-qty-input ${isShort ? 'grn-qty-short' : ''}`}
                                                            />
                                                            {isShort && (
                                                                <span style={{ fontSize: 11, color: C.tertiary }}>
                                                                    {item.quantity_ordered - item.quantity_received} short
                                                                </span>
                                                            )}
                                                        </div>
                                                        {errors[`line_items.${index}.quantity_received`] && (
                                                            <span className="grn-error">
                                                                ⚠ {errors[`line_items.${index}.quantity_received`]}
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Discrepancy warning */}
                            {data.line_items.some(i => i.quantity_received < i.quantity_ordered) && (
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: 10,
                                    padding: '12px 16px', background: `${C.tertiary}10`,
                                    border: `1px solid ${C.tertiary}25`, borderRadius: 10,
                                }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.tertiary} strokeWidth="2" style={{ flexShrink: 0 }}>
                                        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                        <line x1="12" y1="9" x2="12" y2="13" />
                                        <line x1="12" y1="17" x2="12.01" y2="17" />
                                    </svg>
                                    <p style={{ fontSize: 13, color: C.tertiary }}>
                                        Some items are short — this GRN will be flagged as a discrepancy and the PO will be marked partially received.
                                    </p>
                                </div>
                            )}
                        </>
                    )}

                    {errors.line_items && (
                        <span className="grn-error">⚠ {errors.line_items}</span>
                    )}

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 10, paddingTop: 20, borderTop: `1px solid ${C.outline}` }}>
                        <button
                            type="submit"
                            disabled={processing || data.line_items.length === 0}
                            className="grn-btn-primary"
                        >
                            {processing ? 'Saving...' : 'Submit GRN'}
                        </button>
                        <Link href="/grns" className="grn-btn-ghost">Cancel</Link>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    )
}