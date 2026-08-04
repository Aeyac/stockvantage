<?php

use Illuminate\Support\Facades\Broadcast;

// Laravel default — per-user private channel, powers dropdown notifications
Broadcast::channel('App.Models.User.{id}', function ($user, $tenantId) {
    return (int) $user->id === (int) $tenantId;
});

// Yours — per-tenant channel, powers live team-wide updates
Broadcast::channel('tenant.{tenantId}.purchase-requests', function ($user, $tenantId) {
    return (int) $user->tenant_id === (int) $tenantId;
});


Broadcast::channel('tenant.{tenantId}.approvals', function ($user, $tenantId) {
    return (int) $user->tenant_id === (int) $tenantId
        && $user->isAdmin && $user->isManager;
});