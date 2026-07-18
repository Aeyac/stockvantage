import { Link } from "@inertiajs/react";
import StatusBadge from "@/Components/StatusBadge/StatusBadge";
import formatDate from "@/utils/FormatDate";
import { formatCurrency } from "@/hooks/useCurrency";

const purchaseRequestsColumns = [
    {
        header: "PR Number",
        render: (pr) => <span className="table-code">{pr.pr_number}</span>,
    },

    {
        header: "Requested By",

        render: (pr) => pr.requester?.name ?? "—",
    },

    {
        header: "Amount",

        render: (pr) => formatCurrency(pr.total_amount),
    },

    {
        header: "Status",

        render: (pr) => (
            <StatusBadge resource="purchaseRequest" status={pr.status} />
        ),
    },

    {
        header: "Date",

        render: (pr) => formatDate(pr.created_at),
    },
];


export default purchaseRequestsColumns;