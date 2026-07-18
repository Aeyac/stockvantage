import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FlashMessage from "@/Components/FlashMessage";
import PageHeader from "@/Components/PageHeader/PageHeader";
import ItemsTable from "@/Components/ItemsTable/ItemsTable";

import stockLedgerColumns from "./stockLedger.columns";

export default function Index({ stockLedgers, filters, flash }) {
    return (
        <AuthenticatedLayout header="Stock Ledger">
            <Head title="Stock Ledger" />

            <FlashMessage flash={flash} />

            <PageHeader
                total={stockLedgers.total}
                itemLabel="Movement"
                filters={filters}
                searchRoute="stock-ledger.index"
            />

            <ItemsTable
                data={stockLedgers.data}
                pagination={stockLedgers}
                columns={stockLedgerColumns}
                emptyTitle="No stock movements yet"
                emptyDescription="Movements are recorded when GRNs are submitted or Purchase Requests are approved."
            />
        </AuthenticatedLayout>
    );
}