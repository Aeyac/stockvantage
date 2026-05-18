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
        Schema::create('stock_ledgers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('warehouse_id')->constrained();
            $table->foreignId('catalog_item_id')->constrained();
            $table->integer('quantity_change'); // positive = in, negative = out
            $table->enum('movement_type', [
                'received_shipment',
                'internal_consumption',
                'manual_adjustment'
            ]);
            $table->string('reference_type')->nullable(); // 'GrnRecord', 'PurchaseRequest'
            $table->unsignedBigInteger('reference_id')->nullable(); // the actual record ID
            $table->foreignId('performed_by')->constrained('users');
            $table->timestamp('created_at'); // no updated_at — this is append-only
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_ledgers');
    }
};
