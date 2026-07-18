import "./SearchBox.css";

import { router } from "@inertiajs/react";
import { useState, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import SearchSelect from "./SearchSelect";

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

    warehouse: [
        { value: 1, label: "Active" },
        { value: 0, label: "Inactive" },
    ],

    user: [
        { value: 1, label: "Active" },
        { value: 0, label: "Inactive" },
    ],

    grn: [
        { value: "complete", label: "Complete" },
        { value: "partially_received", label: "Partially Received" },
        { value: "discrepancy", label: "With Discrepancy" },
    ],
};

const ROLE_OPTIONS = {
    user: [
        { value: "tenant_admin", label: "Tenant Admin" },
        { value: "department_manager", label: "Department Manager" },
        { value: "warehouse_staff", label: "Warehouse Staff" },
        { value: "employee", label: "Employee" },
    ],
};

export default function SearchBox({
    routeName,
    filters = {},
    statusType = "",
    roleType = "",
}) {
    const [search, setSearch] = useState(filters.search ?? "");
    const [status, setStatus] = useState(filters.status ?? "");
    const [role, setRole] = useState(filters.role ?? "");

    const statusOptions = STATUS_OPTIONS[statusType];
    const roleOptions = ROLE_OPTIONS[roleType];

    const applyFilters = useCallback(
        (overrides = {}) => {
            router.get(
                route(routeName),
                {
                    search,
                    status,
                    role,
                    ...overrides,
                },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        },
        [search, status, role, routeName]
    );

    const debouncedSearch = useDebouncedCallback((value) => {
        applyFilters({
            search: value,
            page: 1,
        });
    }, 400);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        debouncedSearch(e.target.value);
    };

    const handleStatus = (e) => {
        setStatus(e.target.value);

        applyFilters({
            status: e.target.value,
            page: 1,
        });
    };

    const handleRole = (e) => {
        setRole(e.target.value);

        applyFilters({
            role: e.target.value,
            page: 1,
        });
    };

    return (
        <div className="search-box">
            <input
                className="search-box-input"
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search by name or ID..."
            />

            {statusOptions && (
                <SearchSelect
                    value={status}
                    onChange={handleStatus}
                    placeholder="All Status"
                    options={statusOptions}
                />
            )}

            {roleOptions && (
                <SearchSelect
                    value={role}
                    onChange={handleRole}
                    placeholder="All Roles"
                    options={roleOptions}
                />
            )}
        </div>
    );
}