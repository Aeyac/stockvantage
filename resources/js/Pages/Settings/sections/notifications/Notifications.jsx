import SectionHeading from "../../components/SectionHeading"
import Card from "../../components/Card"
import SettingsRow from "../../components/SettingsRow"
import Toggle from "../../components/Toggle"



export default function Notifications({ data, errors, C }) {
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
                            checked={data.show_delete_warning}
                            onChange={val => patch('show_delete_warning', val)}
                            C={C}
                        />
                        <div>
                            <span style={{
                                fontSize: 13.5, fontWeight: 500,
                                color: data.show_delete_warning ? C.signal : C.muted,
                            }}>
                                {data.show_delete_warning ? 'Enabled' : 'Disabled'}
                            </span>
                            <p style={{
                                fontSize: 12, color: C.faint,
                                margin: '2px 0 0', lineHeight: 1.4,
                            }}>
                                {data.show_delete_warning
                                    ? 'Protective confirmation modal will appear before deleting data.'
                                    : 'Immediate action execution without interception popups.'
                                }
                            </p>
                        </div>
                    </div>
                    {errors.show_delete_warning && (
                        <p style={{ fontSize: 12, color: C.danger, marginTop: 4 }}>
                            {errors.show_delete_warning}
                        </p>
                    )}
                </SettingsRow>
            </Card>
        </>
    )
}