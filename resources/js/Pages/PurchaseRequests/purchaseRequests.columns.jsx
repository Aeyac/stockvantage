import { Link } from "@inertiajs/react";
import StatusBadge from "@/Components/StatusBadge/StatusBadge"; 
import formatDate from "@/utils/FormatDate"; 
import { formatCurrency } from "@/hooks/useCurrency";

const purchaseRequestsColumns = [
    {
        header: "PR Number",
        render: (pr) => (
            <Link href={`/purchase-requests/${pr.id}`}>
                <span className="table-code">{pr.pr_number}</span>
            </Link>
        ),
    },
    {
        header: "Requested By",
        render: (pr) => (
            <span className="capitalize">
                {pr.requester?.name ?? "—"}
            </span>
        ),
    },
    {
        header: "Amount",
        // align: "right", 
        render: (pr) => formatCurrency(pr.total_amount),
    },
    {
        header: "Status",
        align: "center",
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