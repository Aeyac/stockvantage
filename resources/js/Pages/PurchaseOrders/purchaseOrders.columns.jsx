import { Link } from "@inertiajs/react";
import StatusBadge from "@/Components/StatusBadge/StatusBadge";
import formatDate from "@/utils/FormatDate";
import { formatCurrency } from "@/hooks/useCurrency";

const purchaseOrdersColumns = [
    {
        header: "PO Number",
        render: (po) => <span className="table-code">{po.po_number}</span>,
    },

    {
        header: "Linked PR",
        render: (po) =>
            po.purchase_request ? (
                <Link
                    className="table-link"
                    href={route(
                        "purchase-requests.show",
                        po.purchase_request.id
                    )}
                >
                    {po.purchase_request.pr_number}
                </Link>
            ) : (
                "—"
            ),
    },

    {
        header: "Requested By",

        render: (po) => po.purchase_request.requester?.name ?? "—",
    },

    {
        header: "Amount",

        render: (po) => formatCurrency(po.total_amount),
    },

    {
        header: "Status",

        render: (po) => (
            <StatusBadge resource="purchaseOrder" status={po.status} />
        ),
    },

    {
        header: "Date",

        render: (po) => formatDate(po.created_at),
    },
];


export default purchaseOrdersColumns;