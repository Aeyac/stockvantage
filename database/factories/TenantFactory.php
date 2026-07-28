<?php

namespace Database\Factories;

use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Tenant>
 */
class TenantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name . " Inc.",
            'subdomain' => $this->faker->unique()->slug(2),
            'plan' => "basic",
            'is_active' => true,
            //
        ];
    }
}
