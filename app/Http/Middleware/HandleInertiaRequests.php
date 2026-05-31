<?php

namespace App\Http\Middleware;

use App\Models\TenantSetting;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Ramsey\Uuid\Type\Decimal;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
            'settings' => [
                'currency_symbol' => $this->getCurrencySymbol($request),
                'approval_threshold' => $this->getThreshold($request),
            ],
        ];
    }



    private function getCurrencySymbol(Request $request): string
    {
        if (!$request->user())
            return '₱';

        return session()->remember('tenant_currency', function () {
            $tenantId = session('tenant_id');
            $settings = TenantSetting::where('tenant_id', $tenantId)->first();
            $currency = $settings?->currency ?? 'PHP';
            return TenantSetting::currencySymbol($currency);
        });
    }

    private function getThreshold(Request $request): float
    {
        if (!$request->user())
            return 0.0;

        return session()->remember('tenant_threshold', function () {
            $tenantId = session('tenant_id');
            $settings = TenantSetting::where('tenant_id', $tenantId)->first();
            return $settings?->approval_threshold ?? 50.00;
        });
    }
}
