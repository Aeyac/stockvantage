<?php

namespace App\Http\Controllers;

use App\Models\StockLedger;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class StockLedgerController extends Controller
{


    public function index(Request $request): Response
    {
        $this->abortUnlessRole(['tenant_admin', 'department_manager']);

        $query = StockLedger::query()->with(['warehouse', 'catalogItem', 'performer'])
            ->search($request->search)
            ->filterStatus($request->status);

        $stockLedgers = $query->latest()->orderByDesc('created_at')->paginate(15)->withQueryString();

        return Inertia::render('StockLedgers/Index', [
            'stockLedgers' => $stockLedgers,
            'filters' => $request->only(['search', 'status']),
        ]);
    }


}
