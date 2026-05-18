<?php

namespace App\Http\Middleware;

use App\Models\Tenant;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ResolveTenant
{
    public function handle(Request $request, Closure $next): Response
    {
        $host = $request->getHost();
        // aaron.platform.com → ['aaron', 'platform', 'com']
        $subdomain = explode('.', $host)[0];

        // local development fallback
        if (app()->environment('local') && $subdomain === 'localhost') {
            $subdomain = 'tenant1'; // hardcode a test tenant locally
        }

        $tenant = Tenant::where('subdomain', $subdomain)
            ->where('is_active', true)
            ->first();

        if (!$tenant) {
            abort(404, 'Tenant not found.');
        }

        // store in session so BelongsToTenant trait can read it
        session(['tenant_id' => $tenant->id]);

        return $next($request);
    }
}