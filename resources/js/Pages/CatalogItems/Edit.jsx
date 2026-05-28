import { Head, Link, useForm } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

// Refactored to light mode tokens matching the reference form design
const C = {
    bg: '#ffffff',
    surface: '#ffffff',
    surfaceLow: '#ffffff',
    surfaceHigh: '#f1f5f9', // Used for toggle background
    outline: '#e2e8f0',
    borderInput: '#cbd5e1',
    primary: '#17aa54',     // Brand green button fill & Active toggle state
    primaryHover: '#1a8f4b',// Brand green button hover
    primaryFocus: '#00C488',// Dashboard accent green for focus borders
    onPrimary: '#ffffff',
    textMain: '#0f172a',    // High-contrast input text
    textMuted: '#64748b',   // Subdued text / neutral actions
    textLabel: '#475569',   // High-visibility label gray
    textSection: '#94a3b8', // Section headers
    error: '#dc2626',       // Standard light-mode validation red
    skuText: '#b45309',     // Amber-700 for a readable tech font accent in light mode
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
                /* Enforce explicit light background card wrapper & override global dark containers */
                .ci-card {
                    background: ${C.surface} !important;
                    border: 1px solid ${C.outline} !important;
                    border-radius: 12px !important;
                    padding: 28px !important;
                    max-width: 640px !important;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05) !important;
                }
                .ci-field { display: flex; flex-direction: column; gap: 6px; }
                
                /* High-contrast labels for clear visibility */
                .ci-label {
                    font-size: 11.5px !important;
                    font-weight: 700 !important;
                    color: ${C.textLabel} !important;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                
                /* Crisp white interactive fields overriding dark style inheritance */
                .ci-input, .ci-select {
                    background: ${C.surfaceLow} !important;
                    border: 1px solid ${C.borderInput} !important;
                    border-radius: 8px !important;
                    padding: 10px 14px !important;
                    color: ${C.textMain} !important;
                    font-size: 13.5px !important;
                    font-family: inherit !important;
                    outline: none !important;
                    transition: border-color 0.15s, box-shadow 0.15s !important;
                    width: 100% !important;
                    box-sizing: border-box !important;
                }
                
                /* Focus indicator utilizing the dashboard green accent theme */
                .ci-input:focus, .ci-select:focus {
                    border-color: ${C.primaryFocus} !important;
                    box-shadow: 0 0 0 3px rgba(0, 196, 136, 0.15) !important;
                    background: #ffffff !important;
                }
                
                .ci-input::placeholder { color: ${C.textSection} !important; opacity: 1 !important; }
                .ci-select option { background: #ffffff !important; color: ${C.textMain} !important; }
                
                /* Clear high-visibility semantic validation text */
                .ci-error { font-size: 12.5px !important; color: ${C.error} !important; margin-top: 4px !important; font-weight: 500 !important; }
                .ci-hint { font-size: 12px !important; color: ${C.textMuted} !important; margin-top: 4px !important; }
                
                /* Brand Green Button */
                .ci-btn-primary {
                    display: inline-flex !important; align-items: center !important; gap: 7px !important;
                    background: ${C.primary} !important; color: ${C.onPrimary} !important; border: none !important;
                    border-radius: 8px !important; padding: 10px 20px !important;
                    font-size: 13.5px !important; font-weight: 600 !important; cursor: pointer !important;
                    text-decoration: none !important; transition: background-color 0.15s !important; font-family: inherit !important;
                }
                .ci-btn-primary:hover:not(:disabled) { background: ${C.primaryHover} !important; }
                .ci-btn-primary:disabled { opacity: 0.6 !important; cursor: not-allowed !important; }
                
                /* Bordered Neutral Secondary Action Button */
                .ci-btn-ghost {
                    display: inline-flex !important; align-items: center !important;
                    background: #ffffff !important; color: ${C.textMuted} !important;
                    border: 1px solid ${C.outline} !important; border-radius: 8px !important;
                    padding: 10px 20px !important; font-size: 13.5px !important; font-weight: 500 !important;
                    cursor: pointer !important; text-decoration: none !important;
                    transition: all 0.15s !important; font-family: inherit !important;
                }
                .ci-btn-ghost:hover { color: ${C.textMain} !important; border-color: ${C.borderInput} !important; background: #f8fafc !important; }
                
                /* Clean dividers and sub-sectioning typography markers */
                .ci-divider { height: 1px !important; background: #f1f5f9 !important; margin: 4px 0 !important; }
                .ci-section {
                    font-size: 12px !important; font-weight: 700 !important; color: ${C.textSection} !important;
                    text-transform: uppercase; letter-spacing: 0.05em;
                    margin-bottom: 16px !important; margin-top: 8px !important;
                }
                
                /* Clean monospaced styling for SKU code block appearance */
                .ci-sku-input {
                    font-family: 'Courier New', monospace !important;
                    color: ${C.skuText} !important; font-weight: 600 !important; letter-spacing: 0.04em;
                }
                
                /* Polished Toggle Row Layout for Light Theme */
                .ci-toggle-row {
                    display: flex; align-items: center; gap: 14px;
                    padding: 14px 16px; background: #f8fafc;
                    border: 1px solid ${C.outline}; border-radius: 8px;
                }
                .ci-toggle {
                    position: relative; width: 40px; height: 22px;
                    background: ${C.borderInput}; border-radius: 20px;
                    cursor: pointer; transition: background-color 0.15s !important;
                    flex-shrink: 0; border: none; padding: 0; outline: none;
                }
                /* Swapped toggle active state and hover colors to perfectly mirror Save button colors */
                .ci-toggle.on { background: ${C.primary} !important; }
                .ci-toggle:hover { filter: brightness(0.95); }
                .ci-toggle.on:hover { background: ${C.primaryHover} !important; filter: none; }
                
                .ci-toggle::after {
                    content: ''; position: absolute; top: 3px; left: 3px;
                    width: 16px; height: 16px; background: #ffffff;
                    border-radius: 50%; transition: transform 0.2s;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.15);
                }
                .ci-toggle.on::after { transform: translateX(18px); }
            `}</style>

            {/* Light-Theme Normalized Back Navigation Link Wrapper */}
            <Link href="/catalog-items" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 13, color: '#64748b', textDecoration: 'none',
                marginBottom: 20, transition: 'color 0.15s', fontWeight: 500
            }}
                onMouseEnter={e => e.currentTarget.style.color = '#1e293b'}
                onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
                        {errors.supplier_id && <span className="ci-error">{errors.supplier_id}</span>}
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
                            {errors.sku && <span className="ci-error">{errors.sku}</span>}
                        </div>
                        <div className="ci-field">
                            <label className="ci-label">Item Name *</label>
                            <input
                                className="ci-input" type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                            />
                            {errors.name && <span className="ci-error">{errors.name}</span>}
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
                        {errors.category && <span className="ci-error">{errors.category}</span>}
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
                            {errors.unit_cost && <span className="ci-error">{errors.unit_cost}</span>}
                        </div>
                        <div className="ci-field">
                            <label className="ci-label">Safety Stock *</label>
                            <input
                                className="ci-input" type="number" min="0"
                                value={data.safety_stock}
                                onChange={e => setData('safety_stock', e.target.value)}
                            />
                            <span className="ci-hint">Alert triggers below this threshold</span>
                            {errors.safety_stock && <span className="ci-error">{errors.safety_stock}</span>}
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
                            <div style={{ fontSize: 13.5, fontWeight: 600, color: data.is_active ? C.primary : '#64748b' }}>
                                {data.is_active ? 'Active' : 'Inactive'}
                            </div>
                            <div style={{ fontSize: 12, color: '#64748b', opacity: 0.8, marginTop: 2 }}>
                                {data.is_active
                                    ? 'Item is visible in the procurement catalog'
                                    : 'Item is hidden from procurement requests'}
                            </div>
                        </div>
                        {errors.is_active && <span className="ci-error">{errors.is_active}</span>}
                    </div>

                    {/* Actions Row Styles */}
                    <div style={{ display: 'flex', gap: 12, marginTop: 8, paddingTop: 20, borderTop: '1px solid #f1f5f9' }}>
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