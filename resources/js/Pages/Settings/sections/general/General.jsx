import SectionHeading from "../../components/SectionHeading"
import Card from "../../components/Card"
import SettingsRow from "../../components/SettingsRow"
import LogoUploader from "./LogoUpLoader"
import SelectInput from "../../components/SelectInput"
import NumberInput from "../../components/NumberInput"
import TextInput from "../../components/TextInput"
import ThresholdNote from "./ThresholdNote"
import Toggle from "../../components/Toggle"
import ThemeSegmented from "../../components/ThemeSegmented"
import DangerZone from "./DangerZone"
import { useState } from "react"
import ThemeBadge from "../../components/ThemeBadge"





export default function General({ C, data, errors, patch, handleLogoChange, handleThemeChange, logoPreview }) {
    const CURRENCY_SYMBOLS = { PHP: '₱', USD: '$', EUR: '€', GBP: '£' };
    const currencySymbol = CURRENCY_SYMBOLS[data.currency] ?? '₱';
    const [themeMode, setThemeMode] = useState(() => {
        return localStorage.getItem('sv_interface_theme') || 'light';
    });



    return (
        <>
            <section>
                <SectionHeading
                    title="Organization"
                    desc="Basic details shown on invoices and purchase orders."
                    C={C}
                />
                <Card C={C}>
                    <SettingsRow label="Name" hint="Your legal or trading entity name." htmlFor="org-name" C={C}>
                        <TextInput
                            id="org-name"
                            value={data.company_name}
                            onChange={e => patch('company_name', e.target.value)}
                            placeholder="Enter organization name"
                            C={C}
                        />
                        {errors.company_name && (
                            <p style={{ fontSize: 12, color: C.danger, marginTop: 4 }}>
                                {errors.company_name}
                            </p>
                        )}
                    </SettingsRow>
                    <SettingsRow label="Logo" hint="PNG, JPEG or SVG · max 2 MB." C={C} last>
                        <LogoUploader logoPreview={logoPreview} onLogoChange={handleLogoChange} C={C} />
                        {errors.logo && (
                            <p style={{ fontSize: 12, color: C.danger, marginTop: 4 }}>
                                {errors.logo}
                            </p>
                        )}
                    </SettingsRow>
                </Card>
            </section>

            {/* Procurement rules */}
            <section>
                <SectionHeading
                    title="Procurement rules"
                    desc="Configure auto-approval thresholds and PO generation limits."
                    C={C}
                />
                <Card C={C}>
                    <SettingsRow label="Currency" hint="Applied to all invoices and procurement records." htmlFor="currency" C={C}>
                        <SelectInput
                            id="currency"
                            value={data.currency}
                            onChange={e => patch('currency', e.target.value)}
                            options={[
                                { value: 'PHP', label: 'PHP (₱) — Philippine Peso' },
                                { value: 'USD', label: 'USD ($) — US Dollar' },
                                { value: 'EUR', label: 'EUR (€) — Euro' },
                                { value: 'GBP', label: 'GBP (£) — British Pound' },
                            ]}
                            C={C}
                        />
                        {errors.currency && (
                            <p style={{ fontSize: 12, color: C.danger, marginTop: 4 }}>
                                {errors.currency}
                            </p>
                        )}
                    </SettingsRow>
                    <SettingsRow label="Auto-approval limit" hint="Requests below this skip manager review and auto-generate a PO." htmlFor="threshold" C={C}>
                        <NumberInput
                            id="threshold"
                            value={data.approval_threshold}
                            onChange={e => patch('approval_threshold', parseFloat(e.target.value) || '')}
                            min={0}
                            prefix={currencySymbol}
                            C={C}
                        />
                        <ThresholdNote threshold={data.approval_threshold} symbol={currencySymbol} C={C} />
                        {errors.approval_threshold && (
                            <p style={{ fontSize: 12, color: C.danger, marginTop: 4 }}>
                                {errors.approval_threshold}
                            </p>
                        )}
                    </SettingsRow>
                    <SettingsRow
                        label="Auto-send PO email"
                        hint="Automatically email the approved Purchase Order PDF to the supplier's contact when a PR is approved."
                        C={C}
                        last
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <Toggle
                                id="auto-send-email"
                                checked={data.auto_send_email}
                                onChange={val => patch('auto_send_email', val)}
                                C={C}
                            />
                            <div>
                                <span style={{
                                    fontSize: 13.5, fontWeight: 500,
                                    color: data.auto_send_email ? C.signal : C.muted,
                                }}>
                                    {data.auto_send_email ? 'Enabled' : 'Disabled'}
                                </span>
                                {data.auto_send_email && (
                                    <p style={{
                                        fontSize: 12, color: C.faint,
                                        margin: '2px 0 0', lineHeight: 1.4,
                                    }}>
                                        Supplier will receive the PO PDF at their registered contact email.
                                    </p>
                                )}
                            </div>
                        </div>
                        {errors.auto_send_email && (
                            <p style={{ fontSize: 12, color: C.danger, marginTop: 4 }}>
                                {errors.auto_send_email}
                            </p>
                        )}
                    </SettingsRow>
                </Card>
            </section>

            {/* Appearance */}
            <section>
                <SectionHeading
                    title="Appearance"
                    desc="Choose how the platform looks. Saved in your browser."
                    C={C}
                />
                <Card C={C}>
                    <SettingsRow label="Theme" hint="Applies to this device only." C={C} last>
                        <ThemeSegmented value={themeMode} onChange={handleThemeChange} C={C} />
                        <ThemeBadge themeMode={themeMode} C={C} />
                    </SettingsRow>
                </Card>
            </section>

            {/* Danger zone */}
            <section>
                <SectionHeading
                    title="Danger zone"
                    desc="Irreversible organizational updates."
                    C={C}
                    danger
                />
                <DangerZone C={C} />
            </section>
        </>
    )
}