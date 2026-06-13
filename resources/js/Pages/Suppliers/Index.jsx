import { Head, Link, router } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import { EditActionButton, DeleteActionButton, CreateActionButton } from '@/Components/ActionButtons'
import confirmToast from '@/utils/confirmToast'

export default function Index({ suppliers, flash }) {

    async function handleDelete(id) {
        const confirmed = await confirmToast("Are you sure you want to delete this purchase request?", "Do not show this warning again.");
        if (confirmed) {
            router.delete(`/suppliers/${id}`)
        }
    }

    // Soft, readable text colors with subtle background pills for light mode
    const termColor = {
        Net30: { text: '#2563eb', bg: '#eff6ff', border: '#dbeafe' }, // Blue
        Net60: { text: '#d97706', bg: '#fef3c7', border: '#fde68a' }, // Amber
        Net90: { text: '#dc2626', bg: '#fef2f2', border: '#fee2e2' }, // Red
        COD: { text: '#059669', bg: '#ecfdf5', border: '#d1fae5' },   // Emerald
    }

    return (
        <AuthenticatedLayout header="Suppliers">
            <Head title="Suppliers" />

            <style>{`
                /* Fixed Layout Header Actions Section */
                .sv-header-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 24px;
                    gap: 16px;
                }
                
                .sv-header-btn-wrap {
                    flex-shrink: 0; /* Prevents button from shrinking or mutating width */
                }

                /* Crisp Light Mode Table Container with Scroll Capability */
                .sv-table-wrap {
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
                    width: 100%;
                    overflow-x: auto; /* Enables horizontal sliding */
                    -webkit-overflow-scrolling: touch; /* Smooth momentum scrolling on iOS */
                }
                
                .sv-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 13.5px;
                    min-width: 800px; /* Guarantees layout doesn't cramp up and forces scroll on mobile */
                }
                
                .sv-table thead tr {
                    background: #f8fafc;
                    border-bottom: 1px solid #e2e8f0;
                }
                .sv-table th {
                    text-align: left;
                    padding: 14px 18px;
                    font-size: 11px;
                    font-weight: 600;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    white-space: nowrap;
                }
                .sv-table td {
                    padding: 14px 18px;
                    color: #334155;
                    border-bottom: 1px solid #f1f5f9;
                    white-space: nowrap; /* Keeps items on a clean single line while sliding */
                    vertical-align: middle;
                }
                .sv-table tbody tr:last-child td { border-bottom: none; }
                .sv-table tbody tr { transition: background 0.1s; }
                .sv-table tbody tr:hover td { background: #f8fafc; }

                /* Light Mode Status Badges */
                .sv-status {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 11.5px;
                    font-weight: 500;
                    padding: 3px 10px;
                    border-radius: 20px;
                }
                .sv-status.active {
                    background: #f0fdf4;
                    color: #166534;
                    border: 1px solid #bbf7d0;
                }
                .sv-status.inactive {
                    background: #fef2f2;
                    color: #991b1b;
                    border: 1px solid #fee2e2;
                }
                
                /* Payment Terms Pill base */
                .sv-term {
                    display: inline-block;
                    font-size: 11.5px;
                    font-weight: 600;
                    padding: 3px 10px;
                    border-radius: 20px;
                    border: 1px solid transparent;
                }

                /* Contextual Table Row Action Links */
                .sv-action-link {
                    font-size: 12.5px;
                    font-weight: 500;
                    color: #64748b;
                    text-decoration: none;
                    padding: 5px 10px;
                    border-radius: 6px;
                    transition: all 0.15s;
                    border: 1px solid transparent;
                }
                .sv-action-link:hover {
                    color: #1e293b;
                    background: #f1f5f9;
                }
                .sv-action-link.danger:hover {
                    color: #df2c2c;
                    background: #fef2f2;
                }

                /* Clean Light Mode Pagination Blocks */
                .sv-pagination-wrap {
                    display: flex;
                    gap: 6px;
                    margin-top: 20px;
                    justify-content: flex-end;
                    flex-wrap: wrap;
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
                    color: #64748b;
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    text-decoration: none;
                    transition: all 0.15s;
                }
                .sv-pagination-btn:hover { color: #1e293b; border-color: #cbd5e1; background: #f8fafc; }
                .sv-pagination-btn.active {
                    background: #00C488;
                    color: #fff;
                    border-color: #00C488;
                }
                .sv-pagination-btn.disabled {
                    opacity: 0.4;
                    pointer-events: none;
                    background: #f1f5f9;
                }
                .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 64px 24px;
                    gap: 12px;
                    color: #64748b;
                    background: #ffffff;
                }

                @media (max-width: 480px) {
                    .sv-pagination-wrap {
                        justify-content: center;
                    }
                }
            `}</style>

            <FlashMessage flash={flash} />

            {/* Header row - Kept aligned and row-based everywhere */}
            <div className="sv-header-row">
                <div>
                    <p style={{ fontSize: 13, color: '#64748b', margin: 0, fontWeight: 500 }}>
                        {suppliers.total} supplier{suppliers.total !== 1 ? 's' : ''} registered
                    </p>
                </div>
                <div className="sv-header-btn-wrap">
                    <CreateActionButton href={"/suppliers/create"} label={'Add Supplier'} />
                </div>
            </div>

            {/* Table wrapper */}
            <div className="sv-table-wrap">
                {suppliers.data.length === 0 ? (
                    <div className="empty-state">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                            <path d="M2.25 21h19.5m-18-10.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5-13.5h16.5M6.75 6.75h.008v.008H6.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM11.25 6.75h.008v.008h-.008V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM15.75 6.75h.008v.008h-.008V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <p style={{ fontSize: 14, fontWeight: 500, color: '#475569' }}>No suppliers yet</p>
                        <Link href="/suppliers/create" className="sv-btn-primary" style={{ marginTop: 4 }}>
                            Add your first supplier
                        </Link>
                    </div>
                ) : (
                    <table className="sv-table">
                        <thead>
                            <tr>
                                <th style={{ width: '30%' }}>Supplier</th>
                                <th style={{ width: '25%' }}>Contact</th>
                                <th style={{ width: '15%' }}>Payment Terms</th>
                                <th style={{ width: '15%' }}>Status</th>
                                <th style={{ width: '15%' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.data.map(supplier => {
                                const termStyle = termColor[supplier.payment_terms] ?? { text: '#475569', bg: '#f1f5f9', border: '#e2e8f0' };

                                return (
                                    <tr key={supplier.id}>
                                        <td>
                                            <div>
                                                <div style={{ fontWeight: 600, color: '#0f172a' }}>{supplier.name}</div>
                                                {supplier.entity_number && (
                                                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
                                                        {supplier.entity_number}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <div style={{ color: '#334155' }}>{supplier.contact_email}</div>
                                                {supplier.phone && (
                                                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
                                                        {supplier.phone}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <span
                                                className="sv-term"
                                                style={{
                                                    color: termStyle.text,
                                                    backgroundColor: termStyle.bg,
                                                    borderColor: termStyle.border
                                                }}
                                            >
                                                {supplier.payment_terms}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`sv-status ${supplier.is_active ? 'active' : 'inactive'}`}>
                                                <span style={{
                                                    width: 6, height: 6, borderRadius: '50%',
                                                    background: supplier.is_active ? '#16a34a' : '#dc2626',
                                                    display: 'inline-block'
                                                }} />
                                                {supplier.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: 6 }}>
                                                <EditActionButton href={`/suppliers/${supplier.id}/edit`} />
                                                <DeleteActionButton onClick={() => handleDelete(supplier.id)} />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            {suppliers.last_page > 1 && (
                <div className="sv-pagination-wrap">
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