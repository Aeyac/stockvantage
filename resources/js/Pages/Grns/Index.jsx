import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FlashMessage from "@/Components/FlashMessage";
import PageHeader from "@/Components/PageHeader/PageHeader";
import ItemsTable from "@/Components/ItemsTable/ItemsTable";
import RowActionsMenu from "@/Components/RowActionsMenu";
import grnColumns from "./grn.columns";

export default function Index({ grns, filters, flash }) {
    return (
        <AuthenticatedLayout header="Goods Received Notes">
            <Head title="GRN" />

            <FlashMessage flash={flash} />

            <PageHeader
                total={grns.total}
                itemLabel="GRN"
                filters={filters}
                createRoute="grn.create"
                searchRoute="grn.index"
                statusType="grn"
            />

            <ItemsTable
                data={grns.data}
                pagination={grns}
                columns={grnColumns}
                actions={(grn) => (
                    <RowActionsMenu
                        viewRoute={route("grn.show", grn.id)}
                        canDelete={false}
                    />
                )}
                emptyTitle="No GRN Records"
                emptyDescription="Click the Create button to record your first Goods Received Note."
            />
        </AuthenticatedLayout>
    );
}