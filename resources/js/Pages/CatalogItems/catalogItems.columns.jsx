import { formatCurrency } from "@/hooks/useCurrency";

const catalogItemsColumns = [
    {
        header: "SKU",
        render: (item) => (
            <span className="table-code">
                {item.sku}
            </span>
        ),
    },

    {
        header: "Item",
        render: (item) => item.name || "—",
    },

    {
        header: "Supplier",
        render: (item) => item.supplier?.name ?? "—",
    },

    {
        header: "Category",
        render: (item) => item.category,
    },

    {
        header: "Unit Cost",
        render: (item) => formatCurrency(item.unit_cost),
    },

    {
        header: "Safety Stock",
        render: (item) => (
            <span
                className={
                    item.safety_stock <= 5
                        ? "sv-stock-warn"
                        : ""
                }
            >
                {item.safety_stock}
            </span>
        ),
    },
];

export default catalogItemsColumns;