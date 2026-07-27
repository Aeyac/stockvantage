<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Tenant;
use App\Models\PurchaseRequest;
use App\Models\PurchaseOrder;

class PurchaseOrderFactory extends Factory
{
    public function definition(): array
    {
        $tenant = Tenant::factory()->create();

        return [
            'tenant_id' => $tenant->id,
            'pr_id' => PurchaseRequest::factory(),
            'po_number' => 'PO-' . $this->faker->unique()->numerify('####'),
            'status' => PurchaseOrder::STATUS_OPEN,
            'is_email_sent' => false,
            'total_amount' => $this->faker->randomFloat(2, 100, 5000),
        ];
    }
}