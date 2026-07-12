import { Head, Link, useForm } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import BackButton from '@/Components/BackButton'

export default function Edit({ supplier }) {
    const { data, setData, put, processing, errors } = useForm({
        name: supplier.name,
        contact_email: supplier.contact_email,
        phone: supplier.phone ?? '',
        address: supplier.address ?? '',
        entity_number: supplier.entity_number ?? '',
        payment_terms: supplier.payment_terms,
        is_active: supplier.is_active,
        updated_at: supplier.updated_at,
    })
    


    function handleSubmit(e) {
        e.preventDefault()
        put(`/suppliers/${supplier.id}`)
    }

    return (
        <AuthenticatedLayout header="Edit Supplier">
            <Head title="Edit Supplier" />

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
                    background: #00C488 !important; color: #ffffff !important; border: none !important;
                    border-radius: 8px !important; padding: 10px 20px !important;
                    font-size: 13.5px !important; font-weight: 600 !important; cursor: pointer !important;
                    text-decoration: none !important; transition: background-color 0.15s !important; font-family: inherit !important;
                }
                .sv-btn-primary:hover:not(:disabled) { background: #00a873 !important; }
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
                .sv-divider { height: 1px !important; background: #f1f5f9 !important; margin: 4px 0 !important; }
                
                .sv-section-label {
                    font-size: 12px !important; font-weight: 700 !important; color: #94a3b8 !important;
                    text-transform: uppercase; letter-spacing: 0.05em;
                    margin-bottom: 16px !important; margin-top: 8px !important;
                }
                
                /* Light-mode toggle wrapper container */
                .sv-toggle-wrap {
                    display: flex; align-items: center; gap: 12px;
                    padding: 14px !important; background: #f8fafc !important;
                    border: 1px solid #e2e8f0 !important; border-radius: 8px !important;
                }
                
                /* Toggle background slider states */
                .sv-toggle {
                    position: relative; width: 36px; height: 20px;
                    background: #cbd5e1 !important; border-radius: 20px !important;
                    cursor: pointer; transition: background 0.2s; flex-shrink: 0;
                    border: none; padding: 0;
                }
                .sv-toggle.on { background: #00C488 !important; }
                .sv-toggle::after {
                    content: ''; position: absolute; top: 3px; left: 3px;
                    width: 14px; height: 14px; background: #ffffff !important;
                    border-radius: 50%; transition: transform 0.2s;
                }
                .sv-toggle.on::after { transform: translateX(16px); }
            `}</style>

            {/* Light-Theme Normalized Back Navigation Link Wrapper */}
            <BackButton link={"/suppliers"} text={"Back to Suppliers"} />


            <div className="sv-form-card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                    <div className="sv-section-label">Basic Information</div>

                    <div className="sv-field">
                        <label className="sv-label">Supplier Name *</label>
                        <input
                            className="sv-input"
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                        {errors.name && <span className="sv-error">{errors.name}</span>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div className="sv-field">
                            <label className="sv-label">Contact Email *</label>
                            <input
                                className="sv-input"
                                type="email"
                                value={data.contact_email}
                                onChange={e => setData('contact_email', e.target.value)}
                            />
                            {errors.contact_email && <span className="sv-error">{errors.contact_email}</span>}
                        </div>
                        <div className="sv-field">
                            <label className="sv-label">Phone</label>
                            <input
                                className="sv-input"
                                type="text"
                                value={data.phone}
                                onChange={e => setData('phone', e.target.value)}
                            />
                            {errors.phone && <span className="sv-error">{errors.phone}</span>}
                        </div>
                    </div>

                    <div className="sv-field">
                        <label className="sv-label">Address</label>
                        <textarea
                            className="sv-textarea"
                            value={data.address}
                            onChange={e => setData('address', e.target.value)}
                        />
                        {errors.address && <span className="sv-error">{errors.address}</span>}
                    </div>

                    <div className="sv-divider" />
                    <div className="sv-section-label">Business Details</div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div className="sv-field">
                            <label className="sv-label">Entity / Business Number</label>
                            <input
                                className="sv-input"
                                type="text"
                                value={data.entity_number}
                                onChange={e => setData('entity_number', e.target.value)}
                            />
                            {errors.entity_number && <span className="sv-error">{errors.entity_number}</span>}
                        </div>
                        <div className="sv-field">
                            <label className="sv-label">Payment Terms *</label>
                            <select
                                className="sv-select"
                                value={data.payment_terms}
                                onChange={e => setData('payment_terms', e.target.value)}
                            >
                                <option value="Net30">Net 30</option>
                                <option value="Net60">Net 60</option>
                                <option value="Net90">Net 90</option>
                                <option value="COD">COD</option>
                            </select>
                            {errors.payment_terms && <span className="sv-error">{errors.payment_terms}</span>}
                        </div>
                    </div>

                    <div className="sv-divider" />
                    <div className="sv-section-label">Account Status</div>

                    <div className="sv-toggle-wrap">
                        <button
                            type="button"
                            className={`sv-toggle ${data.is_active ? 'on' : ''}`}
                            onClick={() => setData('is_active', !data.is_active)}
                        />
                        <div>
                            <div style={{ fontSize: 13.5, fontWeight: 600, color: '#0f172a' }}>
                                {data.is_active ? 'Active' : 'Inactive'}
                            </div>
                            <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
                                {data.is_active
                                    ? 'Supplier is visible and available for procurement'
                                    : 'Supplier is hidden from procurement workflows'}
                            </div>
                        </div>
                        {errors.is_active && <span className="sv-error">{errors.is_active}</span>}
                    </div>

                    {/* Actions Row Styles mapped to updated light-mode lines */}
                    <div style={{ display: 'flex', gap: 12, marginTop: 8, paddingTop: 20, borderTop: '1px solid #f1f5f9' }}>
                        <button type="submit" disabled={processing} className="sv-btn-primary">
                            {processing ? 'Saving...' : 'Update Supplier'}
                        </button>
                        <Link href="/suppliers" className="sv-btn-ghost">Cancel</Link>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    )
}