import StatusBadge from "@/Components/StatusBadge/StatusBadge";

const supplierColumns = [
    {
        header: "Supplier",
        render: supplier => supplier.name,
    },

    {
        header: "Contact",
        render: supplier => (
            supplier.contact_email
        ),
    },

    {
        header: "Payment Terms",
        render: supplier => (
            supplier.payment_terms
        ),
    },

    {
        header: "Status",
        render: supplier => (
            <StatusBadge
                resource="supplier"
                status={supplier.is_active}
            />
        ),


    },

];

export default supplierColumns;