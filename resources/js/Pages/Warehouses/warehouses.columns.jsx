import { Link } from "@inertiajs/react";
import StatusBadge from "@/Components/StatusBadge/StatusBadge";

const warehousesColumns = [
    {
        header: "Name",
        render: (warehouse) => (
            <Link href={`/warehouses/${warehouse.id}`}>
                <span className="table-code">
                    {warehouse.name}
                </span>
            </Link>
        ),
    },

    {
        header: "Location",
        render: (warehouse) =>
            warehouse.location || "—",
    },

    {
        header: "Status",
        render: (warehouse) => (
            <StatusBadge
                resource="warehouse"
                status={warehouse.is_active}
            />
        ),
    },
];

export default warehousesColumns;





