import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ViewActionButton } from "@/Components/ActionButtons";
import confirmToast from "@/utils/confirmToast";
import { DeleteActionButton } from "@/Components/ActionButtons";
import ItemsTable from "@/Components/ItemsTable/ItemsTable";
import purchaseOrdersColumns from "./purchaseOrders.columns";
import PageHeader from "@/Components/PageHeader/PageHeader";
import FlashMessage from "@/Components/FlashMessage";


async function handleDelete(id) {
    const confirmed = await confirmToast(
        "Are you sure you want to delete this purchase order?",
        "Do not show this warning again.",
    );
    if (confirmed) {
        router.delete(route("purchase-orders.destroy", id));
    }
}

export default function Index({ purchaseOrders, filters, flash }) {
    console.log(purchaseOrders);
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
                    <>
                        <ViewActionButton
                            href={route("purchase-orders.show", po.id)}
                        />
                        {po.status === "fully_received" && (

                            <DeleteActionButton
                                onClick={() => handleDelete(po.id)}
                            />
                        )}
                    </>

                )}
                emptyTitle="No Purchase Orders"
                emptyDescription="NONE"

            />
        </AuthenticatedLayout>
    );
}
