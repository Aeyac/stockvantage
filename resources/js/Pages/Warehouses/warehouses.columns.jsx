import StatusBadge from "@/Components/StatusBadge/StatusBadge";

const warehousesColumns = [
    {
        header: "Name",
        render: (warehouse) => <span className="table-code">{warehouse.name}</span>,
    },

    {
        header: "Location",
        render: (warehouse) =>
            warehouse.location ? (
                warehouse.location
            ) : (
                "—"
            ),
    },

    {
        header: "Status",
        render: (warehouse) => <StatusBadge resource="warehouse" status={warehouse.is_active} />,
    },


];


export default warehousesColumns;