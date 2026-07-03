import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FlashMessage from "@/Components/FlashMessage";
import {
    EditActionButton,
    DeleteActionButton,
    CreateActionButton,
} from "@/Components/ActionButtons";
import confirmToast from "@/utils/confirmToast";
import RecycleBinButton from "@/Components/RecycleBinButton";
import SearchBox from "@/Components/SearchBox";

// Soft, readable text colors with subtle background pills for light mode statuses
const STATUS_CONFIG = {
    active: {
        label: "Active",
        text: "#00C488", // Accent Green
        bg: "#f0fdf4",
        border: "#bbf7d0",
    },
    inactive: {
        label: "Inactive",
        text: "#dc2626", // Red
        bg: "#fef2f2",
        border: "#fee2e2",
    },
};

function StatusBadge({ isActive }) {
    const config = isActive ? STATUS_CONFIG.active : STATUS_CONFIG.inactive;
    return (
        <span
            className="wh-status"
            style={{
                background: config.bg,
                color: config.text,
                border: `1px solid ${config.border}`,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "10px",
                fontWeight: 500,
                padding: "3px 10px",
                borderRadius: "20px",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
            }}
        >
            <span
                style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: config.text,
                    display: "inline-block",
                }}
            />
            {config.label}
        </span>
    );
}

export default function Index({ warehouses, filters, flash }) {
    async function handleDelete(id) {
        const confirmed = await confirmToast(
            "Are you sure you want to delete this purchase request?",
            "Do not show this warning again.",
        );
        if (confirmed) {
            router.delete(`/warehouses/${id}`);
        }
    }

    return (
        <AuthenticatedLayout header="Warehouses">
            <Head title="Warehouses" />

            <style>{`
                /* Container setup for registered count row */
                .wh-header-top-row {
                    margin-bottom: 12px;
                }

                .wh-meta-text {
                    font-size: 13px;
                    color: #64748b;
                    margin: 0;
                    font-weight: 500;
                    line-height: 1.2;
                }

                /* Aligns search box to left, buttons to right */
                .wh-actions-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center; 
                    margin-bottom: 24px;
                    gap: 16px;
                }
                
                /* Groups the header action buttons cleanly */
                .wh-header-btn-wrap {
                    display: flex;
                    align-items: center;
                    gap: 10px; 
                    flex-shrink: 0;
                }

                /* Primary Brand Button - Dashboard accent green */
                .wh-btn-primary {
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
                .wh-btn-primary:hover { background: #00a873; }

                /* Crisp Light Mode Table Container */
                .wh-table-wrap {
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
                    width: 100%;
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                }
                
                .wh-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 13.5px;
                    min-width: 700px;
                }
                
                .wh-table thead tr {
                    background: #f8fafc;
                    border-bottom: 1px solid #e2e8f0;
                }
                .wh-table th {
                    text-align: left;
                    padding: 14px 18px;
                    font-size: 11px;
                    font-weight: 600;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    white-space: nowrap;
                }
                .wh-table td {
                    padding: 14px 18px;
                    color: #334155;
                    border-bottom: 1px solid #f1f5f9;
                    white-space: nowrap;
                    vertical-align: middle;
                }
                .wh-table tbody tr:last-child td { border-bottom: none; }
                .wh-table tbody tr:hover td { background: #f8fafc; }

                /* Pagination Blocks */
                .wh-pagination-wrap {
                    display: flex;
                    gap: 6px;
                    margin-top: 20px;
                    justify-content: flex-end;
                    flex-wrap: wrap;
                }
                
                .wh-pagination-btn {
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
                .wh-pagination-btn:hover { color: #1e293b; border-color: #cbd5e1; background: #f8fafc; }
                .wh-pagination-btn.active {
                    background: #00C488;
                    color: #fff;
                    border-color: #00C488;
                    font-weight: 600;
                }
                .wh-pagination-btn.disabled {
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

                /* Mobile Sizing Adapters */
                @media (max-width: 640px) {
                    .wh-actions-row {
                        flex-direction: column;
                        align-items: stretch;
                        gap: 12px;
                    }
                    .wh-header-btn-wrap {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;
                    }
                }
                @media (max-width: 480px) {
                    .wh-pagination-wrap {
                        justify-content: center;
                    }
                }
            `}</style>

            <FlashMessage flash={flash} />

            {/* Row 1: Total registrations count */}
            <div className="wh-header-top-row">
                <p className="wh-meta-text">
                    {warehouses.total} warehouse
                    {warehouses.total !== 1 ? "s" : ""} registered
                </p>
            </div>

            {/* Row 2: Searchbox on the left, Buttons on the right */}
            <div className="wh-actions-row">
                <SearchBox
                    routeName={"warehouses.index"}
                    filters={filters}
                    statusType={"warehouse"}
                />

                <div className="wh-header-btn-wrap">
                    <RecycleBinButton
                        endpoint={"warehouses.recycle-bin.index"}
                    />
                    <CreateActionButton
                        href={"/warehouses/create"}
                        label={"Add Warehouse"}
                    />
                </div>
            </div>

            {/* Table wrapper */}
            <div className="wh-table-wrap">
                {warehouses.data.length === 0 ? (
                    <div className="empty-state">
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#94a3b8"
                            strokeWidth="1.5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 21h19.5m-18-10.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5-13.5h16.5M6.75 6.75h.008v.008H6.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM11.25 6.75h.008v.008h-.008V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM15.75 6.75h.008v.008h-.008V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                        </svg>
                        <p
                            style={{
                                fontSize: 14,
                                fontWeight: 500,
                                color: "#475569",
                            }}
                        >
                            No warehouses yet
                        </p>
                        <Link
                            href="/warehouses/create"
                            className="wh-btn-primary"
                            style={{ marginTop: 4 }}
                        >
                            Add first warehouse
                        </Link>
                    </div>
                ) : (
                    <table className="wh-table">
                        <thead>
                            <tr>
                                <th style={{ width: "30%" }}>Name</th>
                                <th style={{ width: "40%" }}>Location</th>
                                <th style={{ width: "15%" }}>Status</th>
                                <th style={{ width: "15%" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {warehouses.data.map((warehouse) => (
                                <tr key={warehouse.id}>
                                    <td>
                                        <div
                                            style={{
                                                fontWeight: 600,
                                                color: "#0f172a",
                                            }}
                                        >
                                            {warehouse.name}
                                        </div>
                                    </td>
                                    <td>
                                        {warehouse.location ? (
                                            warehouse.location
                                        ) : (
                                            <span
                                                style={{
                                                    color: "#64748b",
                                                    opacity: 0.4,
                                                }}
                                            >
                                                —
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <StatusBadge
                                            isActive={warehouse.is_active}
                                        />
                                    </td>
                                    <td>
                                        <div
                                            style={{ display: "flex", gap: 6 }}
                                        >
                                            <EditActionButton
                                                href={`/warehouses/${warehouse.id}/edit`}
                                            />
                                            <DeleteActionButton
                                                onClick={() =>
                                                    handleDelete(warehouse.id)
                                                }
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            {warehouses.last_page > 1 && (
                <div className="wh-pagination-wrap">
                    {warehouses.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url ?? "#"}
                            className={`wh-pagination-btn ${link.active ? "active" : ""} ${!link.url ? "disabled" : ""}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    );
}
