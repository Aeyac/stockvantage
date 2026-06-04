<!DOCTYPE html>
<html>

<head>
    <style>
        body {
            font-family: sans-serif;
            color: #0d1514;
            line-height: 1.5;
        }

        .container {
            padding: 20px;
            max-width: 600px;
        }

        .footer {
            margin-top: 30px;
            font-size: 11px;
            color: #7a9189;
        }
    </style>
</head>

<body>
    <div class="container">
        <p>Dear Supply Partner,</p>

        <p>Please find attached our formal <strong>Purchase Order ({{ $purchaseOrder->po_number }})</strong> issued by
            {{ $companyName }}.
        </p>

        <p><strong>Order Details Summary:</strong></p>
        <ul>
            <li><strong>Total Transacted Value:</strong> ₱{{ number_format($purchaseOrder->total_amount, 2) }}</li>
            <li><strong>Issuance Date:</strong> {{ $purchaseOrder->created_at->format('M d, Y') }}</li>
        </ul>

        <p>Kindly acknowledge receipt of this message and confirm the estimated delivery schedule for fulfillment
            tracking.</p>

        <p>Best regards,<br>
            <strong>{{ $purchaseOrder->purchaseRequest->requester->name }}</strong><br>
            Procurement Division // {{ $companyName }}
        </p>

        <div class="footer">
            This is an automated transmission secure record processed via StockVantage Systems.
        </div>
    </div>
</body>

</html>