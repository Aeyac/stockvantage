<?php

use App\Http\Controllers\CatalogItemController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GrnController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\PurchaseOrderController;
use App\Http\Controllers\PurchaseRequestController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WarehouseController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\ProfileController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('LandingPage');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // -------------------------------------------------------
    // All roles — catalog browse + purchase requests
    // -------------------------------------------------------
    Route::middleware(['role:tenant_admin,department_manager,warehouse_staff,employee'])
        ->group(function () {
            // read-only catalog for non-admins
            Route::get('/catalog-items', [CatalogItemController::class, 'index'])
                ->name('catalog-items.index');

            Route::resource('/purchase-requests', PurchaseRequestController::class)
                ->only(['index', 'create', 'store', 'show']);
        });

    // -------------------------------------------------------
    // Manager + Admin — approvals and purchase orders
    // -------------------------------------------------------
    Route::middleware(['role:tenant_admin,department_manager'])
        ->group(function () {
            Route::patch(
                '/purchase-requests/{purchaseRequest}/approve',
                [PurchaseRequestController::class, 'approve']
            )->name('purchase-requests.approve');

            Route::patch(
                '/purchase-requests/{purchaseRequest}/reject',
                [PurchaseRequestController::class, 'reject']
            )->name('purchase-requests.reject');

            Route::resource('/purchase-orders', PurchaseOrderController::class)
                ->only(['index', 'show']);
        });

    // -------------------------------------------------------
    // Warehouse Staff + Admin — inventory and GRN
    // -------------------------------------------------------
    Route::middleware(['role:tenant_admin,warehouse_staff'])->group(function () {
        Route::resource('/warehouses', WarehouseController::class);

        Route::get('/inventory', [InventoryController::class, 'index'])
            ->name('inventory.index');

        Route::resource('/grn', GrnController::class)
            ->only(['index', 'create', 'store', 'show']);
    });

    // -------------------------------------------------------
    // Admin only — full system control
    // -------------------------------------------------------
    Route::middleware(['role:tenant_admin'])->group(function () {
        Route::resource('/users', UserController::class)->except(['show']);
        Route::resource('/suppliers', SupplierController::class);

        // admin gets full catalog CRUD — index is already registered above
        // so we skip it here to avoid duplicate route conflict
        Route::resource('/catalog-items', CatalogItemController::class)
            ->except(['index']);
    });

});

require __DIR__ . '/auth.php';