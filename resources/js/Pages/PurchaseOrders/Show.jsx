import { Head, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import BackButton from '@/Components/BackButton'

// Unified Light Mode Visual System Tokens (Matched perfectly with your template)
const C = {
    bg: '#ffffff',
    surface: '#ffffff',
    surfaceLow: '#ffffff',
    surfaceHigh: '#f8fafc',    // Used for table headers & detail panel wrappers
    outline: '#e2e8f0',
    borderInput: '#cbd5e1',
    primary: '#17aa54',        // Brand green color
    primaryHover: '#1a8f4b',
    primaryFocus: '#00C488',
    onPrimary: '#ffffff',
    textMain: '#0f172a',       // High-contrast main headings
    textMuted: '#64748b',      // Subdued description / cell value layout
    textLabel: '#475569',      // Clean structural section subtitles
    textSection: '#94a3b8',    // Muted structural descriptors
    error: '#dc2626',          // Accessible destructive alert indicator 
    errorBg: '#fef2f2',
    errorBorder: '#fca5a5',
    tertiary: '#b45309',       // Clean high-contrast amber for badge states
    secondary: '#4338ca',      // Indigo token for decorative structural identifiers (IDs)
}

const STATUS_CONFIG = {
    open: {
        label: 'Open', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe',
    },
    partially_received: {
        label: 'Partially Received', color: C.tertiary, bg: '#fffbeb', border: '#fef3c7',
    },
    fully_received: {
        label: 'Fully Received', color: C.primary, bg: '#f0fdf4', border: '#bbf7d0',
    },
    cancelled: {
        label: 'Cancelled', color: C.error, bg: C.errorBg, border: C.errorBorder,
    },
}

function StatusBadge({ status }) {
    const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.open
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 11, fontWeight: 700, padding: '4px 12px',
            borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.05em',
            background: config.bg, color: config.color, border: `1px solid ${config.border}`,
        }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
            {config.label}
        </span>
    )
}

function formatCurrency(value) {
    return '₱' + parseFloat(value).toLocaleString('en-PH', {
        minimumFractionDigits: 2, maximumFractionDigits: 2,
    })
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-PH', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
    })
}

function formatPrId(id) {
    return 'PR-' + String(id).padStart(4, '0')
}

