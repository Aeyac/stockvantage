<?php
// app/Events/PurchaseRequestUpdated.php

namespace App\Events;

use App\Models\PurchaseRequest;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class PurchaseRequestUpdated implements ShouldBroadcast
{
    use SerializesModels;


    public function __construct(
        public PurchaseRequest $purchaseRequest,
        public string $action,
        public string $actorName
    ) {}

    public function broadcastOn(): array
    {
        return [new PrivateChannel("tenant.{$this->purchaseRequest->tenant_id}.purchase-requests")];
    }

    public function broadcastAs(): string
    {
        return 'purchase-request.updated';
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->purchaseRequest->id,
            'status' => $this->purchaseRequest->status,
            'action' => $this->action,
            'updated_by' => $this->actorName, // passed in constructor instead of db access directly
        ];
    }
}