import { Head, Link, router } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'

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

export default function Index({ catalogItems, flash }) {


    function handleDelete(id) {
        if (confirm('Are you sure you want to delete this catalog item?')) {
            router.delete(`/catalog-items/${id}`)
        }
    }

    function formatCurrency(value) {
        return '₱' + parseFloat(value).toLocaleString('en-PH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }

    return (
        <AuthenticatedLayout header="Catalog Items">
            <Head title="Catalog Items" />

            <style>{`
                .ci-btn-primary {
                    display: inline-flex; align-items: center; gap: 7px;
                    background: ${C.primary}; color: ${C.onPrimary};
                    border: none; border-radius: 12px; padding: 10px 18px;
                    font-size: 14px; font-weight: 600; cursor: pointer;
                    text-decoration: none; transition: filter 0.15s;
                    font-family: inherit;
                }

                .ci-btn-primary:hover { 
                    filter: brightness(1.1); 
                }

                .ci-card {
                    background: ${C.surface};
                    border: 1px solid ${C.outline};
                    border-radius: 16px; overflow: hidden;
                }

                .ci-table { 
                    width: 100%; 
                    border-collapse: collapse; 
                }

                .ci-table th {
                    text-align: left; 
                    padding: 12px 20px;
                    font-size: 11px; 
                    font-weight: 600;
                    color: ${C.onSurfaceVar}; 
                    text-transform: uppercase;
                    letter-spacing: 0.07em; 
                    border-bottom: 1px solid ${C.outline};
                }

                .ci-table td {
                    padding: 15px 20px; 
                    color: ${C.onSurfaceVar};
                    border-bottom: 1px solid ${C.outline}15;
                    font-size: 14px;
                }

                .ci-table tbody tr:last-child td { 
                    border-bottom: none; 
                }

                .ci-table tbody tr { 
                    transition: background 0.1s; 
                }

                .ci-table tbody tr:hover td { 
                    background: ${C.surfaceHigh}40; 
                }

                .ci-status-active {
                    display: inline-flex; align-items: center; gap: 5px;
                    font-size: 11px; font-weight: 700; padding: 3px 10px;
                    border-radius: 20px; text-transform: uppercase; letter-spacing: 0.04em;
                    background: ${C.primary}15; color: ${C.primary};
                    border: 1px solid ${C.primary}25;
                }

                .ci-status-inactive {
                    display: inline-flex; align-items: center; gap: 5px;
                    font-size: 11px; font-weight: 700; padding: 3px 10px;
                    border-radius: 20px; text-transform: uppercase; letter-spacing: 0.04em;
                    background: ${C.error}15; color: ${C.error};
                    border: 1px solid ${C.error}25;
                }

                .ci-sku {
                    font-family: 'Courier New', monospace;
                    font-size: 12px; font-weight: 700;
                    color: ${C.tertiary}; background: ${C.tertiary}12;
                    border: 1px solid ${C.tertiary}25;
                    padding: 3px 9px; border-radius: 6px;
                    letter-spacing: 0.04em;
                }

                .ci-category {
                    font-size: 12px; padding: 3px 10px; border-radius: 20px;
                    background: ${C.secondary}12; color: ${C.secondary};
                    border: 1px solid ${C.secondary}20; font-weight: 500;
                }

                .ci-action {
                    font-size: 13px; font-weight: 500;
                    color: ${C.onSurfaceVar}; text-decoration: none;
                    padding: 5px 12px; border-radius: 8px;
                    transition: all 0.15s; border: 1px solid transparent;
                    background: none; cursor: pointer; font-family: inherit;
                }

                .ci-action:hover {
                    color: ${C.onSurface}; background: ${C.surfaceHigh};
                    border-color: ${C.outline};
                }

                .ci-action.del:hover {
                    color: ${C.error}; background: ${C.error}10;
                    border-color: ${C.error}25;
                }

                .ci-pg-btn {
                    display: inline-flex; align-items: center; justify-content: center;
                    min-width: 34px; height: 34px; padding: 0 10px;
                    border-radius: 8px; font-size: 13px;
                    color: ${C.onSurfaceVar}; background: ${C.surface};
                    border: 1px solid ${C.outline}; text-decoration: none;
                    transition: all 0.15s;
                }

                .ci-pg-btn:hover { 
                    color: ${C.onSurface}; 
                    border-color: ${C.onSurfaceVar}50; 
                }

                .ci-pg-btn.active {
                    background: ${C.primary}; 
                    color: ${C.onPrimary};
                    border-color: ${C.primary}; 
                    font-weight: 700;
                }

                .ci-pg-btn.disabled { 
                    opacity: 0.3; 
                    pointer-events: none; 
                }

                .ci-empty {
                    display: flex; 
                    flex-direction: column; 
                    align-items: center;
                    justify-content: center; 
                    padding: 72px 24px; 
                    gap: 14px;
                    color: ${C.onSurfaceVar};
                }

                .ci-stock-warn { 
                    color: ${C.tertiary}; 
                    font-weight: 600; 
                }

                
            `}</style>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <p style={{ fontSize: 14, color: C.onSurfaceVar }}>
                    {catalogItems.total} item{catalogItems.total !== 1 ? 's' : ''} in catalog
                </p>

                <Link href="/catalog-items/create" className="ci-btn-primary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add Item
                </Link>
            </div>

            <FlashMessage flash={flash} />

            {/* Table card */}
            <div className="ci-card">
                {catalogItems.data.length === 0 ? (
                    <div className="ci-empty">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.4">
                            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                        </svg>

                        <p style={{ fontSize: 15, fontWeight: 500, color: C.onSurface }}>
                            No catalog items yet
                        </p>

                        <p style={{ fontSize: 13 }}>
                            Add your first item to get started
                        </p>

                        <Link href="/catalog-items/create" className="ci-btn-primary" style={{ marginTop: 4 }}>
                            Add first item
                        </Link>
                    </div>
                ) : (
                    <table className="ci-table">
                        <thead>
                            <tr>
                                <th>SKU</th>
                                <th>Item</th>
                                <th>Supplier</th>
                                <th>Category</th>
                                <th>Unit Cost</th>
                                <th>Safety Stock</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {catalogItems.data.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <span className="ci-sku" style={{ fontSize: '10px' }}>
                                            {item.sku}
                                        </span>
                                    </td>

                                    <td>
                                        <div style={{ fontWeight: 600, color: C.onSurface }}>
                                            {item.name}
                                        </div>
                                    </td>

                                    <td style={{ color: C.onSurfaceVar }}>
                                        {item.supplier?.name ?? <span style={{ opacity: 0.4 }}>—</span>}
                                    </td>

                                    <td>
                                        {item.category
                                            ? <span className="ci-category">{item.category}</span>
                                            : <span style={{ opacity: 0.3 }}>—</span>
                                        }
                                    </td>

                                    <td>
                                        <span style={{ fontWeight: 600, color: C.onSurface }}>
                                            {formatCurrency(item.unit_cost)}
                                        </span>
                                    </td>

                                    <td>
                                        <span className={item.safety_stock <= 5 ? 'ci-stock-warn' : ''}>
                                            {item.safety_stock} units
                                        </span>
                                    </td>

                                    <td>
                                        {item.is_active
                                            ? (
                                                <span className="ci-status-active">
                                                    <span style={{
                                                        width: 5,
                                                        height: 5,
                                                        borderRadius: '50%',
                                                        background: 'currentColor',
                                                        display: 'inline-block'
                                                    }} />
                                                    Active
                                                </span>
                                            )
                                            : (
                                                <span className="ci-status-inactive">
                                                    <span style={{
                                                        width: 5,
                                                        height: 5,
                                                        borderRadius: '50%',
                                                        background: 'currentColor',
                                                        display: 'inline-block'
                                                    }} />
                                                    Inactive
                                                </span>
                                            )
                                        }
                                    </td>

                                    <td>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            <Link
                                                href={`/catalog-items/${item.id}/edit`}
                                                className="ci-action"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="ci-action del"
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
            {catalogItems.last_page > 1 && (
                <div style={{ display: 'flex', gap: 6, marginTop: 20, justifyContent: 'flex-end' }}>
                    {catalogItems.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url ?? '#'}
                            className={`ci-pg-btn ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    )
}