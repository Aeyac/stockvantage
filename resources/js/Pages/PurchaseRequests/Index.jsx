import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FlashMessage from "@/Components/FlashMessage";
import {
    CreateActionButton,
    ViewActionButton,
} from "@/Components/ActionButtons";
import { formatCurrency } from "@/hooks/useCurrency";
import { router } from "@inertiajs/react";
import confirmToast from "@/utils/confirmToast";
import RecycleBinButton from "@/Components/RecycleBinButton";
import { DeleteActionButton } from "@/Components/ActionButtons";
import SearchBox from "@/Components/SearchBox";
import { useState } from "react";

// Soft, readable text colors with subtle background pills for light mode statuses
const STATUS_CONFIG = {
    pending: {
        label: "Pending",
        text: "#64748b", // Slate
        bg: "#f8fafc",
        border: "#e2e8f0",
    },
    awaiting_approval: {
        label: "Awaiting Approval",
        text: "#d97706", // Amber
        bg: "#fef3c7",
        border: "#fde68a",
    },
    auto_approved: {
        label: "Auto Approved",
        text: "#059669", // Emerald
        bg: "#ecfdf5",
        border: "#d1fae5",
    },
    approved: {
        label: "Approved",
        text: "#00C488", // Accent Green
        bg: "#f0fdf4",
        border: "#bbf7d0",
    },
    rejected: {
        label: "Rejected",
        text: "#dc2626", // Red
        bg: "#fef2f2",
        border: "#fee2e2",
    },
};

