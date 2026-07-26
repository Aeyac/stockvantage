import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FlashMessage from "@/Components/FlashMessage";
import PageHeader from "@/Components/PageHeader/PageHeader";
import ItemsTable from "@/Components/ItemsTable/ItemsTable";

import stockLedgerColumns from "./stockLedger.columns";

export default function Index({ stockLedgers, filters, flash }) {
    const hasActiveFilters = Boolean(filters?.search) || Boolean(filters?.status);
    
    return (
        <AuthenticatedLayout header="Stock Ledger">
            <Head title="Stock Ledger" />

            <FlashMessage flash={flash} />

            <PageHeader
                total={stockLedgers.total}
                itemLabel="Movement"
                filters={filters}
                searchRoute="stock-ledger.index"
                statusType="stockLedger"
            />

            <ItemsTable
                data={stockLedgers.data}
                pagination={stockLedgers}
                columns={stockLedgerColumns}
                emptyTitle={hasActiveFilters ? "No matching items" : "No Stock Ledger"}
                emptyDescription={
                    hasActiveFilters
                        ? "Try adjusting your search or filter."
                        : "Stock ledgers are generated automatically after performing a GRN record."
                }
            />
        </AuthenticatedLayout>
    );
}