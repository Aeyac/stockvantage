<?php

namespace Database\Factories;

use App\Models\Supplier;
use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Supplier>
 */
class SupplierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $tenant = Tenant::factory()->create();
        
        return [
            'tenant_id' => $tenant->id,
            'name' => $this->faker->name(),
            'contact_email' => $this->faker->unique()->email(),
            'phone' => $this->faker->unique()->numerify('#########'),
            'address' => $this->faker->address,
            'entity_number' => 'TEST' . $this->faker->unique()->numerify('####'),
            'payment_terms' => 'Net30',
            'is_active' => true,
            'updated_at' => null,
        ];
    }
}
