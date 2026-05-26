import { useState, useEffect } from 'react'
import { Link, usePage } from '@inertiajs/react'

const NAV_ITEMS = [
    {
        label: 'Dashboard',
        href: '/dashboard',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
        ),
        roles: ['tenant_admin', 'department_manager', 'warehouse_staff', 'employee'],
    },
    {
        label: 'Suppliers',
        href: '/suppliers',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
        roles: ['tenant_admin'],
    },
    {
        label: 'Catalog',
        href: '/catalog-items',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
            </svg>
        ),
        roles: ['tenant_admin', 'department_manager', 'warehouse_staff', 'employee'],
    },
    {
        label: 'Purchase Requests',
        href: '/purchase-requests',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
        ),
        roles: ['tenant_admin', 'department_manager', 'warehouse_staff', 'employee'],
    },
    {
        label: 'Purchase Orders',
        href: '/purchase-orders',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
            </svg>
        ),
        roles: ['tenant_admin', 'department_manager'],
    },
    {
        label: 'Inventory',
        href: '/inventory',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            </svg>
        ),
        roles: ['tenant_admin', 'warehouse_staff'],
    },
    {
        label: 'Warehouses',
        href: '/warehouses',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M1 22V9.5L12 2l11 7.5V22" />
                <path d="M9 22V12h6v10" />
            </svg>
        ),
        roles: ['tenant_admin', 'warehouse_staff'],
    },
    {
        label: 'GRN',
        href: '/grn',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
        ),
        roles: ['tenant_admin', 'warehouse_staff'],
    },
    {
        label: 'Users',
        href: '/users',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
        ),
        roles: ['tenant_admin'],
    },
    {
        label: 'Settings',
        href: '/settings',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 005 15.4a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 005 8.6a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009.4 5c.36-.15.6-.5.6-.91V4a2 2 0 114 0v.09c0 .41.24.76.6.91a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019 8.6c.15.36.5.6.91.6H20a2 2 0 110 4h-.09c-.41 0-.76.24-.91.6z" />
            </svg>
        ),
        roles: ['tenant_admin'],
    },




    //     <a class="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg active:scale-95 transition-transform" href="#">
    // <span class="material-symbols-outlined" data-icon="settings">settings</span>
    // <span class="font-body-md">Settings</span>
    // </a>
]

