import { Head, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FlashMessage from "@/Components/FlashMessage";
import userColumns from "./user.columns";
import PageHeader from "@/Components/PageHeader/PageHeader";
import ItemsTable from "@/Components/ItemsTable/ItemsTable";
import './users.css';
import RowActionsMenu from "@/Components/RowActionsMenu";
import confirmToast from "@/utils/confirmToast";


export default function Index({ users, filters, flash }) {

    const { auth } = usePage().props;
    const currentUserId = auth.user.id;
    async function handleDelete(id) {
        const confirmed = await confirmToast(
            "Are you sure you want to delete this user?",
        );

        if (confirmed) {
            router.delete(`/users/${id}`);
        }
    }

    return (
        <AuthenticatedLayout header="Users">
            <Head title="Users" />
            <FlashMessage flash={flash} />
            <PageHeader
                total={users.total}
                itemLabel="User"
                filters={filters}
                createRoute="users/create"
                searchRoute="users.index"
                recycleRoute="users.recycle-bin.index"
                statusType="user"
            />
            <ItemsTable
                data={users.data}
                pagination={users}
                columns={userColumns}
                actions={(user) => (
                    <>
                        <RowActionsMenu
                            onDelete={() => handleDelete(user.id)}
                            canDelete={(user.status)}
                            editRoute={route("users.edit", user.id)}
                        />
                    </>
                )}
                emptyTitle="No users yet"
                emptyDescription="Click the add button to add your first user."
            />



        </AuthenticatedLayout>
    );
}
