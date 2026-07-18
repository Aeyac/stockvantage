import { getRoleConfig } from "../config/roles";

export default function RoleBadge({ role }) {
    const config = getRoleConfig(role);
    if (!config) return null;

    return (
        <>
            <style>
                {`
                    .role-badge {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        padding: 4px 10px;
                        border-radius: 999px;
                        font-size: 11px;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: .05em;
                        white-space: nowrap;
                        line-height: 1;
                    }
                `}
            </style>

            <span
                className="role-badge"
                style={{
                    background: config.bg,
                    color: config.color,
                    border: `1px solid ${config.border}`,
                }}
            >
                {config.label}
            </span>
        </>
    );
}
