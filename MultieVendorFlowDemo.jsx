import React, { useState } from 'react';

// Theme Configuration matching your crisp document design spec
const C = {
    bg: '#f4f7f6',
    cardBg: '#ffffff',
    border: '#0f172a', 
    textPrimary: '#0f172a',
    textMuted: '#555555',
    textLinkCode: '#007f5f', 
    pillBg: '#e1fbf0',
    pillText: '#117a4d',
    pillBorder: '#c4f6e1',
    accentBlue: '#2563eb'
};

// Mock Data representing a single Purchase Request that contains items from 2 different vendors
const MOCK_PURCHASE_REQUEST = {
    id: 148,
    status: 'approved',
    requested_by: 'Alex Mercer (IT Procurement)',
    created_at: 'June 14, 2026',
    justification: 'Network expansion framework setup for Sector 4 regional branch operations.',
    
    // The raw line items before splitting
    line_items: [
        {
            catalog_item: { name: 'Enterprise Node Router Switchboards Hub Unit v4', vendor_name: 'Nexus Tech Supply Partners Ltd' },
            quantity: 1,
            unit_cost: 320.00,
            line_total: 320.00
        },
        {
            catalog_item: { name: 'Shielded Cat6 Ground Cable Spool Bundles (100m)', vendor_name: 'Nexus Tech Supply Partners Ltd' },
            quantity: 2,
            unit_cost: 65.00,
            line_total: 130.00
        },
        {
            catalog_item: { name: 'Titan Heavy Duty Rack Mount Chassis 4U', vendor_name: 'Apex Industrial Hardware Corp' },
            quantity: 1,
            unit_cost: 185.00,
            line_total: 185.00
        }
    ]
};

// Mock Data showing the resulting downstream Purchase Orders generated automatically by the vendor split
const MOCK_GENERATED_POS = [
    {
        po_number: 'PO-2026-0010',
        vendor: 'Nexus Tech Supply Partners Ltd',
        terms: 'Net 30 Account Balances',
        total_amount: 450.00,
        items: [
            { name: 'Enterprise Node Router Switchboards Hub Unit v4', qty: 1, unit: 320.00, total: 320.00 },
            { name: 'Shielded Cat6 Ground Cable Spool Bundles (100m)', qty: 2, unit: 65.00, total: 130.00 }
        ]
    },
    {
        po_number: 'PO-2026-0011',
        vendor: 'Apex Industrial Hardware Corp',
        terms: 'Net 15 Direct Wire',
        total_amount: 185.00,
        items: [
            { name: 'Titan Heavy Duty Rack Mount Chassis 4U', qty: 1, unit: 185.00, total: 185.00 }
        ]
    }
];

