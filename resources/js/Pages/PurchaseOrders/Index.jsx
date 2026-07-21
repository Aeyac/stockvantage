import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FlashMessage from "@/Components/FlashMessage";
import PageHeader from "@/Components/PageHeader/PageHeader";
import ItemsTable from "@/Components/ItemsTable/ItemsTable";
import RowActionsMenu from "@/Components/RowActionsMenu";
import confirmToast from "@/utils/confirmToast";
import purchaseOrdersColumns from "./purchaseOrders.columns";

async function handleDelete(id) {
    const confirmed = await confirmToast(
        "Are you sure you want to delete this purchase order?",
        "Do not show this warning again."
    );

    if (confirmed) {
        router.delete(route("purchase-orders.destroy", id));
    }
}

export default function Index({ purchaseOrders, filters, flash }) {
    return (
        <AuthenticatedLayout header="Purchase Orders">
            <Head title="Purchase Orders" />

            <FlashMessage flash={flash} />

            <PageHeader
                total={purchaseOrders.total}
                itemLabel="Purchase Order"
                filters={filters}
                searchRoute="purchase-orders.index"
                recycleRoute="purchase-orders.recycle-bin.index"
                statusType="purchaseOrder"
            />

            <ItemsTable
                data={purchaseOrders.data}
                pagination={purchaseOrders}
                columns={purchaseOrdersColumns}
                actions={(po) => (
                    <RowActionsMenu
                        viewRoute={route("purchase-orders.show", po.id)}
                        canDelete={po.status === "fully_received"}
                        onDelete={
                            po.status === "fully_received"
                                ? () => handleDelete(po.id)
                                : undefined
                        }
                    />
                )}
                emptyTitle="No Purchase Orders"
                emptyDescription="There are currently no purchase orders."
            />
        </AuthenticatedLayout>
    );
}