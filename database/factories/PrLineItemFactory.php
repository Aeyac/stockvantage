<?php

namespace Database\Factories;

use App\Models\CatalogItem;
use App\Models\PrLineItem;
use App\Models\PurchaseRequest;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PrLineItem>
 */
class PrLineItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $quantity = 6;
        $unitCost = 600;

        return [
            'pr_id' => PurchaseRequest::factory(),
            'catalog_item_id' => CatalogItem::factory(),
            'quantity' => $quantity,
            'unit_cost' => $unitCost,
            'line_total' => $quantity * $unitCost,
        ];
    }
}
