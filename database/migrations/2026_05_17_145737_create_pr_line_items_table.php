<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pr_line_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pr_id')->constrained('purchase_requests')
                ->cascadeOnDelete();
            $table->foreignId('catalog_item_id')->constrained();
            $table->integer('quantity');
            $table->decimal('unit_cost', 15, 2); // snapshot at time of request
            $table->decimal('line_total', 15, 2); // quantity * unit_cost
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pr_line_items');
    }
};
