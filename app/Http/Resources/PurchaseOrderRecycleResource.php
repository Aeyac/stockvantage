<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseOrderRecycleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'po_number' => $this->po_number,
            'status' => $this->status,
            'total_amount' => $this->total_amount,
            'deleted_at' => $this->deleted_at,
            'requester_name' => $this->purchaseRequest?->requester?->name,
            'supplier_names' => $this->purchaseRequest?->lineItems
                ->pluck('catalogItem.supplier.name')
                ->unique()
                ->first(),
        ];

    }


}
