<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
// isActive is declared here to update status because when initially created its set to default active true
class UpdateSupplierRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'contact_email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:500',
            'entity_number' => 'nullable|string|max:100',
            'payment_terms' => 'required|in:Net30,Net60,Net90,COD',
            'is_active' => 'required|boolean',
            'updated_at' => ['required', 'date'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Supplier name is required.',
            'contact_email.required' => 'Contact email is required.',
            'contact_email.email' => 'Please enter a valid email address.',
            'payment_terms.required' => 'Payment terms are required.',
            'payment_terms.in' => 'Payment terms must be Net30, Net60, Net90, or COD.',
            'is_active.required' => 'Active status is required.',
        ];
    }
}