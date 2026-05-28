import { Head, Link, router, usePage } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import { EditActionButton, DeleteActionButton } from '@/Components/ActionButtons'

const C = {
    bg: '#F4F5F8',
    surface: '#FFFFFF',
    surfaceLow: '#F8F9FC',
    surfaceHigh: '#E9EBF0',
    outline: '#DDE2E5',
    primary: '#00875A',       // Richer green for crisp contrast on light backgrounds
    secondary: '#6554C0',     // Deep Indigo
    tertiary: '#B65C00',      // Warm Amber
    onSurface: '#1A1C1E',     // Charcoal dark text
    onSurfaceVar: '#5D6166',  // Medium gray for subtext/labels
    onPrimary: '#FFFFFF',
    error: '#DE350B',         // High-contrast red
}

const ROLE_CONFIG = {
    tenant_admin: {
        label: 'Admin',
        color: '#5B41B0',     // Deepened for text readability
        bg: '#6554C00D',
        border: '#6554C025',
    },
    department_manager: {
        label: 'Manager',
        color: '#1D63B8',     // Richer corporate blue
        bg: '#1D63B80D',
        border: '#1D63B820',
    },
    warehouse_staff: {
        label: 'Warehouse',
        color: '#A04E00',     // Deep amber
        bg: '#B65C000A',
        border: '#B65C0020',
    },
    employee: {
        label: 'Employee',
        color: C.onSurfaceVar,
        bg: C.surfaceLow,
        border: C.outline,
    },
}

function RoleBadge({ role }) {
    const config = ROLE_CONFIG[role] ?? ROLE_CONFIG.employee
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontSize: 11, fontWeight: 700, padding: '3px 10px',
            borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.05em',
            background: config.bg, color: config.color, border: `1px solid ${config.border}`,
        }}>
            {config.label}
        </span>
    )
}

