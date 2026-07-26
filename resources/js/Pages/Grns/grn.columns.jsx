import StatusBadge from "@/Components/StatusBadge/StatusBadge";
import formatDate from "@/utils/FormatDate";
import { Link } from "@inertiajs/react";

const grnColumns = [
    {
        header: "GRN ID",
        render: (grn) => (
            <span className="table-code">
                {`GRN-${grn.id}`}
            </span>
        ),
    },

    {
        header: "Purchase Order",
        render: (grn) =>



            <Link href={`/purchase-orders/${grn.po_id}`}>
                <span>{grn.purchase_order?.po_number ?? "—"}</span>,
                {
                    console.log(grn)

                }
            </Link>

    },

    {
        header: "Status",
        render: (grn) => (
            <StatusBadge
                resource="grn"
                status={grn.status}
            />
        ),
    },

    {
        header: "Notes",
        render: (grn) => grn.notes || "—",
    },

    {
        header: "Date Received",
        render: (grn) => formatDate(grn.created_at),
    },
];

export default grnColumns;