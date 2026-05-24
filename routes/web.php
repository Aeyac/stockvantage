<?php

use App\Http\Controllers\CatalogItemController;
use App\Http\Controllers\GrnController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\PurchaseOrderController;
use App\Http\Controllers\PurchaseRequestController;
use App\Http\Controllers\WarehouseController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\ProfileController;

Route::middleware(['auth'])->group(function () {

    Route::get('/dashboard', function () {
        return inertia('Dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // -------------------------------------------------------
    // All roles — every authenticated user
    // -------------------------------------------------------
    Route::middleware(['role:tenant_admin,department_manager,warehouse_staff,employee'])
        ->group(function () {
            Route::resource('/purchase-requests', PurchaseRequestController::class)
                ->only(['index', 'create', 'store', 'show']);
        });

    // -------------------------------------------------------
    // Manager + Admin — approvals
    // -------------------------------------------------------
    Route::middleware(['role:tenant_admin,department_manager'])
        ->group(function () {
            Route::patch(
                '/purchase-requests/{purchaseRequest}/approve',
                [PurchaseRequestController::class, 'approve']
            )
                ->name('purchase-requests.approve');

            Route::patch(
                '/purchase-requests/{purchaseRequest}/reject',
                [PurchaseRequestController::class, 'reject']
            )
                ->name('purchase-requests.reject');

            Route::resource('/purchase-orders', PurchaseOrderController::class)
                ->only(['index', 'show']);
        });


    // -------------------------------------------------------
    // Warehouse Staff + Admin — approvals
    // -------------------------------------------------------
    Route::middleware(['role:tenant_admin,warehouse_staff'])->group(function () {
        Route::resource('/warehouses', WarehouseController::class);
        Route::get('/inventory', [InventoryController::class, 'index'])
            ->name('inventory.index');


        Route::resource('/grn', GrnController::class);
    });



    // -------------------------------------------------------
    // Admin only
    // -------------------------------------------------------
    Route::middleware(['role:tenant_admin'])->group(function () {
        Route::resource('/suppliers', SupplierController::class);
        Route::resource('/catalog-items', CatalogItemController::class);
    });

});

require __DIR__ . '/auth.php';