export default function Index({ users, flash }) {
    const { auth } = usePage().props
    const currentUserId = auth.user.id

    function handleDelete(id) {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(`/users/${id}`)
        }
    }

    return (
        <AuthenticatedLayout header="Users">
            <Head title="Users" />

            <style>{`
                .usr-btn-primary {
                    display: inline-flex; align-items: center; gap: 7px;
                    background: ${C.primary}; color: ${C.onPrimary};
                    border: none; border-radius: 12px; padding: 10px 18px;
                    font-size: 14px; font-weight: 600; cursor: pointer;
                    text-decoration: none; transition: filter 0.15s; font-family: inherit;
                }
                .usr-btn-primary:hover { filter: brightness(0.92); }
                .usr-card {
                    background: ${C.surface}; border: 1px solid ${C.outline};
                    border-radius: 16px; overflow: hidden;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
                }
                .usr-table { width: 100%; border-collapse: collapse; }
                .usr-table th {
                    text-align: left; padding: 12px 20px;
                    font-size: 11px; font-weight: 600; color: ${C.onSurfaceVar};
                    text-transform: uppercase; letter-spacing: 0.07em;
                    border-bottom: 1px solid ${C.outline};
                    background: ${C.surfaceLow};
                }
                .usr-table td {
                    padding: 15px 20px; color: ${C.onSurfaceVar};
                    border-bottom: 1px solid ${C.outline}60; font-size: 14px;
                }
                .usr-table tbody tr:last-child td { border-bottom: none; }
                .usr-table tbody tr:hover td { background: ${C.surfaceLow}; }
                .usr-status-active {
                    display: inline-flex; align-items: center; gap: 5px;
                    font-size: 11px; font-weight: 700; padding: 3px 10px;
                    border-radius: 20px; text-transform: uppercase; letter-spacing: 0.04em;
                    background: ${C.primary}0D; color: ${C.primary};
                    border: 1px solid ${C.primary}25;
                }
                .usr-status-inactive {
                    display: inline-flex; align-items: center; gap: 5px;
                    font-size: 11px; font-weight: 700; padding: 3px 10px;
                    border-radius: 20px; text-transform: uppercase; letter-spacing: 0.04em;
                    background: ${C.error}0A; color: ${C.error};
                    border: 1px solid ${C.error}20;
                }
                .usr-action {
                    font-size: 13px; font-weight: 500; color: ${C.onSurfaceVar};
                    text-decoration: none; padding: 5px 12px; border-radius: 8px;
                    transition: all 0.15s; border: 1px solid transparent;
                }
                .usr-action:hover {
                    color: ${C.onSurface}; background: ${C.surfaceHigh};
                    border-color: ${C.outline};
                }
                .usr-action.del:hover {
                    color: ${C.error}; background: ${C.error}0A;
                    border-color: ${C.error}25;
                }
                .usr-pg-btn {
                    display: inline-flex; align-items: center; justify-content: center;
                    min-width: 34px; height: 34px; padding: 0 10px; border-radius: 8px;
                    font-size: 13px; color: ${C.onSurfaceVar}; background: ${C.surface};
                    border: 1px solid ${C.outline}; text-decoration: none; transition: all 0.15s;
                }
                .usr-pg-btn:hover { color: ${C.onSurface}; border-color: ${C.onSurfaceVar}50; }
                .usr-pg-btn.active { background: ${C.primary}; color: ${C.onPrimary}; border-color: ${C.primary}; font-weight: 700; }
                .usr-pg-btn.disabled { opacity: 0.3; pointer-events: none; }
                .usr-empty {
                    display: flex; flex-direction: column; align-items: center;
                    justify-content: center; padding: 72px 24px; gap: 14px; color: ${C.onSurfaceVar};
                }
                .usr-avatar {
                    width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 13px; font-weight: 700;
                    background: ${C.primary}; /* Changed from linear-gradient to flat plain green */
                    color: ${C.onPrimary};
                }
                .usr-you-badge {
                    font-size: 10px; font-weight: 700; padding: 2px 6px;
                    border-radius: 4px; background: ${C.primary}0D;
                    color: ${C.primary}; border: 1px solid ${C.primary}25;
                    text-transform: uppercase; letter-spacing: 0.05em; margin-left: 6px;
                }
            `}</style>

            <FlashMessage flash={flash} />

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <p style={{ fontSize: 14, color: C.onSurfaceVar }}>
                    {users.total} user{users.total !== 1 ? 's' : ''}
                </p>
                <Link href="/users/create" className="usr-btn-primary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add User
                </Link>
            </div>

            <div className="usr-card">
                {users.data.length === 0 ? (
                    <div className="usr-empty">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.4">
                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                        </svg>
                        <p style={{ fontSize: 15, fontWeight: 500, color: C.onSurface }}>No users yet</p>
                        <Link href="/users/create" className="usr-btn-primary" style={{ marginTop: 4 }}>
                            Add first user
                        </Link>
                    </div>
                ) : (
                    <table className="usr-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map(user => (
                                <tr key={user.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <div className="usr-avatar">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600, color: C.onSurface, display: 'flex', alignItems: 'center' }}>
                                                    {user.name}
                                                    {user.id === currentUserId && (
                                                        <span className="usr-you-badge">You</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ color: C.onSurface }}>{user.email}</td>
                                    <td><RoleBadge role={user.role} /></td>
                                    <td>
                                        {user.is_active
                                            ? <span className="usr-status-active"><span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />Active</span>
                                            : <span className="usr-status-inactive"><span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />Inactive</span>
                                        }
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            <EditActionButton href={`/users/${user.id}/edit`} />
                                            {user.id !== currentUserId && (
                                                <DeleteActionButton onClick={() => handleDelete(user.id)} />
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {users.last_page > 1 && (
                <div style={{ display: 'flex', gap: 6, marginTop: 20, justifyContent: 'flex-end' }}>
                    {users.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url ?? '#'}
                            className={`usr-pg-btn ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    )
}