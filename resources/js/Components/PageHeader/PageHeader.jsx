import "./PageHeader.css";
import SearchBox from "../SearchBox/SearchBox";
import RecycleBinButton from "@/Components/RecycleBinButton";
import { CreateActionButton } from "@/Components/ActionButtons";

export default function PageHeader({
    total = 0,
    itemLabel = "Item",
    filters,
    searchRoute,
    recycleRoute = null,
    createRoute = null,
    createLabel = null,
    statusType = null,
    extraActions = null,
}) {
    return (
        <div className="page-header">

            <div className="page-header-info">
                <p className="page-header-count">
                    {total} {itemLabel}
                    {total !== 1 ? "s" : ""} registered
                </p>
            </div>

            <div className="page-header-actions">
                <div className="page-search-wrap">
                    <SearchBox
                        routeName={searchRoute}
                        filters={filters}
                        statusType={statusType}
                    />
                </div>

                <div className="page-header-btn-wrap">
                    {recycleRoute && (
                        <RecycleBinButton
                            endpoint={recycleRoute}
                        />
                    )}

                    {createRoute && (
                        <CreateActionButton
                            href={createRoute}
                            label={createLabel}
                        />
                    )}

                    {extraActions}
                </div>
            </div>

        </div>
    );
}