import { useState } from "react"
import SectionHeading from "../../components/SectionHeading"
import Card from "../../components/Card"
import SettingsRow from "../../components/SettingsRow"
import Toggle from "../../components/Toggle"

export default function Notifications({ errors, C }) {
    // 1. Initialize state from your exact localStorage key string
    // If 'true', it means the warning should be HIDDEN (so toggle is false/disabled)
    const [showDeleteWarning, setShowDeleteWarning] = useState(() => {
        const hideWarning = localStorage.getItem('Do not show this warning again.');
        return hideWarning === 'true' ? false : true;
    });

    // 2. Update localStorage using your exact string key when toggled
    const handleToggleChange = (val) => {
        setShowDeleteWarning(val);
        // If val is true (Enabled), we remove or set 'Do not show' to false
        localStorage.setItem('Do not show this warning again.', val ? 'false' : 'true');
    };

    return (
        <>
            <SectionHeading
                title="Notification Actions"
                desc="Customize system alert messages and configuration warnings."
                C={C}
            />
            <Card C={C}>
                <SettingsRow
                    label="Deletion warnings"
                    hint="Prompt confirmation alerts when executing destructive row removals."
                    htmlFor="show-delete-warning"
                    C={C}
                    last
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Toggle
                            id="show-delete-warning"
                            checked={showDeleteWarning}
                            onChange={handleToggleChange}
                            C={C}
                        />
                        <div>
                            <span style={{
                                fontSize: 13.5, fontWeight: 500,
                                color: showDeleteWarning ? C.signal : C.muted,
                            }}>
                                {showDeleteWarning ? 'Enabled' : 'Disabled'}
                            </span>
                            <p style={{
                                fontSize: 12, color: C.faint,
                                margin: '2px 0 0', lineHeight: 1.4,
                            }}>
                                {showDeleteWarning
                                    ? 'Protective confirmation modal will appear before deleting data.'
                                    : 'Immediate action execution without interception popups.'
                                }
                            </p>
                        </div>
                    </div>
                    {errors?.show_delete_warning && (
                        <p style={{ fontSize: 12, color: C.danger, marginTop: 4 }}>
                            {errors.show_delete_warning}
                        </p>
                    )}
                </SettingsRow>
            </Card>
        </>
    )
}