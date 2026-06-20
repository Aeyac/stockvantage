<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->where('tenant_id', auth()->user()->tenant_id)->ignore($this->user->id)
            ],
            'role' => 'required|in:tenant_admin,department_manager,warehouse_staff,employee',
            'is_active' => 'required|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The name field is required.',
            'name.string' => 'The name must be a valid string.',
            'name.max' => 'The name may not be greater than 255 characters.',

            'email.email' => 'Please enter a valid email address.',
            'email.max' => 'The email may not be greater than 255 characters.',
            'email.unique' => 'This email is already taken within this tenant.',

            'role.required' => 'Please select a role.',
            'role.in' => 'The selected role is invalid. Choose a valid role.',

            'is_active.required' => 'The status field is required.',
            'is_active.boolean' => 'The status must be true or false.',
        ];
    }




}
