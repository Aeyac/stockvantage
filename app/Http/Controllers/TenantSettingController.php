<?php
namespace App\Http\Controllers;

use App\Http\Requests\UpdateTenantSettingRequest;
use App\Models\TenantSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TenantSettingController extends Controller
{
    public function index(): Response
    {
        abort_if(!auth()->user()->isAdmin(), 403, 'Unauthorized access.');

        $tenantId = session('tenant_id'); // ← was auth()->id()

        $settings = TenantSetting::firstOrCreate(
            ['tenant_id' => $tenantId],
            [
                'company_name' => 'My Company',
                'currency' => 'PHP',
                'approval_threshold' => 500.00,
                'logo_path' => null,
            ]
        );

        return Inertia::render('Settings/Index', [
            'settings' => [
                'company_name' => $settings->company_name,
                'currency' => $settings->currency,
                'approval_threshold' => $settings->approval_threshold,
                'logo_url' => $settings->logo_path
                    ? Storage::disk('public')->url($settings->logo_path)
                    : null,
            ]
        ]);
    }

    public function update(UpdateTenantSettingRequest $request): RedirectResponse
    {
        $tenantId = session('tenant_id'); // ← was auth()->id()

        $settings = TenantSetting::where('tenant_id', $tenantId)->firstOrFail();

        $data = $request->validated();
        unset($data['logo']); // ← remove file object before passing to update()

        if ($request->hasFile('logo')) {
            if ($settings->logo_path) {
                Storage::disk('public')->delete($settings->logo_path);
            }

            $data['logo_path'] = $request->file('logo')->store('branding', 'public');
        }

        $settings->update($data);

        session()->forget(['tenant_currency', 'tenant_threshold', 'company_name']);

        return redirect()
            ->route('settings.index')
            ->with('success', 'Settings updated successfully.');
    }
}