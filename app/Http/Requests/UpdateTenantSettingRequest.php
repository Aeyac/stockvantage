<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTenantSettingRequest extends FormRequest
{

    public function authorize(): bool
    {
        return auth()->user()->isAdmin();
    }


    public function rules(): array
    {
        return [
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'currency' => 'required|string|max:10',
            'approval_threshold' => 'required|numeric|min:0',
        ];

    }

    public function messages(): array
    {
        return [
            'logo.image' => 'The logo must be a valid image file.',
            'logo.mimes' => 'The logo must be a file of type: jpeg, png, jpg, or svg.',
            'logo.max' => 'The logo must not exceed 2MB in size.',

            'currency.required' => 'The currency field is required.',
            'currency.string' => 'The currency must be a valid text value.',
            'currency.max' => 'The currency must not exceed 10 characters.',

            'approval_threshold.required' => 'The approval threshold is required.',
            'approval_threshold.numeric' => 'The approval threshold must be a valid number.',
            'approval_threshold.min' => 'The approval threshold cannot be less than 0.',
        ];
    }
}
