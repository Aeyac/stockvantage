import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BackButton from "@/Components/BackButton";
import { useAuth } from "@/hooks/useAuth";
import { formatCurrency } from "@/hooks/useCurrency";

// Unified Light Mode Visual System Tokens
const C = {
    bg: "#ffffff",
    surface: "#ffffff",
    surfaceLow: "#ffffff",
    surfaceHigh: "#f8fafc",
    outline: "#e2e8f0",
    borderInput: "#cbd5e1",
    primary: "#17aa54",
    primaryHover: "#1a8f4b",
    primaryFocus: "#00C488",
    onPrimary: "#ffffff",
    textMain: "#0f172a",
    textMuted: "#64748b",
    textLabel: "#475569",
    textSection: "#94a3b8",
    error: "#dc2626",
    tertiary: "#b45309",
};

export default function Create({ catalogItems = [] }) {
    // ✅ ALL hooks first, no exceptions
    const { data, setData, post, processing, errors } = useForm({
        supplier_id: "",
        justification: "",
        items: [{ catalog_item_id: "", quantity: 1 }],
    });

    const { currencySymbol, approvalThreshold } = useAuth();

    // ✅ derived computations AFTER all hooks
    const suppliers = Array.from(
        new Map(
            catalogItems
                .filter((item) => item.supplier)
                .map((item) => [item.supplier.id, item.supplier]),
        ).values(),
    );

    const filteredCatalogItems = catalogItems.filter(
        (item) =>
            String(item.supplier_id || item.supplier?.id) ===
            String(data.supplier_id),
    );

    // Dynamic reset safety layer when a user shifts root suppliers
    function handleSupplierChange(e) {
        const selectedSupplierId = e.target.value;
        setData((prev) => ({
            ...prev,
            supplier_id: selectedSupplierId,
            // Reset existing rows to clean canvas configuration to avoid cross-contamination mismatch records
            items: [{ catalog_item_id: "", quantity: 1 }],
        }));
    }

    // Compute running total from catalog item prices
    function getLineTotal(item) {
        const catalog = catalogItems.find((c) => c.id == item.catalog_item_id);
        if (!catalog || !item.quantity) return 0;
        return parseFloat(catalog.unit_cost) * parseInt(item.quantity);
    }

    function getTotal() {
        return data.items.reduce((sum, item) => sum + getLineTotal(item), 0);
    }

    function addRow() {
        setData("items", [...data.items, { catalog_item_id: "", quantity: 1 }]);
    }

    function removeRow(index) {
        if (data.items.length === 1) return;
        setData(
            "items",
            data.items.filter((_, i) => i !== index),
        );
    }

    function updateRow(index, field, value) {
        const updated = data.items.map((item, i) =>
            i === index ? { ...item, [field]: value } : item,
        );
        setData("items", updated);
    }

    function handleSubmit(e) {
        e.preventDefault();
        post("/purchase-requests");
    }

    const total = getTotal();
    const willAutoApprove = total > 0 && total < Number(approvalThreshold);

    return (
        <AuthenticatedLayout header="New Purchase Request">
            <Head title="New Purchase Request" />

            <style>{`
                .pr-card {
                    background: ${C.surface} !important; 
                    border: 1px solid ${C.outline} !important;
                    border-radius: 12px !important; 
                    padding: 28px !important; 
                    max-width: 780px !important;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05) !important;
                }
                .pr-field { display: flex; flex-direction: column; gap: 6px; }
                .pr-label {
                    font-size: 11.5px !important; 
                    font-weight: 700 !important; 
                    color: ${C.textLabel} !important;
                    text-transform: uppercase; 
                    letter-spacing: 0.05em;
                }
                .pr-input, .pr-select, .pr-textarea {
                    background: ${C.surfaceLow} !important; 
                    border: 1px solid ${C.borderInput} !important;
                    border-radius: 8px !important; 
                    padding: 10px 14px !important; 
                    color: ${C.textMain} !important;
                    font-size: 13.5px !important; 
                    font-family: inherit !important; 
                    outline: none !important;
                    transition: border-color 0.15s, box-shadow 0.15s !important; 
                    width: 100% !important;
                    box-sizing: border-box !important;
                }
                .pr-input:focus, .pr-select:focus, .pr-textarea:focus {
                    border-color: ${C.primaryFocus} !important;
                    box-shadow: 0 0 0 3px rgba(0, 196, 136, 0.15) !important;
                    background: #ffffff !important;
                }
                .pr-input::placeholder, .pr-textarea::placeholder { color: ${C.textSection} !important; opacity: 1 !important; }
                .pr-select option { background: #ffffff !important; color: ${C.textMain} !important; }
                .pr-textarea { resize: vertical; min-height: 90px; }
                .pr-error { font-size: 12.5px !important; color: ${C.error} !important; margin-top: 4px !important; font-weight: 500 !important; }
                .pr-btn-primary {
                    display: inline-flex !important; align-items: center !important; gap: 7px !important;
                    background: ${C.primary} !important; color: ${C.onPrimary} !important; border: none !important;
                    border-radius: 8px !important; padding: 10px 20px !important;
                    font-size: 13.5px !important; font-weight: 600 !important; cursor: pointer !important;
                    text-decoration: none !important; transition: background-color 0.15s !important; font-family: inherit !important;
                }
                .pr-btn-primary:hover:not(:disabled) { background: ${C.primaryHover} !important; }
                .pr-btn-primary:disabled { opacity: 0.6 !important; cursor: not-allowed !important; }
                .pr-btn-ghost {
                    display: inline-flex !important; align-items: center !important;
                    background: #ffffff !important; color: ${C.textMuted} !important;
                    border: 1px solid ${C.outline} !important; border-radius: 8px !important;
                    padding: 10px 20px !important; font-size: 13.5px !important; font-weight: 500 !important;
                    cursor: pointer !important; text-decoration: none !important;
                    transition: all 0.15s !important; font-family: inherit !important;
                }
                .pr-btn-ghost:hover { color: ${C.textMain} !important; border-color: ${C.borderInput} !important; background: #f8fafc !important; }
                .pr-btn-add {
                    display: inline-flex !important; align-items: center !important; gap: 6px !important;
                    background: #ffffff !important; color: ${C.primary} !important;
                    border: 1px dashed ${C.borderInput} !important; border-radius: 8px !important;
                    padding: 10px 16px !important; font-size: 13px !important; font-weight: 600 !important;
                    cursor: pointer !important; transition: all 0.15s !important; font-family: inherit !important; 
                    width: 100% !important; justify-content: center !important;
                }
                .pr-btn-add:hover { background: #f0fdf4 !important; border-color: ${C.primaryFocus} !important; }
                .pr-btn-remove {
                    background: none !important; border: none !important; cursor: pointer !important;
                    color: ${C.textMuted} !important; padding: 10px !important; border-radius: 8px !important;
                    transition: all 0.15s !important; display: flex !important; align-items: center !important; 
                    justify-content: center !important; flex-shrink: 0;
                }
                .pr-btn-remove:hover { color: ${C.error} !important; background: #fef2f2 !important; }
                .pr-divider { height: 1px !important; background: #f1f5f9 !important; margin: 4px 0 !important; }
                .pr-section {
                    font-size: 12px !important; font-weight: 700 !important; color: ${C.textSection} !important;
                    text-transform: uppercase; letter-spacing: 0.05em; 
                    margin-bottom: 16px !important; margin-top: 8px !important;
                }
                .pr-line-row {
                    display: grid; gap: 16px; align-items: start;
                    grid-template-columns: 1fr 100px 140px 40px;
                }
                .pr-line-total {
                    font-size: 13.5px !important; font-weight: 600 !important; color: ${C.textMain} !important;
                    padding: 10px 14px !important; background: ${C.surfaceHigh} !important;
                    border: 1px solid ${C.borderInput} !important; border-radius: 8px !important;
                    text-align: right; white-space: nowrap; box-sizing: border-box; height: 41px;
                }
                .pr-total-bar {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 16px 20px; background: ${C.surfaceHigh};
                    border: 1px solid ${C.outline}; border-radius: 8px; margin-top: 4px;
                }
                .pr-auto-badge {
                    font-size: 11px !important; font-weight: 700 !important; padding: 4px 10px !important;
                    border-radius: 6px !important; text-transform: uppercase; letter-spacing: 0.05em;
                    background: #f0fdf4 !important; color: ${C.primary} !important;
                    border: 1px solid #bbf7d0 !important; display: inline-block;
                }
                .pr-approval-badge {
                    font-size: 11px !important; font-weight: 700 !important; padding: 4px 10px !important;
                    border-radius: 6px !important; text-transform: uppercase; letter-spacing: 0.05em;
                    background: #fffbeb !important; color: ${C.tertiary} !important;
                    border: 1px solid #fef3c7 !important; display: inline-block;
                }
                @media (max-width: 600px) {
                    .pr-line-row { grid-template-columns: 1fr 80px; }
                    .pr-line-total { display: none; }
                }
            `}</style>

            <BackButton
                link={"/purchase-requests"}
                text={"Back to Purchase Requests"}
            />

            <div className="pr-card">
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 20,
                    }}
                >
                    <div className="pr-section">Supplier Info & Details</div>

                    {/* Supplier Root Dropdown Setup */}
                    <div className="pr-field">
                        <label className="pr-label">Supplier *</label>
                        <select
                            className="pr-select"
                            value={data.supplier_id}
                            onChange={handleSupplierChange}
                            required
                        >
                            <option value="">
                                Select a specific vendor...
                            </option>
                            {suppliers.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.name}
                                </option>
                            ))}
                        </select>
                        {errors.supplier_id && (
                            <span className="pr-error">
                                {errors.supplier_id}
                            </span>
                        )}
                    </div>

                    <div className="pr-field">
                        <label className="pr-label">Justification *</label>
                        <textarea
                            className="pr-textarea"
                            value={data.justification}
                            onChange={(e) =>
                                setData("justification", e.target.value)
                            }
                            placeholder="Explain why these items are needed..."
                        />
                        {errors.justification && (
                            <span className="pr-error">
                                {errors.justification}
                            </span>
                        )}
                    </div>

                    <div className="pr-divider" />
                    <div className="pr-section">Line Items</div>

                    {/* Column Headers */}
                    <div
                        className="pr-line-row"
                        style={{ marginBottom: -8, paddingRight: 4 }}
                    >
                        <span className="pr-label">Item</span>
                        <span className="pr-label">Qty</span>
                        <span
                            className="pr-label"
                            style={{ textAlign: "right" }}
                        >
                            Line Total
                        </span>
                        <span />
                    </div>

                    {/* Line Item Architecture */}
                    {data.items.map((item, index) => {
                        const lineTotal = getLineTotal(item);
                        // Use original collection to maintain context hints if needed
                        const selectedCatalog = catalogItems.find(
                            (c) => c.id == item.catalog_item_id,
                        );

                        return (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 6,
                                }}
                            >
                                <div className="pr-line-row">
                                    {/* Catalog Item Dynamic Dropdown Layout */}
                                    <div>
                                        <select
                                            className="pr-select"
                                            value={item.catalog_item_id}
                                            onChange={(e) =>
                                                updateRow(
                                                    index,
                                                    "catalog_item_id",
                                                    e.target.value,
                                                )
                                            }
                                            disabled={!data.supplier_id} // Lock fields until supplier context is given
                                        >
                                            <option value="">
                                                {data.supplier_id
                                                    ? "Select item..."
                                                    : "◄ Pick a supplier first"}
                                            </option>
                                            {filteredCatalogItems.map((c) => (
                                                <option key={c.id} value={c.id}>
                                                    {c.name} — {c.sku}
                                                </option>
                                            ))}
                                        </select>

                                        {/* Unit Cost Contextual Hint */}
                                        {selectedCatalog && (
                                            <div
                                                style={{
                                                    fontSize: 12,
                                                    color: "#64748b",
                                                    marginTop: 4,
                                                    paddingLeft: 2,
                                                }}
                                            >
                                                Unit cost:{" "}
                                                {formatCurrency(
                                                    selectedCatalog.unit_cost,
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Quantity Form Input */}
                                    <input
                                        className="pr-input"
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        disabled={!data.supplier_id}
                                        onChange={(e) =>
                                            updateRow(
                                                index,
                                                "quantity",
                                                e.target.value,
                                            )
                                        }
                                    />

                                    {/* Calculated Line Running Cost Total Container */}
                                    <div className="pr-line-total">
                                        {formatCurrency(lineTotal)}
                                    </div>

                                    {/* Dynamic Row Dismissal Controls */}
                                    <button
                                        type="button"
                                        className="pr-btn-remove"
                                        onClick={() => removeRow(index)}
                                        disabled={
                                            data.items.length === 1 ||
                                            !data.supplier_id
                                        }
                                        title="Remove row"
                                    >
                                        <svg
                                            width="15"
                                            height="15"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                        >
                                            <line
                                                x1="18"
                                                y1="6"
                                                x2="6"
                                                y2="18"
                                            />
                                            <line
                                                x1="6"
                                                y1="6"
                                                x2="18"
                                                y2="18"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                {/* Matrix Validation Row Output Alerts */}
                                {errors[`items.${index}.catalog_item_id`] && (
                                    <span
                                        className="pr-error"
                                        style={{ paddingLeft: 2 }}
                                    >
                                        {
                                            errors[
                                                `items.${index}.catalog_item_id`
                                            ]
                                        }
                                    </span>
                                )}
                                {errors[`items.${index}.quantity`] && (
                                    <span
                                        className="pr-error"
                                        style={{ paddingLeft: 2 }}
                                    >
                                        {errors[`items.${index}.quantity`]}
                                    </span>
                                )}
                            </div>
                        );
                    })}

                    {errors.items && (
                        <span className="pr-error">{errors.items}</span>
                    )}

                    {/* Dynamic Element Insertion Controller Trigger Button */}
                    <button
                        type="button"
                        className="pr-btn-add"
                        onClick={addRow}
                        disabled={!data.supplier_id}
                    >
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add Another Item
                    </button>

                    {/* Evaluated Budget Approval Banner Layout */}
                    {total > 0 && (
                        <div className="pr-total-bar">
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 4,
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 11.5,
                                        color: "#64748b",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                        fontWeight: 700,
                                    }}
                                >
                                    Estimated Total
                                </span>
                                <span
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 700,
                                        color: C.textMain,
                                    }}
                                >
                                    {formatCurrency(total)}
                                </span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                    gap: 6,
                                }}
                            >
                                {willAutoApprove ? (
                                    <>
                                        <span className="pr-auto-badge">
                                            Auto Approved
                                        </span>
                                        <span
                                            style={{
                                                fontSize: 11.5,
                                                color: "#64748b",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Below{" "}
                                            {`${currencySymbol}${approvalThreshold}`}{" "}
                                            threshold
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="pr-approval-badge">
                                            Needs Approval
                                        </span>
                                        <span
                                            style={{
                                                fontSize: 11.5,
                                                color: "#64748b",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {`${currencySymbol}${approvalThreshold} and above requires manager approval`}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Footer Form Commit Controllers */}
                    <div
                        style={{
                            display: "flex",
                            gap: 12,
                            marginTop: 8,
                            paddingTop: 20,
                            borderTop: `1px solid #f1f5f9`,
                        }}
                    >
                        <button
                            type="submit"
                            disabled={processing || !data.supplier_id}
                            className="pr-btn-primary"
                        >
                            {processing ? "Submitting..." : "Submit Request"}
                        </button>
                        <Link
                            href="/purchase-requests"
                            className="pr-btn-ghost"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
