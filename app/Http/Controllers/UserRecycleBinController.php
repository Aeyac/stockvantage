<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Abstracts\RecycleBinController;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Override;

class UserRecycleBinController extends RecycleBinController
{

    protected function allowedRoles(): array
    {
        return ['tenant_admin'];
    }

    protected function baseQuery()
    {
        return parent::baseQuery()->select([
            'id',
            'name',
            'email',
            'role',
            'deleted_at',
        ]);
    }

    public function index(Request $request): Response
    {
        $query = $this->baseQuery()
            ->search($request->search)
            ->filterStatus($request->status)
            ->filterRole($request->role);

        $result = $query->latest('deleted_at')
            ->paginate(20);

        $resourceClass = $this->resource();

        $items = $resourceClass
            ? $resourceClass::collection($result)
            : $result;

        return Inertia::render($this->viewName(), [
            'deletedItems' => $items,
            'filters' => $request->only(['search', 'status']),
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
