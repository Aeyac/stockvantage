import { router } from "@inertiajs/react";
import { useState, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";

const STATUS_OPTIONS = {
    purchaseRequest: [
        { value: "pending", label: "Pending" },
        { value: "auto_approved", label: "Auto Approved" },
        { value: "partially_approved", label: "Partially Approved" },
        { value: "awaiting_approval", label: "Awaiting Approval" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
    ],
    purchaseOrder: [
        { value: "open", label: "Open" },
        { value: "partially_received", label: "Partially Received" },
        { value: "fully_received", label: "Fully Received" },
        { value: "cancelled", label: "Cancelled" },
    ],
    catalogItem: [
        { value: 1, label: "Active" },
        { value: 0, label: "Inactive" },
    ],
};

export default function SearchBox({
    routeName = "catalog-items.index",
    filters = {},
    statusType = "",
}) {
    const [search, setSearch] = useState(filters.search ?? "");
    const [status, setStatus] = useState(filters.status ?? "");

    const statusValues = STATUS_OPTIONS[statusType] ?? [];

    // Centralized route update helper
    const applyFilters = useCallback(
        (overrides = {}) => {
            router.get(
                route(routeName),
                { search, status, ...overrides },
                { preserveState: true, replace: true },
            );
        },
        [search, status, routeName],
    );

    // Debounce the text search so it doesn't slam the network on every keystroke
    const debouncedSearch = useDebouncedCallback((value) => {
        applyFilters({ search: value, page: 1 }); // Always reset to page 1 on new searches
    }, 400);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        debouncedSearch(e.target.value);
    };

    const handleStatusChange = (e) => {
        const value = e.target.value;
        setStatus(value);
        applyFilters({ status: value, page: 1 });
    };

    return (
        <div
            style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
            }}
        >
            {/* Scoped CSS styling for focus glow effects and transitions */}
            <style>{`
                .sb-input-field, .sb-select-field {
                    transition: all 0.2s ease-in-out;
                }
                
                /* Green theme glow on search input focus */
                .sb-input-field:focus {
                    border-color: #00C488 !important;
                    box-shadow: 0 0 0 3px rgba(0, 196, 136, 0.15) !important;
                }

                /* Subtle green border tint for dropdown focus and hover states */
                .sb-select-field:hover, .sb-select-field:focus {
                    border-color: #00C488 !important;
                }
            `}</style>

            {/* Search Input field */}
            <input
                type="text"
                className="sb-input-field"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search by name or id..."
                style={{
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    fontSize: "13.5px",
                    outline: "none",
                    minWidth: "240px",
                    height: "38px",
                    boxSizing: "border-box",
                }}
            />

            {/* Status Dropdown Selector wrapper to enable clean custom arrows */}
            <div style={{ position: "relative", display: "inline-block" }}>
                <select
                    className="sb-select-field"
                    value={status}
                    onChange={handleStatusChange}
                    style={{
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        appearance:
                            "none" /* Strips default engine layouts causing off-center text alignment */,
                        lineHeight:
                            "36px" /* Matches physical input text box height boundaries */,
                        padding:
                            "0 32px 0 12px" /* Leave extra space on right for custom chevron */,
                        borderRadius: "6px",
                        border: "1px solid #e2e8f0",
                        background: "#fff",
                        fontSize: "13.5px",
                        cursor: "pointer",
                        outline: "none",
                        height: "38px",
                        boxSizing: "border-box",
                        display: "block",
                    }}
                >
                    <option value="">All Status</option>
                    {statusValues.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                {/* SVG Custom UI Indicator arrow perfectly centered vertically on top */}
                <div
                    style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                        display: "flex",
                        alignItems: "center",
                        color: "#64748b",
                    }}
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </div>
        </div>
    );
}
