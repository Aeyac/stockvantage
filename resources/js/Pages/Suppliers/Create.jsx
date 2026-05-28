import { Head, Link, useForm } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import BackButton from '@/Components/BackButton'

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        contact_email: '',
        phone: '',
        address: '',
        entity_number: '',
        payment_terms: 'Net30',
    })

    function handleSubmit(e) {
        e.preventDefault()
        post('/suppliers')
    }

    return (
        <AuthenticatedLayout header="Add Supplier">
            <Head title="Add Supplier" />

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
                            placeholder="e.g. Acme Corporation"
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
                                placeholder="contact@supplier.com"
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
                                placeholder="+63 9XX XXX XXXX"
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
                            placeholder="Street, City, Province"
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
                                placeholder="e.g. SEC-12345"
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

                    {/* Actions Row Styles mapped to updated standard */}
                    <div style={{ display: 'flex', gap: 12, marginTop: 8, paddingTop: 20, borderTop: '1px solid #f1f5f9' }}>
                        <button type="submit" disabled={processing} className="sv-btn-primary">
                            {processing ? 'Saving...' : 'Save Supplier'}
                        </button>
                        <Link href="/suppliers" className="sv-btn-ghost">Cancel</Link>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    )
}