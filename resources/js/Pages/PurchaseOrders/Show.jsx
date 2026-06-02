import React from 'react'
import { Head, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import BackButton from '@/Components/BackButton'
import { formatCurrency } from '@/hooks/useCurrency'
import { useAuth } from '@/hooks/useAuth'

// ─── ICONS ────────────────────────────────────────────────────────────────
const Icons = {
    check: (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="6.5" cy="6.5" r="6" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M4 6.5l2 2 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    clock: (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="6.5" cy="6.5" r="6" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M6.5 3.5v3l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
    ),
    print: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="3" y="1" width="8" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M3 6H1.5A.5.5 0 001 6.5v4a.5.5 0 00.5.5H3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M11 6h1.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            <rect x="3" y="8" width="8" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M5 10.5h4M5 12h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            <circle cx="11" cy="8" r="0.75" fill="currentColor"/>
        </svg>
    ),
    download: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1 11h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
    ),
    building: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="2" y="2" width="10" height="11" rx="1" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M5 5h1M8 5h1M5 8h1M8 8h1M5.5 13v-3h3v3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
        </svg>
    ),
}

// ─── STATUS CONFIG ────────────────────────────────────────────────────────
const STATUS = {
    auto_approved:       { label: 'StockVantage Approved', bg: '#e8f7f0', color: '#007a55', border: '#b3e8d0', icon: Icons.check },
    awaiting:            { label: 'Awaiting Approval',   bg: '#fef3c7', color: '#92400e', border: '#fcd34d', icon: Icons.clock },
    approved:            { label: 'Manager Approved',    bg: '#dbeafe', color: '#1e40af', border: '#93c5fd', icon: Icons.check },
    partially_received: { label: 'Partially Received', bg: '#fee2e2', color: '#991b1b', border: '#fca5a5', icon: Icons.clock },
}

// ─── HELPER FORMAT DATE ───────────────────────────────────────────────────
const formatDate = d => d
    ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—'

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────
function MetaBlock({ label, value, mono }) {
    return (
        <div style={{ minWidth: '140px', flex: '1 1 0%' }}>
            <div style={{
                fontSize: 10, fontWeight: 600, color: '#7a9189',
                textTransform: 'uppercase', letterSpacing: '0.11em',
                marginBottom: 6, fontFamily: "'DM Mono', monospace"
            }}>{label}</div>
            <div style={{
                fontSize: 14, fontWeight: 600, color: '#0d1514',
                fontFamily: mono ? "'DM Mono', monospace" : 'inherit',
                letterSpacing: mono ? '0.01em' : 'inherit'
            }}>{value}</div>
        </div>
    )
}

