import "./StatusBadge.css";
import { getStatusConfig } from "../config/statuses";

export default function StatusBadge({ resource, status }) {
    const normalizedStatus =
        typeof status === "boolean"
            ? (status ? "active" : "inactive")
            : status;

    const config = getStatusConfig(resource, normalizedStatus);

    return (
        <span
            className="status-badge"
            style={{
                background: config.bg,
                color: config.color,
                border: `1px solid ${config.border}`,
            }}
        >
            <span className="status-badge-dot" />
            {config.label}
        </span>
    );
}