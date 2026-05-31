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
        <div className="dash-ui">
            {/* Dashboard Reference Styles */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

                :root {
                    --font-head: 'DM Sans', sans-serif;
                    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                }

                * { box-sizing: border-box; margin: 0; padding: 0; }

                .dash-ui {
                    background: #F2F5F4;
                    display: grid;
                    grid-template-rows: 52px 1fr;
                    height: 100vh; /* Changed from min-height to strict height */
                    font-family: 'DM Sans', sans-serif;
                    color: #0A0C0B;
                    overflow: hidden; /* Stops the main application window from scrolling */
                }
                .dash-topbar {
                    background: #FFFFFF; 
                    border-bottom: 1px solid #E2E8E6;
                    display: flex; 
                    align-items: center; 
                    justify-content: space-between;
                    padding: 0 24px; 
                    font-size: 13px;
                }
                .dash-topbar-left { 
                    display: flex; 
                    align-items: center; 
                    gap: 12px; 
                    color: #5A6E67; 
                }
                .dash-topbar-right { 
                    display: flex; 
                    align-items: center; 
                    gap: 12px; 
                }
                .dash-body { 
                    display: flex; 
                    flex: 1; 
                    overflow: hidden; /* Retains flex bounding layout context */
                }
                .dash-sidebar {
                    background: #FFFFFF; 
                    width: ${collapsed ? '60px' : '200px'}; 
                    flex-shrink: 0;
                    border-right: 1px solid #E2E8E6;
                    padding: 16px 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    transition: width 0.15s ease;

                    height: 100%; 
                    /* Allows the nav container items to independently scroll if menu is long */
                    overflow-y: auto; 
                }
                .dash-sidebar-logo {
                    display: flex; 
                    align-items: center; 
                    gap: 8px;
                    padding: 0 16px 16px; 
                    margin-bottom: 8px;
                    border-bottom: 1px solid #E2E8E6; 
                    font-family: var(--font-head);
                    font-weight: 700; 
                    font-size: 14px; 
                    color: #0A0C0B;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .dash-sidebar-logo .sm { 
                    width: 20px; 
                    height: 20px; 
                    border-radius: 4px; 
                    background: #00C488; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center;
                    flex-shrink: 0;
                }
                .dash-nav-container {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    flex: 1;
                }
                .dash-nav-item {
                    display: flex; 
                    align-items: center; 
                    gap: 9px;
                    padding: 8px 16px; 
                    font-size: 13px; 
                    color: #5A6E67;
                    cursor: pointer; 
                    transition: background 0.15s, color 0.15s;
                    border-radius: 0;
                    text-decoration: none;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .dash-nav-item:hover { 
                    background: #F2F5F4; 
                    color: #0A0C0B; 
                }
                .dash-nav-item.active { 
                    background: #E8F7F2; 
                    color: #007A55; 
                    font-weight: 500; 
                }
                .dash-nav-item svg { 
                    width: 15px; 
                    height: 15px; 
                    flex-shrink: 0; 
                }
                .topbar-avatar {
                    width: 28px; 
                    height: 28px; 
                    border-radius: 50%;
                    background: #00C488; 
                    color: #0A0C0B;
                    display: flex; 
                    align-items: center; 
                    justify-content: center;
                    font-size: 11px; 
                    font-weight: 600; 
                    font-family: var(--font-mono);
                }
                .dash-main { 
                    flex: 1; 
                    padding: 20px; 
                    overflow-y: auto; /* Keeps the main area container cleanly scrollable */
                }
                .toggle-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #5A6E67;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 4px;
                }
                .toggle-btn:hover {
                    color: #0A0C0B;
                }
                .logout-btn {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    padding: 8px 16px;
                    font-size: 13px;
                    color: #A34747;
                    background: none;
                    border: none;
                    width: 100%;
                    text-align: left;
                    cursor: pointer;
                    border-top: 1px solid #E2E8E6;
                    margin-top: auto;
                    padding-top: 12px;
                }
                .logout-btn:hover {
                    background: #FCE8E8;
                    color: #7A1F1F;
                }
            `}</style>

            {/* Topbar Row */}
            <header className="dash-topbar">
                <div className="dash-topbar-left">
                    <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)} title="Toggle Sidebar">
                        <svg width="16" height="16" viewBox="0 0 15 15" fill="none" stroke="currentColor">
                            <path d="M1.5 3.5h12m-12 4h12m-12 4h12" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                    </button>
                    {header && <span>{header}</span>}
                </div>

                <div className="dash-topbar-right">
                    <span style={{ color: '#5A6E67', textTransform: 'lowercase', fontFamily: 'var(--font-mono)' }}>
                        ({user.role.replace(/_/g, ' ')})
                    </span>
                    <div className="topbar-avatar">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                </div>
            </header>

            {/* Layout Wrapper */}
            <div className="dash-body">
                {/* Sidebar Component */}
                <aside className="dash-sidebar">
                    <div className="dash-nav-container">
                        <div className="dash-sidebar-logo">
                            <div className="sm"></div>
                            {!collapsed && <span>StockVantage</span>}
                        </div>

                        {/* Custom Navigation Routing Map */}
                        {visibleNavItems.map(item => {
                            const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/')
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`dash-nav-item ${isActive ? 'active' : ''}`}
                                    title={collapsed ? item.label : undefined}
                                >
                                    {item.icon}
                                    {!collapsed && <span>{item.label}</span>}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Clean Action Log Out Anchor */}
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="logout-btn"
                        title={collapsed ? "Logout" : undefined}
                        onSuccess={() => window.location.replace('/login')}
                    >
                        <svg viewBox="0 0 15 15" fill="none" style={{ width: 15, height: 15, flexShrink: 0 }}>
                            <path d="M10.5 2.5H12.5V12.5H10.5M2.5 7.5H9.5M2.5 7.5L5.5 4.5M2.5 7.5L5.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {!collapsed && <span>Logout</span>}
                    </Link>
                </aside>

                {/* Main Content Pane */}
                <main className="dash-main">
                    {children}
                </main>
            </div>
        </div>
    )
}