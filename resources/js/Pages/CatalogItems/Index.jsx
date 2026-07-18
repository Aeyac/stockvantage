import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FlashMessage from "@/Components/FlashMessage";
import { useAuth } from "@/hooks/useAuth";
import {
    EditActionButton,
    DeleteActionButton,
    CreateActionButton,
    ViewActionButton,
} from "@/Components/ActionButtons";
import { formatCurrency } from "@/hooks/useCurrency";
import confirmToast from "@/utils/confirmToast";
import RecycleBinButton from "@/Components/RecycleBinButton";
import SearchBox from "@/Components/SearchBox/SearchBox";
import catalogItemsColumns from "./catalogItems.columns";
import PageHeader from "@/Components/PageHeader/PageHeader";
import ItemsTable from "@/Components/ItemsTable/ItemsTable";


export default function Index({ catalogItems, filters, flash }) {
    const { isAdmin } = useAuth();
    console.log(catalogItems)

    async function handleDelete(id) {
        const confirmed = await confirmToast(
            "Are you sure you want to delete this catalog item?",
            "Do not show this warning again.",
        );
        if (confirmed) {
            router.delete(`/catalog-items/${id}`);
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
                createRoute="catalog-items/create"
                searchRoute="catalog-items.index"
                recycleRoute="catalog-items.recycle-bin.index"
                statusType="catalogItem"
            />

            <ItemsTable
                data={catalogItems.data}
                pagination={catalogItems}
                columns={catalogItemsColumns}
                actions={(item) => (
                    <>
                        <ViewActionButton href={route("catalog-items.show", item.id)} />
                        <DeleteActionButton onClick={() => handleDelete(item.id)} />
                    </>
                )}
                emptyTitle="No Catalog Items"
                emptyDescription="NONE"

            />
        </AuthenticatedLayout>
    );
}
