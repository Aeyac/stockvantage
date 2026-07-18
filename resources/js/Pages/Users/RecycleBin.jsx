import { router, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import confirmToast from "@/utils/confirmToast";
import BackButton from "@/Components/BackButton";
import FlashMessage from "@/Components/FlashMessage";
import SearchBox from "@/Components/SearchBox/SearchBox";

export default function UserRecycleBin({
    deletedItems = { data: [] },
    filters,
    flash,
}) {
    console.log("Current Recycle Payload:", deletedItems);

    const handleRestore = async (id) => {
        router.patch(route("users.recycle-bin.restore", id));
    };

    const handleForceDelete = async (id) => {
        const confirmed = await confirmToast(
            "Permanently delete this user from the master system directory? This action cannot be undone and will strip all system logs and ownership records of their associated identifier node.",
            "skip-user-force-delete-warning",
        );

        if (confirmed) {
            router.delete(route("users.recycle-bin.force-delete", id));
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch (e) {
            return dateString;
        }
    };

    const styles = {
        container: {
            padding: "32px",
            maxWidth: "1280px",
            margin: "0 auto",
            minHeight: "100vh",
            backgroundColor: "#F2F5F4",
            fontFamily: "system-ui, -apple-system, sans-serif",
        },
        headerWrapper: {
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            marginBottom: "32px",
        },
        titleContainer: {
            width: "100%",
        },
        title: {
            fontSize: "24px",
            fontWeight: "700",
            color: "#0F172A",
            letterSpacing: "-0.025em",
            margin: 0,
        },
        subtitle: {
            fontSize: "14px",
            color: "#64748B",
            marginTop: "6px",
            lineHeight: "1.5",
            margin: 0,
            maxWidth: "600px",
        },
        searchContainer: {
            marginTop: "16px", // Adds spacing directly below the subtitle text
            maxWidth: "360px", // Limits the width so it doesn't stretch across the entire screen
            width: "100%",
        },
        emptyCard: {
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "16px",
            textAlign: "center",
            padding: "96px 16px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        },
        emptyIconCircle: {
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "#F8FAFC",
            border: "1px solid #F1F5F9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            color: "#94A3B8",
        },
        emptyTitle: {
            fontSize: "14px",
            fontWeight: "600",
            color: "#1E293B",
            margin: 0,
        },
        emptyText: {
            fontSize: "12px",
            color: "#94A3B8",
            marginTop: "4px",
            maxWidth: "320px",
            margin: "4px auto 0",
        },
        cardWrapper: {
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "16px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            overflow: "hidden",
        },
        responsiveTable: {
            overflowX: "auto",
            width: "100%",
        },
        table: {
            width: "100%",
            fontSize: "14px",
            borderCollapse: "collapse",
        },
        thead: {
            backgroundColor: "rgba(248, 250, 252, 0.7)",
            borderBottom: "1px solid #E2E8F0",
            color: "#64748B",
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
        },
        th: (align = "left") => ({
            padding: "16px 24px",
            textAlign: align,
            fontWeight: "600",
        }),
        tr: {
            borderBottom: "1px solid #F1F5F9",
            transition: "background-color 0.15s ease",
        },
        td: (align = "left") => ({
            padding: "16px 24px",
            textAlign: align,
            whiteSpace: "nowrap",
            verticalAlign: "middle",
        }),
        userIdentSection: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
        },
        avatarPlaceholder: {
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "#00C488",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "600",
            fontSize: "13px",
            border: "1px solid #E2E8F0",
        },
        textMain: {
            color: "#334155",
            fontWeight: "600",
            fontSize: "14px",
        },
        textMuted: {
            color: "#64748B",
            fontSize: "13px",
        },
        roleBadge: {
            display: "inline-flex",
            alignItems: "center",
            padding: "2px 10px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "500",
            backgroundColor: "#F1F5F9",
            color: "#334155",
            border: "1px solid #E2E8F0",
        },
        actionContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "8px",
        },
        btnRestore: {
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            borderRadius: "8px",
            backgroundColor: "#E8F7F2",
            color: "#007A55",
            border: "1px solid rgba(0, 196, 136, 0.25)",
            fontSize: "12px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.15s ease",
        },
        btnPurge: {
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            borderRadius: "8px",
            backgroundColor: "#FFEBEB",
            color: "#AC1D1D",
            border: "1px solid rgba(255, 180, 171, 0.4)",
            fontSize: "12px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.15s ease",
        },
        paginationFooter: {
            padding: "16px 24px",
            backgroundColor: "rgba(248, 250, 252, 0.5)",
            borderTop: "1px solid #F1F5F9",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "4px",
            flexWrap: "wrap",
        },
        pageLink: (active, disabled) => ({
            padding: "6px 12px",
            fontSize: "12px",
            fontWeight: "500",
            borderRadius: "8px",
            border: active ? "1px solid #0F172A" : "1px solid #E2E8F0",
            backgroundColor: active ? "#0F172A" : "#FFFFFF",
            color: active ? "#FFFFFF" : "#475569",
            textDecoration: "none",
            opacity: disabled ? 0.4 : 1,
            pointerEvents: disabled ? "none" : "auto",
            transition: "all 0.15s ease",
        }),
    };

    const getInitials = (name) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    const activeData = deletedItems?.data || [];

    return (
        <AuthenticatedLayout>
            <div style={styles.container}>
                <FlashMessage flash={flash} />

                {/* Header Section */}
                <div style={styles.headerWrapper}>
                    <div>
                        <BackButton
                            link={"/users"}
                            text={"Back to User Directory"}
                        />
                    </div>

                    <div style={styles.titleContainer}>
                        <h1 style={styles.title}>User Recycle Bin</h1>
                        <p style={styles.subtitle}>
                            Manage soft-deleted user profiles. Restoring
                            accounts re-grants application layout access and
                            retains their historical activity logging strings.
                        </p>

                        {/* Stacks clean directly below the subtitle */}
                        <div style={styles.searchContainer}>
                            <SearchBox
                                routeName="users.recycle-bin.index"
                                filters={filters}
                                statusType="user"
                                roleType="user"
                            />
                        </div>
                    </div>
                </div>

                {/* Data Block Container Node */}
                {activeData.length === 0 ? (
                    <div style={styles.emptyCard}>
                        <div style={styles.emptyIconCircle}>
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h3 style={styles.emptyTitle}>
                            No archived users found
                        </h3>
                        <p style={styles.emptyText}>
                            The user trash registry is clear. All system
                            accounts and credentials are fully functional.
                        </p>
                    </div>
                ) : (
                    <div style={styles.cardWrapper}>
                        <div style={styles.responsiveTable}>
                            <table style={styles.table}>
                                <thead style={styles.thead}>
                                    <tr>
                                        <th style={styles.th("left")}>
                                            User Name
                                        </th>
                                        <th style={styles.th("left")}>
                                            Email Address
                                        </th>
                                        <th style={styles.th("left")}>
                                            Assigned Role
                                        </th>
                                        <th style={styles.th("left")}>
                                            Archived Date
                                        </th>
                                        <th style={styles.th("right")}>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activeData.map((user) => (
                                        <tr
                                            key={user.id}
                                            style={styles.tr}
                                            onMouseEnter={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                "#F8FAFC")
                                            }
                                            onMouseLeave={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                "transparent")
                                            }
                                        >
                                            <td style={styles.td("left")}>
                                                <div
                                                    style={
                                                        styles.userIdentSection
                                                    }
                                                >
                                                    <div
                                                        style={
                                                            styles.avatarPlaceholder
                                                        }
                                                    >
                                                        {getInitials(user.name)}
                                                    </div>
                                                    <span
                                                        style={styles.textMain}
                                                    >
                                                        {user.name}
                                                    </span>
                                                </div>
                                            </td>

                                            <td style={styles.td("left")}>
                                                <span
                                                    style={{
                                                        ...styles.textMain,
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {user.email}
                                                </span>
                                            </td>

                                            <td style={styles.td("left")}>
                                                <span style={styles.roleBadge}>
                                                    {user.role ?? "User"}
                                                </span>
                                            </td>

                                            <td style={styles.td("left")}>
                                                <span style={styles.textMuted}>
                                                    {formatDate(
                                                        user.deleted_at,
                                                    )}
                                                </span>
                                            </td>

                                            <td style={styles.td("right")}>
                                                <div
                                                    style={
                                                        styles.actionContainer
                                                    }
                                                >
                                                    <button
                                                        onClick={() =>
                                                            handleRestore(
                                                                user.id,
                                                            )
                                                        }
                                                        style={
                                                            styles.btnRestore
                                                        }
                                                        onMouseEnter={(e) =>
                                                        (e.currentTarget.style.backgroundColor =
                                                            "#D1FAE5")
                                                        }
                                                        onMouseLeave={(e) =>
                                                        (e.currentTarget.style.backgroundColor =
                                                            "#E8F7F2")
                                                        }
                                                        title="Restore user configuration profile"
                                                    >
                                                        <svg
                                                            width="13"
                                                            height="13"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2.5"
                                                        >
                                                            <polyline points="23 4 23 10 17 10" />
                                                            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                                                        </svg>
                                                        Restore
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleForceDelete(
                                                                user.id,
                                                            )
                                                        }
                                                        style={styles.btnPurge}
                                                        onMouseEnter={(e) =>
                                                        (e.currentTarget.style.backgroundColor =
                                                            "#FCA5A530")
                                                        }
                                                        onMouseLeave={(e) =>
                                                        (e.currentTarget.style.backgroundColor =
                                                            "#FFEBEB")
                                                        }
                                                        title="Purge user node record completely"
                                                    >
                                                        <svg
                                                            width="13"
                                                            height="13"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2.5"
                                                        >
                                                            <polyline points="3 6 5 6 21 6" />
                                                            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                                        </svg>
                                                        Purge
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Links Stack */}
                        {deletedItems?.links &&
                            deletedItems.links.length > 3 && (
                                <div style={styles.paginationFooter}>
                                    {deletedItems.links.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.url ?? "#"}
                                            style={styles.pageLink(
                                                link.active,
                                                !link.url,
                                            )}
                                            onMouseEnter={(e) => {
                                                if (!link.active)
                                                    e.currentTarget.style.backgroundColor =
                                                        "#F8FAFC";
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!link.active)
                                                    e.currentTarget.style.backgroundColor =
                                                        "#FFFFFF";
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
