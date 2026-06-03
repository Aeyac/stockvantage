<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Purchase Order - {{ $purchaseOrder->po_number }}</title>
    <style>
        @page {
            margin: 0px;
        }

        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 11px;
            color: #0d1514;
            line-height: 1.4;
            background: #ffffff;
            margin: 0;
            padding: 0;
        }

        .page {
            padding: 45px;
            position: relative;
        }

        /* Layout Grid via Table Structure */
        .grid-layout {
            width: 100%;
            border-collapse: collapse;
            border: none;
            margin: 0;
            padding: 0;
        }

        .grid-layout td {
            padding: 0;
            border: none;
            vertical-align: top;
        }

        /* Header Area Structure */
        .header-container {
            margin-bottom: 30px;
            border-bottom: 2px solid #007a55;
            padding-bottom: 16px;
        }

        .company-name {
            font-size: 20px;
            font-weight: 700;
            color: #0d1514;
            letter-spacing: -0.02em;
            line-height: 1.1;
        }

        .system-subtitle {
            color: #7a9189;
            font-size: 10px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-top: 4px;
        }

        .po-title-label {
            font-size: 9px;
            color: #7a9189;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-weight: 600;
            margin-bottom: 2px;
        }

        .po-number {
            font-size: 20px;
            font-weight: 600;
            color: #007a55;
            font-family: monospace;
            line-height: 1;
        }

        /* Status Badge */
        .status-wrapper {
            margin-top: 6px;
        }

        .badge {
            display: inline-block;
            padding: 3px 9px;
            border-radius: 4px;
            font-size: 9px;
            font-weight: 600;
            letter-spacing: 0.04em;
            background: #e8f7f0;
            color: #007a55;
            border: 1px solid #b3e8d0;
        }

        .badge-awaiting {
            background: #fef3c7;
            color: #92400e;
            border: 1px solid #fcd34d;
        }

        /* Metadata Container Block */
        .meta-container {
            margin-bottom: 30px;
            background: #f7faf9;
            border: 1px solid #eef3f1;
            border-radius: 6px;
            padding: 14px 16px;
        }

        .meta-item label {
            font-size: 9px;
            color: #7a9189;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            display: block;
            margin-bottom: 4px;
        }

        .meta-item span {
            font-size: 12px;
            font-weight: 600;
            color: #0d1514;
        }

        .supplier-highlight {
            color: #007a55 !important;
            font-size: 13px;
        }

        /* Justification Box Matching Your Uploaded Design Elements */
        .justification-box {
            margin-bottom: 32px;
            padding: 14px 18px;
            background: #f4f6f5;
            border-radius: 6px;
        }

        .justification-title {
            font-size: 10px;
            color: #7a9189;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-weight: 600;
            margin-bottom: 6px;
        }

        .justification-text {
            font-size: 13px;
            color: #0d1514;
            font-weight: 600;
        }

        /* Cleaned Line Items Table (Matches Your Screenshot Layout) */
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
        }

        .items-table th {
            text-align: left;
            padding: 12px 10px;
            font-size: 10px;
            font-weight: 600;
            color: #7a9189;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            border-bottom: 1px solid #d4dcd9;
        }

        .items-table td {
            padding: 16px 10px;
            border-bottom: 1px solid #eef3f1;
            font-size: 13px;
            vertical-align: middle;
        }

        .sku-text {
            color: #007a55;
            font-weight: 500;
        }

        .item-desc-text {
            font-weight: 600;
            color: #0d1514;
        }

        .text-right {
            text-align: right;
        }

        .text-center {
            text-align: center;
        }

        /* Image-Accurate Total Highlight Segment Row */
        .total-row td {
            font-weight: 700;
            font-size: 13px;
            border-bottom: none;
            padding: 18px 10px;
            color: #0d1514;
        }

        .total-label {
            font-size: 14px;
            font-weight: 700;
        }

        .total-price {
            font-size: 15px;
            font-weight: 700;
        }

        /* Footer Element */
        .footer {
            border-top: 1px solid #eef3f1;
            padding-top: 16px;
            font-size: 11px;
            color: #7a9189;
            text-align: center;
            margin-top: 40px;
        }
    </style>
