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
        $stockLedger = StockLedger::query()
            ->orderByDesc('created_at')
            ->paginate(15);

        return Inertia::render('Suppliers/Index', [
            'stockLedger' => $stockLedger,
        ]);

    }
}
