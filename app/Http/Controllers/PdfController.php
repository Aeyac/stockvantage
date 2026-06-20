<?php

namespace App\Http\Controllers;

use App\Models\PurchaseOrder;
use App\Models\TenantSetting;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class PdfController extends Controller
{

    public function exportPurchaseOrder(PurchaseOrder $purchaseOrder)
    {

        $purchaseOrder->load(
            'purchaseRequest.lineItems.catalogItem',
            'purchaseRequest.lineItems.catalogItem.supplier:id,name',
            'purchaseRequest.requester',
        );

        $companyName = TenantSetting::where('id', auth()->user()->tenant_id)->value('company_name');

        $pdf = Pdf::loadView('pdf.purchase-order', [
            'purchaseOrder' => $purchaseOrder,
            'companyName' => $companyName
        ]);

        $pdf->setPaper('a4', 'portrait');

        return $pdf->download("PO-{$purchaseOrder->po_number}.pdf");
    }

}