</head>

<body>
    @php
        $firstItem = $purchaseOrder->purchaseRequest->lineItems->first();
        $supplierName = $firstItem?->catalogItem?->supplier?->name ?? 'Direct Allocation Vendor';
    @endphp

    <div class="page">

        {{-- Header Information Grid --}}
        <div class="header-container">
            <table class="grid-layout">
                <tr>
                    <td>
                        <div class="company-name">{{ $companyName }}</div>
                        <div class="system-subtitle">StockVantage Procurement Network</div>
                    </td>
                    <td class="text-right" style="width: 250px;">
                        <div class="po-title-label">Purchase Order Registry</div>
                        <div class="po-number">{{ $purchaseOrder->po_number }}</div>
                        <div class="status-wrapper">
                            <span class="badge {{ $purchaseOrder->status === 'awaiting' ? 'badge-awaiting' : '' }}">
                                {{ strtoupper(str_replace('_', ' ', $purchaseOrder->status)) }}
                            </span>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        {{-- Meta Parameters Row --}}
        <div class="meta-container">
            <table class="grid-layout">
                <tr>
                    <td class="meta-item" style="width: 35%;">
                        <label>Vendor / Supplier</label>
                        <span class="supplier-highlight">{{ $supplierName }}</span>
                    </td>
                    <td class="meta-item" style="width: 22%;">
                        <label>Date Issued</label>
                        <span>{{ $purchaseOrder->created_at->format('M d, Y') }}</span>
                    </td>
                    <td class="meta-item" style="width: 23%;">
                        <label>Procured By</label>
                        <span>{{ $purchaseOrder->purchaseRequest->requester->name }}</span>
                    </td>
                    <td class="meta-item text-right" style="width: 20%;">
                        <label>Tracking Ref</label>
                        <span>PR-{{ str_pad($purchaseOrder->pr_id, 4, '0', STR_PAD_LEFT) }}</span>
                    </td>
                </tr>
            </table>
        </div>

        {{-- Justification Box Segment --}}
        @if($purchaseOrder->purchaseRequest->justification)
            <div class="justification-box">
                <div class="justification-title">Justification</div>
                <div class="justification-text">
                    {{ $purchaseOrder->purchaseRequest->justification }}
                </div>
            </div>
        @endif

        {{-- Line Items Table Ledger --}}
        <table class="items-table">
            <thead>
                <tr>
                    <th style="width: 15%;">Sku</th>
                    <th style="width: 45%;">Item Description</th>
                    <th class="text-right" style="width: 15%;">Unit Cost</th>
                    <th class="text-center" style="width: 10%;">Qty</th>
                    <th class="text-right" style="width: 15%;">Line Total</th>
                </tr>
            </thead>
            <tbody>
                @foreach($purchaseOrder->purchaseRequest->lineItems as $line)
                    <tr>
                        <td class="sku-text">
                            {{ $line->catalogItem->sku ?? '—' }}
                        </td>
                        <td class="item-desc-text">
                            {{ $line->catalogItem->name ?? 'Unknown Item' }}
                        </td>
                        <td class="text-right">
                            &#8369;{{ number_format($line->unit_cost, 2) }}
                        </td>
                        <td class="text-center" style="font-weight: 600;">
                            {{ $line->quantity }}
                        </td>
                        <td class="text-right" style="font-weight: 700;">
                            &#8369;{{ number_format(($line->unit_cost * $line->quantity), 2) }}
                        </td>
                    </tr>
                @endforeach

                {{-- Image-Accurate Total Calculation Row --}}
                <tr class="total-row">
                    <td colspan="3"></td>
                    <td class="text-right total-label">Total Amount</td>
                    <td class="text-right total-price">
                        &#8369;{{ number_format($purchaseOrder->total_amount, 2) }}
                    </td>
                </tr>
            </tbody>
        </table>

        {{-- Image-Accurate Footer Metrics Bar --}}
        <div class="footer">
            Generated by StockVantage on {{ $purchaseOrder->created_at->format('F d, Y \a\t h:i A') }} &nbsp;·&nbsp;
            {{ $purchaseOrder->po_number }}
        </div>

    </div>
</body>

</html>