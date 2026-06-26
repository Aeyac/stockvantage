import Toast from "../components/Toast";
import confirmToast from "@/utils/confirmToast";
import { router } from "@inertiajs/react";

export default function FooterActionBar({
    C,
    toastVisible,
    setData,
    reset,
    post,
    processing,
    setLogoPreview,
    settings,
}) {
    const handleResetDefaults = async () => {
        const confirmed = await confirmToast(
            "Are you sure you want to reset settings?",
            "Do not show this warning again.",
        );

        if (confirmed) {
            router.post(
                route("settings.reset-defaults"),
                {},
                {
                    onSuccess: (page) => {
                        const settings = page.props.settings;

                        setData({
                            company_name: settings.company_name,
                            currency: settings.currency,
                            approval_threshold: settings.approval_threshold,
                            auto_send_email: settings.auto_send_email,
                            show_delete_warning: settings.show_delete_warning,
                            logo: null,
                        });

                        setLogoPreview(settings.logo_url);
                    },
                },
            );
        }
    };

    const handleSave = () => {
        post(route("settings.update"), {
            preserveScroll: true,
            onSuccess: () => setData("logo", null),
        });
    };

    return (
        <div
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                background: C.surface,
                borderTop: `1px solid ${C.border}`,
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                zIndex: 10,
            }}
        >
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    maxWidth: 852,
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Toast visible={toastVisible} C={C} />
                <div style={{ display: "flex", gap: 12 }}>
                    <button
                        type="button"
                        onClick={handleResetDefaults}
                        disabled={processing}
                        style={{
                            fontSize: 13,
                            fontWeight: 500,
                            background: "transparent",
                            color: C.muted,
                            border: "none",
                            padding: "8px 16px",
                            cursor: "pointer",
                            fontFamily: "inherit",
                            borderRadius: 6,
                        }}
                    >
                        Reset
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={processing}
                        style={{
                            fontSize: 13,
                            fontWeight: 500,
                            background: C.signal,
                            color: "#FFF",
                            border: "none",
                            borderRadius: 8,
                            padding: "8px 20px",
                            cursor: "pointer",
                            fontFamily: "inherit",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                            transition: "background .12s",
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.background = C.signalHover)
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.background = C.signal)
                        }
                    >
                        {processing ? "Saving..." : "Save Settings"}
                    </button>
                </div>
            </div>
        </div>
    );
}
