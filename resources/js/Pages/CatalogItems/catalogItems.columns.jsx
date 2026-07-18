import { Link } from "@inertiajs/react";
import StatusBadge from "@/Components/StatusBadge/StatusBadge";
import formatDate from "@/utils/FormatDate";
import { formatCurrency } from "@/hooks/useCurrency";

const catalogItemsColumns = [
    {
        header: "SKU",
        render: (item) => <span className="table-code">{item.sku}</span>,
    },

    {
        header: "Item",
        render: (item) =>
            item.name ? (
                item.name
            ) : (
                "—"
            ),
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
        render: (item) => item.safety_stock,
        className: (item) =>
            item.safety_stock <= 5 ? "sv-stock-warn" : "",
    }

    // {
    //     header: "Status",

    //     render: (item) => (
    //         <StatusBadge resource="catalogItem" status={item.status} />
    //     ),
    // },


];


export default catalogItemsColumns;