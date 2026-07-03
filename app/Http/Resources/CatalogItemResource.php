<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CatalogItemResource extends JsonResource
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
            'tenant_id' => $this->tenant_id,
            'name' => $this->name,
            'sku' => $this->sku,
            'category' => $this->category,
            'unit_cost' => $this->unit_cost,
            'safety_stock' => $this->safety_stock,
            'supplier_name' => $this->supplier?->name,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
