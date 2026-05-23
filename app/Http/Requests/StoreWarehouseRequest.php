<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreWarehouseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:225',
            'location' => 'nullable|string|max:225',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Warehouse name is required.',
        ];
    }


}
