import StatusBadge from "@/Components/StatusBadge/StatusBadge";
import formatDate from "@/utils/FormatDate";

const grnColumns = [
    {
        header: "GRN ID",
        render: (grn) => <span className="table-code">{grn.id}</span>,
    },

    {
        header: "Purchase Order",
        render: (grn) => grn.purchase_order?.po_number ?? "—"
    },

    {
        header: "Status",
        render: (grn) => (
            <StatusBadge resource="grn" status={grn.status} />
        ),
    },

    {
        header: "Notes",
        render: (grn) => grn.notes ?? "—",
    },

    {
        header: "Date Received",
        render: (grn) => formatDate(grn.created_at),
    },
];


export default grnColumns;