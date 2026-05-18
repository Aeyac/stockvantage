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
        Schema::create('grn_line_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('grn_id')->constrained('grn_records')
                ->cascadeOnDelete();
            $table->foreignId('catalog_item_id')->constrained();
            $table->integer('quantity_ordered');
            $table->integer('quantity_received');
            $table->text('discrepancy_note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grn_line_itmes');
    }
};
