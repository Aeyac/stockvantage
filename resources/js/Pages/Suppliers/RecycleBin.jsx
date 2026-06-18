import { router, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import confirmToast from '@/utils/confirmToast';
import BackButton from '@/Components/BackButton';
import FlashMessage from '@/Components/FlashMessage';

export default function RecycleBin({ deletedItems, flash }) {
    console.log(deletedItems)

    const handleRestore = async (id) => {
        router.patch(route('suppliers.recycle-bin.restore', id));
    };

    const handleForceDelete = async (id) => {
        const confirmed = await confirmToast(
            "Permanently delete this supplier from the registry? This action removes all procurement associations, historical contract logs, and cannot be undone.",
            "skip-supplier-force-delete-warning"
        );

        if (confirmed) {
            router.delete(route('suppliers.recycle-bin.force-delete', id));
        }
    };

    // Formats backend timestamps into a clean, readable display layout
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

    // Premium styling architecture matching your workspace design guidelines
    const styles = {
        container: {
            padding: '32px',
            maxWidth: '1280px', // Wider layout node to support the extra contextual metadata columns
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
        entityBadge: {
            fontFamily: 'monospace',
            backgroundColor: '#F1F5F9',
            color: '#334155',
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '12px',
            border: '1px solid #E2E8F0'
        },
        termsBadge: {
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px 10px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: '600',
            backgroundColor: '#F0FDF4',
            color: '#166534',
            border: '1px solid rgba(187, 247, 208, 0.5)'
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
                    <BackButton link={'/suppliers'} text={'Back to Suppliers Directory'} />

                    <div style={styles.titleRow}>
                        <div>
                            <h1 style={styles.title}>Supplier Records Recycle Bin</h1>
                            <p style={styles.subtitle}>
                                Review soft-deleted supplier profiles and procurement nodes. Restore entity routing profiles or wipe data structures permanently from vendor architecture.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Data Layout Node */}
                {deletedItems.data.length === 0 ? (
                    <div style={styles.emptyCard}>
                        <div style={styles.emptyIconCircle}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h3 style={styles.emptyTitle}>No archived supplier entities</h3>
                        <p style={styles.emptyText}>
                            The vendor archive is empty. Soft-deleted vendor nodes wait here prior to complete record purging.
                        </p>
                    </div>
                ) : (
                    <div style={styles.cardWrapper}>
                        <div style={styles.responsiveTable}>
                            <table style={styles.table}>
                                <thead style={styles.thead}>
                                    <tr>
                                        <th style={styles.th('left')}>Supplier Name</th>
                                        <th style={styles.th('left')}>Entity No.</th>
                                        <th style={styles.th('left')}>Contact Information</th>
                                        <th style={styles.th('left')}>Payment Terms</th>
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
                                            {/* Name */}
                                            <td style={styles.td('left')}>
                                                <span style={styles.textMain}>
                                                    {item.name}
                                                </span>
                                            </td>

                                            {/* Entity Number */}
                                            <td style={styles.td('left')}>
                                                <span style={styles.entityBadge}>
                                                    {item.entity_number ?? 'N/A'}
                                                </span>
                                            </td>

                                            {/* Contact Details (Email & Phone stacked) */}
                                            <td style={styles.td('left')}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                    <span style={styles.textMain}>{item.contact_email ?? '—'}</span>
                                                    <span style={styles.textMuted}>{item.phone ?? '—'}</span>
                                                </div>
                                            </td>

                                            {/* Payment Terms */}
                                            <td style={styles.td('left')}>
                                                <span style={styles.termsBadge}>
                                                    {item.payment_terms ?? 'N/A'}
                                                </span>
                                            </td>

                                            {/* Soft Delete Timestamp */}
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
                                                        title="Restore supplier registry profile"
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
                                                        title="Purge supplier record permanently"
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