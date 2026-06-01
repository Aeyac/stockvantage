import { Head, Link, router } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import { useAuth } from '@/hooks/useAuth'
import { EditActionButton, DeleteActionButton } from '@/Components/ActionButtons'
import { formatCurrency } from '@/hooks/useCurrency'

export default function Index({ catalogItems, flash }) {
    const { isAdmin } = useAuth();

    function handleDelete(id) {
        if (confirm('Are you sure you want to delete this catalog item?')) {
            router.delete(`/catalog-items/${id}`)
        }
    }

    

    return (
        <AuthenticatedLayout header="Catalog Items">
            <Head title="Catalog Items" />

            <style>{`
                /* Primary Brand Button - Updated to match clean dashboard metrics */
                .sv-btn-primary {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    background: #00C488;
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
                .sv-btn-primary:hover { background: #00a873; }

                /* Crisp Light Mode Table Container */
                .sv-table-wrap {
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
                }
                .sv-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 13.5px;
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
                }
                .sv-table td {
                    padding: 14px 18px;
                    color: #334155;
                    border-bottom: 1px solid #f1f5f9;
                }
                .sv-table tbody tr:last-child td { border-bottom: none; }
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

                /* Contextual Item Badges (SKU & Category styles structured like reference terms) */
                .sv-sku {
                    font-size: 12px;
                    font-weight: 700;
                    padding: px 10px;
                    border-radius: 20px;
                    color: #0f172a;
                }
                .sv-category {
                    font-size: 11.5px;
                    font-weight: 600;
                    padding: 3px 10px;
                    border-radius: 20px;
                    background: #eff6ff;
                    color: #2563eb;
                    border: 1px solid #dbeafe;
                }
                .sv-stock-warn {
                    color: #dc2626;
                    font-weight: 600;
                }

                

                /* Clean Light Mode Pagination Blocks */
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
            `}</style>

            <FlashMessage flash={flash} />

            {/* Header row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
                        {catalogItems.total} item{catalogItems.total !== 1 ? 's' : ''} in catalog
                    </p>
                </div>
                {isAdmin && (
                    <Link href="/catalog-items/create" className="sv-btn-primary">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add Item
                    </Link>
                )}
            </div>

            {/* Table wrapper */}
            <div className="sv-table-wrap">
                {catalogItems.data.length === 0 ? (
                    <div className="empty-state">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                        </svg>
                        <p style={{ fontSize: 14, fontWeight: 500, color: '#475569' }}>No catalog items yet</p>
                        {isAdmin && (
                            <Link href="/catalog-items/create" className="sv-btn-primary" style={{ marginTop: 4 }}>
                                Add your first item
                            </Link>
                        )}
                    </div>
                ) : (
                    <table className="sv-table">
                        <thead>
                            <tr>
                                <th>SKU</th>
                                <th>Item</th>
                                <th>Supplier</th>
                                <th>Category</th>
                                <th>Unit Cost</th>
                                <th>Safety Stock</th>
                                <th>Status</th>
                                {isAdmin && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {catalogItems.data.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <span className="sv-sku">
                                            {item.sku}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{item.name}</div>
                                    </td>
                                    <td>
                                        <div style={{ color: '#334155' }}>
                                            {item.supplier?.name ?? <span style={{ opacity: 0.4 }}>—</span>}
                                        </div>
                                    </td>
                                    <td>
                                        {item.category ? (
                                            <span className="sv-category">{item.category}</span>
                                        ) : (
                                            <span style={{ opacity: 0.3 }}>—</span>
                                        )}
                                    </td>
                                    <td>
                                        <span style={{ fontWeight: 600, color: '#0f172a' }}>
                                            {formatCurrency(item.unit_cost)}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={item.safety_stock <= 5 ? 'sv-stock-warn' : ''}>
                                            {item.safety_stock} units
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`sv-status ${item.is_active ? 'active' : 'inactive'}`}>
                                            <span style={{
                                                width: 6, height: 6, borderRadius: '50%',
                                                background: item.is_active ? '#16a34a' : '#dc2626',
                                                display: 'inline-block'
                                            }} />
                                            {item.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    {isAdmin && (
                                        <td>
                                            <div style={{ display: 'flex', gap: 4 }}>
                                                <EditActionButton href={`/catalog-items/${item.id}/edit`} />
                                                <DeleteActionButton onClick={() => handleDelete(item.id)} />
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            {catalogItems.last_page > 1 && (
                <div style={{ display: 'flex', gap: 6, marginTop: 20, justifyContent: 'flex-end' }}>
                    {catalogItems.links.map((link, i) => (
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