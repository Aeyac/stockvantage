import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FlashMessage from "@/Components/FlashMessage";
import { ViewActionButton, } from "@/Components/ActionButtons";
import { router } from "@inertiajs/react";
import confirmToast from "@/utils/confirmToast";
import { DeleteActionButton } from "@/Components/ActionButtons";
import SearchBox from "@/Components/SearchBox/SearchBox";
import ItemsTable from "@/Components/ItemsTable/ItemsTable";
import purchaseRequestsColumns from "./purchaseRequests.columns";
import PageHeader from "@/Components/PageHeader/PageHeader";

// Soft, readable text colors with subtle background pills for light mode statuses
const STATUS_CONFIG = {
    pending: {
        label: "Pending",
        text: "#64748b", // Slate
        bg: "#f8fafc",
        border: "#e2e8f0",
    },
    awaiting_approval: {
        label: "Awaiting Approval",
        text: "#d97706", // Amber
        bg: "#fef3c7",
        border: "#fde68a",
    },
    auto_approved: {
        label: "Auto Approved",
        text: "#059669", // Emerald
        bg: "#ecfdf5",
        border: "#d1fae5",
    },
    approved: {
        label: "Approved",
        text: "#00C488", // Accent Green
        bg: "#f0fdf4",
        border: "#bbf7d0",
    },
    rejected: {
        label: "Rejected",
        text: "#dc2626", // Red
        bg: "#fef2f2",
        border: "#fee2e2",
    },
};

function StatusBadge({ status }) {
    const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
    return (
        <span
            className="pr-status"
            style={{
                background: config.bg,
                color: config.text,
                border: `1px solid ${config.border}`,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "11.5px",
                fontWeight: 500,
                padding: "3px 10px",
                borderRadius: "20px",
            }}
        >
            <span
                style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: config.text,
                    display: "inline-block",
                }}
            />
            {config.label}
        </span>
    );
}

async function handleDelete(id) {
    const confirmed = await confirmToast(
        "Are you sure you want to delete this purchase request?",
        "Do not show this warning again.",
    );
    if (confirmed) {
        router.delete(route("purchase-requests.destroy", id));
    }
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-PH", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export default function Index({ purchaseRequests, filters, flash = "" }) {
    console.log(purchaseRequests)
    return (
        <AuthenticatedLayout header="Purchase Requests">
            <Head title="Purchase Requests" />
            <FlashMessage flash={flash} />
            <PageHeader
                total={purchaseRequests.total}
                itemLabel="Purchase Request"
                filters={filters}
                createRoute="purchase-requests/create"
                searchRoute="purchase-requests.index"
                recycleRoute="purchase-requests.recycle-bin.index"
                statusType="purchaseRequest"
            />
            <ItemsTable
                data={purchaseRequests.data}
                pagination={purchaseRequests}
                columns={purchaseRequestsColumns}
                actions={(pr) => (
                    <>
                        <ViewActionButton
                            href={route("purchase-requests.show", pr.id)}
                        />
                        {(pr.status === "approved" || pr.status === "auto_approved" || pr.status === "rejected") && (
                            <DeleteActionButton onClick={() => handleDelete(pr.id)} />
                        )}
                    </>

                )}
                emptyTitle="No Purchase Requests"
                emptyDescription="POs are generated automatically after approval."

            />
        </AuthenticatedLayout>
    );
}
