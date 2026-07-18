import { Head, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FlashMessage from "@/Components/FlashMessage";
import { EditActionButton, DeleteActionButton, } from "@/Components/ActionButtons";
import userColumns from "./user.columns";
import PageHeader from "@/Components/PageHeader/PageHeader";
import ItemsTable from "@/Components/ItemsTable/ItemsTable";
import './users.css';



export default function Index({ users, filters, flash }) {

    const { auth } = usePage().props;
    const currentUserId = auth.user.id;
    function handleDelete(id) {
        if (confirm("Are you sure you want to delete this user?")) {
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
                        <EditActionButton
                            href={route("users.edit", user.id)}
                        />

                        {user.id !== currentUserId && (
                            <DeleteActionButton
                                onClick={() => handleDelete(user.id)}
                            />
                        )}
                    </>
                )}
                emptyTitle="No users yet"
                emptyDescription="Click the add button to add your first user."
            />
        </AuthenticatedLayout>
    );
}