function StatusBadge({ status }) {
    const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
    return (
        <span
            className="pr-status"
            style={{
                background: config.bg,
                color: config.text,
                border: `1px solid ${config.border}`,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "11.5px",
                fontWeight: 500,
                padding: "3px 10px",
                borderRadius: "20px",
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

async function handleDelete(id) {
    const confirmed = await confirmToast(
        "Are you sure you want to delete this purchase request?",
        "Do not show this warning again.",
    );
    if (confirmed) {
        router.delete(route("purchase-requests.destroy", id));
    }
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-PH", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export default function Index({ purchaseRequests, filters, flash = "" }) {
    return (
        <AuthenticatedLayout header="Purchase Requests">
            <Head title="Purchase Requests" />

            <style>{`
                /* Fully fluid layout container that wraps under text headers on mobile screens */
                /* Header */
            .pr-header {
                display: flex;
                flex-direction: column;
                gap: 14px;
                margin-bottom: 24px;
            }

            .pr-header-info {
                display: flex;
                align-items: center;
            }

            .pr-header-actions {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 16px;
            }

            .pr-search-wrap {
                flex: 1;
                max-width: 420px;
            }

            .pr-header-btn-wrap {
                display: flex;
                align-items: center;
                gap: 10px;
                flex-shrink: 0;
            }

                /* Primary Brand Button - Dashboard accent green */
                .pr-btn-primary {
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
                    vertical-align: middle;
                }
                .pr-btn-primary:hover { background: #00a873; }

                /* Crisp Light Mode Table Container with Horizontal Scrolling */
                .pr-table-wrap {
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
                    width: 100%;
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                }
                
                .pr-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 13.5px;
                    min-width: 800px;
                }
                
                .pr-table thead tr {
                    background: #f8fafc;
                    border-bottom: 1px solid #e2e8f0;
                }
                .pr-table th {
                    text-align: left;
                    padding: 14px 18px;
                    font-size: 11px;
                    font-weight: 600;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    white-space: nowrap;
                }
                .pr-table td {
                    padding: 14px 18px;
                    color: #334155;
                    border-bottom: 1px solid #f1f5f9;
                    white-space: nowrap;
                    vertical-align: middle;
                }
                .pr-table tbody tr:last-child td { border-bottom: none; }
                .pr-table tbody tr:hover td { background: #f8fafc; }

                .pr-id-badge {
                    font-family: inherit;
                    font-size: 12px; 
                    font-weight: 700;
                    color: #0f172a;
                    letter-spacing: 0.02em;
                }
                
                .pr-pagination-wrap {
                    display: flex;
                    gap: 6px;
                    margin-top: 20px;
                    justify-content: flex-end;
                    flex-wrap: wrap;
                }

                .pr-pagination-btn {
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
                .pr-pagination-btn:hover { color: #1e293b; border-color: #cbd5e1; background: #f8fafc; }
                .pr-pagination-btn.active {
                    background: #00C488;
                    color: #fff;
                    border-color: #00C488;
                    font-weight: 600;
                }
                .pr-pagination-btn.disabled {
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

                /* Mobile Layout Media Queries */
               @media (max-width: 768px) {
                    .pr-header-actions {
                        flex-direction: column;
                        align-items: stretch;
                        gap: 12px;
                    }

                    .pr-search-wrap {
                        max-width: 100%;
                    }

                    .pr-header-btn-wrap {
                        justify-content: flex-start;
                        flex-wrap: wrap;
                    }
                }
                @media (max-width: 480px) {
                    .pr-pagination-wrap {
                        justify-content: center;
                    }
                }
            `}</style>

            <FlashMessage flash={flash} />

            {/* Header row */}
            {/* Header */}
            <div className="pr-header">
                <div className="pr-header-info">
                    <p
                        style={{
                            fontSize: 13,
                            color: "#64748b",
                            margin: 0,
                            fontWeight: 500,
                        }}
                    >
                        {purchaseRequests.total} purchase request
                        {purchaseRequests.total !== 1 ? "s" : ""} registered
                    </p>
                </div>

                <div className="pr-header-actions">
                    <div className="pr-search-wrap">
                        <SearchBox
                            routeName="purchase-requests.index"
                            filters={filters}
                        />
                    </div>

                    <div className="pr-header-btn-wrap">
                        <RecycleBinButton endpoint="purchase-requests.recycle-bin.index" />

                        <CreateActionButton
                            href="/purchase-requests/create"
                            label="New Request"
                        />
                    </div>
                </div>
            </div>

            {/* Table wrapper */}
            <div className="pr-table-wrap">
                {purchaseRequests.data.length === 0 ? (
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
                            No purchase requests yet
                        </p>
                        <Link
                            href="/purchase-requests/create"
                            className="pr-btn-primary"
                            style={{ marginTop: 4 }}
                        >
                            Submit your first request
                        </Link>
                    </div>
                ) : (
                    <table className="pr-table">
                        <thead>
                            <tr>
                                <th style={{ width: "15%" }}>PR ID</th>
                                <th style={{ width: "25%" }}>Requested By</th>
                                <th style={{ width: "20%" }}>Total Amount</th>
                                <th style={{ width: "15%" }}>Status</th>
                                <th style={{ width: "15%" }}>Date Submitted</th>
                                <th style={{ width: "10%" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchaseRequests.data.map((pr) => (
                                <tr key={pr.id}>
                                    <td>
                                        <span className="pr-id-badge">
                                            {pr.pr_number}
                                        </span>
                                    </td>
                                    <td>
                                        <div
                                            style={{
                                                fontWeight: 600,
                                                color: "#0f172a",
                                            }}
                                        >
                                            {pr.requester?.name ?? "—"}
                                        </div>
                                    </td>
                                    <td>
                                        <span
                                            style={{
                                                fontWeight: 600,
                                                color: "#334155",
                                            }}
                                        >
                                            {formatCurrency(pr.total_amount)}
                                        </span>
                                    </td>
                                    <td>
                                        <StatusBadge status={pr.status} />
                                    </td>
                                    <td style={{ color: "#64748b" }}>
                                        {formatDate(pr.created_at)}
                                    </td>
                                    <td>
                                        <div
                                            style={{ display: "flex", gap: 6 }}
                                        >
                                            <ViewActionButton
                                                href={`/purchase-requests/${pr.id}`}
                                            />
                                            {pr.status !==
                                                "awaiting_approval" && (
                                                <DeleteActionButton
                                                    onClick={() =>
                                                        handleDelete(pr.id)
                                                    }
                                                />
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            {purchaseRequests.last_page > 1 && (
                <div className="pr-pagination-wrap">
                    {purchaseRequests.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url ?? "#"}
                            className={`pr-pagination-btn ${link.active ? "active" : ""} ${!link.url ? "disabled" : ""}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    );
}
