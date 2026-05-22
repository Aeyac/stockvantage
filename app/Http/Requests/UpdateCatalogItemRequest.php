<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCatalogItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'supplier_id' => 'required|exists:suppliers,id',
            'sku' => 'required|string|max:100|unique:catalog_items,sku,' . $this->catalog_item->id,
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:100',
            'unit_cost' => 'required|numeric|min:0',
            'safety_stock' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'supplier_id.required' => 'Please select a supplier.',
            'supplier_id.exists' => 'Selected supplier does not exist.',
            'sku.required' => 'SKU is required.',
            'sku.unique' => 'This SKU is already taken.',
            'name.required' => 'Item name is required.',
            'unit_cost.required' => 'Unit cost is required.',
            'unit_cost.numeric' => 'Unit cost must be a number.',
            'unit_cost.min' => 'Unit cost cannot be negative.',
            'safety_stock.required' => 'Safety stock is required.',
            'safety_stock.integer' => 'Safety stock must be a whole number.',
            'safety_stock.min' => 'Safety stock cannot be negative.',
            'is_active.required' => 'Active status is required.',
            'is_active.boolean' => 'Active status must be true or false.',
        ];
    }
}