<?php

use App\Http\Controllers\CatalogItemController;
use App\Http\Controllers\CatalogItemRecycleBinController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GrnController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\PdfController;
use App\Http\Controllers\PurchaseOrderController;
use App\Http\Controllers\PurchaseOrderRecycleBinController;
use App\Http\Controllers\PurchaseRequestController;
use App\Http\Controllers\PurchaseRequestRecycleBinController;
use App\Http\Controllers\StockLedgerController;
use App\Http\Controllers\SupplierRecycleBinController;
use App\Http\Controllers\TenantSettingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WarehouseController;
use App\Http\Controllers\WarehouseRecycleBinController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserRecycleBinController;
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
                

            Route::prefix('purchase-requests/recycle-bin')
                ->name('purchase-requests.recycle-bin')
                ->controller(PurchaseRequestRecycleBinController::class)
                ->group(function () {
                    Route::get('/', 'index')->name('.index');
                    Route::patch('/{id}/restore', 'restore')->name('.restore');
                    Route::delete('/{id}/force-delete', 'forceDelete')->name('.force-delete');
                });

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

            Route::delete(
                '/purchase-requests/{purchaseRequest}/delete',
                [PurchaseRequestController::class, 'destroy']
            )->name('purchase-requests.destroy');


            Route::prefix('purchase-orders/recycle-bin')
                ->name('purchase-orders.recycle-bin')
                ->controller(PurchaseOrderRecycleBinController::class)
                ->group(function () {
                    Route::get('/', 'index')->name('.index');
                    Route::patch('/{id}/restore', 'restore')->name('.restore');
                    Route::delete('/{id}/force-delete', 'forceDelete')->name('.force-delete');
                });


            Route::resource('/purchase-orders', PurchaseOrderController::class)
                ->only(['index', 'show']);

            Route::get(
                '/purchase-orders/{purchaseOrder}/export-pdf',
                [PdfController::class, 'exportPurchaseOrder']
            )->name('purchase-orders.export-pdf');

            Route::post(
                'purchase-orders/{purchaseOrder}/send-email',
                [PurchaseOrderController::class, 'sendEmail']
            )->name('purchase-orders.send-email');

            // Route::delete(
            //     '/purchase-orders/{purchaseOrder}/delete',
            //     [PurchaseOrderController::class, 'destroy']
            // )->name('purchase-orders.destroy');
        });

    // -------------------------------------------------------
    // Warehouse Staff + Admin — inventory and GRN
    // -------------------------------------------------------
    Route::middleware(['role:tenant_admin,warehouse_staff'])->group(function () {

        Route::prefix('warehouses/recycle-bin')
            ->name('warehouses.recycle-bin')
            ->controller(WarehouseRecycleBinController::class)
            ->group(function () {
                Route::get('/', 'index')->name('.index');
                Route::patch('/{id}/restore', 'restore')->name('.restore');
                Route::delete('/{id}/force-delete', 'forceDelete')->name('.force-delete');
            });


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

        Route::prefix('users/recycle-bin')
            ->name('users.recycle-bin')
            ->controller(UserRecycleBinController::class)
            ->group(function () {
                Route::get('/', 'index')->name('.index');
                Route::patch('/{id}/restore', 'restore')->name('.restore');
                Route::delete('/{id}/force-delete', 'forceDelete')->name('.force-delete');
            });


        Route::resource('/users', UserController::class)->except(['show']);

        Route::prefix('suppliers/recycle-bin')
            ->name('suppliers.recycle-bin')
            ->controller(SupplierRecycleBinController::class)
            ->group(function () {
                Route::get('/', 'index')->name('.index');
                Route::patch('/{id}/restore', 'restore')->name('.restore');
                Route::delete('/{id}/force-delete', 'forceDelete')->name('.force-delete');
            });


        Route::resource('/suppliers', SupplierController::class);

        Route::prefix('catalog-items/recycle-bin')
            ->name('catalog-items.recycle-bin')
            ->controller(CatalogItemRecycleBinController::class)
            ->group(function () {
                Route::get('/', 'index')->name('.index');
                Route::patch('/{id}/restore', 'restore')->name('.restore');
                Route::delete('/{id}/force-delete', 'forceDelete')->name('.force-delete');
            });



        Route::resource('/catalog-items', CatalogItemController::class)
            ->except(['index']);

        Route::get('/settings', [TenantSettingController::class, 'index'])->name('settings.index');
        Route::post('/settings', [TenantSettingController::class, 'update'])->name('settings.update');
        Route::get('/stock-ledger', [StockLedgerController::class, 'index'])->name('stock-ledger.index');
        Route::delete('/settings/destroy-procurement-data', [TenantSettingController::class, 'destroyProcurementData'])
            ->name('settings.destroy-procurement-data');
        Route::delete('/settings/reset-organization', [TenantSettingController::class, 'resetOrganization'])
            ->name('settings.reset-organization');

        Route::post('/settings/reset-defaults', [TenantSettingController::class, 'resetDefaults'])
            ->name('settings.reset-defaults');
    });
});

require __DIR__ . '/auth.php';
