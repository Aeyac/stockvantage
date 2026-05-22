<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StorePurchaseRequestRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'justification' => 'required|string|max:1000',
            'items' => 'required|array|min:1',
            'items.*.catalog_item_id' => 'required|exists:catalog_items,id',
            'items.*.quantity' => 'required|integer|min:1'
        ];
    }

    public function messages(): array
    {
        return [
            'justification.required' => 'Justification is required.',
            'justification.max' => 'Justification must be lower than 100 characters.',
            'items.required' => 'Justification is required.',
            'items.min' => 'Items cannot be empty.',
            'items.*.catalog_item_id.required' => 'Each item must have a catalog item selected.',
            'items.*.catalog_item_id.exists' => 'Selected item does not exist in the catalog.',
            'items.*.quantity.required' => 'Quantity is required for each item.',
            'items.*.quantity.min' => 'Quantity must be at least 1.',
        ];
    }
}
