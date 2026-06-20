<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Abstracts\RecycleBinController;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Override;

class UserRecycleBinController extends RecycleBinController
{

    protected function allowedRoles(): array
    {
        return ['tenant_admin'];
    }

    public function baseQuery()
    {
        return parent::baseQuery()->select([
            'id',
            'name',
            'email',
            'role',
            'deleted_at',
        ]);
    }

    protected function model(): string
    {
        return User::class;
    }

    protected function routeName(): string
    {
        return 'users.recycle-bin.index';
    }

    protected function viewName(): string
    {
        return 'Users/RecycleBin';
    }

    protected function itemName(): string
    {
        return 'User';
    }

    public function forceDelete($id): RedirectResponse
    {

        $model = $this->model();

        $item = $model::onlyTrashed()
            ->where('tenant_id', auth()->user()->tenant_id)
            ->findOrFail($id);

        if ($item->purchaseRequests()->where('status', 'awaiting_approval')->exists()) {
            return redirect()
                ->route($this->routeName())
                ->with('error', "{$this->itemName()} has purchase requests awaiting approval.");
        }

        return parent::forceDelete($id);

        return redirect()
            ->route($this->routeName())
            ->with('success', "{$this->itemName()} permanently deleted.");
    }
}
