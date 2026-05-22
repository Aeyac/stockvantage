<?php

namespace Database\Seeders;

use App\Models\CatalogItem;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // create test tenant
        // $tenant = Tenant::create([
        //     'name' => 'Test Company',
        //     'subdomain' => 'tenant1',
        //     'plan' => 'pro',
        //     'is_active' => true,
        // ]);

        $items = [
            ['Laptop', 'Electronics'],
            ['Mechanical Keyboard', 'Accessories'],
            ['Office Chair', 'Furniture'],
            ['Monitor 24"', 'Electronics'],
            ['Wireless Mouse', 'Accessories'],
            ['Printer Ink', 'Office Supplies'],
            ['Ethernet Cable', 'Networking'],
            ['USB Hub', 'Accessories'],
            ['Paper Ream A4', 'Office Supplies'],
            ['Projector', 'Electronics'],
        ];

        foreach ($items as $item) {
            CatalogItem::create([
                'tenant_id' => 1,
                'supplier_id' => 2,

                'sku' => 'SKU-' . str_pad(rand(1, 999), 3, '0', STR_PAD_LEFT),

                'name' => $item[0],
                'category' => $item[1],

                'unit_cost' => rand(500, 25000),

                'safety_stock' => rand(5, 50),

                'is_active' => rand(0, 1),
            ]);
        }

        // // create admin user for that tenant
        // User::create([
        //     'tenant_id' => $tenant->id,
        //     'name' => 'Aaron Admin',
        //     'email' => 'aaron@test.com',
        //     'password' => Hash::make('password'),
        //     'role' => 'tenant_admin',
        //     'is_active' => true,
        // ]);
    }
}