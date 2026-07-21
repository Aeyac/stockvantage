import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FlashMessage from "@/Components/FlashMessage";
import PageHeader from "@/Components/PageHeader/PageHeader";
import ItemsTable from "@/Components/ItemsTable/ItemsTable";
import RowActionsMenu from "@/Components/RowActionsMenu";
import confirmToast from "@/utils/confirmToast";
import catalogItemsColumns from "./catalogItems.columns";

export default function Index({ catalogItems, filters, flash }) {
    async function handleDelete(id) {
        const confirmed = await confirmToast(
            "Are you sure you want to delete this catalog item?",
            "Do not show this warning again."
        );

        if (confirmed) {
            router.delete(route("catalog-items.destroy", id));
        }
    }

    return (
        <AuthenticatedLayout header="Catalog Items">
            <Head title="Catalog Items" />

            <FlashMessage flash={flash} />

            <PageHeader
                total={catalogItems.total}
                itemLabel="Catalog Item"
                filters={filters}
                searchRoute="catalog-items.index"
                createRoute="catalog-items/create"
                recycleRoute="catalog-items.recycle-bin.index"
                statusType="catalogItem"
            />

            <ItemsTable
                data={catalogItems.data}
                pagination={catalogItems}
                columns={catalogItemsColumns}
                actions={(item) => (
                    <RowActionsMenu
                        viewRoute={route("catalog-items.show", item.id)}
                        onDelete={() => handleDelete(item.id)}
                    />
                )}
                emptyTitle="No Catalog Items"
                emptyDescription="There are currently no catalog items."
            />
        </AuthenticatedLayout>
    );
}