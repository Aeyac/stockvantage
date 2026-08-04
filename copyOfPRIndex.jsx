import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FlashMessage from "@/Components/FlashMessage";
import confirmToast from "@/utils/confirmToast";
import ItemsTable from "@/Components/ItemsTable/ItemsTable";
import purchaseRequestsColumns from "./purchaseRequests.columns";
import PageHeader from "@/Components/PageHeader/PageHeader";
import RowActionsMenu from "@/Components/RowActionsMenu";

async function handleDelete(id) {
    const confirmed = await confirmToast(
        "Are you sure you want to delete this purchase request?",
        "Do not show this warning again."
    );
    if (confirmed) {
        router.delete(route("purchase-requests.destroy", id));
    }
}

async function handleApprove(id) {
    const confirmed = await confirmToast(
        "Are you sure you want to approve this purchase request?",
        "Do not show this warning again."
    );
    if (confirmed) {
        router.patch(`/purchase-requests/${id}/approve`);
    }
}

async function handleReject(id) {
    const confirmed = await confirmToast(
        "Are you sure you want to reject this purchase request?",
        "Do not show this warning again."
    );
    if (confirmed) {
        router.patch(`/purchase-requests/${id}/reject`);
    }
}

export default function Index({ purchaseRequests, filters, flash = "" }) {

    const hasActiveFilters = Boolean(filters?.search) || Boolean(filters?.status);

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
                    <RowActionsMenu
                        viewRoute={route("purchase-requests.show", pr.id)}
                        onDelete={() => handleDelete(pr.id)}
                        canDelete={["approved", "auto_approved", "rejected"].includes(pr.status)}
                        isPending={["pending", "awaiting_approval"].includes(pr.status)}
                        onApprove={() => handleApprove(pr.id)}
                        onReject={() => handleReject(pr.id)}
                    />
                )}
                emptyTitle={hasActiveFilters ? "No matching items" : "No Purchase Requests"}
                emptyDescription={
                    hasActiveFilters
                        ? "Try adjusting your search or filter."
                        : "POs are generated automatically after approval."
                }
            />
        </AuthenticatedLayout>
    );
}