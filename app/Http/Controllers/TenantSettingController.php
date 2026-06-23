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

        $tenantId = auth()->user()->tenant_id; // ← was auth()->id()

        $settings = TenantSetting::firstOrCreate(
            ['tenant_id' => $tenantId],          // ← find by this alone
            [                                     // ← only used when creating
                'company_name' => 'My Company',
                'currency' => 'PHP',
                'approval_threshold' => 500.00,
                'auto_send_email' => false,
                'logo_path' => null,
            ]
        );

        return Inertia::render('Settings/Index', [
            'settings' => [
                'company_name' => $settings->company_name,
                'currency' => $settings->currency,
                'approval_threshold' => (float) $settings->approval_threshold,
                'auto_send_email' => (bool) $settings->auto_send_email,
                'logo_url' => $settings->logo_path
                    ? Storage::disk('public')->url($settings->logo_path)
                    : null,
            ]
        ]);
    }

    public function update(UpdateTenantSettingRequest $request): RedirectResponse
    {
        $tenantId = auth()->user()->tenant_id; // ← was auth()->id()

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

        session()->forget(['tenant_currency', 'tenant_threshold', 'company_name', 'auto_send_email']);

        return redirect()
            ->route('settings.index')
            ->with('success', 'Settings updated successfully.');
    }
}