export default function MultiVendorFlowDemo() {
    const [activeTab, setActiveTab] = useState('split-view'); // 'split-view' or 'raw-request'

    return (
        <div className="flow-container">
            <style>{`
                .flow-container {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    background-color: ${C.bg};
                    min-height: 100vh;
                    padding: 40px 20px;
                    color: ${C.textPrimary};
                }
                .flow-max-width {
                    max-width: 900px;
                    margin: 0 auto;
                }
                .flow-header {
                    margin-bottom: 24px;
                    border-bottom: 1px solid #dcdfdc;
                    padding-bottom: 16px;
                }
                .pr-badge-id {
                    font-family: monospace;
                    background: #e0e7ff;
                    color: ${C.accentBlue};
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-weight: 700;
                    font-size: 14px;
                }
                .flow-tabs {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 24px;
                }
                .tab-btn {
                    padding: 8px 16px;
                    border-radius: 6px;
                    border: 1px solid #cbd5e1;
                    background: #fff;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 13px;
                    transition: all 0.2s;
                }
                .tab-btn.active {
                    background: ${C.textPrimary};
                    color: #fff;
                    border-color: ${C.textPrimary};
                }
                
                /* System Split Notification Banner */
                .split-alert-banner {
                    background: #fffbeb;
                    border: 1px solid #fef3c7;
                    border-left: 4px solid #d97706;
                    border-radius: 8px;
                    padding: 16px;
                    margin-bottom: 32px;
                    font-size: 14px;
                    line-height: 1.5;
                }

                /* PO Card Specific Styling */
                .po-spec-card {
                    background: #f8faf9;
                    border: 1px solid #dcdfdc;
                    border-radius: 16px;
                    padding: 32px;
                    margin-bottom: 28px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.01);
                }
                .po-header-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                }
                .po-company-title {
                    font-size: 15px;
                    font-weight: 800;
                    text-transform: uppercase;
                }
                .po-doc-id {
                    font-family: monospace;
                    font-size: 18px;
                    font-weight: 700;
                    color: ${C.textLinkCode};
                }
                .po-divider-thick {
                    border: none;
                    border-top: 2px solid ${C.border};
                    margin: 12px 0 20px 0;
                }
                .po-info-grid {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr 1fr;
                    gap: 16px;
                    margin-bottom: 20px;
                }
                .po-label-cap {
                    font-size: 10px;
                    font-weight: 700;
                    color: #a0aec0;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    margin-bottom: 4px;
                }
                .po-value-strong {
                    font-size: 13px;
                    font-weight: 600;
                }
                .po-table-spec {
                    width: 100%;
                    border-collapse: collapse;
                }
                .po-table-spec th {
                    font-size: 9px;
                    font-weight: 700;
                    color: #a0aec0;
                    text-transform: uppercase;
                    padding-bottom: 8px;
                    border-bottom: 1px solid #e2e8f0;
                }
                .po-table-spec td {
                    padding: 12px 0;
                    font-size: 12.5px;
                }
                .po-divider-thin {
                    border: none;
                    border-top: 1px solid ${C.border};
                    margin: 12px 0 16px 0;
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
                    padding: 4px 12px;
                    font-size: 11px;
                    font-weight: 600;
                }
                .po-grand-total {
                    font-size: 20px;
                    font-weight: 800;
                }

                /* Raw Table Layout styling */
                .raw-table {
                    width: 100%;
                    background: #fff;
                    border: 1px solid #cbd5e1;
                    border-radius: 8px;
                    border-collapse: collapse;
                    overflow: hidden;
                }
                .raw-table th, .raw-table td {
                    padding: 14px;
                    font-size: 13.5px;
                    text-align: left;
                    border-bottom: 1px solid #e2e8f0;
                }
                .raw-table th {
                    background: #f8fafc;
                    font-weight: 700;
                }
                .vendor-tag {
                    display: inline-block;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-size: 11px;
                    font-weight: 600;
                    background: #f1f5f9;
                    color: #475569;
                    border: 1px solid #cbd5e1;
                }
            `}</style>

            <div className="flow-max-width">
                
                {/* Upper Breadcrumb Meta Panel */}
                <div className="flow-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                        <span className="pr-badge-id">PR-{MOCK_PURCHASE_REQUEST.id}</span>
                        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Consolidated Purchase Request</h1>
                    </div>
                    <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>
                        Requested by <strong>{MOCK_PURCHASE_REQUEST.requested_by}</strong> on {MOCK_PURCHASE_REQUEST.created_at}
                    </p>
                </div>

                {/* View Switcher Controls */}
                <div className="flow-tabs">
                    <button 
                        className={`tab-btn ${activeTab === 'split-view' ? 'active' : ''}`}
                        onClick={() => setActiveTab('split-view')}
                    >
                        🔮 View Generated Purchase Orders ({MOCK_GENERATED_POS.length})
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'raw-request' ? 'active' : ''}`}
                        onClick={() => setActiveTab('raw-request')}
                    >
                        📋 View Raw Consolidated Cart
                    </button>
                </div>

                {/* TAB 1: SHOWING THE SPLIT RESULT SYSTEM */}
                {activeTab === 'split-view' && (
                    <div>
                        <div className="split-alert-banner">
                            <strong>⚡ Smart Multi-Vendor Architecture Triggered:</strong> This Request contained line items mapped to multiple distinct fulfillment partners. The checkout system safely split them into separate execution documents to enforce strict accounting invariants.
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {MOCK_GENERATED_POS.map((po, index) => (
                                <div key={index} className="po-spec-card">
                                    
                                    {/* PO Card Head */}
                                    <div className="po-header-row">
                                        <div>
                                            <div className="po-company-title">Acme Corporation AP Envelope Struct</div>
                                            <div style={{ fontSize: 10, color: '#718096', marginTop: 2, textTransform: 'uppercase' }}>
                                                Fulfillment Pipeline Subsystem
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', color: '#a0aec0' }}>Purchase Order</div>
                                            <div className="po-doc-id">{po.po_number}</div>
                                        </div>
                                    </div>

                                    <hr className="po-divider-thick" />

                                    {/* PO Meta Data */}
                                    <div className="po-info-grid">
                                        <div className="po-info-block">
                                            <span className="po-label-cap">Vendor Target</span>
                                            <span className="po-value-strong" style={{ color: C.accentBlue }}>{po.vendor}</span>
                                        </div>
                                        <div className="po-info-block">
                                            <span className="po-label-cap">Date Validated</span>
                                            <span className="po-value-strong">{MOCK_PURCHASE_REQUEST.created_at}</span>
                                        </div>
                                        <div className="po-info-block">
                                            <span className="po-label-cap">Terms Format</span>
                                            <span className="po-value-strong">{po.terms}</span>
                                        </div>
                                    </div>

                                    {/* Filtered Item Matrix */}
                                    <table className="po-table-spec">
                                        <thead>
                                            <tr>
                                                <th style={{ textAlign: 'left', width: '60%' }}>Line Item Description Spec Payload</th>
                                                <th style={{ textAlign: 'center', width: '10%' }}>Qty</th>
                                                <th style={{ textAlign: 'right', width: '15%' }}>Unit Value</th>
                                                <th style={{ textAlign: 'right', width: '15%' }}>Net Ext</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {po.items.map((item, itemIdx) => (
                                                <tr key={itemIdx}>
                                                    <td style={{ fontWeight: '500' }}>{item.name}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.qty}</td>
                                                    <td style={{ textAlign: 'right' }}>${item.unit.toFixed(2)}</td>
                                                    <td style={{ textAlign: 'right', fontWeight: '600' }}>${item.total.toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <hr className="po-divider-thin" />

                                    {/* Card Footer Signature block */}
                                    <div className="po-footer-row">
                                        <div className="po-status-pill">
                                            <span>✓ System Auto-Approved</span>
                                        </div>
                                        <div className="po-grand-total">
                                            ${po.total_amount.toFixed(2)}
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 2: SHOWING THE RAW UNBROKEN SYSTEM */}
                {activeTab === 'raw-request' && (
                    <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                        <h3 style={{ marginTop: 0, marginBottom: 8, fontSize: '16px' }}>Master Request Document Log</h3>
                        <p style={{ fontSize: '13.5px', color: C.textMuted, marginBottom: 20 }}>
                            Below is the raw internal list showing all items combined before splitting into distinct corporate vendor envelopes.
                        </p>

                        <table className="raw-table">
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Assigned Vendor</th>
                                    <th>Qty</th>
                                    <th>Unit Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_PURCHASE_REQUEST.line_items.map((item, index) => (
                                    <tr key={index}>
                                        <td style={{ fontWeight: '600' }}>{item.catalog_item.name}</td>
                                        <td>
                                            <span className="vendor-tag">{item.catalog_item.vendor_name}</span>
                                        </td>
                                        <td>{item.quantity}</td>
                                        <td>${item.unit_cost.toFixed(2)}</td>
                                        <td style={{ fontWeight: '700' }}>${item.line_total.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </div>
    );
}