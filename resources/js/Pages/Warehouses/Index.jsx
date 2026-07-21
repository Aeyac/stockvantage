import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FlashMessage from "@/Components/FlashMessage";
import PageHeader from "@/Components/PageHeader/PageHeader";
import ItemsTable from "@/Components/ItemsTable/ItemsTable";
import RowActionsMenu from "@/Components/RowActionsMenu";
import confirmToast from "@/utils/confirmToast";
import warehousesColumns from "./warehouses.columns";

export default function Index({ warehouses, filters, flash }) {
    async function handleDelete(id) {
        const confirmed = await confirmToast(
            "Are you sure you want to delete this warehouse?",
            "Do not show this warning again."
        );

        if (confirmed) {
            router.delete(route("warehouses.destroy", id));
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
                createRoute="warehouses.create"
                searchRoute="warehouses.index"
                recycleRoute="warehouses.recycle-bin.index"
                statusType="warehouse"
            />

            <ItemsTable
                data={warehouses.data}
                pagination={warehouses}
                columns={warehousesColumns}
                actions={(warehouse) => (
                    <RowActionsMenu
                        viewRoute={route("warehouses.show", warehouse.id)}
                        onDelete={() => handleDelete(warehouse.id)}
                    />
                )}
                emptyTitle="No Warehouses"
                emptyDescription="Click the Create button to add your first warehouse."
            />
        </AuthenticatedLayout>
    );
}