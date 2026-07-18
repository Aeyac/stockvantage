import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FlashMessage from "@/Components/FlashMessage";
import { DeleteActionButton, ViewActionButton, } from "@/Components/ActionButtons";
import confirmToast from "@/utils/confirmToast";
import warehousesColumns from "./warehouses.columns";
import ItemsTable from "@/Components/ItemsTable/ItemsTable";
import PageHeader from "@/Components/PageHeader/PageHeader";


export default function Index({ warehouses, filters, flash }) {
    async function handleDelete(id) {
        const confirmed = await confirmToast(
            "Are you sure you want to delete this purchase request?",
            "Do not show this warning again.",
        );
        if (confirmed) {
            router.delete(`/warehouses/${id}`);
        }
    }

    return (
        <AuthenticatedLayout header="Warehouses">
            <Head title="Warehouses" />
            <FlashMessage flash={flash} />
            <PageHeader
                total={warehouses.total}
                itemLabel="Warehouse"
                filters={filters}
                createRoute="warehouses/create"
                searchRoute="warehouses.index"
                recycleRoute="warehouses.recycle-bin.index"
                statusType="warehouse"
            />
            <ItemsTable
                data={warehouses.data}
                pagination={warehouses}
                columns={warehousesColumns}
                actions={(warehouse) => (
                    <>
                        <ViewActionButton
                            href={route("warehouses.show", warehouse.id)}
                        />
                        <DeleteActionButton onClick={() => handleDelete(warehouse.id)} />
                    </>

                )}
                emptyTitle="No Warehouses"
                emptyDescription="Click the add button to create you first warehouse."
            />
        </AuthenticatedLayout>
    );
}
