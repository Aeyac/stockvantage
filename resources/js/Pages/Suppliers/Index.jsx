import { Head, Link, router } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

export default function Index({ suppliers }) {
    function handleDelete(id) {
        if (confirm('Are you sure you want to delete this supplier?')) {
            router.delete(`/suppliers/${id}`)
        }
    }

    const termColor = {
        Net30: '#4f8ef7',
        Net60: '#f7934f',
        Net90: '#f74f4f',
        COD: '#4ff7a0',
    }

    return (
        <AuthenticatedLayout header="Suppliers">
            <Head title="Suppliers" />

            <style>{`
                .sv-btn-primary {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    background: #4f8ef7;
                    color: #fff;
                    border: none;
                    border-radius: 8px;
                    padding: 9px 16px;
                    font-size: 13px;
                    font-weight: 500;
                    cursor: pointer;
                    text-decoration: none;
                    transition: background 0.15s;
                    font-family: inherit;
                }
                .sv-btn-primary:hover { background: #3b7de8; }

                .sv-table-wrap {
                    background: #0d0d10;
                    border: 1px solid #16161a;
                    border-radius: 12px;
                    overflow: hidden;
                }
                .sv-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 13.5px;
                }
                .sv-table thead tr {
                    border-bottom: 1px solid #16161a;
                }
                .sv-table th {
                    text-align: left;
                    padding: 12px 18px;
                    font-size: 11px;
                    font-weight: 600;
                    color: #4b4b56;
                    text-transform: uppercase;
                    letter-spacing: 0.07em;
                }
                .sv-table td {
                    padding: 14px 18px;
                    color: #c8c6bc;
                    border-bottom: 1px solid #0f0f13;
                }
                .sv-table tbody tr:last-child td { border-bottom: none; }
                .sv-table tbody tr:hover td { background: #0f0f13; }

                .sv-status {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 11.5px;
                    font-weight: 500;
                    padding: 3px 9px;
                    border-radius: 20px;
                }
                .sv-status.active {
                    background: rgba(79,247,160,0.08);
                    color: #4ff7a0;
                    border: 1px solid rgba(79,247,160,0.15);
                }
                .sv-status.inactive {
                    background: rgba(247,79,79,0.08);
                    color: #f74f4f;
                    border: 1px solid rgba(247,79,79,0.15);
                }
                .sv-term {
                    font-size: 11.5px;
                    font-weight: 600;
                    padding: 3px 9px;
                    border-radius: 20px;
                    background: #16161a;
                    border: 1px solid #232328;
                }
                .sv-action-link {
                    font-size: 12.5px;
                    font-weight: 500;
                    color: #4b4b56;
                    text-decoration: none;
                    padding: 5px 10px;
                    border-radius: 6px;
                    transition: all 0.15s;
                    border: 1px solid transparent;
                }
                .sv-action-link:hover {
                    color: #e2e0d6;
                    background: #16161a;
                    border-color: #232328;
                }
                .sv-action-link.danger:hover {
                    color: #f74f4f;
                    background: rgba(247,79,79,0.08);
                    border-color: rgba(247,79,79,0.15);
                }
                .sv-pagination-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 32px;
                    height: 32px;
                    padding: 0 10px;
                    border-radius: 6px;
                    font-size: 12.5px;
                    color: #6b6b7a;
                    background: #0d0d10;
                    border: 1px solid #16161a;
                    text-decoration: none;
                    transition: all 0.15s;
                }
                .sv-pagination-btn:hover { color: #e2e0d6; border-color: #232328; }
                .sv-pagination-btn.active {
                    background: #4f8ef7;
                    color: #fff;
                    border-color: #4f8ef7;
                }
                .sv-pagination-btn.disabled {
                    opacity: 0.3;
                    pointer-events: none;
                }
                .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 64px 24px;
                    gap: 12px;
                    color: #4b4b56;
                }
            `}</style>

            {/* Header row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <p style={{ fontSize: 13, color: '#4b4b56', marginTop: 4 }}>
                        {suppliers.total} supplier{suppliers.total !== 1 ? 's' : ''} registered
                    </p>
                </div>
                <Link href="/suppliers/create" className="sv-btn-primary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add Supplier
                </Link>
            </div>

            {/* Table */}
            <div className="sv-table-wrap">
                {suppliers.data.length === 0 ? (
                    <div className="empty-state">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                        <p style={{ fontSize: 14 }}>No suppliers yet</p>
                        <Link href="/suppliers/create" className="sv-btn-primary" style={{ marginTop: 4 }}>
                            Add your first supplier
                        </Link>
                    </div>
                ) : (
                    <table className="sv-table">
                        <thead>
                            <tr>
                                <th>Supplier</th>
                                <th>Contact</th>
                                <th>Payment Terms</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.data.map(supplier => (
                                <tr key={supplier.id}>
                                    <td>
                                        <div style={{ fontWeight: 500, color: '#e2e0d6' }}>{supplier.name}</div>
                                        {supplier.entity_number && (
                                            <div style={{ fontSize: 11.5, color: '#4b4b56', marginTop: 2 }}>
                                                {supplier.entity_number}
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <div>{supplier.contact_email}</div>
                                        {supplier.phone && (
                                            <div style={{ fontSize: 11.5, color: '#4b4b56', marginTop: 2 }}>
                                                {supplier.phone}
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <span className="sv-term" style={{ color: termColor[supplier.payment_terms] ?? '#c8c6bc' }}>
                                            {supplier.payment_terms}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`sv-status ${supplier.is_active ? 'active' : 'inactive'}`}>
                                            <span style={{
                                                width: 5, height: 5, borderRadius: '50%',
                                                background: supplier.is_active ? '#4ff7a0' : '#f74f4f',
                                                display: 'inline-block'
                                            }} />
                                            {supplier.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            <Link
                                                href={`/suppliers/${supplier.id}/edit`}
                                                className="sv-action-link"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(supplier.id)}
                                                className="sv-action-link danger"
                                                style={{ background: 'none', border: '1px solid transparent', cursor: 'pointer', fontFamily: 'inherit' }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            {suppliers.last_page > 1 && (
                <div style={{ display: 'flex', gap: 6, marginTop: 20, justifyContent: 'flex-end' }}>
                    {suppliers.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url ?? '#'}
                            className={`sv-pagination-btn ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    )
}