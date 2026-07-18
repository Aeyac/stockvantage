const C = {
    surfaceLow: "#F8F9FC",
    outline: "#DDE2E5",
    onSurfaceVar: "#5D6166",
};

export const ROLE_CONFIG = {
    tenant_admin: {
        label: "Admin",
        color: "#5B41B0",
        bg: "#6554C00D",
        border: "#6554C025",
    },

    department_manager: {
        label: "Manager",
        color: "#1D63B8",
        bg: "#1D63B80D",
        border: "#1D63B820",
    },

    warehouse_staff: {
        label: "Warehouse Staff",
        color: "#A04E00",
        bg: "#B65C000A",
        border: "#B65C0020",
    },

    employee: {
        label: "Employee",
        color: C.onSurfaceVar,
        bg: C.surfaceLow,
        border: C.outline,
    },
};

export function getRoleConfig(role) {
    return (
        ROLE_CONFIG[role] ?? {
            label: role,
            color: "#64748b",
            bg: "#f8fafc",
            border: "#e2e8f0",
        }
    );
}
