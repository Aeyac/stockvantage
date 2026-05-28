import React from 'react';
import { Link } from '@inertiajs/react';

// Unified Light Mode Visual System Tokens (Self-contained)
const C = {
    surfaceHigh: '#f8fafc',
    outline: '#e2e8f0',
    onSurface: '#0f172a',    // High-contrast main headings/text
    onSurfaceVar: '#64748b', // Subdued description / textMuted
    error: '#dc2626',        // Accessible destructive alert indicator 
};

// Common base style mimicking your .usr-action class perfectly
const baseActionStyle = {
    fontSize: '13px',
    fontWeight: 500,
    color: C.onSurfaceVar,
    textDecoration: 'none',
    padding: '5px 12px',
    borderRadius: '8px',
    transition: 'all 0.15s',
    border: '1px solid transparent',
    background: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px'
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
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.borderColor = 'transparent';
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
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.borderColor = 'transparent';
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
                e.currentTarget.style.borderColor = `${C.error}25`;    // 14% opacity hex
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.color = C.onSurfaceVar;
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.borderColor = 'transparent';
            }}
        >
            {label}
        </button>
    );
};