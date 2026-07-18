const MOVEMENT_CONFIG = {
    received_shipment: {
        label: "Received",
        color: "#15803D",
        bg: "#DCFCE7",
    },

    internal_consumption: {
        label: "Consumed",
        color: "#92400E",
        bg: "#FEF3C7",
    },

    manual_adjustment: {
        label: "Adjustment",
        color: "#1E40AF",
        bg: "#DBEAFE",
    },
};

export default function MovementBadge({ type }) {
    const config =
        MOVEMENT_CONFIG[type] ?? {
            label: type,
            color: "#475569",
            bg: "#F1F5F9",
        };

    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",

                padding: "4px 10px",

                borderRadius: 999,

                background: config.bg,
                color: config.color,

                fontWeight: 700,
                fontSize: 11,

                textTransform: "uppercase",
            }}
        >
            {config.label}
        </span>
    );
}