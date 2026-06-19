<?php

namespace App\Http\Middleware;

use App\Models\Tenant;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ResolveTenant
{
    // these routes don't need tenant resolution
    protected array $except = [
        'login',
        'logout',
        'register',
        'forgot-password',
        'reset-password',
        'dashboard'
    ];

    public function handle(Request $request, Closure $next): Response
    {
        // skip tenant resolution for auth routes
        if ($request->is(...$this->except)) {
            return $next($request);
        }

        $host = $request->getHost();
        $subdomain = explode('.', $host)[0];

        // local development fallback
        // if (app()->environment('local') && $subdomain === 'localhost') {
        //     $subdomain = 'tenant1';
        // }

        if (app()->environment('local')) {
            $subdomain = 'tenant1';
        }


        $tenant = Tenant::where('subdomain', $subdomain)
            ->where('is_active', true)
            ->first();

        if (!$tenant) {
            abort(404, 'Tenant not found.');
        }

        session(['tenant_id' => $tenant->id]);

        return $next($request);
    }
}
