import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useRef, useCallback, useEffect } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import FlashMessage from "@/Components/FlashMessage";
import SideNav from "./sections/SideNav";
import Icon from "./components/Icon";
import TextInput from "./components/TextInput";
import NumberInput from "./components/NumberInput";
import Label from "./components/Label";
import Hint from "./components/Hint";
import SelectInput from "./components/SelectInput";
import Card from "./components/Card";
import SettingsRow from "./components/SettingsRow";
import SectionHeading from "./components/SectionHeading";
import ThemeSegmented from "./components/ThemeSegmented";
import ThemeBadge from "./components/ThemeBadge";
import LogoUploader from "./sections/general/LogoUpLoader";
import ThresholdNote from "./sections/general/ThresholdNote";
import Toggle from "./components/Toggle";
import DangerZone from "./sections/general/DangerZone";
import Toast from "./components/Toggle";
import General from "./sections/general/General";
import Notifications from "./sections/notifications/Notifications";
import FooterActionBar from "./sections/FooterActionBar";

// ─── Design tokens ────────────────────────────────────────────────────────────
const light = {
    bg: "#F2F5F4",
    surface: "#FFFFFF",
    surfaceHover: "#F9FAFB",
    border: "#E4E9E7",
    borderHover: "#CDD6D2",
    ink: "#0C0F0E",
    ink2: "#2D3A36",
    muted: "#617870",
    faint: "#8FA49D",
    signal: "#00C488",
    signalHover: "#00A872",
    signalFocus: "rgba(0,196,136,0.15)",
    warn: "#D97706",
    warnBg: "#FFFBEB",
    warnBorder: "#FDE68A",
    danger: "#DC2626",
    dangerBg: "#FEF2F2",
    dangerBorder: "#FECACA",
    successBg: "#ECFDF5",
    successText: "#059669",
};

const dark = {
    bg: "#0E1110",
    surface: "#161B19",
    surfaceHover: "#1C2320",
    border: "#263029",
    borderHover: "#364039",
    ink: "#F3F7F5",
    ink2: "#C8D6D0",
    muted: "#7A9990",
    faint: "#4E6860",
    signal: "#00C488",
    signalHover: "#00E09A",
    signalFocus: "rgba(0,196,136,0.18)",
    warn: "#FBBF24",
    warnBg: "#1C1608",
    warnBorder: "#78530A",
    danger: "#F87171",
    dangerBg: "#1C0808",
    dangerBorder: "#7F1D1D",
    successBg: "#052E1C",
    successText: "#34D399",
};

const NAV_ITEMS = [
    { id: "general", icon: "building", label: "General" },
    { id: "billing", icon: "credit-card", label: "Billing" },
    { id: "notifications", icon: "bell", label: "Notifications" },
    { id: "security", icon: "shield-lock", label: "Security" },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export default function Index({ settings, flash }) {

    const [themeMode, setThemeMode] = useState(() => {
        return localStorage.getItem("sv_interface_theme") || "light";
    });

    const { data, setData, post, processing, errors, reset } = useForm({
        _method: "POST",
        company_name: settings.company_name ?? "",
        currency: settings.currency ?? "PHP",
        approval_threshold: settings.approval_threshold ?? 500.0,
        auto_send_email: settings.auto_send_email ?? false,
        show_delete_warning: settings.show_delete_warning ?? true, // Added field here
        logo: null,
    });

    const [logoPreview, setLogoPreview] = useState(settings.logo_url ?? null);
    const [activeSection, setActiveSection] = useState("general");
    const [toastVisible, setToastVisible] = useState(false);

    const C = themeMode === "dark" ? dark : light;

    useEffect(() => {
        if (flash?.success) {
            setToastVisible(true);
            const t = setTimeout(() => setToastVisible(false), 2800);
            return () => clearTimeout(t);
        }
    }, [flash]);

    const patch = useCallback((key, val) => setData(key, val), [setData]);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setData("logo", file);
        setLogoPreview(URL.createObjectURL(file));
    };

    const handleThemeChange = (mode) => {
        setThemeMode(mode);
        localStorage.setItem("sv_interface_theme", mode);
    };

    return (
        <AuthenticatedLayout header="System Configurations">
            <Head title="Settings" />

            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.30.0/dist/tabler-icons.min.css"
            />

            <FlashMessage flash={flash} />

            <div
                style={{
                    fontFamily:
                        '"Instrument Sans", -apple-system, BlinkMacSystemFont, sans-serif',
                    background: C.bg,
                    color: C.ink,
                    minHeight: "100vh",
                    transition: "background .2s, color .2s",
                }}
            >
                {/* Change this wrapper div */}
                <div
                    style={{
                        display: "flex",
                        maxWidth: 900,
                        margin: "0 auto",
                        padding: "32px 24px",
                        gap: 32,
                        alignItems: "flex-start",
                        paddingBottom: 80,
                        minHeight: "calc(100vh - 160px)", // Ensures a stable height track even if content is empty
                    }}
                >
                    {/* Sidebar */}
                    <div style={{ position: "sticky", top: 80 }}>
                        <SideNav
                            NAV_ITEMS={NAV_ITEMS}
                            activeSection={activeSection}
                            onSwitch={setActiveSection}
                            C={C}
                        />
                    </div>

                    {/* Content */}
                    <main
                        style={{
                            flex: 1,
                            minWidth: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: 24,
                        }}
                    >
                        {activeSection === "general" && (
                            <>
                                {/* Organization */}
                                <General
                                    C={C}
                                    data={data}
                                    errors={errors}
                                    patch={patch}
                                    handleLogoChange={handleLogoChange}
                                    handleThemeChange={handleThemeChange}
                                    logoPreview={logoPreview}
                                />
                            </>
                        )}

                        {/* ─── Added Notifications Section ──────────────────────── */}
                        {activeSection === "notifications" && (
                            <section>
                                <Notifications
                                    data={data}
                                    errors={errors}
                                    C={C}
                                />
                            </section>
                        )}
                    </main>
                </div>

                {/* ─── Footer Action Bar ────────────────────────────────────── */}
                <FooterActionBar
                    C={C}
                    toastVisible={toastVisible}
                    setData={setData}
                    reset={reset}
                    post={post}
                    processing={processing}
                    setLogoPreview={setLogoPreview}
                    settings={settings.logo_url}
                />
            </div>
        </AuthenticatedLayout>
    );
}
