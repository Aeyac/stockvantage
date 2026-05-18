<?php

use Illuminate\Support\Facades\Route;

// -------------------------------------------------------
// Public routes — no auth needed
// -------------------------------------------------------
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// -------------------------------------------------------
// Authenticated routes — any role can access
// -------------------------------------------------------
Route::middleware(['auth'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    // -------------------------------------------------------
    // Employee + above — catalog browsing and PR submission
    // -------------------------------------------------------
    Route::middleware(['role:tenant_admin,department_manager,warehouse_staff,employee'])
        ->group(function () {

            Route::get('/catalog', [CatalogController::class, 'index'])
                ->name('catalog.index');

            Route::resource('/purchase-requests', PurchaseRequestController::class)
                ->only(['index', 'create', 'store', 'show']);
        });

    // -------------------------------------------------------
    // Manager + above — approvals
    // -------------------------------------------------------
    Route::middleware(['role:tenant_admin,department_manager'])
        ->group(function () {

            Route::patch(
                '/purchase-requests/{pr}/approve',
                [PurchaseRequestController::class, 'approve']
            )
                ->name('purchase-requests.approve');

            Route::patch(
                '/purchase-requests/{pr}/reject',
                [PurchaseRequestController::class, 'reject']
            )
                ->name('purchase-requests.reject');

            Route::resource('/purchase-orders', PurchaseOrderController::class)
                ->only(['index', 'show']);
        });

    // -------------------------------------------------------
    // Warehouse staff + above — inventory and GRN
    // -------------------------------------------------------
    Route::middleware(['role:tenant_admin,warehouse_staff'])
        ->group(function () {

            Route::resource('/warehouses', WarehouseController::class);

            Route::resource('/grn', GrnController::class)
                ->only(['index', 'create', 'store', 'show']);

            Route::get('/inventory', [InventoryController::class, 'index'])
                ->name('inventory.index');
        });

    // -------------------------------------------------------
    // Tenant admin only — full system control
    // -------------------------------------------------------
    Route::middleware(['role:tenant_admin'])
        ->group(function () {

            Route::resource('/users', UserController::class);
            Route::resource('/suppliers', SupplierController::class);
            Route::resource('/catalog-items', CatalogItemController::class);
        });
});