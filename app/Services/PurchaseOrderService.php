<?php

namespace App\Services;

use App\Mail\SupplierPurchaseOrderMail;
use App\Models\PurchaseOrder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;


class PurchaseOrderService
{


    public function sendPoEmail(PurchaseOrder $purchaseOrder): void
    {
        DB::transaction(function () use ($purchaseOrder) {
            $lockedOrder = PurchaseOrder::where('id', $purchaseOrder->id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($lockedOrder->isEmailSent() === PurchaseOrder::IS_EMAIL_SENT) {
                throw new \Exception('This request has already been approved.');    
            }

            $firstItem = $lockedOrder->purchaseRequest->lineItems()->first();
            $supplierEmail = $firstItem?->catalogItem?->supplier?->contact_email;

            if ($supplierEmail) {
                Mail::to($supplierEmail)->send(new SupplierPurchaseOrderMail($purchaseOrder));
            }

            $lockedOrder->update([
                'is_email_sent' => true,
            ]);

        });
    }


}
