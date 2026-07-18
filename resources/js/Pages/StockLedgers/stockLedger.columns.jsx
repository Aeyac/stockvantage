import MovementBadge from "./MovementBadge";
import QuantityCell from "./QuantityCell";

import { formatDate, formatReference } from "./utils";

const stockLedgerColumns = [
    {
        header: "Date",

        render: entry => formatDate(entry.created_at),
    },

    {
        header: "Item",

        render: entry => (
            <>
                <div style={{ fontWeight: 600 }}>
                    {entry.catalog_item?.name ?? "—"}
                </div>

                {entry.catalog_item?.sku && (
                    <span className="sl-sku">
                        {entry.catalog_item.sku}
                    </span>
                )}
            </>
        ),
    },

    {
        header: "Warehouse",

        render: entry =>
            entry.warehouse?.name ?? "No warehouse",
    },

    {
        header: "Movement",

        render: entry => (
            <MovementBadge
                type={entry.movement_type}
            />
        ),
    },

    {
        header: "Qty Change",

        render: entry => (
            <QuantityCell
                quantity={entry.quantity_change}
            />
        ),

        className: "text-center",
    },

    {
        header: "Reference",

        render: entry =>
            formatReference(
                entry.reference_type,
                entry.reference_id
            ),
    },

    {
        header: "Performed By",

        render: entry =>
            entry.performer?.name ?? "—",
    },
];

export default stockLedgerColumns;