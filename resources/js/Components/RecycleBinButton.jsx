import { Link } from "@inertiajs/react";

export default function RecycleBinButton({ endpoint }) {
    return (
        <>
            <style>{`
                .recycle-bin-btn, .sb-select-field {
                    transition: all 0.2s ease-in-out;
                }

                .recycle-bin-btn:hover, .sb-select-field:focus {
                    border-color: #00C488 !important;
                }
             `}</style>


            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Link
                    className="recycle-bin-btn"
                    href={route(endpoint)}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 13,
                        color: "#64748b",
                        border: "1px solid #e2e8f0",
                        borderRadius: 8,
                        padding: "8px 14px",
                        textDecoration: "none",
                        background: "#fff",
                    }}
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                    >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                    </svg>
                    Recycle Bin
                </Link>
            </div>
        </>
    );
}
