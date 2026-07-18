export default function QuantityCell({ quantity }) {
    const color =
        quantity > 0
            ? "#16a34a"
            : quantity < 0
                ? "#dc2626"
                : "#64748b";

    return (
        <span
            style={{
                fontWeight: 700,
                fontFamily: "'DM Mono', monospace",
                color,
            }}
        >
            {quantity > 0 ? "+" : ""}
            {quantity}
        </span>
    );
}