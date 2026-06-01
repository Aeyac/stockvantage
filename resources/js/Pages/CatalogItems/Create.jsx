import { Head, Link, useForm } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import BackButton from '@/Components/BackButton'
import { useAuth } from '@/hooks/useAuth'

export default function Create({ activeSuppliers }) {
    const { data, setData, post, processing, errors } = useForm({
        supplier_id: '',
        sku: '',
        name: '',
        category: '',
        unit_cost: '',
        safety_stock: 0,
    })

    const { currencySymbol } = useAuth();

    function handleSubmit(e) {
        e.preventDefault()
        post('/catalog-items')
    }

    return (
        <AuthenticatedLayout header="Add Catalog Item">
            <Head title="Add Catalog Item" />

            <style>{`
                /* Enforce explicit light background card wrapper & override global dark containers */
                .sv-form-card {
                    background: #ffffff !important;
                    border: 1px solid #e2e8f0 !important;
                    border-radius: 12px !important;
                    padding: 28px !important;
                    max-width: 640px !important;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05) !important;
                }
                .sv-field { display: flex; flex-direction: column; gap: 6px; }
                
                /* High-contrast labels for clear visibility */
                .sv-label {
                    font-size: 11.5px !important;
                    font-weight: 700 !important;
                    color: #475569 !important;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                
                /* Crisp white interactive fields overriding dark style inheritance */
                .sv-input, .sv-select, .sv-textarea {
                    background: #ffffff !important;
                    border: 1px solid #cbd5e1 !important;
                    border-radius: 8px !important;
                    padding: 10px 14px !important;
                    color: #0f172a !important;
                    font-size: 13.5px !important;
                    font-family: inherit !important;
                    outline: none !important;
                    transition: border-color 0.15s, box-shadow 0.15s !important;
                    width: 100% !important;
                    box-sizing: border-box !important;
                }
                
                /* Focus indicator utilizing your dashboard green accent theme */
                .sv-input:focus, .sv-select:focus, .sv-textarea:focus {
                    border-color: #00C488 !important;
                    box-shadow: 0 0 0 3px rgba(0, 196, 136, 0.15) !important;
                    background: #ffffff !important;
                }
                
                .sv-input::placeholder, .sv-textarea::placeholder { color: #94a3b8 !important; opacity: 1 !important; }
                .sv-select option { background: #ffffff !important; color: #0f172a !important; }
                .sv-textarea { resize: vertical; min-height: 90px; }
                
                /* Clear high-visibility semantic validation text */
                .sv-error { font-size: 12.5px !important; color: #dc2626 !important; margin-top: 4px !important; font-weight: 500 !important; }
                
                /* Brand Green Button */
                .sv-btn-primary {
                    display: inline-flex !important; align-items: center !important; gap: 7px !important;
                    background: #17aa54 !important; color: #ffffff !important; border: none !important;
                    border-radius: 8px !important; padding: 10px 20px !important;
                    font-size: 13.5px !important; font-weight: 600 !important; cursor: pointer !important;
                    text-decoration: none !important; transition: background-color 0.15s !important; font-family: inherit !important;
                }
                .sv-btn-primary:hover:not(:disabled) { background: #1a8f4b !important; }
                .sv-btn-primary:disabled { opacity: 0.6 !important; cursor: not-allowed !important; }
                
                /* Bordered Neutral Secondary Action Button */
                .sv-btn-ghost {
                    display: inline-flex !important; align-items: center !important;
                    background: #ffffff !important; color: #64748b !important;
                    border: 1px solid #e2e8f0 !important; border-radius: 8px !important;
                    padding: 10px 20px !important; font-size: 13.5px !important; font-weight: 500 !important;
                    cursor: pointer !important; text-decoration: none !important;
                    transition: all 0.15s !important; font-family: inherit !important;
                }
                .sv-btn-ghost:hover { color: #1e293b !important; border-color: #cbd5e1 !important; background: #f8fafc !important; }
                
                /* Clean dividers and sub-sectioning typography markers */
                .sv-divider {
                    height: 1px !important; background: #f1f5f9 !important; margin: 4px 0 !important;
                }
                .sv-section-label {
                    font-size: 12px !important; font-weight: 700 !important; color: #94a3b8 !important;
                    text-transform: uppercase; letter-spacing: 0.05em;
                    margin-bottom: 16px !important; margin-top: 8px !important;
                }

                /* Unique identifier treatment */
                .sv-sku-input {
                    font-family: 'Courier New', monospace !important;
                    color: #d97706 !important; letter-spacing: 0.04em;
                }
                .sv-hint { font-size: 12px !important; color: #94a3b8 !important; margin-top: 3px !important; }
            `}</style>

            {/* Light-Theme Normalized Back Navigation Link Wrapper */}
            <BackButton link={"/catalog-items"} text={"Back to Catalog"} />


            <div className="sv-form-card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                    <div className="sv-section-label">Item Details</div>

                    {/* Supplier */}
                    <div className="sv-field">
                        <label className="sv-label">Supplier *</label>
                        <select className="sv-select" value={data.supplier_id} onChange={e => setData('supplier_id', e.target.value)}>
                            <option value="">Select a supplier</option>
                            {activeSuppliers.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                        {errors.supplier_id && <span className="sv-error">{errors.supplier_id}</span>}
                    </div>

                    {/* SKU + Name */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div className="sv-field">
                            <label className="sv-label">SKU *</label>
                            <input
                                className="sv-input sv-sku-input"
                                type="text"
                                value={data.sku}
                                onChange={e => setData('sku', e.target.value.toUpperCase())}
                                placeholder="ITEM-001"
                            />
                            <span className="sv-hint">Must be unique</span>
                            {errors.sku && <span className="sv-error">{errors.sku}</span>}
                        </div>
                        <div className="sv-field">
                            <label className="sv-label">Item Name *</label>
                            <input
                                className="sv-input"
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="e.g. Mechanical Keyboard"
                            />
                            {errors.name && <span className="sv-error">{errors.name}</span>}
                        </div>
                    </div>

                    {/* Category */}
                    <div className="sv-field">
                        <label className="sv-label">Category</label>
                        <input
                            className="sv-input"
                            type="text"
                            value={data.category}
                            onChange={e => setData('category', e.target.value)}
                            placeholder="e.g. Office Supplies, Electronics"
                        />
                        {errors.category && <span className="sv-error">{errors.category}</span>}
                    </div>

                    <div className="sv-divider" />
                    <div className="sv-section-label">Pricing & Stock</div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div className="sv-field">
                            <label className="sv-label">Unit Cost ({currencySymbol}) *</label>
                            <input
                                className="sv-input"
                                type="number"
                                min="0"
                                step="0.01"
                                value={data.unit_cost}
                                onChange={e => setData('unit_cost', e.target.value)}
                                placeholder="0.00"
                            />
                            {errors.unit_cost && <span className="sv-error">{errors.unit_cost}</span>}
                        </div>
                        <div className="sv-field">
                            <label className="sv-label">Safety Stock *</label>
                            <input
                                className="sv-input"
                                type="number"
                                min="0"
                                value={data.safety_stock}
                                onChange={e => setData('safety_stock', e.target.value)}
                                placeholder="0"
                            />
                            <span className="sv-hint">Alert triggers below this threshold</span>
                            {errors.safety_stock && <span className="sv-error">{errors.safety_stock}</span>}
                        </div>
                    </div>

                    {/* Actions Row Styles mapped to updated standard */}
                    <div style={{ display: 'flex', gap: 12, marginTop: 8, paddingTop: 20, borderTop: '1px solid #f1f5f9' }}>
                        <button type="submit" disabled={processing} className="sv-btn-primary">
                            {processing ? 'Saving...' : 'Save Item'}
                        </button>
                        <Link href="/catalog-items" className="sv-btn-ghost">Cancel</Link>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    )
}