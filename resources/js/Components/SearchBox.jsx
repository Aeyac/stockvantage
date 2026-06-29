import { router } from "@inertiajs/react";
import { useState, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBox({
    routeName = "catalog-items.index",
    filters = {},
    categories = [
        { value: "raw_material", label: "Raw Material" },
        { value: "consumable", label: "Consumable" },
    ],
}) {
    const [search, setSearch] = useState(filters.search ?? "");
    const [category, setCategory] = useState(filters.category ?? "");

    // Centralized route update helper
    const applyFilters = useCallback(
        (overrides = {}) => {
            router.get(
                route(routeName),
                { search, category, ...overrides },
                { preserveState: true, replace: true },
            );
        },
        [search, category, routeName],
    );

    // Debounce the text search so it doesn't slam the network on every keystroke
    const debouncedSearch = useDebouncedCallback((value) => {
        applyFilters({ search: value, page: 1 }); // Always reset to page 1 on new searches
    }, 400);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        debouncedSearch(e.target.value);
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setCategory(value);
        applyFilters({ category: value, page: 1 });
    };

    return (
        <div
            style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
            }}
        >
            {/* Scoped CSS styling for focus glow effects and transitions */}
            <style>{`
                .sb-input-field, .sb-select-field {
                    transition: all 0.2s ease-in-out;
                }
                
                /* Green theme glow on search input focus */
                .sb-input-field:focus {
                    border-color: #00C488 !important;
                    box-shadow: 0 0 0 3px rgba(0, 196, 136, 0.15) !important;
                }

                /* Subtle green border tint for dropdown focus and hover states */
                .sb-select-field:hover, .sb-select-field:focus {
                    border-color: #00C488 !important;
                }
            `}</style>

            {/* Search Input field */}
            <input
                type="text"
                className="sb-input-field"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search by name or SKU..."
                style={{
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    fontSize: "13.5px",
                    outline: "none",
                    minWidth: "240px",
                    height: "38px",
                    boxSizing: "border-box"
                }}
            />

            {/* Category Dropdown Selector */}
            <select
                className="sb-select-field"
                value={category}
                onChange={handleCategoryChange}
                style={{
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    background: "#fff",
                    fontSize: "13.5px",
                    cursor: "pointer",
                    outline: "none",
                    height: "38px",
                    boxSizing: "border-box"
                }}
            >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                        {cat.label}
                    </option>
                ))}
            </select>
        </div>
    );
}