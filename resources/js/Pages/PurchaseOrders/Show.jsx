import React from 'react'
import { Head, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import BackButton from '@/Components/BackButton'
import { formatCurrency } from '@/hooks/useCurrency'

// ─── ICONS ────────────────────────────────────────────────────────────────
const Icons = {
    check: (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="6.5" cy="6.5" r="6" stroke="currentColor" strokeWidth="1.2" />
            <path d="M4 6.5l2 2 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    clock: (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="6.5" cy="6.5" r="6" stroke="currentColor" strokeWidth="1.2" />
            <path d="M6.5 3.5v3l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
    ),
    print: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="3" y="1" width="8" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
            <path d="M3 6H1.5A.5.5 0 001 6.5v4a.5.5 0 00.5.5H3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M11 6h1.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <rect x="3" y="8" width="8" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
            <path d="M5 10.5h4M5 12h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="11" cy="8" r="0.75" fill="currentColor" />
        </svg>
    ),
    download: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 11h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
    ),
    building: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="2" y="2" width="10" height="11" rx="1" stroke="currentColor" strokeWidth="1.2" />
            <path d="M5 5h1M8 5h1M5 8h1M8 8h1M5.5 13v-3h3v3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
    ),
    hash: (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4h8M2 8h8M4.5 1.5l-1 9M8.5 1.5l-1 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
    ),
}

// ─── STATUS CONFIG ────────────────────────────────────────────────────────
const STATUS = {
    auto_approved: { label: 'Auto-Approved', icon: Icons.check, bg: '#e8f7f0', color: '#007a55', border: '#b3e8d0' },
    awaiting: { label: 'Awaiting Approval', icon: Icons.clock, bg: '#fef3c7', color: '#92400e', border: '#fcd34d' },
    approved: { label: 'Manager Approved', icon: Icons.check, bg: '#dbeafe', color: '#1e40af', border: '#93c5fd' },
    partially_received: { label: 'Partially Received', icon: Icons.clock, bg: '#fee2e2', color: '#991b1b', border: '#fca5a5' },
}

