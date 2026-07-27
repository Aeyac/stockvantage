<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Tenant;
use App\Models\User;
use App\Models\PurchaseRequest;

class PurchaseRequestFactory extends Factory
{
    public function definition(): array
    {
        return [
            'tenant_id' => Tenant::factory(),
            'pr_number' => 'PR-' . $this->faker->unique()->numerify('####'),
            'requested_by' => User::factory(),
            'approved_by' => null,
            'status' => PurchaseRequest::STATUS_PENDING,
            'total_amount' => $this->faker->randomFloat(2, 100, 5000),
            'justification' => $this->faker->sentence(),
            'approved_at' => null,
        ];
    }
}