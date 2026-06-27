import Icon from "../../components/Icon";
import { router } from "@inertiajs/react";
import confirmToast from "@/utils/confirmToast";
import { useState } from "react";

export default function DangerZone({ C }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [checks, setChecks] = useState({ c1: false, c2: false });

    const handleDeleteProcurementData = () => {
        router.delete(route("settings.destroy-procurement-data"), {
            onSuccess: () => {
                setShowConfirm(false);
                setChecks({ c1: false, c2: false });
            },
        });
    };

    // Replace the ACTIONS entry handler with:

    const handleResetOrganization = async () => {
        const confirmed = await confirmToast(
            "Reset your entire organization? All members, settings, and configuration will be removed.",
            "skip-reset-org-warning",
        );
        if (confirmed) {
            router.delete(route("settings.reset-organization"));
        }
    };

    const ACTIONS = [
        {
            title: "Delete all procurement data",
            desc: "Permanently removes purchase orders, requests, and vendor records.",
            label: "Delete data",
            handler: () => setShowConfirm((prev) => !prev),
        },
        {
            title: "Reset organization",
            desc: "Removes all members, settings, and configuration. The account itself is kept.",
            label: "Reset org",
            handler: handleResetOrganization,
        },
    ];

    return (
        <div
            style={{
                background: C.dangerBg,
                border: `1px solid ${C.dangerBorder}`,
                borderRadius: 12,
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "14px 24px",
                    borderBottom: `1px solid ${C.dangerBorder}`,
                }}
            >
                <Icon
                    name="alert-triangle"
                    size={15}
                    style={{ color: C.danger }}
                />
                <span
                    style={{ fontSize: 13.5, fontWeight: 500, color: C.danger }}
                >
                    These actions cannot be undone
                </span>
            </div>

            {ACTIONS.map((item, i, arr) => (
                <div
                    key={item.title}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 16,
                        padding: "18px 24px",
                        borderBottom:
                            i < arr.length - 1
                                ? `1px solid ${C.dangerBorder}`
                                : "none",
                    }}
                >
                    <div>
                        <p
                            style={{
                                fontSize: 13.5,
                                fontWeight: 500,
                                color: C.ink,
                                margin: "0 0 2px",
                            }}
                        >
                            {item.title}
                        </p>
                        <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>
                            {item.desc}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={item.handler}
                        style={{
                            flexShrink: 0,
                            fontSize: 13,
                            fontWeight: 500,
                            background: C.dangerBg,
                            color: C.danger,
                            border: `1px solid ${C.dangerBorder}`,
                            borderRadius: 7,
                            padding: "7px 14px",
                            cursor: "pointer",
                            fontFamily: "inherit",
                            whiteSpace: "nowrap",
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.background = C.dangerBorder)
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.background = C.dangerBg)
                        }
                    >
                        {item.label}
                    </button>
                </div>
            ))}

            {showConfirm && (
                <div
                    style={{
                        margin: "0 24px 18px",
                        background: C.dangerBg,
                        border: `1px solid ${C.dangerBorder}`,
                        borderRadius: 10,
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "10px 16px",
                            borderBottom: `1px solid ${C.dangerBorder}`,
                        }}
                    >
                        <Icon
                            name="alert-triangle"
                            size={14}
                            style={{ color: C.danger }}
                        />
                        <span
                            style={{
                                fontSize: 13,
                                fontWeight: 500,
                                color: C.danger,
                            }}
                        >
                            Confirm before proceeding
                        </span>
                    </div>
                    <div
                        style={{
                            padding: "14px 16px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 10,
                        }}
                    >
                        {[
                            {
                                key: "c1",
                                label: "All purchase requests, orders, GRNs, and stock ledger entries will be permanently erased.",
                            },
                            {
                                key: "c2",
                                label: "This cannot be undone. There is no way to recover this data after deletion.",
                            },
                        ].map(({ key, label }) => (
                            <label
                                key={key}
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 10,
                                    cursor: "pointer",
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={checks[key]}
                                    onChange={() =>
                                        setChecks((prev) => ({
                                            ...prev,
                                            [key]: !prev[key],
                                        }))
                                    }
                                    style={{
                                        marginTop: 2,
                                        accentColor: C.danger,
                                        width: 15,
                                        height: 15,
                                        flexShrink: 0,
                                        cursor: "pointer",
                                    }}
                                />
                                <span
                                    style={{
                                        fontSize: 13,
                                        color: C.muted,
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {label}
                                </span>
                            </label>
                        ))}
                        <button
                            type="button"
                            disabled={!checks.c1 || !checks.c2}
                            onClick={handleDeleteProcurementData}
                            style={{
                                alignSelf: "flex-start",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                padding: "7px 14px",
                                borderRadius: 7,
                                fontSize: 13,
                                fontWeight: 500,
                                fontFamily: "inherit",
                                cursor:
                                    checks.c1 && checks.c2
                                        ? "pointer"
                                        : "not-allowed",
                                opacity: checks.c1 && checks.c2 ? 1 : 0.4,
                                background: C.dangerBg,
                                color: C.danger,
                                border: `1px solid ${C.dangerBorder}`,
                            }}
                        >
                            Delete all data
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
