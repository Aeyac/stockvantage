import { router, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import confirmToast from '@/utils/confirmToast';
import BackButton from '@/Components/BackButton';
import FlashMessage from '@/Components/FlashMessage';

export default function RecycleBin({ deletedItems, flash }) {
    console.log(deletedItems)

    const handleRestore = async (id) => {
        router.patch(route('purchase-requests.recycle-bin.restore', id));
    };

    const handleForceDelete = async (id) => {
        const confirmed = await confirmToast(
            "Permanently delete this purchase request? This action cannot be undone.",
            "skip-pr-force-delete-warning"
        );

        if (confirmed) {
            router.delete(route('purchase-requests.recycle-bin.force-delete', id));
        }
    };

    // Premium light-mode styling object map
    const styles = {
        container: {
            padding: '32px',
            maxWidth: '1152px',
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
            marginHeight: '1.5',
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
        prBadge: {
            fontFamily: 'monospace',
            fontSize: '12px',
            fontWeight: '700',
            backgroundColor: '#F1F5F9',
            color: '#334155',
            padding: '4px 8px',
            borderRadius: '6px',
            border: '1px solid rgba(226, 232, 240, 0.4)'
        },
        userName: {
            color: '#334155',
            fontWeight: '500'
        },
        userEmpty: {
            color: '#94A3B8'
        },
        statusBadge: {
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px 10px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: '600',
            backgroundColor: '#F1F5F9',
            color: '#475569',
            border: '1px solid rgba(226, 232, 240, 0.5)'
        },
        dateText: {
            color: '#64748B',
            fontSize: '12px'
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
            hoverBackgroundColor: '#D1FAE5',
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
                {/* Breadcrumbs & Header */}
                <div style={styles.headerWrapper}>
                    <BackButton link={route('purchase-requests.index')} text={'Back to Purchase Requests'} />

                    <div style={styles.titleRow}>
                        <div>
                            <h1 style={styles.title}>Recycle Bin</h1>
                            <p style={styles.subtitle}>
                                Review deleted purchase requests. Restore them back to active workflows or permanently erase records.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Table Data Card Component */}
                {deletedItems.data.length === 0 ? (
                    <div style={styles.emptyCard}>
                        <div style={styles.emptyIconCircle}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                <path d="M10 11v6M14 11v6" />
                                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                            </svg>
                        </div>
                        <h3 style={styles.emptyTitle}>No trashed items</h3>
                        <p style={styles.emptyText}>
                            Your recycle bin is clean. Items sent here will display for systemic data management.
                        </p>
                    </div>
                ) : (
                    <div style={styles.cardWrapper}>
                        <div style={styles.responsiveTable}>
                            <table style={styles.table}>
                                <thead style={styles.thead}>
                                    <tr>
                                        <th style={styles.th('left')}>PR Number</th>
                                        <th style={styles.th('left')}>Requested By</th>
                                        <th style={styles.th('center')}>Orig. Status</th>
                                        <th style={styles.th('left')}>Deleted Date</th>
                                        <th style={styles.th('right')}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {deletedItems.data.map((pr) => (
                                        <tr
                                            key={pr.id}
                                            style={styles.tr}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            {/* PR Number */}
                                            <td style={styles.td('left')}>
                                                <span style={styles.prBadge}>
                                                    {pr.pr_number}
                                                </span>
                                            </td>

                                            {/* User Information */}
                                            <td style={styles.td('left')}>
                                                {pr?.requester_name ? (
                                                    <span style={styles.userName}>{pr.requester_name}</span>
                                                ) : (
                                                    <span style={styles.userEmpty}>—</span>
                                                )}
                                            </td>

                                            {/* Status Badge */}
                                            <td style={styles.td('center')}>
                                                <span style={styles.statusBadge}>
                                                    {pr.status}
                                                </span>
                                            </td>

                                            {/* Deleted Timestamp */}
                                            <td style={styles.td('left')}>
                                                <span style={styles.dateText}>
                                                    {pr.deleted_at
                                                        ? new Date(pr.deleted_at).toLocaleString('en-US', {
                                                            dateStyle: 'short',
                                                            timeStyle: 'short'
                                                        })
                                                        : '—'
                                                    }
                                                </span>
                                            </td>

                                            {/* Action Control Configurations */}
                                            <td style={styles.td('right')}>
                                                <div style={styles.actionContainer}>
                                                    <button
                                                        onClick={() => handleRestore(pr.id)}
                                                        style={styles.btnRestore}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D1FAE5'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E8F7F2'}
                                                        title="Restore record"
                                                    >
                                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                            <polyline points="23 4 23 10 17 10" />
                                                            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                                                        </svg>
                                                        Restore
                                                    </button>
                                                    <button
                                                        onClick={() => handleForceDelete(pr.id)}
                                                        style={styles.btnPurge}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FCA5A530'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFEBEB'}
                                                        title="Delete permanently"
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

                        {/* Footer / Pagination Link Arrays */}
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