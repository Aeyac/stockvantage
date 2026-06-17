<?php

namespace App\Http\Controllers\Abstracts;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

abstract class RecycleBinController extends Controller
{
    abstract protected function model(): string;
    abstract protected function routeName(): string;
    abstract protected function viewName(): string;
    abstract protected function itemName(): string;



    protected function resource(): ?string
    {
        return null; // subclasses can override
    }

    protected function baseQuery()
    {
        $model = $this->model();

        return $model::onlyTrashed()
            ->where('tenant_id', auth()->user()->tenant_id);
    }


    public function index(): Response
    {
        $deleted = $this->baseQuery()
            ->latest('deleted_at')
            ->paginate(20);

        $resourceClass = $this->resource();

        $items = $resourceClass
            ? $resourceClass::collection($deleted)
            : $deleted;

        return Inertia::render($this->viewName(), [
            'deletedItems' => $items,
        ]);
    }

    public function restore($id): RedirectResponse
    {
        $model = $this->model();

        $item = $model::onlyTrashed()
            ->where('tenant_id', auth()->user()->tenant_id)
            ->findOrFail($id);

        $item->restore();

        return redirect()
            ->route($this->routeName())
            ->with('success', "{$this->itemName()} restored.");
    }

    public function forceDelete($id): RedirectResponse
    {
        abort_if(
            !auth()->user()->isAdmin() && !auth()->user()->isManager(),
            403
        );

        $model = $this->model();

        $item = $model::onlyTrashed()
            ->where('tenant_id', auth()->user()->tenant_id)
            ->findOrFail($id);

        $item->forceDelete();

        return redirect()
            ->route($this->routeName())
            ->with('success', "{$this->itemName()} permanently deleted.");
    }
}