// ─── HELPER FORMAT DATE ───────────────────────────────────────────────────
const formatDate = d => d
    ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—'

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────
function MetaBlock({ label, value, mono }) {
    return (
        <div>
            <div style={{
                fontSize: 10, fontWeight: 600, color: '#7a9189',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                marginBottom: 5, fontFamily: "'DM Mono', monospace"
            }}>{label}</div>
            <div style={{
                fontSize: 13.5, fontWeight: 600, color: '#0d1514',
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
            onMouseLeave={() => setHovered(false)}
            style={{ background: hovered ? '#f7faf9' : 'transparent', transition: 'background .12s' }}
        >
            <td style={{ padding: '11px 0', borderBottom: isLast ? 'none' : '1px solid #eef3f1' }}>
                <div style={{ fontWeight: 500, fontSize: 13.5, color: '#0d1514' }}>{item.catalog_item?.name ?? '—'}</div>
                {item.catalog_item?.sku && (
                    <div style={{ fontSize: 11, color: '#7a9189', fontFamily: "'DM Mono', monospace", marginTop: 2 }}>
                        SKU: {item.catalog_item.sku}
                    </div>
                )}
            </td>
            <td style={{ textAlign: 'center', padding: '11px 16px', borderBottom: isLast ? 'none' : '1px solid #eef3f1', fontSize: 13.5, color: '#0d1514', fontWeight: 500 }}>
                {item.quantity}
            </td>
            <td style={{ textAlign: 'right', padding: '11px 16px', borderBottom: isLast ? 'none' : '1px solid #eef3f1', fontSize: 13.5, color: '#5a6e67', fontFamily: "'DM Mono', monospace" }}>
                {formatCurrency(item.unit_cost, currency)}
            </td>
            <td style={{ textAlign: 'right', padding: '11px 0 11px 16px', borderBottom: isLast ? 'none' : '1px solid #eef3f1', fontSize: 13.5, fontWeight: 600, color: '#0d1514', fontFamily: "'DM Mono', monospace" }}>
                {formatCurrency(lineTotal, currency)}
            </td>
        </tr>
    )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export default function Show({ purchaseOrder }) {
    const pr = purchaseOrder?.purchase_request
    const lineItems = pr?.line_items ?? []
    const supplierName = lineItems[0]?.catalog_item?.supplier?.name ?? 'Unknown Vendor'
    const termsCondition = purchaseOrder?.terms ?? 'Net 30 Account Balances'
    const statusKey = purchaseOrder?.status ?? 'auto_approved'
    const status = STATUS[statusKey] ?? STATUS.auto_approved
    const currency = purchaseOrder?.currency ?? 'PHP'


    // Detect if line items span multiple suppliers
    const uniqueSuppliers = [...new Set(lineItems.map(l => l.catalog_item?.supplier?.name).filter(Boolean))]
    const isMultiVendor = uniqueSuppliers.length > 1

    return (
        <AuthenticatedLayout header={`Purchase Order ${purchaseOrder?.po_number ?? ''}`}>
            <Head title={`Purchase Order ${purchaseOrder?.po_number ?? ''}`} />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&display=swap');
                .po-page { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
                
                @keyframes cardIn {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .po-card-enter { animation: cardIn 0.35s ease forwards; }

                .po-action-btn {
                    display: inline-flex; align-items: center; gap: 6px;
                    padding: 7px 14px; border-radius: 8px; cursor: pointer;
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
                    padding: 12px 16px; margin-bottom: 20px;
                }

                .vendor-group-header {
                    display: flex; align-items: center; gap: 8px;
                    padding: 8px 0 10px;
                    margin-top: 4px;
                }

                .po-th {
                    font-size: 10px; font-weight: 600; color: #7a9189;
                    text-transform: uppercase; letter-spacing: 0.09em;
                    padding-bottom: 10px; border-bottom: 1px solid #d4dcd9;
                    font-family: 'DM Mono', monospace;
                }

                .po-watermark {
                    position: absolute; bottom: 36px; right: 40px;
                    font-size: 70px; font-weight: 800; color: rgba(0,196,136,0.045);
                    letter-spacing: -0.04em; pointer-events: none; user-select: none;
                    line-height: 1;
                }
            `}</style>

            <div className="po-page" style={{ background: '#f2f5f4', minHeight: 'calc(100vh - 56px)', padding: '36px 24px' }}>
                <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

                    {/* ── Top Bar Controls ── */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                        <BackButton link="/purchase-orders" text="Back to Purchase Orders" />
                        <div style={{ display: 'flex', gap: 8 }}>
                            <button className="po-action-btn" onClick={() => window.print()}>
                                {Icons.print} Print
                            </button>
                            <a className="po-action-btn primary" href={`/purchase-orders/${purchaseOrder.id}/export-pdf`} >
                                {Icons.download} Download PDF
                            </a>
                        </div>
                    </div>

                    {/* ── Architectural Check: Multi-Vendor Warning ── */}
                    {isMultiVendor && (
                        <div className="multivendor-alert">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                                <path d="M8 1.5L14.5 13H1.5L8 1.5z" stroke="#92400e" strokeWidth="1.3" strokeLinejoin="round" />
                                <path d="M8 6v3.5M8 11.5v.5" stroke="#92400e" strokeWidth="1.4" strokeLinecap="round" />
                            </svg>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: '#78350f', marginBottom: 3 }}>
                                    Multiple suppliers detected on this PO
                                </div>
                                <div style={{ fontSize: 12, color: '#92400e', lineHeight: 1.5 }}>
                                    This PO contains items from <strong>{uniqueSuppliers.join(' and ')}</strong>. Enterprise procurement standards require one PO per supplier. Consider splitting into {uniqueSuppliers.length} separate POs to enable accurate GRN matching and vendor-specific dispatch.
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Main Clean-Contract Document Card ── */}
                    <div
                        className="po-card-enter"
                        style={{
                            background: '#ffffff', border: '1px solid #dce3e0',
                            borderRadius: 16, padding: '36px 40px',
                            position: 'relative', overflow: 'hidden',
                        }}
                    >
                        <div className="po-watermark">PO</div>

                        {/* ── Document Header ── */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{
                                        width: 28, height: 28, borderRadius: 7,
                                        background: '#0d1514', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                            <path d="M2 9L6.5 3 11 9" stroke="#00c488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                            <circle cx="6.5" cy="3" r="1.2" fill="#00c488" />
                                        </svg>
                                    </div>
                                    <span style={{ fontSize: 15, fontWeight: 700, color: '#0d1514', letterSpacing: '-0.01em' }}>
                                        StockVantage Procurement
                                    </span>
                                </div>
                                <div style={{ fontSize: 11, color: '#7a9189', fontFamily: "'DM Mono', monospace", letterSpacing: '0.04em', paddingLeft: 36 }}>
                                    System Verification Workspace
                                </div>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <div style={{
                                    fontSize: 9, fontWeight: 600, color: '#7a9189',
                                    textTransform: 'uppercase', letterSpacing: '0.12em',
                                    fontFamily: "'DM Mono', monospace", marginBottom: 4
                                }}>
                                    Purchase Order
                                </div>
                                <div style={{
                                    fontFamily: "'DM Mono', monospace", fontSize: 21, fontWeight: 500,
                                    color: '#007a55', letterSpacing: '0.02em', lineHeight: 1
                                }}>
                                    {purchaseOrder?.po_number}
                                </div>
                            </div>
                        </div>

                        <div style={{ height: 2, background: '#0d1514', margin: '16px 0 24px', borderRadius: 2 }} />

                        {/* ── Metadata Sub-grid ── */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 24, marginBottom: 28 }}>
                            <MetaBlock label="Vendor" value={isMultiVendor ? `${uniqueSuppliers.length} Suppliers` : supplierName} />
                            <MetaBlock label="Date Issued" value={formatDate(purchaseOrder?.created_at)} />
                            <MetaBlock label="Terms" value={termsCondition} />
                        </div>

                        {/* ── Line Items Presentation Layout ── */}
                        {isMultiVendor ? (
                            <>
                                {uniqueSuppliers.map((supplier, si) => {
                                    const supplierItems = lineItems.filter(l => l.catalog_item?.supplier?.name === supplier)
                                    const supplierTotal = supplierItems.reduce((sum, item) => sum + ((item.unit_cost ?? 0) * (item.quantity ?? 0)), 0)
                                    return (
                                        <div key={supplier} style={{ marginBottom: si < uniqueSuppliers.length - 1 ? 24 : 0 }}>
                                            <div className="vendor-group-header">
                                                <div style={{
                                                    display: 'flex', alignItems: 'center', gap: 6,
                                                    padding: '4px 10px', background: '#f2f5f4',
                                                    borderRadius: 6, border: '1px solid #dce3e0'
                                                }}>
                                                    {Icons.building}
                                                    <span style={{ fontSize: 11, fontWeight: 600, color: '#0d1514' }}>
                                                        {supplier}
                                                    </span>
                                                </div>
                                                <div style={{ flex: 1, height: 1, background: '#eef3f1' }} />
                                                <span style={{ fontSize: 11, color: '#7a9189', fontFamily: "'DM Mono', monospace" }}>
                                                    {supplierItems.length} item{supplierItems.length !== 1 ? 's' : ''} &nbsp;·&nbsp; {formatCurrency(supplierTotal, currency)}
                                                </span>
                                            </div>

                                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                <thead>
                                                    <tr>
                                                        <th className="po-th" style={{ textAlign: 'left', width: '55%' }}>Item</th>
                                                        <th className="po-th" style={{ textAlign: 'center', width: '10%' }}>Qty</th>
                                                        <th className="po-th" style={{ textAlign: 'right', width: '18%' }}>Unit Price</th>
                                                        <th className="po-th" style={{ textAlign: 'right', width: '17%' }}>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {supplierItems.map((item, i) => (
                                                        <LineRow key={i} item={item} isLast={i === supplierItems.length - 1} currency={currency} />
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )
                                })}
                            </>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th className="po-th" style={{ textAlign: 'left', width: '55%' }}>Item Description</th>
                                        <th className="po-th" style={{ textAlign: 'center', width: '10%' }}>Qty</th>
                                        <th className="po-th" style={{ textAlign: 'right', width: '18%' }}>Unit Price</th>
                                        <th className="po-th" style={{ textAlign: 'right', width: '17%' }}>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lineItems.map((item, i) => (
                                        <LineRow key={i} item={item} isLast={i === lineItems.length - 1} currency={currency} />
                                    ))}
                                </tbody>
                            </table>
                        )}

                        <div style={{ height: 1, background: '#0d1514', margin: '16px 0 18px', borderRadius: 1 }} />

                        {/* ── Document Footer Metrics ── */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 7,
                                padding: '7px 14px', borderRadius: 100,
                                background: status.bg, color: status.color,
                                border: `1px solid ${status.border}`,
                                fontSize: 12, fontWeight: 600,
                            }}>
                                {status.icon}
                                {status.label}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                <div style={{
                                    fontFamily: "'DM Mono', monospace", fontSize: 24,
                                    fontWeight: 500, color: '#0d1514', letterSpacing: '0.01em'
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