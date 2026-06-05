<?php

namespace App\Http\Controllers;

use App\Models\CatalogItem;
use App\Models\PurchaseOrder;
use App\Models\PurchaseRequest;
use App\Models\TenantSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {

        // Month-to-date spend
        $mtdSpend = PurchaseOrder::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->whereNotIn('status', ['cancelled'])
            ->sum('total_amount');

        // Active open POs
        $openPoCount = PurchaseOrder::where('status', 'open')->count();

        // Pending approvals — PRs awaiting approval
        $pendingApprovals = PurchaseRequest::where('status', 'awaiting_approval')->count();

        // Low stock alerts — items below safety stock
        $lowStockCount = CatalogItem::where('is_active', true)
            ->get()
            ->filter(fn($item) => $item->isBelowSafetyStock())
            ->count();

        // Recent PRs — last 5
        $recentRequests = PurchaseRequest::with('requester')
            ->latest()
            ->take(5)
            ->get();

        // 6-month spend chart data
        $spendChart = collect(range(5, 0))->map(function ($monthsAgo) {
            $date = now()->subMonths($monthsAgo);
            return [
                'month' => $date->format('M'),
                'spend' => PurchaseOrder::whereMonth('created_at', $date->month)
                    ->whereYear('created_at', $date->year)
                    ->whereNotIn('status', ['cancelled'])
                    ->sum('total_amount'),
            ];
        });

        return Inertia::render('Dashboard', [
            'metrics' => [
                'mtd_spend' => $mtdSpend,
                'open_po_count' => $openPoCount,
                'pending_approvals' => $pendingApprovals,
                'low_stock_count' => $lowStockCount,
            ],
            'recentRequests' => $recentRequests,
            'spendChart' => $spendChart,
        ]);
    }
}
