import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FlashMessage from "@/Components/FlashMessage";
import {
    CreateActionButton,
    DeleteActionButton,
    ViewActionButton,
} from "@/Components/ActionButtons";
import SearchBox from "@/Components/SearchBox/SearchBox";
import PageHeader from "@/Components/PageHeader/PageHeader";
import ItemsTable from "@/Components/ItemsTable/ItemsTable";
import grnColumns from "./grn.columns";


export default function Index({ grns, filters, flash }) {
    console.log(grns)
    
    return (
        <AuthenticatedLayout header="Goods Received Notes">
            <Head title="GRN" />
            <FlashMessage flash={flash} />
            <PageHeader
                total={grns.total}
                itemLabel="GRN"
                filters={filters}
                createRoute="grn/create"
                searchRoute="grn.index"
                statusType="grn"
            />
            <ItemsTable
                data={grns.data}
                pagination={grns}
                columns={grnColumns}
                actions={(grn) => (
                    <>
                        <ViewActionButton href={route("grn.show", grn.id)} />
                    </>

                )}
                emptyTitle="No GRN record yet"
                emptyDescription="Click the add button to record your first grn."

            />
        </AuthenticatedLayout>
    );
}
