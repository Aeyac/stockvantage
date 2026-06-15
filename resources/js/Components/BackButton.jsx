import React from 'react';
import { Link } from '@inertiajs/react';

export default function BackButton({ link, text }) {
    // Standard visual token values mapped inline to prevent CSS compiler parsing blocks
    const styles = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: '#ffffff',
        color: '#64748b', // Your theme's C.textMuted
        border: '1px solid #e2e8f0', // Your theme's C.outline
        borderRadius: '8px',
        padding: '10px 18px',
        fontSize: '13.5px',
        fontWeight: 500,
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'all 0.15s',
        marginBottom: '24px',
    };

    return (
        <Link
            href={link}
            style={styles}
            onMouseEnter={(e) => {
                e.currentTarget.style.color = '#0f172a'; // C.textMain
                e.currentTarget.style.borderColor = '#cbd5e1'; // C.borderInput
                e.currentTarget.style.background = '#f8fafc'; // C.surfaceHigh
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.color = '#64748b';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.background = '#ffffff';
            }}
        >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
            </svg>
            {text}
        </Link>
    );
}