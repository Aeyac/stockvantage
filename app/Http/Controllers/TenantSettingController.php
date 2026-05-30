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

        $settings = TenantSetting::where('tenant_id', auth()->id())->first();

        return Inertia::render('TenantSettings/Index', [
            'settings' => $settings
        ]);
    }

    public function update(UpdateTenantSettingRequest $request): RedirectResponse
    {
        $settings = TenantSetting::where('tenant_id', auth()->id())->firstOrFail();

        $data = $request->validated();

        // Handle logo upload first
        if ($request->hasFile('logo')) {
            if ($settings->logo_path) {
                Storage::disk('public')->delete($settings->logo_path);
            }

            $data['logo_path'] = $request->file('logo')
                ->store('branding', 'public');
        }

        $settings->update($data);

        return redirect()
            ->route('tenant_settings.index')
            ->with('success', 'Settings updated successfully.');
    }
}