export default function Show({ purchaseOrder }) {
    const pr = purchaseOrder.purchase_request

    return (
        <AuthenticatedLayout header={purchaseOrder.po_number}>
            <Head title={`Purchase Order ${purchaseOrder.po_number}`} />

            <style>{`
                /* Unified structural layout card frames override global defaults */
                .po-card {
                    background: ${C.surface} !important; 
                    border: 1px solid ${C.outline} !important;
                    border-radius: 12px !important; 
                    overflow: hidden !important;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05) !important;
                }
                .po-card-pad { padding: 24px 28px !important; }
                
                .po-meta-grid {
                    display: grid; 
                    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
                    gap: 20px;
                }
                .po-meta-item { display: flex; flex-direction: column; gap: 4px; }
                
                /* High-visibility uppercase labels metadata fields */
                .po-meta-label {
                    font-size: 11px !important; 
                    font-weight: 700 !important; 
                    color: ${C.textLabel} !important;
                    text-transform: uppercase; 
                    letter-spacing: 0.05em;
                }
                .po-meta-value { font-size: 14px !important; font-weight: 500 !important; color: ${C.textMain} !important; }
                
                /* Crisp custom data table architecture specifications */
                .po-table { width: 100% !important; border-collapse: collapse !important; }
                .po-table th {
                    text-align: left !important; 
                    padding: 12px 20px !important;
                    font-size: 11px !important; 
                    font-weight: 700 !important; 
                    color: ${C.textLabel} !important;
                    text-transform: uppercase; 
                    letter-spacing: 0.05em;
                    border-bottom: 1px solid ${C.outline} !important;
                    background: ${C.surfaceHigh} !important;
                }
                .po-table td {
                    padding: 14px 20px !important; 
                    color: ${C.textMuted} !important;
                    border-bottom: 1px solid ${C.outline} !important; 
                    font-size: 13.5px !important;
                }
                .po-table tbody tr:last-child td { border-bottom: none !important; }
                .po-table tbody tr:hover td { background: ${C.surfaceHigh}50 !important; }
                
                .po-table tfoot td {
                    padding: 16px 20px !important; 
                    border-top: 2px solid ${C.outline} !important;
                    background: ${C.surfaceHigh} !important;
                }
                
                /* Light Theme Primary Outline Back Navigation Component link */
                
                
                /* Clear structural context badges for code identifiers text styling mapping */
                .po-sku {
                    font-family: 'Courier New', monospace; font-size: 11.5px; font-weight: 700;
                    color: ${C.tertiary}; background: #fffbeb;
                    border: 1px solid #fef3c7; padding: 2px 6px; border-radius: 4px;
                }
                .po-section-title {
                    font-size: 11.5px !important; font-weight: 700 !important; color: ${C.textLabel} !important;
                    text-transform: uppercase; letter-spacing: 0.05em;
                }

                @media (max-width: 600px) {
                    .po-card-pad { padding: 18px 16px !important; }
                    .po-meta-grid { grid-template-columns: 1fr 1fr; }
                }
            `}</style>

            
            <BackButton link={"/purchase-orders"} text={"Back to Purchase Orders"} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 860 }}>

                {/* Main Purchase Order Header Segment Card */}
                <div className="po-card">
                    <div className="po-card-pad">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                            <div>
                                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 13, fontWeight: 700, color: C.secondary, marginBottom: 4 }}>
                                    {purchaseOrder.po_number}
                                </div>
                                <div style={{ fontSize: 22, fontWeight: 700, color: C.textMain }}>
                                    {formatCurrency(purchaseOrder.total_amount)}
                                </div>
                            </div>
                            <StatusBadge status={purchaseOrder.status} />
                        </div>

                        {/* Order Metadata Metadata System Attributes Information Block */}
                        <div className="po-meta-grid">
                            <div className="po-meta-item">
                                <span className="po-meta-label">Requested By</span>
                                <span className="po-meta-value">{pr?.requester?.name ?? '—'}</span>
                            </div>
                            <div className="po-meta-item">
                                <span className="po-meta-label">Linked PR</span>
                                <div style={{ marginTop: 2 }}>
                                    <Link
                                        href={`/purchase-requests/${pr?.id}`}
                                        style={{
                                            fontFamily: "'Courier New', monospace",
                                            fontSize: 12, fontWeight: 700,
                                            color: C.secondary,
                                            background: '#e0e7ff',
                                            border: '1px solid #c7d2fe',
                                            padding: '3px 8px', borderRadius: 4,
                                            textDecoration: 'none', display: 'inline-flex',
                                            transition: 'all 0.15s',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.background = '#c7d2fe';
                                            e.target.style.color = '#312e81';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.background = '#e0e7ff';
                                            e.target.style.color = C.secondary;
                                        }}
                                    >
                                        {formatPrId(pr?.id)}
                                    </Link>
                                </div>
                            </div>
                            <div className="po-meta-item">
                                <span className="po-meta-label">Date Created</span>
                                <span className="po-meta-value">{formatDate(purchaseOrder.created_at)}</span>
                            </div>
                            <div className="po-meta-item">
                                <span className="po-meta-label">PR Status</span>
                                <span className="po-meta-value" style={{ textTransform: 'capitalize' }}>
                                    {pr?.status?.replace(/_/g, ' ') ?? '—'}
                                </span>
                            </div>
                        </div>

                        {/* Justification Field Text Wrapper */}
                        {pr?.justification && (
                            <div style={{
                                marginTop: 24, padding: '16px 18px',
                                background: C.surfaceHigh, borderRadius: 8,
                                border: `1px solid ${C.outline}`,
                            }}>
                                <div className="po-section-title" style={{ marginBottom: 8 }}>Justification</div>
                                <p style={{ fontSize: 14, color: C.textMain, lineHeight: 1.6, margin: 0 }}>
                                    {pr.justification}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Line Items Functional Matrix Table Card Block */}
                <div className="po-card">
                    <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.outline}`, background: '#ffffff' }}>
                        <span className="po-section-title">Line Items</span>
                    </div>
                    <table className="po-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>SKU</th>
                                <th style={{ textAlign: 'right' }}>Unit Cost</th>
                                <th style={{ textAlign: 'right' }}>Qty</th>
                                <th style={{ textAlign: 'right' }}>Line Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pr?.line_items?.map((line, i) => (
                                <tr key={i}>
                                    <td>
                                        <span style={{ fontWeight: 600, color: C.textMain }}>
                                            {line.catalog_item?.name ?? '—'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="po-sku">
                                            {line.catalog_item?.sku ?? '—'}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'right', color: C.textMain }}>
                                        {formatCurrency(line.unit_cost)}
                                    </td>
                                    <td style={{ textAlign: 'right', fontWeight: 600, color: C.textMain }}>
                                        {line.quantity}
                                    </td>
                                    <td style={{ textAlign: 'right', fontWeight: 600, color: C.textMain }}>
                                        {formatCurrency(line.line_total)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4} style={{ fontWeight: 700, color: C.textLabel, fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Total Amount
                                </td>
                                <td style={{ textAlign: 'right', fontWeight: 700, fontSize: 16, color: C.textMain }}>
                                    {formatCurrency(purchaseOrder.total_amount)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

            </div>
        </AuthenticatedLayout>
    )
}