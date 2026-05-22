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

function formatCurrency(value) {
    if (!value && value !== 0) return '₱0.00'
    return '₱' + parseFloat(value).toLocaleString('en-PH', {
        minimumFractionDigits: 2, maximumFractionDigits: 2,
    })
}

export default function Create({ catalogItems }) {
    const { data, setData, post, processing, errors } = useForm({
        justification: '',
        items: [{ catalog_item_id: '', quantity: 1 }],
    })

    // compute running total from catalog item prices
    function getLineTotal(item) {
        const catalog = catalogItems.find(c => c.id == item.catalog_item_id)
        if (!catalog || !item.quantity) return 0
        return parseFloat(catalog.unit_cost) * parseInt(item.quantity)
    }

    function getTotal() {
        return data.items.reduce((sum, item) => sum + getLineTotal(item), 0)
    }

    function addRow() {
        setData('items', [...data.items, { catalog_item_id: '', quantity: 1 }])
    }

    function removeRow(index) {
        if (data.items.length === 1) return // keep at least one row
        setData('items', data.items.filter((_, i) => i !== index))
    }

    function updateRow(index, field, value) {
        const updated = data.items.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        )
        setData('items', updated)
    }

    function handleSubmit(e) {
        e.preventDefault()
        post('/purchase-requests')
    }

    const total = getTotal()
    const willAutoApprove = total > 0 && total < 500

    return (
        <AuthenticatedLayout header="New Purchase Request">
            <Head title="New Purchase Request" />

            <style>{`
                .pr-card {
                    background: ${C.surface}; border: 1px solid ${C.outline};
                    border-radius: 16px; padding: 28px; max-width: 780px;
                }
                .pr-field { display: flex; flex-direction: column; gap: 6px; }
                .pr-label {
                    font-size: 11px; font-weight: 600; color: ${C.onSurfaceVar};
                    text-transform: uppercase; letter-spacing: 0.08em;
                }
                .pr-input, .pr-select, .pr-textarea {
                    background: ${C.surfaceLow}; border: 1px solid ${C.outline};
                    border-radius: 10px; padding: 11px 14px; color: ${C.onSurface};
                    font-size: 14px; font-family: inherit; outline: none;
                    transition: border-color 0.15s, box-shadow 0.15s; width: 100%;
                }
                .pr-input:focus, .pr-select:focus, .pr-textarea:focus {
                    border-color: ${C.primary}70;
                    box-shadow: 0 0 0 3px ${C.primary}10;
                }
                .pr-input::placeholder, .pr-textarea::placeholder { color: ${C.onSurfaceVar}40; }
                .pr-select option { background: ${C.surfaceLow}; }
                .pr-textarea { resize: vertical; min-height: 90px; }
                .pr-error { font-size: 12px; color: ${C.error}; margin-top: 3px; }
                .pr-btn-primary {
                    display: inline-flex; align-items: center; gap: 7px;
                    background: ${C.primary}; color: ${C.onPrimary};
                    border: none; border-radius: 12px; padding: 11px 22px;
                    font-size: 14px; font-weight: 600; cursor: pointer;
                    text-decoration: none; transition: filter 0.15s; font-family: inherit;
                }
                .pr-btn-primary:hover { filter: brightness(1.08); }
                .pr-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
                .pr-btn-ghost {
                    display: inline-flex; align-items: center;
                    background: none; color: ${C.onSurfaceVar};
                    border: 1px solid ${C.outline}; border-radius: 12px;
                    padding: 11px 22px; font-size: 14px; font-weight: 500;
                    cursor: pointer; text-decoration: none; transition: all 0.15s; font-family: inherit;
                }
                .pr-btn-ghost:hover { color: ${C.onSurface}; border-color: ${C.onSurfaceVar}50; }
                .pr-btn-add {
                    display: inline-flex; align-items: center; gap: 6px;
                    background: none; color: ${C.primary};
                    border: 1px dashed ${C.primary}40; border-radius: 10px;
                    padding: 9px 16px; font-size: 13px; font-weight: 500;
                    cursor: pointer; transition: all 0.15s; font-family: inherit; width: 100%;
                    justify-content: center;
                }
                .pr-btn-add:hover { background: ${C.primary}08; border-color: ${C.primary}70; }
                .pr-btn-remove {
                    background: none; border: none; cursor: pointer;
                    color: ${C.onSurfaceVar}; padding: 6px; border-radius: 6px;
                    transition: all 0.15s; display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                }
                .pr-btn-remove:hover { color: ${C.error}; background: ${C.error}10; }
                .pr-divider { height: 1px; background: ${C.outline}; margin: 6px 0; }
                .pr-section {
                    font-size: 11px; font-weight: 700; color: ${C.onSurfaceVar}60;
                    text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; margin-top: 6px;
                }
                .pr-line-row {
                    display: grid; gap: 12px; align-items: start;
                    grid-template-columns: 1fr 100px 120px 32px;
                }
                .pr-line-total {
                    font-size: 13px; font-weight: 600; color: ${C.onSurface};
                    padding: 11px 14px; background: ${C.surfaceLow};
                    border: 1px solid ${C.outline}; border-radius: 10px;
                    text-align: right; white-space: nowrap;
                }
                .pr-total-bar {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 16px 18px; background: ${C.surfaceLow};
                    border: 1px solid ${C.outline}; border-radius: 12px; margin-top: 4px;
                }
                .pr-auto-badge {
                    font-size: 11px; font-weight: 700; padding: 3px 10px;
                    border-radius: 20px; text-transform: uppercase; letter-spacing: 0.05em;
                    background: ${C.primary}12; color: ${C.primary};
                    border: 1px solid ${C.primary}25;
                }
                .pr-approval-badge {
                    font-size: 11px; font-weight: 700; padding: 3px 10px;
                    border-radius: 20px; text-transform: uppercase; letter-spacing: 0.05em;
                    background: ${C.tertiary}12; color: ${C.tertiary};
                    border: 1px solid ${C.tertiary}25;
                }

                @media (max-width: 600px) {
                    .pr-line-row { grid-template-columns: 1fr 80px; }
                    .pr-line-total { display: none; }
                }
            `}</style>

            {/* Back */}
            <Link href="/purchase-requests" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13,
                color: C.onSurfaceVar, textDecoration: 'none', marginBottom: 24, transition: 'color 0.15s',
            }}
                onMouseEnter={e => e.currentTarget.style.color = C.onSurface}
                onMouseLeave={e => e.currentTarget.style.color = C.onSurfaceVar}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
                Back to Purchase Requests
            </Link>

            <div className="pr-card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                    {/* Justification */}
                    <div className="pr-section">Request Details</div>
                    <div className="pr-field">
                        <label className="pr-label">Justification *</label>
                        <textarea
                            className="pr-textarea"
                            value={data.justification}
                            onChange={e => setData('justification', e.target.value)}
                            placeholder="Explain why these items are needed..."
                        />
                        {errors.justification && <span className="pr-error">⚠ {errors.justification}</span>}
                    </div>

                    <div className="pr-divider" />
                    <div className="pr-section">Line Items</div>

                    {/* Column headers */}
                    <div className="pr-line-row" style={{ marginBottom: -8 }}>
                        <span className="pr-label">Item</span>
                        <span className="pr-label">Qty</span>
                        <span className="pr-label" style={{ textAlign: 'right' }}>Line Total</span>
                        <span />
                    </div>

                    {/* Line item rows */}
                    {data.items.map((item, index) => {
                        const lineTotal = getLineTotal(item)
                        const selectedCatalog = catalogItems.find(c => c.id == item.catalog_item_id)

                        return (
                            <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <div className="pr-line-row">
                                    {/* Catalog item dropdown */}
                                    <div>
                                        <select
                                            className="pr-select"
                                            value={item.catalog_item_id}
                                            onChange={e => updateRow(index, 'catalog_item_id', e.target.value)}
                                        >
                                            <option value="">Select item</option>
                                            {catalogItems.map(c => (
                                                <option key={c.id} value={c.id}>
                                                    {c.name} — {c.sku}
                                                </option>
                                            ))}
                                        </select>
                                        {/* show unit cost hint */}
                                        {selectedCatalog && (
                                            <div style={{ fontSize: 11, color: C.onSurfaceVar, marginTop: 4, paddingLeft: 2 }}>
                                                Unit cost: {formatCurrency(selectedCatalog.unit_cost)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Quantity */}
                                    <input
                                        className="pr-input"
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={e => updateRow(index, 'quantity', e.target.value)}
                                    />

                                    {/* Line total */}
                                    <div className="pr-line-total">
                                        {formatCurrency(lineTotal)}
                                    </div>

                                    {/* Remove row */}
                                    <button
                                        type="button"
                                        className="pr-btn-remove"
                                        onClick={() => removeRow(index)}
                                        disabled={data.items.length === 1}
                                        title="Remove row"
                                    >
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Row-level errors */}
                                {errors[`items.${index}.catalog_item_id`] && (
                                    <span className="pr-error" style={{ paddingLeft: 2 }}>
                                        ⚠ {errors[`items.${index}.catalog_item_id`]}
                                    </span>
                                )}
                                {errors[`items.${index}.quantity`] && (
                                    <span className="pr-error" style={{ paddingLeft: 2 }}>
                                        ⚠ {errors[`items.${index}.quantity`]}
                                    </span>
                                )}
                            </div>
                        )
                    })}

                    {errors.items && (
                        <span className="pr-error">⚠ {errors.items}</span>
                    )}

                    {/* Add row button */}
                    <button type="button" className="pr-btn-add" onClick={addRow}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add Another Item
                    </button>

                    {/* Running total */}
                    {total > 0 && (
                        <div className="pr-total-bar">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <span style={{ fontSize: 12, color: C.onSurfaceVar, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                                    Estimated Total
                                </span>
                                <span style={{ fontSize: 20, fontWeight: 700, color: C.onSurface }}>
                                    {formatCurrency(total)}
                                </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                                {willAutoApprove ? (
                                    <>
                                        <span className="pr-auto-badge">Auto Approved</span>
                                        <span style={{ fontSize: 11, color: C.onSurfaceVar }}>
                                            Below ₱5000 threshold
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="pr-approval-badge">Needs Approval</span>
                                        <span style={{ fontSize: 11, color: C.onSurfaceVar }}>
                                            ₱5000 and above requires manager approval
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div style={{
                        display: 'flex', gap: 10, marginTop: 6,
                        paddingTop: 20, borderTop: `1px solid ${C.outline}`,
                    }}>
                        <button type="submit" disabled={processing} className="pr-btn-primary">
                            {processing ? 'Submitting...' : 'Submit Request'}
                        </button>
                        <Link href="/purchase-requests" className="pr-btn-ghost">Cancel</Link>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    )
}