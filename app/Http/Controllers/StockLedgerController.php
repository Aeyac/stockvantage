<?php

namespace App\Http\Controllers;

use App\Models\StockLedger;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class StockLedgerController extends Controller
{


    public function index(): Response
    {
        $this->abortUnlessRole(['tenant_admin', 'department_manager']);

        $stockLedgers = StockLedger::query()
            ->with(['warehouse', 'catalogItem', 'performer'])
            ->orderByDesc('created_at')
            ->paginate(15);

        return Inertia::render('StockLedgers/Index', [
            'stockLedgers' => $stockLedgers,
        ]);
    }


}
