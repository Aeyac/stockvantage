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
        Schema::create('tenant_settings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('company_name')->default('StockVantage');
            $table->string('logo_path')->nullable();
            $table->string('currency', 10)->default('USD');
            $table->decimal('approval_threshold', 15, 2)->default(500.00);
            $table->timestamps();

            // $table->renameColumn('company_logo', 'logo_path');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tenant_settings');

        // Schema::table('tenant_settings', function (Blueprint $table) {
        //     $table->renameColumn('logo_path', 'company_logo');
        // });
    }
};
