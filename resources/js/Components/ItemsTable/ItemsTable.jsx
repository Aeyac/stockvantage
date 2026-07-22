// Components/ItemsTable/ItemsTable.jsx
import "./ItemsTable.css";
import { Link } from "@inertiajs/react";
import EmptyState from "./EmptyState";

export default function ItemsTable({
    data = [],
    columns = [],
    actions = null,
    pagination = null,
    emptyTitle = "No records found",
    emptyDescription = "There are no records to display.",
}) {
    return (
        <>
            <div className="table-card">
                {data.length === 0 ? (
                    <EmptyState
                        title={emptyTitle}
                        description={emptyDescription}
                    />
                ) : (
                    <div className="table-wrapper">
                        <table className="items-table">
                            <thead>
                                <tr>
                                    {columns.map((column, index) => (
                                        <th
                                            key={column.header || index}
                                            className={column.headerClassName || column.className || ""}
                                            style={column.align ? { textAlign: column.align } : {}}
                                        >
                                            {column.header}
                                        </th>
                                    ))}

                                    {actions && (
                                        <th className="text-right">
                                            Actions
                                        </th>
                                    )}
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        {columns.map((column, index) => (
                                            <td
                                                key={column.header || index}
                                                className={column.className || ""}
                                                style={column.align ? { textAlign: column.align } : {}}
                                            >
                                                {column.render(item)}
                                            </td>
                                        ))}

                                        {actions && (
                                            <td className="text-right">
                                                <div className="table-actions">
                                                    {actions(item)}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {pagination?.last_page > 1 && (
                <div className="table-pagination">
                    {pagination.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url ?? "#"}
                            className={`table-pagination-button
                            ${link.active ? " active" : ""}
                            ${!link.url ? " disabled" : ""}`}
                            dangerouslySetInnerHTML={{
                                __html: link.label,
                            }}
                        />
                    ))}
                </div>
            )}
        </>
    );
}