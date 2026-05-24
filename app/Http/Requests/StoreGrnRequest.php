<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreGrnRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->user()->isAdmin() || auth()->user()->isWarehouseStaff();
    }

    public function rules(): array
    {
        return [
            'warehouse_id' => 'required|exists:warehouses,id',
            'po_id' => 'required|exists:purchase_orders,id',
            'notes' => 'nullable|string|max:1000',
            'line_items' => 'required|array|min:1',
            'line_items.*.catalog_item_id' => 'required|exists:catalog_items,id',
            'line_items.*.quantity_received' => 'required|integer|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'po_id.required' => 'Please select a purchase order.',
            'po_id.exists' => 'Selected purchase order does not exist.',
            'notes.max' => 'Notes must not exceed 1000 characters.',
            'line_items.required' => 'At least one line item is required.',
            'line_items.min' => 'At least one line item is required.',
            'line_items.*.catalog_item_id.required' => 'Each line item must have an item selected.',
            'line_items.*.catalog_item_id.exists' => 'Selected item does not exist in the catalog.',
            'line_items.*.quantity_received.required' => 'Quantity received is required for each item.',
            'line_items.*.quantity_received.min' => 'Quantity received cannot be negative.',
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $poId = $this->po_id;

            if (!$poId)
                return;

            $po = \App\Models\PurchaseOrder::find($poId);

            if (!$po)
                return;

            if (!\in_array($po->status, ['open', 'partially_received'])) {
                $validator->errors()->add(
                    'po_id',
                    'This purchase order has already been fully received or cancelled.'
                );
            }
        });
    }
}
