<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * @property int $id
 * @property int $tenant_id
 * @property int $po_id
 * @property int $received_by
 * @property string $status
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\GrnLineItem> $lineItems
 * @property-read int|null $line_items_count
 * @property-read \App\Models\PurchaseOrder|null $purchaseOrder
 * @property-read \App\Models\User|null $receiver
 * @property-read \App\Models\Tenant $tenant
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GrnRecord newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GrnRecord newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GrnRecord query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GrnRecord whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GrnRecord whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GrnRecord whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GrnRecord wherePoId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GrnRecord whereReceivedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GrnRecord whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GrnRecord whereTenantId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GrnRecord whereUpdatedAt($value)
 */
	class GrnRecord extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $pr_id
 * @property int $catalog_item_id
 * @property int $quantity
 * @property numeric $unit_cost
 * @property numeric $line_total
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CatalogItem|null $catalogItem
 * @property-read \App\Models\PurchaseRequest|null $purchaseRequest
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PrLineItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PrLineItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PrLineItem query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PrLineItem whereCatalogItemId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PrLineItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PrLineItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PrLineItem whereLineTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PrLineItem wherePrId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PrLineItem whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PrLineItem whereUnitCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PrLineItem whereUpdatedAt($value)
 */
	class PrLineItem extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $tenant_id
 * @property int $pr_id
 * @property string $po_number
 * @property string $status
 * @property bool $is_email_sent
 * @property numeric $total_amount
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\GrnRecord> $grnRecords
 * @property-read int|null $grn_records_count
 * @property-read \App\Models\PurchaseRequest|null $purchaseRequest
 * @property-read \App\Models\Tenant $tenant
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseOrder newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseOrder newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseOrder onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseOrder query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseOrder whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseOrder whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseOrder whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseOrder whereIsEmailSent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseOrder wherePoNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseOrder wherePrId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseOrder whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseOrder whereTenantId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseOrder whereTotalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseOrder whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseOrder withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseOrder withoutTrashed()
 */
	class PurchaseOrder extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $tenant_id
 * @property string|null $pr_number
 * @property int $requested_by
 * @property int|null $approved_by
 * @property string $status
 * @property numeric $total_amount
 * @property string|null $justification
 * @property \Illuminate\Support\Carbon|null $approved_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\User|null $approver
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PrLineItem> $lineItems
 * @property-read int|null $line_items_count
 * @property-read \App\Models\PurchaseOrder|null $purchaseOrder
 * @property-read \App\Models\User|null $requester
 * @property-read \App\Models\Tenant $tenant
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseRequest onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseRequest whereApprovedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseRequest whereApprovedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseRequest whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseRequest whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseRequest whereJustification($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseRequest wherePrNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseRequest whereRequestedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseRequest whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseRequest whereTenantId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseRequest whereTotalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseRequest whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseRequest withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PurchaseRequest withoutTrashed()
 */
	class PurchaseRequest extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $tenant_id
 * @property int $warehouse_id
 * @property int $catalog_item_id
 * @property int $quantity_change
 * @property string $movement_type
 * @property string|null $reference_type
 * @property int|null $reference_id
 * @property int $performed_by
 * @property \Illuminate\Support\Carbon $created_at
 * @property-read \App\Models\CatalogItem|null $catalogItem
 * @property-read \App\Models\User|null $performer
 * @property-read \App\Models\Tenant $tenant
 * @property-read \App\Models\Warehouse|null $warehouse
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StockLedger newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StockLedger newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StockLedger query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StockLedger whereCatalogItemId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StockLedger whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StockLedger whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StockLedger whereMovementType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StockLedger wherePerformedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StockLedger whereQuantityChange($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StockLedger whereReferenceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StockLedger whereReferenceType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StockLedger whereTenantId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StockLedger whereWarehouseId($value)
 */
	class StockLedger extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $tenant_id
 * @property string $name
 * @property string $contact_email
 * @property string|null $phone
 * @property string|null $address
 * @property string|null $entity_number
 * @property string $payment_terms
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CatalogItem> $catalogItems
 * @property-read int|null $catalog_items_count
 * @property-read \App\Models\Tenant $tenant
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier whereContactEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier whereEntityNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier wherePaymentTerms($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier whereTenantId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Supplier withoutTrashed()
 */
	class Supplier extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $subdomain
 * @property string $plan
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CatalogItem> $catalogItems
 * @property-read int|null $catalog_items_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\GrnRecord> $grnRecords
 * @property-read int|null $grn_records_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PurchaseOrder> $purchaseOrders
 * @property-read int|null $purchase_orders_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PurchaseRequest> $purchaseRequests
 * @property-read int|null $purchase_requests_count
 * @property-read \App\Models\TenantSetting|null $settings
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\StockLedger> $stockLedgers
 * @property-read int|null $stock_ledgers_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Supplier> $suppliers
 * @property-read int|null $suppliers_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Warehouse> $warehouses
 * @property-read int|null $warehouses_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tenant newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tenant newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tenant query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tenant whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tenant whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tenant whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tenant whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tenant wherePlan($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tenant whereSubdomain($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tenant whereUpdatedAt($value)
 */
	class Tenant extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $tenant_id
 * @property string $company_name
 * @property string|null $logo_path
 * @property string $currency
 * @property numeric $approval_threshold
 * @property bool $auto_send_email
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Tenant|null $tenant
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TenantSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TenantSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TenantSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TenantSetting whereApprovalThreshold($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TenantSetting whereAutoSendEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TenantSetting whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TenantSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TenantSetting whereCurrency($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TenantSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TenantSetting whereLogoPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TenantSetting whereTenantId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TenantSetting whereUpdatedAt($value)
 */
	class TenantSetting extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $tenant_id
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string $role
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PurchaseRequest> $approvedRequests
 * @property-read int|null $approved_requests_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\GrnRecord> $grnRecords
 * @property-read int|null $grn_records_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PurchaseRequest> $purchaseRequests
 * @property-read int|null $purchase_requests_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\StockLedger> $stockLedgers
 * @property-read int|null $stock_ledgers_count
 * @property-read \App\Models\Tenant $tenant
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereTenantId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withoutTrashed()
 */
	class User extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $tenant_id
 * @property string $name
 * @property string|null $location
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\StockLedger> $stockLedgers
 * @property-read int|null $stock_ledgers_count
 * @property-read \App\Models\Tenant $tenant
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Warehouse newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Warehouse newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Warehouse onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Warehouse query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Warehouse whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Warehouse whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Warehouse whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Warehouse whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Warehouse whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Warehouse whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Warehouse whereTenantId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Warehouse whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Warehouse withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Warehouse withoutTrashed()
 */
	class Warehouse extends \Eloquent {}
}

