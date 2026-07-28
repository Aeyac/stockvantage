<?php

namespace Database\Factories;

use App\Models\CatalogItem;
use App\Models\Supplier;
use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CatalogItem>
 */
class CatalogItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    // CatalogItemFactory
    public function definition(): array
    {
        return [
            'tenant_id' => Tenant::factory(),
            'supplier_id' => Supplier::factory(),
            'sku' => 'SKU-' . $this->faker->unique()->numerify('####'),
            'name' => $this->faker->name(),
            'category' => 'Shoes',
            'unit_cost' => 700,
            'safety_stock' => 15,
            'is_active' => true,
        ];
    }

}
