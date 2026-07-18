export function formatDate(date) {
    return new Date(date).toLocaleDateString("en-PH", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function formatReference(type, id) {
    if (!type || !id) return "—";

    const prefixes = {
        PurchaseRequest: "PR",
        PurchaseOrder: "PO",
        GrnRecord: "GRN",
    };

    return `${prefixes[type] ?? type}-${String(id).padStart(4, "0")}`;
}
