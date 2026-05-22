import { Head, Link, useForm } from '@inertiajs/react'
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

export default function Edit({ catalogItem, suppliers }) {
    const { data, setData, put, processing, errors } = useForm({
        supplier_id: catalogItem.supplier_id,
        sku: catalogItem.sku,
        name: catalogItem.name,
        category: catalogItem.category ?? '',
        unit_cost: catalogItem.unit_cost,
        safety_stock: catalogItem.safety_stock,
        is_active: catalogItem.is_active,
    })

    function handleSubmit(e) {
        e.preventDefault()
        put(`/catalog-items/${catalogItem.id}`)
    }

    return (
        <AuthenticatedLayout header="Edit Catalog Item">
            <Head title="Edit Catalog Item" />

            <style>{`
                .ci-card {
                    background: ${C.surface}; border: 1px solid ${C.outline};
                    border-radius: 16px; padding: 28px; max-width: 660px;
                }
                .ci-field { display: flex; flex-direction: column; gap: 6px; }
                .ci-label {
                    font-size: 11px; font-weight: 600; color: ${C.onSurfaceVar};
                    text-transform: uppercase; letter-spacing: 0.08em;
                }
                .ci-input, .ci-select {
                    background: ${C.surfaceLow}; border: 1px solid ${C.outline};
                    border-radius: 10px; padding: 11px 14px; color: ${C.onSurface};
                    font-size: 14px; font-family: inherit; outline: none;
                    transition: border-color 0.15s, box-shadow 0.15s; width: 100%;
                }
                .ci-input:focus, .ci-select:focus {
                    border-color: ${C.primary}70;
                    box-shadow: 0 0 0 3px ${C.primary}10;
                }
                .ci-input::placeholder { color: ${C.onSurfaceVar}40; }
                .ci-select option { background: ${C.surfaceLow}; }
                .ci-error { font-size: 12px; color: ${C.error}; margin-top: 3px; display: flex; align-items: center; gap: 4px; }
                .ci-hint { font-size: 12px; color: ${C.onSurfaceVar}60; margin-top: 3px; }
                .ci-btn-primary {
                    display: inline-flex; align-items: center; gap: 7px;
                    background: ${C.primary}; color: ${C.onPrimary};
                    border: none; border-radius: 12px; padding: 11px 22px;
                    font-size: 14px; font-weight: 600; cursor: pointer;
                    text-decoration: none; transition: filter 0.15s; font-family: inherit;
                }
                .ci-btn-primary:hover { filter: brightness(1.08); }
                .ci-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
                .ci-btn-ghost {
                    display: inline-flex; align-items: center;
                    background: none; color: ${C.onSurfaceVar};
                    border: 1px solid ${C.outline}; border-radius: 12px;
                    padding: 11px 22px; font-size: 14px; font-weight: 500;
                    cursor: pointer; text-decoration: none; transition: all 0.15s; font-family: inherit;
                }
                .ci-btn-ghost:hover { color: ${C.onSurface}; border-color: ${C.onSurfaceVar}50; }
                .ci-divider { height: 1px; background: ${C.outline}; margin: 6px 0; }
                .ci-section {
                    font-size: 11px; font-weight: 700; color: ${C.onSurfaceVar}60;
                    text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; margin-top: 6px;
                }
                .ci-sku-input {
                    font-family: 'Courier New', monospace !important;
                    color: ${C.tertiary} !important; letter-spacing: 0.04em;
                }
                .ci-toggle-row {
                    display: flex; align-items: center; gap: 14px;
                    padding: 14px 16px; background: ${C.surfaceLow};
                    border: 1px solid ${C.outline}; border-radius: 12px;
                }
                .ci-toggle {
                    position: relative; width: 40px; height: 22px;
                    background: ${C.surfaceHigh}; border-radius: 20px;
                    cursor: pointer; transition: background 0.2s;
                    flex-shrink: 0; border: none; padding: 0;
                }
                .ci-toggle.on { background: ${C.primary}; }
                .ci-toggle::after {
                    content: ''; position: absolute; top: 3px; left: 3px;
                    width: 16px; height: 16px; background: #fff;
                    border-radius: 50%; transition: transform 0.2s;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
                }
                .ci-toggle.on::after { transform: translateX(18px); }
            `}</style>

            {/* Back */}
            <Link href="/catalog-items" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13,
                color: C.onSurfaceVar, textDecoration: 'none', marginBottom: 24, transition: 'color 0.15s',
            }}
                onMouseEnter={e => e.currentTarget.style.color = C.onSurface}
                onMouseLeave={e => e.currentTarget.style.color = C.onSurfaceVar}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
                Back to Catalog
            </Link>

            <div className="ci-card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                    <div className="ci-section">Item Details</div>

                    {/* Supplier */}
                    <div className="ci-field">
                        <label className="ci-label">Supplier *</label>
                        <select className="ci-select" value={data.supplier_id} onChange={e => setData('supplier_id', e.target.value)}>
                            <option value="">Select a supplier</option>
                            {suppliers.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                        {errors.supplier_id && <span className="ci-error">⚠ {errors.supplier_id}</span>}
                    </div>

                    {/* SKU + Name */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div className="ci-field">
                            <label className="ci-label">SKU *</label>
                            <input
                                className="ci-input ci-sku-input" type="text"
                                value={data.sku}
                                onChange={e => setData('sku', e.target.value.toUpperCase())}
                            />
                            {errors.sku && <span className="ci-error">⚠ {errors.sku}</span>}
                        </div>
                        <div className="ci-field">
                            <label className="ci-label">Item Name *</label>
                            <input
                                className="ci-input" type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                            />
                            {errors.name && <span className="ci-error">⚠ {errors.name}</span>}
                        </div>
                    </div>

                    {/* Category */}
                    <div className="ci-field">
                        <label className="ci-label">Category</label>
                        <input
                            className="ci-input" type="text"
                            value={data.category}
                            onChange={e => setData('category', e.target.value)}
                            placeholder="e.g. Office Supplies, Electronics"
                        />
                        {errors.category && <span className="ci-error">⚠ {errors.category}</span>}
                    </div>

                    <div className="ci-divider" />
                    <div className="ci-section">Pricing & Stock</div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div className="ci-field">
                            <label className="ci-label">Unit Cost (₱) *</label>
                            <input
                                className="ci-input" type="number" min="0" step="0.01"
                                value={data.unit_cost}
                                onChange={e => setData('unit_cost', e.target.value)}
                            />
                            {errors.unit_cost && <span className="ci-error">⚠ {errors.unit_cost}</span>}
                        </div>
                        <div className="ci-field">
                            <label className="ci-label">Safety Stock *</label>
                            <input
                                className="ci-input" type="number" min="0"
                                value={data.safety_stock}
                                onChange={e => setData('safety_stock', e.target.value)}
                            />
                            <span className="ci-hint">Alert triggers below this threshold</span>
                            {errors.safety_stock && <span className="ci-error">⚠ {errors.safety_stock}</span>}
                        </div>
                    </div>

                    <div className="ci-divider" />
                    <div className="ci-section">Status</div>

                    <div className="ci-toggle-row">
                        <button
                            type="button"
                            className={`ci-toggle ${data.is_active ? 'on' : ''}`}
                            onClick={() => setData('is_active', !data.is_active)}
                        />
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: data.is_active ? C.primary : C.onSurfaceVar }}>
                                {data.is_active ? 'Active' : 'Inactive'}
                            </div>
                            <div style={{ fontSize: 12, color: C.onSurfaceVar, opacity: 0.6, marginTop: 2 }}>
                                {data.is_active
                                    ? 'Item is visible in the procurement catalog'
                                    : 'Item is hidden from procurement requests'}
                            </div>
                        </div>
                        {errors.is_active && <span className="ci-error">⚠ {errors.is_active}</span>}
                    </div>

                    {/* Actions */}
                    <div style={{
                        display: 'flex', gap: 10, marginTop: 6,
                        paddingTop: 20, borderTop: `1px solid ${C.outline}`,
                    }}>
                        <button type="submit" disabled={processing} className="ci-btn-primary">
                            {processing ? 'Saving...' : 'Update Item'}
                        </button>
                        <Link href="/catalog-items" className="ci-btn-ghost">Cancel</Link>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    )
}