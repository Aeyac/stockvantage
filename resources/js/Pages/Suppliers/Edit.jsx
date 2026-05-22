import { Head, Link, useForm } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

export default function Edit({ supplier }) {
    const { data, setData, put, processing, errors } = useForm({
        name: supplier.name,
        contact_email: supplier.contact_email,
        phone: supplier.phone ?? '',
        address: supplier.address ?? '',
        entity_number: supplier.entity_number ?? '',
        payment_terms: supplier.payment_terms,
        is_active: supplier.is_active,
    })

    function handleSubmit(e) {
        e.preventDefault()
        put(`/suppliers/${supplier.id}`)
    }

    return (
        <AuthenticatedLayout header="Edit Supplier">
            <Head title="Edit Supplier" />

            <style>{`
                .sv-form-card {
                    background: #0d0d10;
                    border: 1px solid #16161a;
                    border-radius: 12px;
                    padding: 28px;
                    max-width: 640px;
                }
                .sv-field { display: flex; flex-direction: column; gap: 6px; }
                .sv-label {
                    font-size: 12px; font-weight: 500; color: #6b6b7a;
                    text-transform: uppercase; letter-spacing: 0.06em;
                }
                .sv-input, .sv-select, .sv-textarea {
                    background: #0a0a0b; border: 1px solid #1e1e24;
                    border-radius: 8px; padding: 10px 14px;
                    color: #e2e0d6; font-size: 13.5px; font-family: inherit;
                    outline: none; transition: border-color 0.15s; width: 100%;
                }
                .sv-input:focus, .sv-select:focus, .sv-textarea:focus { border-color: #4f8ef7; }
                .sv-input::placeholder, .sv-textarea::placeholder { color: #2e2e38; }
                .sv-select option { background: #0d0d10; }
                .sv-textarea { resize: vertical; min-height: 90px; }
                .sv-error { font-size: 12px; color: #f74f4f; margin-top: 2px; }
                .sv-btn-primary {
                    display: inline-flex; align-items: center; gap: 7px;
                    background: #4f8ef7; color: #fff; border: none;
                    border-radius: 8px; padding: 10px 20px;
                    font-size: 13px; font-weight: 500; cursor: pointer;
                    text-decoration: none; transition: background 0.15s; font-family: inherit;
                }
                .sv-btn-primary:hover { background: #3b7de8; }
                .sv-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
                .sv-btn-ghost {
                    display: inline-flex; align-items: center;
                    background: none; color: #6b6b7a; border: 1px solid #1e1e24;
                    border-radius: 8px; padding: 10px 20px; font-size: 13px;
                    font-weight: 500; cursor: pointer; text-decoration: none;
                    transition: all 0.15s; font-family: inherit;
                }
                .sv-btn-ghost:hover { color: #e2e0d6; border-color: #232328; }
                .sv-divider { height: 1px; background: #16161a; margin: 4px 0; }
                .sv-section-label {
                    font-size: 11px; font-weight: 600; color: #4b4b56;
                    text-transform: uppercase; letter-spacing: 0.08em;
                    margin-bottom: 16px; margin-top: 8px;
                }
                .sv-toggle-wrap {
                    display: flex; align-items: center; gap: 12px;
                    padding: 14px; background: #0a0a0b;
                    border: 1px solid #1e1e24; border-radius: 8px;
                }
                .sv-toggle {
                    position: relative; width: 36px; height: 20px;
                    background: #1e1e24; border-radius: 20px;
                    cursor: pointer; transition: background 0.2s; flex-shrink: 0;
                    border: none; padding: 0;
                }
                .sv-toggle.on { background: #4f8ef7; }
                .sv-toggle::after {
                    content: ''; position: absolute; top: 3px; left: 3px;
                    width: 14px; height: 14px; background: #fff;
                    border-radius: 50%; transition: transform 0.2s;
                }
                .sv-toggle.on::after { transform: translateX(16px); }
            `}</style>

            {/* Back link */}
            <Link href="/suppliers" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 13, color: '#4b4b56', textDecoration: 'none',
                marginBottom: 20, transition: 'color 0.15s',
            }}
                onMouseEnter={e => e.currentTarget.style.color = '#e2e0d6'}
                onMouseLeave={e => e.currentTarget.style.color = '#4b4b56'}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
                Back to Suppliers
            </Link>

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
                            <div style={{ fontSize: 13.5, fontWeight: 500, color: '#c8c6bc' }}>
                                {data.is_active ? 'Active' : 'Inactive'}
                            </div>
                            <div style={{ fontSize: 12, color: '#4b4b56', marginTop: 2 }}>
                                {data.is_active
                                    ? 'Supplier is visible and available for procurement'
                                    : 'Supplier is hidden from procurement workflows'}
                            </div>
                        </div>
                        {errors.is_active && <span className="sv-error">{errors.is_active}</span>}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 10, marginTop: 8, paddingTop: 20, borderTop: '1px solid #16161a' }}>
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