function LineRow({ item, isLast, currency }) {
    const [hovered, setHovered] = React.useState(false)
    const lineTotal = (item.unit_cost ?? 0) * (item.quantity ?? 0)

    return (
        <tr
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setMouseLeave(false)}
            style={{ background: hovered ? '#f7faf9' : 'transparent', transition: 'background .12s' }}
        >
            <td style={{ padding: '14px 0', borderBottom: isLast ? 'none' : '1px solid #eef3f1' }}>
                <div style={{ fontWeight: 500, fontSize: 13.5, color: '#0d1514' }}>{item.catalog_item?.name ?? '—'}</div>
                {item.catalog_item?.sku && (
                    <div style={{ fontSize: 11, color: '#7a9189', fontFamily: "'DM Mono', monospace", marginTop: 3 }}>
                        SKU: {item.catalog_item.sku}
                    </div>
                )}
            </td>
            <td style={{ textAlign: 'center', padding: '14px 8px', borderBottom: isLast ? 'none' : '1px solid #eef3f1', fontSize: 13.5, color: '#0d1514', fontWeight: 500 }}>
                {item.quantity}
            </td>
            <td style={{ textAlign: 'right', padding: '14px 8px', borderBottom: isLast ? 'none' : '1px solid #eef3f1', fontSize: 13.5, color: '#5a6e67', fontFamily: "'DM Mono', monospace" }}>
                {formatCurrency(item.unit_cost, currency)}
            </td>
            <td style={{ textAlign: 'right', padding: '14px 0 14px 8px', borderBottom: isLast ? 'none' : '1px solid #eef3f1', fontSize: 13.5, fontWeight: 600, color: '#0d1514', fontFamily: "'DM Mono', monospace" }}>
                {formatCurrency(lineTotal, currency)}
            </td>
        </tr>
    )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export default function Show({ purchaseOrder }) {
    const { companyName } = useAuth();

    const pr             = purchaseOrder?.purchase_request
    const lineItems      = pr?.line_items ?? []
    const supplierName   = lineItems[0]?.catalog_item?.supplier?.name ?? 'Unknown Vendor'
    const termsCondition = purchaseOrder?.terms ?? 'Net 30 Account Balances'
    const statusKey      = purchaseOrder?.status ?? 'auto_approved'
    const status         = STATUS[statusKey] ?? STATUS.auto_approved
    const currency       = purchaseOrder?.currency ?? 'PHP'

    const uniqueSuppliers = [...new Set(lineItems.map(l => l.catalog_item?.supplier?.name).filter(Boolean))]
    const isMultiVendor   = uniqueSuppliers.length > 1

    return (
        <AuthenticatedLayout header={`Purchase Order ${purchaseOrder?.po_number ?? ''}`}>
            <Head title={`Purchase Order ${purchaseOrder?.po_number ?? ''}`} />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500;600&display=swap');
                .po-page { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
                
                @keyframes cardIn {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .po-card-enter { animation: cardIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

                .po-action-btn {
                    display: inline-flex; align-items: center; gap: 6px;
                    padding: 8px 15px; border-radius: 8px; cursor: pointer;
                    font-size: 12px; font-weight: 500; border: 1px solid #d4dcd9;
                    background: #fff; color: #5a6e67; transition: all .15s;
                    font-family: inherit;
                }
                .po-action-btn:hover { border-color: #7a9189; color: #0d1514; background: #f7faf9; }
                .po-action-btn.primary {
                    background: #0d1514; color: #f7faf9; border-color: #0d1514;
                }
                .po-action-btn.primary:hover { background: #1d2421; }

                .multivendor-alert {
                    display: flex; align-items: flex-start; gap: 10px;
                    background: #fffbeb; border: 1px solid #fcd34d; border-radius: 10px;
                    padding: 14px 16px; margin-bottom: 8px;
                }

                .vendor-group-header {
                    display: flex; align-items: center; gap: 8px;
                    padding: 12px 0 10px;
                    margin-top: 8px;
                }

                .po-th {
                    font-size: 10px; font-weight: 600; color: #7a9189;
                    text-transform: uppercase; letter-spacing: 0.1em;
                    padding-bottom: 12px; border-bottom: 1px solid #cdd6d2;
                    font-family: 'DM Mono', monospace;
                }

                .po-watermark {
                    position: absolute; bottom: 40px; left: 40px;
                    font-size: 110px; font-weight: 800; color: rgba(13,21,20,0.02);
                    letter-spacing: -0.05em; pointer-events: none; user-select: none;
                    line-height: 1; font-family: "'DM Mono', monospace";
                }

                .po-table-wrapper {
                    width: 100%;
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                    margin-bottom: 20px;
                }
                .po-table-wrapper table { min-width: 540px; }

                @media (max-width: 640px) {
                    .po-wrapper-padding { padding: 16px 12px !important; }
                    .po-card-body { padding: 28px 20px !important; }
                    .po-header-block { flex-direction: column !important; align-items: flex-start !important; gap: 20px; }
                    .po-header-right { text-align: left !important; }
                    .po-meta-grid { gap: 18px !important; }
                    .po-footer-metrics { flex-direction: column-reverse !important; align-items: flex-start !important; gap: 24px; }
                    .po-footer-right { width: 100%; align-items: flex-start !important; }
                    .po-watermark { display: none; }
                }
            `}</style>

            <div className="po-page po-wrapper-padding" style={{ background: '#f4f6f5', minHeight: 'calc(100vh - 56px)', padding: '40px 24px' }}>
                <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

                    {/* ── Top Bar Controls ── */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                        <BackButton link="/purchase-orders" text="Back to Purchase Orders" />
                        <div style={{ display: 'flex', gap: 8 }}>
                            <button className="po-action-btn" onClick={() => window.print()}>
                                {Icons.print} Print Document
                            </button>
                            <button className="po-action-btn primary">
                                {Icons.download} Export PDF
                            </button>
                        </div>
                    </div>

                    {/* ── Multi-Vendor Warning ── */}
                    {isMultiVendor && (
                        <div className="multivendor-alert">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                                <path d="M8 1.5L14.5 13H1.5L8 1.5z" stroke="#92400e" strokeWidth="1.3" strokeLinejoin="round"/>
                                <path d="M8 6v3.5M8 11.5v.5" stroke="#92400e" strokeWidth="1.4" strokeLinecap="round"/>
                            </svg>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: '#78350f', marginBottom: 3 }}>
                                    Multi-Supplier Consolidations Notice
                                </div>
                                <div style={{ fontSize: 12, color: '#92400e', lineHeight: 1.5 }}>
                                    This order contains items belonging to <strong>{uniqueSuppliers.join(' and ')}</strong>. Splitting this record into discrete standalone purchase tracks is recommended to avoid invoicing and receipt matching delays.
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Main Document Card ── */}
                    <div
                        className="po-card-enter po-card-body"
                        style={{
                            background: '#ffffff', border: '1px solid #dce3e0',
                            borderRadius: 12, padding: '44px 48px',
                            position: 'relative', overflow: 'hidden',
                            boxShadow: '0 4px 20px -2px rgba(13,21,20,0.02)'
                        }}
                    >
                        <div className="po-watermark">ARCHIVE</div>

                        {/* ── Document Header: Top Left Brand Accent Overhaul ── */}
                        <div className="po-header-block" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{
                                    fontSize: 9, fontWeight: 600, color: '#7a9189',
                                    textTransform: 'uppercase', letterSpacing: '0.14em',
                                    fontFamily: "'DM Mono', monospace", marginBottom: 3
                                }}>
                                    Issuing Entity
                                </span>
                                <div style={{ fontSize: 19, fontWeight: 700, color: '#0d1514', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                                    {companyName}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6 }}>
                                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#00c488' }} />
                                    <span style={{ 
                                        fontSize: 11, fontWeight: 500, color: '#5a6e67', 
                                        fontFamily: "'DM Mono', monospace", letterSpacing: '0.02em' 
                                    }}>
                                        StockVantage Workspace
                                    </span>
                                </div>
                            </div>

                            <div className="po-header-right" style={{ textAlign: 'right' }}>
                                <div style={{
                                    fontSize: 9, fontWeight: 600, color: '#7a9189',
                                    textTransform: 'uppercase', letterSpacing: '0.12em',
                                    fontFamily: "'DM Mono', monospace", marginBottom: 4
                                }}>
                                    Document Registry
                                </div>
                                <div style={{
                                    fontFamily: "'DM Mono', monospace", fontSize: 22, fontWeight: 600,
                                    color: '#0d1514', letterSpacing: '0.01em', lineHeight: 1
                                }}>
                                    {purchaseOrder?.po_number}
                                </div>
                            </div>
                        </div>

                        <div style={{ height: 1, background: '#eef3f1', margin: '24px 0 24px' }} />

                        {/* ── Metadata Fluid Grid ── */}
                        <div className="po-meta-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginBottom: 32 }}>
                            <MetaBlock label="Vendor Designation" value={isMultiVendor ? `${uniqueSuppliers.length} Consolidated Suppliers` : supplierName} />
                            <MetaBlock label="Date of Issuance" value={formatDate(purchaseOrder?.created_at)} />
                            <MetaBlock label="Payment Terms" value={termsCondition} />
                        </div>

                        {/* ── Line Items Layout ── */}
                        {isMultiVendor ? (
                            <>
                                {uniqueSuppliers.map((supplier, si) => {
                                    const supplierItems = lineItems.filter(l => l.catalog_item?.supplier?.name === supplier)
                                    const supplierTotal = supplierItems.reduce((sum, item) => sum + ((item.unit_cost ?? 0) * (item.quantity ?? 0)), 0)
                                    return (
                                        <div key={supplier} style={{ marginBottom: si < uniqueSuppliers.length - 1 ? 28 : 0 }}>
                                            <div className="vendor-group-header" style={{ flexWrap: 'wrap', gap: 8 }}>
                                                <div style={{
                                                    display: 'flex', alignItems: 'center', gap: 6,
                                                    padding: '5px 11px', background: '#f7faf9',
                                                    borderRadius: 6, border: '1px solid #dce3e0'
                                                }}>
                                                    {Icons.building}
                                                    <span style={{ fontSize: 11, fontWeight: 600, color: '#0d1514' }}>
                                                        {supplier}
                                                    </span>
                                                </div>
                                                <div style={{ flex: '1 1 20px', height: 1, background: '#eef3f1', minWidth: '10px' }} />
                                                <span style={{ fontSize: 11, color: '#7a9189', fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>
                                                    {supplierItems.length} split parcel{supplierItems.length !== 1 ? 's' : ''} &nbsp;·&nbsp; {formatCurrency(supplierTotal, currency)}
                                                </span>
                                            </div>

                                            <div className="po-table-wrapper">
                                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                    <thead>
                                                        <tr>
                                                            <th className="po-th" style={{ textAlign: 'left', width: '52%' }}>Item Nomenclature</th>
                                                            <th className="po-th" style={{ textAlign: 'center', width: '10%' }}>Qty</th>
                                                            <th className="po-th" style={{ textAlign: 'right', width: '18%' }}>Unit Valuation</th>
                                                            <th className="po-th" style={{ textAlign: 'right', width: '20%' }}>Gross Value</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {supplierItems.map((item, i) => (
                                                            <LineRow key={i} item={item} isLast={i === supplierItems.length - 1} currency={currency} />
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                        ) : (
                            <div className="po-table-wrapper">
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr>
                                            <th className="po-th" style={{ textAlign: 'left', width: '52%' }}>Item Nomenclature</th>
                                            <th className="po-th" style={{ textAlign: 'center', width: '10%' }}>Qty</th>
                                            <th className="po-th" style={{ textAlign: 'right', width: '18%' }}>Unit Valuation</th>
                                            <th className="po-th" style={{ textAlign: 'right', width: '20%' }}>Gross Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lineItems.map((item, i) => (
                                            <LineRow key={i} item={item} isLast={i === lineItems.length - 1} currency={currency} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* ── Bold Total Highlight Rule ── */}
                        <div style={{ height: 2, background: '#0d1514', margin: '20px 0 24px', borderRadius: 2 }} />

                        {/* ── Document Footer Metrics & Sign-Off Area ── */}
                        <div className="po-footer-metrics" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
                            <div style={{
                                display: 'inline-flex', alignTilt: 'center', gap: 7,
                                padding: '7px 15px', borderRadius: 100,
                                background: status.bg, color: status.color,
                                border: `1px solid ${status.border}`,
                                fontSize: 12, fontWeight: 600,
                            }}>
                                {status.icon}
                                {status.label}
                            </div>

                            {/* Balanced Internal Document Validation block */}
                            <div className="po-footer-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                                <span style={{
                                    fontSize: 9, fontWeight: 600, color: '#7a9189',
                                    textTransform: 'uppercase', letterSpacing: '0.12em',
                                    fontFamily: "'DM Mono', monospace"
                                }}>
                                    Aggregated Remittance Total
                                </span>
                                <div style={{
                                    fontFamily: "'DM Mono', monospace", fontSize: 26,
                                    fontWeight: 600, color: '#0d1514', letterSpacing: '-0.02em',
                                    lineHeight: 1.1
                                }}>
                                    {formatCurrency(purchaseOrder?.total_amount, currency)}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}