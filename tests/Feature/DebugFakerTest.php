<?php

namespace Tests\Feature;

use Tests\TestCase;

class DebugFakerTest extends TestCase
{
    public function test_debug_faker_providers(): void
    {
        $faker = app(\Faker\Generator::class);
        dump(get_class($faker));
        dump(array_map('get_class', $faker->getProviders()));
        $this->assertTrue(true);
    }
}