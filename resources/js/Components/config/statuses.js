const C = {
    bg: "#ffffff",
    surface: "#ffffff",
    surfaceLow: "#ffffff",
    surfaceHigh: "#f8fafc",
    outline: "#e2e8f0",
    borderInput: "#cbd5e1",
    primary: "#17aa54",
    primaryHover: "#1a8f4b",
    onPrimary: "#ffffff",
    textMain: "#0f172a",
    textMuted: "#64748b",
    textLabel: "#475569",
    error: "#dc2626",
    errorBg: "#fef2f2",
    errorBorder: "#fee2e2",
    tertiary: "#d97706",
    secondary: "#4338ca",
};

export const STATUS_CONFIG = {
    purchaseOrder: {
        open: {
            label: "Open",
            color: "#2563eb",
            bg: "#eff6ff",
            border: "#bfdbfe",
        },
        partially_received: {
            label: "Partially Received",
            color: C.tertiary,
            bg: "#fef3c7",
            border: "#fde68a",
        },
        fully_received: {
            label: "Fully Received",
            color: C.primary,
            bg: "#f0fdf4",
            border: "#bbf7d0",
        },
        cancelled: {
            label: "Cancelled",
            color: C.error,
            bg: C.errorBg,
            border: C.errorBorder,
        },
    },

    purchaseRequest: {
        pending: {
            label: "Pending",
            color: C.textMuted,
            bg: C.surfaceHigh,
            border: C.outline,
        },
        awaiting_approval: {
            label: "Awaiting Approval",
            color: C.tertiary,
            bg: "#fef3c7",
            border: "#fde68a",
        },
        auto_approved: {
            label: "Auto Approved",
            color: C.primary,
            bg: "#ecfdf5",
            border: "#d1fae5",
        },
        approved: {
            label: "Approved",
            color: C.primary,
            bg: "#ecfdf5",
            border: "#d1fae5",
        },
        rejected: {
            label: "Rejected",
            color: C.error,
            bg: C.errorBg,
            border: "#fee2e2",
        },
    },

    grn: {
        complete: {
            label: "Complete",
            color: C.primary,
            bg: "#ecfdf5",
            border: "#d1fae5",
        },
        discrepancy: {
            label: "Discrepancy",
            color: C.tertiary,
            bg: "#fef3c7",
            border: "#fde68a",
        },
    },

    warehouse: {
        active: {
            label: "Active",
            color: C.primary,
            bg: "#ecfdf5",
            border: "#d1fae5",
        },
        inactive: {
            label: "Inactive",
            color: C.error,
            bg: C.errorBg,
            border: C.errorBorder,
        },
    },

    supplier: {
        active: {
            label: "Active",
            color: C.primary,
            bg: "#ecfdf5",
            border: "#d1fae5",
        },
        inactive: {
            label: "Inactive",
            color: C.error,
            bg: C.errorBg,
            border: C.errorBorder,
        },
    },

    catalogItem: {
        active: {
            label: "Active",
            color: C.primary,
            bg: "#ecfdf5",
            border: "#d1fae5",
        },
        inactive: {
            label: "Inactive",
            color: C.error,
            bg: C.errorBg,
            border: C.errorBorder,
        },
    },
    user: {
        active: {
            label: "Active",
            color: C.primary,
            bg: "#ecfdf5",
            border: "#d1fae5",
        },
        inactive: {
            label: "Inactive",
            color: C.error,
            bg: C.errorBg,
            border: C.errorBorder,
        },
    },
};

export function getStatusConfig(resource, status) {
    return (
        STATUS_CONFIG[resource]?.[status] ?? {
            label: status,
            color: C.textMuted,
            bg: C.surfaceHigh,
            border: C.outline,
        }
    );
}
