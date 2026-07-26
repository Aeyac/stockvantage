import { Head, router } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import confirmToast from '@/utils/confirmToast'
import ItemsTable from '@/Components/ItemsTable/ItemsTable'
import RowActionsMenu from '@/Components/RowActionsMenu'
import supplierColumns from './supplier.columns'
import PageHeader from '@/Components/PageHeader/PageHeader'

async function handleDelete(id) {
    const confirmed = await confirmToast(
        "Are you sure you want to delete this supplier?",
        "Do not show this warning again."
    );
    if (confirmed) {
        router.delete(`/suppliers/${id}`)

    }
}

export default function Index({ suppliers, filters, flash }) {

    const hasActiveFilters = Boolean(filters?.search) || Boolean(filters?.status);
    console.log(suppliers)
    return (
        <AuthenticatedLayout header="Suppliers">
            <Head title="Suppliers" />
            <FlashMessage flash={flash} />
            <PageHeader
                total={suppliers.total}
                itemLabel="Supplier"
                filters={filters}
                createRoute="suppliers/create"
                searchRoute="suppliers.index"
                recycleRoute="suppliers.recycle-bin.index"
                statusType="supplier"
            />
            <ItemsTable
                data={suppliers.data}
                pagination={suppliers}
                columns={supplierColumns}
                actions={(sp) => (
                    <RowActionsMenu
                        // viewRoute={route("purchase-requests.show", sp.id)}
                        onDelete={() => handleDelete(sp.id)}
                        canDelete={[true, false].includes(sp.is_active)}
                        editRoute={`suppliers/${sp.id}/edit`}
                    />
                )}
                emptyTitle={hasActiveFilters ? "No matching supplier" : "No Suppliers"}
                emptyDescription={
                    hasActiveFilters
                        ? "Try adjusting your search or filter."
                        : "Suppliers will be listed here after adding/creating."
                }
            />
        </AuthenticatedLayout>
    )
}