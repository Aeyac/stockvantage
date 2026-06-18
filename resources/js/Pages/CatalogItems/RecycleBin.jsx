import { router, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import confirmToast from '@/utils/confirmToast';
import BackButton from '@/Components/BackButton';
import FlashMessage from '@/Components/FlashMessage';

export default function CatalogRecycleBin({ deletedItems, flash }) {
    console.log(deletedItems)

    const handleRestore = async (id) => {
        router.patch(route('catalog-items.recycle-bin.restore', id));
    };

    const handleForceDelete = async (id) => {
        const confirmed = await confirmToast(
            "Permanently delete this item from the catalog master registry? This action will break all active stock dependencies and historical procurement references.",
            "skip-catalog-force-delete-warning"
        );

        if (confirmed) {
            router.delete(route('catalog-items.recycle-bin.force-delete', id));
        }
    };

    // Formats numbers cleanly into system standard currency formatting 
    const formatCurrency = (value) => {
        if (value === undefined || value === null) return '—';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return dateString;
        }
    };

    const styles = {
        container: {
            padding: '32px',
            maxWidth: '1280px',
            margin: '0 auto',
            minHeight: '100vh',
            backgroundColor: '#F2F5F4',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        },
        headerWrapper: {
            marginBottom: '32px'
        },
        titleRow: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        },
        title: {
            fontSize: '24px',
            fontWeight: '700',
            color: '#0F172A',
            letterSpacing: '-0.025em',
            margin: 0
        },
        subtitle: {
            fontSize: '14px',
            color: '#64748B',
            marginTop: '4px',
            lineHeight: '1.5',
            margin: 0
        },
        emptyCard: {
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            textAlign: 'center',
            padding: '96px 16px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        },
        emptyIconCircle: {
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#F8FAFC',
            border: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            color: '#94A3B8'
        },
        emptyTitle: {
            fontSize: '14px',
            fontWeight: '600',
            color: '#1E293B',
            margin: 0
        },
        emptyText: {
            fontSize: '12px',
            color: '#94A3B8',
            marginTop: '4px',
            maxWidth: '320px',
            margin: '4px auto 0'
        },
        cardWrapper: {
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden'
        },
        responsiveTable: {
            overflowX: 'auto',
            width: '100%'
        },
        table: {
            width: '100%',
            fontSize: '14px',
            borderCollapse: 'collapse'
        },
        thead: {
            backgroundColor: 'rgba(248, 250, 252, 0.7)',
            borderBottom: '1px solid #E2E8F0',
            color: '#64748B',
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
        },
        th: (align = 'left') => ({
            padding: '16px 24px',
            textAlign: align,
            fontWeight: '600'
        }),
        tr: {
            borderBottom: '1px solid #F1F5F9',
            transition: 'background-color 0.15s ease'
        },
        td: (align = 'left') => ({
            padding: '16px 24px',
            textAlign: align,
            whiteSpace: 'nowrap',
            verticalAlign: 'middle'
        }),
        textMain: {
            color: '#334155',
            fontWeight: '600'
        },
        textMuted: {
            color: '#64748B',
            fontSize: '13px'
        },
        skuBadge: {
            fontFamily: 'monospace',
            backgroundColor: '#F8FAFC',
            color: '#0F172A',
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '600',
            border: '1px solid #E2E8F0'
        },
        categoryBadge: {
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px 10px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: '500',
            backgroundColor: '#EFF6FF',
            color: '#1E40AF',
            border: '1px solid rgba(191, 219, 254, 0.5)'
        },
        actionContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '8px'
        },
        btnRestore: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '8px',
            backgroundColor: '#E8F7F2',
            color: '#007A55',
            border: '1px solid rgba(0, 196, 136, 0.25)',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
        },
        btnPurge: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '8px',
            backgroundColor: '#FFEBEB',
            color: '#AC1D1D',
            border: '1px solid rgba(255, 180, 171, 0.4)',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
        },
        paginationFooter: {
            padding: '16px 24px',
            backgroundColor: 'rgba(248, 250, 252, 0.5)',
            borderTop: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '4px',
            flexWrap: 'wrap'
        },
        pageLink: (active, disabled) => ({
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: '500',
            borderRadius: '8px',
            border: active ? '1px solid #0F172A' : '1px solid #E2E8F0',
            backgroundColor: active ? '#0F172A' : '#FFFFFF',
            color: active ? '#FFFFFF' : '#475569',
            textDecoration: 'none',
            opacity: disabled ? 0.4 : 1,
            pointerEvents: disabled ? 'none' : 'auto',
            transition: 'all 0.15s ease'
        })
    };

    return (
        <AuthenticatedLayout>
            <div style={styles.container}>
                <FlashMessage flash={flash} />

                {/* Header & Navigation */}
                <div style={styles.headerWrapper}>
                    <BackButton link={'/catalog-items'} text={'Back to Catalog Registry'} />

                    <div style={styles.titleRow}>
                        <div>
                            <h1 style={styles.title}>Catalog Master Recycle Bin</h1>
                            <p style={styles.subtitle}>
                                Manage archived catalog variants, SKU definitions, and safety lines. Restore items to restore functional warehouse routing or clear data strings entirely.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Data Layout Node */}
                {deletedItems.data.length === 0 ? (
                    <div style={styles.emptyCard}>
                        <div style={styles.emptyIconCircle}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                <line x1="12" y1="22.08" x2="12" y2="12" />
                            </svg>
                        </div>
                        <h3 style={styles.emptyTitle}>No archived catalog items</h3>
                        <p style={styles.emptyText}>
                            The catalog archive is empty. System stock matrices and structural SKU nodes are active.
                        </p>
                    </div>
                ) : (
                    <div style={styles.cardWrapper}>
                        <div style={styles.responsiveTable}>
                            <table style={styles.table}>
                                <thead style={styles.thead}>
                                    <tr>
                                        <th style={styles.th('left')}>SKU Code</th>
                                        <th style={styles.th('left')}>Category / Class</th>
                                        <th style={styles.th('left')}>Supplier Node</th>
                                        <th style={styles.th('left')}>Unit Cost</th>
                                        <th style={styles.th('left')}>Safety Stock</th>
                                        <th style={styles.th('left')}>Deleted At</th>
                                        <th style={styles.th('right')}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {deletedItems.data.map((item) => (
                                        <tr
                                            key={item.id}
                                            style={styles.tr}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            {/* SKU Code */}
                                            <td style={styles.td('left')}>
                                                <span style={styles.skuBadge}>
                                                    {item.sku}
                                                </span>
                                            </td>

                                            {/* Category */}
                                            <td style={styles.td('left')}>
                                                <span style={styles.categoryBadge}>
                                                    {item.category ?? 'Unclassified'}
                                                </span>
                                            </td>

                                            {/* Supplier Name Reference */}
                                            <td style={styles.td('left')}>
                                                <span style={styles.textMain}>
                                                    {item.supplier_name ?? '—'}
                                                </span>
                                            </td>

                                            {/* Unit Cost */}
                                            <td style={styles.td('left')}>
                                                <span style={{ ...styles.textMain, fontFamily: 'monospace' }}>
                                                    {formatCurrency(item.unit_cost)}
                                                </span>
                                            </td>

                                            {/* Safety Stock Level */}
                                            <td style={styles.td('left')}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <span style={{ ...styles.textMain, fontWeight: '600' }}>
                                                        {item.safety_stock ?? 0}
                                                    </span>
                                                    <span style={{ ...styles.textMuted, fontSize: '12px' }}>units</span>
                                                </div>
                                            </td>

                                            {/* Soft Deleted Timestamp */}
                                            <td style={styles.td('left')}>
                                                <span style={styles.textMuted}>
                                                    {formatDate(item.deleted_at)}
                                                </span>
                                            </td>

                                            {/* Actions Container */}
                                            <td style={styles.td('right')}>
                                                <div style={styles.actionContainer}>
                                                    <button
                                                        onClick={() => handleRestore(item.id)}
                                                        style={styles.btnRestore}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D1FAE5'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E8F7F2'}
                                                        title="Restore item configuration"
                                                    >
                                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                            <polyline points="23 4 23 10 17 10" />
                                                            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                                                        </svg>
                                                        Restore
                                                    </button>
                                                    <button
                                                        onClick={() => handleForceDelete(item.id)}
                                                        style={styles.btnPurge}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FCA5A530'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFEBEB'}
                                                        title="Purge master item map record"
                                                    >
                                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                            <polyline points="3 6 5 6 21 6" />
                                                            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                                        </svg>
                                                        Purge
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Layout Stack */}
                        {deletedItems.links && deletedItems.links.length > 3 && (
                            <div style={styles.paginationFooter}>
                                {deletedItems.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url ?? '#'}
                                        style={styles.pageLink(link.active, !link.url)}
                                        onMouseEnter={(e) => {
                                            if (!link.active) e.currentTarget.style.backgroundColor = '#F8FAFC';
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!link.active) e.currentTarget.style.backgroundColor = '#FFFFFF';
                                        }}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}