export default function AuthenticatedLayout({ children, header }) {
    const { auth } = usePage().props
    const user = auth.user

    const [collapsed, setCollapsed] = useState(() => {
        const saved = localStorage.getItem('sidebar-collapsed')
        return saved ? JSON.parse(saved) : false
    })

    useEffect(() => {
        localStorage.setItem('sidebar-collapsed', JSON.stringify(collapsed))
    }, [collapsed])


    const currentPath = window.location.pathname

    const visibleNavItems = NAV_ITEMS.filter(item =>
        item.roles.includes(user.role)
    )

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: '#0a0a0b',
            fontFamily: "'DM Sans', sans-serif",
            color: '#e2e0d6',
        }}>
            {/* Google Font */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@600;700&display=swap');

                * { box-sizing: border-box; margin: 0; padding: 0; }

                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #2a2a2e; border-radius: 2px; }

                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 10px 14px;
                    border-radius: 8px;
                    color: #6b6b7a;
                    text-decoration: none;
                    font-size: 13.5px;
                    font-weight: 450;
                    transition: all 0.15s ease;
                    white-space: nowrap;
                    overflow: hidden;
                    letter-spacing: 0.01em;
                }
                .nav-item:hover {
                    background: #16161a;
                    color: #e2e0d6;
                }
                .nav-item.active {
                    background: #16161a;
                    color: #e2e0d6;
                    border: 1px solid #232328;
                }
                .nav-item.active .nav-dot {
                    background: #4f8ef7;
                }
                .nav-dot {
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: transparent;
                    flex-shrink: 0;
                    margin-left: auto;
                }
                .icon-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #6b6b7a;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 6px;
                    border-radius: 6px;
                    transition: all 0.15s;
                }
                .icon-btn:hover {
                    background: #16161a;
                    color: #e2e0d6;
                }
                .main-content {
                    flex: 1;
                    overflow-y: auto;
                    min-height: 100vh;
                }
                .topbar {
                    position: sticky;
                    top: 0;
                    z-index: 10;
                    background: rgba(10,10,11,0.85);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid #16161a;
                    padding: 0 28px;
                    height: 58px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .page-content {
                    padding: 32px 28px;
                }
                .badge {
                    font-size: 10px;
                    font-weight: 600;
                    padding: 2px 7px;
                    border-radius: 20px;
                    background: #1a1a20;
                    color: #6b6b7a;
                    border: 1px solid #232328;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
            `}</style>

            {/* Sidebar */}
            <aside style={{
                width: collapsed ? '64px' : '220px',
                background: '#0d0d10',
                borderRight: '1px solid #16161a',
                display: 'flex',
                flexDirection: 'column',
                transition: 'width 0.2s ease',
                flexShrink: 0,
                position: 'sticky',
                top: 0,
                height: '100vh',
                overflow: 'hidden',
            }}>
                {/* Logo */}
                <div style={{
                    padding: '20px 16px 16px',
                    borderBottom: '1px solid #16161a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'space-between',
                    gap: 10,
                }}>
                    {!collapsed && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{
                                width: 28,
                                height: 28,
                                background: 'linear-gradient(135deg, #4f8ef7, #2563eb)',
                                borderRadius: 7,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                            }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                                </svg>
                            </div>
                            <span style={{
                                fontFamily: "'Syne', sans-serif",
                                fontWeight: 700,
                                fontSize: 15,
                                color: '#e2e0d6',
                                letterSpacing: '-0.02em',
                            }}>
                                StockVantage
                            </span>
                        </div>
                    )}
                    {collapsed && (
                        <div style={{
                            width: 28,
                            height: 28,
                            background: 'linear-gradient(135deg, #4f8ef7, #2563eb)',
                            borderRadius: 7,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                            </svg>
                        </div>
                    )}
                    {!collapsed && (
                        <button className="icon-btn" onClick={() => setCollapsed(true)}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Nav */}
                <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
                    {visibleNavItems.map(item => {
                        const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/')
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                // prefetch
                                className={`nav-item ${isActive ? 'active' : ''}`}
                                title={collapsed ? item.label : undefined}
                            >
                                <span style={{ flexShrink: 0, opacity: isActive ? 1 : 0.6 }}>{item.icon}</span>
                                {!collapsed && (
                                    <>
                                        <span>{item.label}</span>
                                        <span className="nav-dot" />
                                    </>
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Collapse toggle when collapsed */}
                {collapsed && (
                    <div style={{ padding: '12px 10px', borderTop: '1px solid #16161a' }}>
                        <button className="icon-btn" style={{ width: '100%' }} onClick={() => setCollapsed(false)}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* User info */}
                {!collapsed && (
                    <div style={{
                        padding: '14px 14px',
                        borderTop: '1px solid #16161a',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                    }}>
                        <div style={{
                            width: 30,
                            height: 30,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #2a2a3e, #1a1a2e)',
                            border: '1px solid #232328',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 12,
                            fontWeight: 600,
                            color: '#4f8ef7',
                            flexShrink: 0,
                        }}>
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div style={{ overflow: 'hidden', flex: 1 }}>
                            <div style={{ fontSize: 12.5, fontWeight: 500, color: '#c8c6bc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {user.name}
                            </div>
                            <div style={{ fontSize: 11, color: '#4b4b56', marginTop: 1 }}>
                                {user.role.replace('_', ' ')}
                            </div>
                        </div>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="sv-icon-btn"
                            title="Logout"
                            onSuccess={() => window.location.replace('/login')}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                            </svg>
                        </Link>
                    </div>
                )}
            </aside>

            {/* Main */}
            <div className="main-content">
                {/* Topbar */}
                <div className="topbar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        {header && (
                            <h1 style={{
                                fontFamily: "'Syne', sans-serif",
                                fontSize: 16,
                                fontWeight: 600,
                                color: '#e2e0d6',
                                letterSpacing: '-0.01em',
                            }}>
                                {header}
                            </h1>
                        )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="badge">{user.role.replace(/_/g, ' ')}</span>
                        <div style={{
                            width: 30,
                            height: 30,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #2a2a3e, #1a1a2e)',
                            border: '1px solid #232328',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 12,
                            fontWeight: 600,
                            color: '#4f8ef7',
                        }}>
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <div className="page-content">
                    {children}
                </div>
            </div>
        </div>
    )
}