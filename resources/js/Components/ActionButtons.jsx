import React from "react";
import { Link } from "@inertiajs/react";

// Unified Light Mode Visual System Tokens (Self-contained)
const C = {
    surfaceHigh: "#f8fafc",
    outline: "#e2e8f0",
    onSurface: "#0f172a", // High-contrast main headings/text
    onSurfaceVar: "#64748b", // Subdued description / textMuted
    error: "#dc2626", // Accessible destructive alert indicator 
};

// Common base style mimicking your .usr-action class perfectly
const baseActionStyle = {
    fontSize: "13px",
    fontWeight: 500,
    color: C.onSurfaceVar,
    textDecoration: "none",
    padding: "5px 12px",
    borderRadius: "8px",
    transition: "all 0.15s",
    border: "1px solid transparent",
    background: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
};

const createButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    background: "#00C488",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "9px 16px",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    textDecoration: "none",
    transition: "background 0.15s",
    fontFamily: "inherit",
};

// GLOBAL CREATE BUTTON
export const CreateActionButton = ({ href, label = "Add" }) => {
    return (
        <Link href={href} style={createButtonStyle}>
            <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
            >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            {label}
        </Link>
    );
};

// 1. GLOBAL VIEW LINK
export const ViewActionButton = ({ href, label = "View" }) => {
    return (
        <Link
            href={href}
            style={baseActionStyle}
            onMouseEnter={(e) => {
                e.currentTarget.style.color = C.onSurface;
                e.currentTarget.style.background = C.surfaceHigh;
                e.currentTarget.style.borderColor = C.outline;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.color = C.onSurfaceVar;
                e.currentTarget.style.background = "none";
                e.currentTarget.style.borderColor = "transparent";
            }}
        >
            {label}
        </Link>
    );
};

// 2. GLOBAL EDIT LINK
export const EditActionButton = ({ href, label = "Edit" }) => {
    return (
        <Link
            href={href}
            style={baseActionStyle}
            onMouseEnter={(e) => {
                e.currentTarget.style.color = C.onSurface;
                e.currentTarget.style.background = C.surfaceHigh;
                e.currentTarget.style.borderColor = C.outline;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.color = C.onSurfaceVar;
                e.currentTarget.style.background = "none";
                e.currentTarget.style.borderColor = "transparent";
            }}
        >
            {label}
        </Link>
    );
};

// 3. GLOBAL DELETE BUTTON
export const DeleteActionButton = ({ onClick, label = "Delete" }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            style={baseActionStyle}
            onMouseEnter={(e) => {
                e.currentTarget.style.color = C.error;
                e.currentTarget.style.background = `${C.error}0A`; // 4% opacity hex
                e.currentTarget.style.borderColor = `${C.error}25`; // 14% opacity hex
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.color = C.onSurfaceVar;
                e.currentTarget.style.background = "none";
                e.currentTarget.style.borderColor = "transparent";
            }}
        >
            {label}
        </button>
    );
};


// resources/js/Components/Actions/ApproveActionButton.jsx
export function ApproveActionButton({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-md border border-emerald-200/60 hover:bg-emerald-100 transition-colors"
        >
            Approve
        </button>
    );
}

// resources/js/Components/Actions/RejectActionButton.jsx
export function RejectActionButton({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-rose-700 bg-rose-50 rounded-md border border-rose-200/60 hover:bg-rose-100 transition-colors"
        >
            Reject
        </button>
    );
}
