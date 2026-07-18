import RoleBadge from "@/Components/RoleBadge/RoleBadge";
import StatusBadge from "@/Components/StatusBadge/StatusBadge";

const userColumns = [
    {
        header: "User",

        render: (user) => (
            <div className="usr-user-cell">
                <div className="usr-avatar">
                    {user.name.charAt(0).toUpperCase()}
                </div>

                <div className="usr-user-name">
                    {user.name}
                </div>
            </div>
        ),
    },

    {
        header: "Email",

        render: (user) => user.email,
    },

    {
        header: "Role",

        render: (user) => (
            <RoleBadge role={user.role} />
        ),
    },

    {
        header: "Status",

        render: (user) => (
            <StatusBadge
                resource="user"
                status={user.is_active}
            />
        ),
    },
];

export default userColumns;