<?php

namespace App\Services;
use App\Models\CatalogItem;
use App\Models\PurchaseOrder;
use App\Models\PurchaseRequest;
use App\Models\TenantSetting;
use App\Mail\SupplierPurchaseOrderMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

class PurchaseRequestService
{
    public function createRequest(array $itemsData, string $justification, $user): PurchaseRequest
    {
        return DB::transaction(function () use ($itemsData, $justification, $user) {
            $total = 0;
            $items = [];

            foreach ($itemsData as $item) {
                $catalogItem = CatalogItem::findOrFail($item['catalog_item_id']);
                $lineTotal = $item['quantity'] * $catalogItem->unit_cost;
                $total += $lineTotal;

                $items[] = [
                    'catalog_item_id' => $item['catalog_item_id'],
                    'quantity' => $item['quantity'],
                    'unit_cost' => $catalogItem->unit_cost,
                    'line_total' => $lineTotal,
                ];
            }

            $threshold = TenantSetting::where('tenant_id', $user->tenant_id)->value('approval_threshold');

            $status = $total < $threshold
                ? PurchaseRequest::STATUS_AUTO_APPROVED
                : PurchaseRequest::STATUS_AWAITING_APPROVAL;

            $count = PurchaseRequest::withTrashed()->where('tenant_id', $user->tenant_id)->count() + 1;

            $pr = PurchaseRequest::create([
                'tenant_id' => $user->tenant_id,
                'pr_number' => 'PR-' . str_pad($count, 4, '0', STR_PAD_LEFT),
                'requested_by' => $user->id,
                'status' => $status,
                'total_amount' => $total,
                'justification' => $justification,
            ]);

            foreach ($items as $item) {
                $pr->lineItems()->create($item);
            }

            if ($status === PurchaseRequest::STATUS_AUTO_APPROVED) {
                $this->generatePurchaseOrder($pr);
            }

            return $pr;
        });
    }

    public function approveRequest(PurchaseRequest $purchaseRequest, int $userId): void
    {
        DB::transaction(function () use ($purchaseRequest, $userId) {
            $lockedRequest = PurchaseRequest::where('id', $purchaseRequest->id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($lockedRequest->status === PurchaseRequest::STATUS_APPROVED) {
                throw new \Exception('This request has already been approved.');
            }

            $lockedRequest->update([
                'status' => PurchaseRequest::STATUS_APPROVED,
                'approved_by' => $userId,
                'approved_at' => now(),
            ]);

            $this->generatePurchaseOrder($lockedRequest);
        });
    }


    public function generatePurchaseOrder(PurchaseRequest $pr): PurchaseOrder
    {
        $count = PurchaseOrder::whereYear('created_at', now()->year)
            ->where('tenant_id', $pr->tenant_id)
            ->withTrashed()
            ->count() + 1;
        $poNumber = 'PO-' . now()->year . '-' . str_pad($count, 4, '0', STR_PAD_LEFT);

        $purchaseOrder = PurchaseOrder::create([
            'pr_id' => $pr->id,
            'po_number' => $poNumber,
            'status' => PurchaseOrder::STATUS_OPEN,
            'total_amount' => $pr->total_amount,
        ]);

        $isAutoSendEmail = TenantSetting::where('tenant_id', $pr->tenant_id)->value('auto_send_email');

        if ($isAutoSendEmail) {
            $firstItem = $purchaseOrder->purchaseRequest->lineItems()->first();
            $supplierEmail = $firstItem?->catalogItem?->supplier?->contact_email;

            if ($supplierEmail) {
                Mail::to($supplierEmail)->send(new SupplierPurchaseOrderMail($purchaseOrder));
            }
        }

        return $purchaseOrder;
    }
}
