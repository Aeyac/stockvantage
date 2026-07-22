import { formatCurrency } from "@/hooks/useCurrency";

const LOW_STOCK_THRESHOLD = 5;

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
        align: "right",
        render: (item) => formatCurrency(item.unit_cost),
        className: "table-number",
    },

    {
        header: "Safety Stock",
        align: "right",
        render: (item) => {
            const isLow = item.safety_stock <= LOW_STOCK_THRESHOLD;
            return (
                <span className={`stock-badge ${isLow ? "stock-badge--low" : "stock-badge--ok"}`}>
                    {isLow ? `Low Stock: ${item.safety_stock}` : item.safety_stock}
                    {


                    }
                </span>
            );
        },
    },
];

export default catalogItemsColumns;