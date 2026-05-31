<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTenantSettingRequest extends FormRequest
{

    public function authorize(): bool
    {
        return auth()->user()->isAdmin();
    }


    public function rules(): array
    {
        return [
            'company_name' => 'required|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'currency' => ['required', 'string', Rule::in(['PHP', 'USD', 'EUR'])],
            'approval_threshold' => 'required|numeric|min:0',
        ];

    }

    public function messages(): array
    {
        return [
            'company_name.required' => 'The company name field is required.',
            'company_name.string' => 'The company name must be a valid text value.',
            'company_name.max' => 'The company name must not exceed 255 characters.',

            'logo.image' => 'The logo must be a valid image file.',
            'logo.mimes' => 'The logo must be a file of type: jpeg, png, jpg, or svg.',
            'logo.max' => 'The logo must not exceed 2MB in size.',

            'currency.required' => 'The currency field is required.',
            'currency.in' => 'The selected currency is invalid. Please select PHP, USD, or EUR.',

            'approval_threshold.required' => 'The approval threshold is required.',
            'approval_threshold.numeric' => 'The approval threshold must be a valid number.',
            'approval_threshold.min' => 'The approval threshold cannot be less than 0.',
        ];
    }
}
