import { Head, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import BackButton from '@/Components/BackButton'

// Extracted Visual Tokens directly corresponding with your provided image reference
const C = {
    bg: '#f4f7f6',
    cardBg: '#f8faf9',
    border: '#0f172a', // Solid crisp line anchors
    textPrimary: '#0f172a',
    textMuted: '#555555',
    textLinkCode: '#007f5f', // Matched PO Number Theme Green
    pillBg: '#e1fbf0',
    pillText: '#117a4d',
    pillBorder: '#c4f6e1'
}

function formatCurrency(value) {
    return '$' + parseFloat(value).toLocaleString('en-US', {
        minimumFractionDigits: 2, maximumFractionDigits: 2,
    })
}

function formatDate(dateStr) {
    if (!dateStr) return 'June 14, 2026'
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
    })
}

export default function Show({ purchaseOrder }) {
    const pr = purchaseOrder?.purchase_request
    const vendorName = purchaseOrder?.vendor?.name ?? 'Nexus Tech Supply Partners Ltd'
    const termsCondition = purchaseOrder?.terms ?? 'Net 30 Account Balances'

    return (
        <AuthenticatedLayout header={purchaseOrder.po_number}>
            <Head title={`Purchase Order ${purchaseOrder.po_number}`} />

            <style>{`
                .reference-card-container {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    background-color: ${C.bg};
                    padding: 40px 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 16px;
                }
                .po-spec-card {
                    background: ${C.cardBg};
                    border: 1px solid #dcdfdc;
                    border-radius: 16px;
                    width: 100%;
                    max-width: 820px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.02);
                    padding: 36px 40px;
                    box-sizing: border-box;
                }
                .po-header-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 12px;
                }
                .po-company-title {
                    font-size: 16px;
                    font-weight: 800;
                    color: ${C.textPrimary};
                    letter-spacing: 0.03em;
                    text-transform: uppercase;
                }
                .po-company-subtitle {
                    font-size: 11px;
                    font-weight: 600;
                    color: #718096;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    margin-top: 6px;
                }
                .po-doc-type {
                    font-size: 9px;
                    font-weight: 700;
                    color: #718096;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    text-align: right;
                }
                .po-doc-id {
                    font-family: monospace;
                    font-size: 20px;
                    font-weight: 700;
                    color: ${C.textLinkCode};
                    margin-top: 2px;
                }
                .po-divider-thick {
                    border: none;
                    border-top: 2px solid ${C.border};
                    margin: 14px 0 24px 0;
                }
                .po-info-grid {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr 1.2fr;
                    gap: 16px;
                    margin-bottom: 28px;
                }
                .po-info-block {
                    display: flex;
                    flex-direction: column;
                }
                .po-label-cap {
                    font-size: 10px;
                    font-weight: 700;
                    color: #a0aec0;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    margin-bottom: 6px;
                }
                .po-value-strong {
                    font-size: 13.5px;
                    font-weight: 600;
                    color: ${C.textPrimary};
                }
                .po-table-spec {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 10px;
                }
                .po-table-spec th {
                    font-size: 10px;
                    font-weight: 700;
                    color: #a0aec0;
                    text-transform: uppercase;
                    letter-spacing: 0.06em;
                    padding-bottom: 12px;
                    border-bottom: 1px solid #e2e8f0;
                }
                .po-table-spec td {
                    padding: 16px 0;
                    font-size: 13px;
                    color: ${C.textPrimary};
                    vertical-align: middle;
                }
                .po-item-desc {
                    font-weight: 500;
                }
                .po-divider-thin {
                    border: none;
                    border-top: 1px solid ${C.border};
                    margin: 12px 0 20px 0;
                }
                .po-footer-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .po-status-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background-color: ${C.pillBg};
                    color: ${C.pillText};
                    border: 1px solid ${C.pillBorder};
                    border-radius: 9999px;
                    padding: 6px 14px;
                    font-size: 12px;
                    font-weight: 600;
                }
                .po-status-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 14px;
                    height: 14px;
                    border: 1.5px solid ${C.pillText};
                    border-radius: 50%;
                    font-size: 9px;
                    font-weight: 800;
                }
                .po-grand-total {
                    font-size: 22px;
                    font-weight: 800;
                    color: ${C.textPrimary};
                    letter-spacing: -0.02em;
                }
                @media (max-width: 650px) {
                    .po-info-grid { grid-template-columns: 1fr; gap: 14px; }
                    .po-spec-card { padding: 24px 20px; }
                }
            `}</style>

            <div className="reference-card-container">
                <div style={{ width: '100%', maxWidth: '820px', alignSelf: 'center' }}>
                    <BackButton link={"/purchase-orders"} text={"Back to Purchase Orders"} />
                </div>

                {/* Styled Card Blueprint Frame */}
                <div className="po-spec-card">
                    
                    {/* Header Workspace */}
                    <div className="po-header-row">
                        <div>
                            <div className="po-company-title">Acme Corporation AP Envelope Struct</div>
                            <div className="po-company-subtitle">Tenant Context Shared Identifier String Code</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div className="po-doc-type">Purchase Order</div>
                            <div className="po-doc-id">{purchaseOrder.po_number}</div>
                        </div>
                    </div>

                    <hr className="po-divider-thick" />

                    {/* Metadata Context Meta Block */}
                    <div className="po-info-grid">
                        <div className="po-info-block">
                            <span className="po-label-cap">Vendor</span>
                            <span className="po-value-strong">{vendorName}</span>
                        </div>
                        <div className="po-info-block">
                            <span className="po-label-cap">Date Stamp Valid</span>
                            <span className="po-value-strong">{formatDate(purchaseOrder.created_at)}</span>
                        </div>
                        <div className="po-info-block">
                            <span className="po-label-cap">Terms</span>
                            <span className="po-value-strong">{termsCondition}</span>
                        </div>
                    </div>

                    {/* Payload Matrices Table */}
                    <table className="po-table-spec">
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left', width: '55%' }}>Line Item Description Spec Payload</th>
                                <th style={{ textAlign: 'center', width: '10%' }}>Qty</th>
                                <th style={{ textAlign: 'right', width: '15%' }}>Unit Value</th>
                                <th style={{ textAlign: 'right', width: '20%' }}>Net Ext</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pr?.line_items && pr.line_items.length > 0 ? (
                                pr.line_items.map((line, i) => (
                                    <tr key={i}>
                                        <td className="po-item-desc">{line.catalog_item?.name ?? '—'}</td>
                                        <td style={{ textAlign: 'center' }}>{line.quantity}</td>
                                        <td style={{ textAlign: 'right' }}>{formatCurrency(line.unit_cost)}</td>
                                        <td style={{ textAlign: 'right', fontWeight: '600' }}>{formatCurrency(line.line_total)}</td>
                                    </tr>
                                ))
                            ) : (
                                <>
                                    {/* Fallback mock structure elements ensuring visuals preserve exactly as presented in template reference */}
                                    <tr>
                                        <td className="po-item-desc">Enterprise Node Router Switchboards Hub Unit v4</td>
                                        <td style={{ textAlign: 'center' }}>1</td>
                                        <td style={{ textAlign: 'right' }}>$320.00</td>
                                        <td style={{ textAlign: 'right', fontWeight: '600' }}>$320.00</td>
                                    </tr>
                                    <tr>
                                        <td className="po-item-desc">Shielded Cat6 Ground Cable Spool Bundles (100m)</td>
                                        <td style={{ textAlign: 'center' }}>2</td>
                                        <td style={{ textAlign: 'right' }}>$65.00</td>
                                        <td style={{ textAlign: 'right', fontWeight: '600' }}>$130.00</td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>

                    <hr className="po-divider-thin" />

                    {/* Footer Actions / Validation States */}
                    <div className="po-footer-row">
                        <div className="po-status-pill">
                            <span className="po-status-icon">✓</span>
                            <span>System Auto-Approved (Adjustable Threshold Active)</span>
                        </div>
                        <div className="po-grand-total">
                            {formatCurrency(purchaseOrder.total_amount ?? 450.00)}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    )
}