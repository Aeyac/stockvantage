<?php

namespace App\Mail;

use App\Models\PurchaseOrder;
use App\Models\TenantSetting;
use Illuminate\Bus\Queueable;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SupplierPurchaseOrderMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $purchaseOrder;
    public $companyName;


    public function __construct(PurchaseOrder $purchaseOrder)
    {
        $this->purchaseOrder = $purchaseOrder;

        $this->companyName = TenantSetting::where('id', auth()->user()->tenant_id)->value('company_name')
            ?? config('app.name', 'StockVantage');
    }


    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "[PO-{$this->purchaseOrder->po_number}] New Purchase Order from {$this->companyName}",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.supplier-purchase-order',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        $this->purchaseOrder->load([
            'purchaseRequest.lineItems.catalogItem.supplier',
            'purchaseRequest.requester'
        ]);

        $pdf = Pdf::loadView('pdf.purchase-order', [
            'purchaseOrder' => $this->purchaseOrder,
            'companyName' => $this->companyName,
        ]);

        return [
            Attachment::fromData(fn() => $pdf->output(), "PO-{$this->purchaseOrder->po_number}.pdf")
                ->withMime('application/pdf'),
        ];

    }
}
