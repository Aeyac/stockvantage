import { useEffect } from "react";
export function usePurchaseRequestChannel(
    tenantId,
    { onUpdate, onLocked } = {},
) {
    useEffect(() => {
        if (!tenantId) return;

        const channelName = `tenant.${tenantId}.purchase-requests`;
        const channel = window.Echo.private(channelName);
console.log('📡 SUBSCRIBING to', channelName, '| Echo connection ID:', window.Echo.socketId());
        if (onUpdate) {
            channel.listen(".purchase-request.updated", (event) =>
                onUpdate(event),
            );
        }
        if (onLocked) {
            channel.listen(".purchase-request.locked", (event) =>
                onLocked(event),
            );
        }
        return () => {
           console.log('👋 LEAVING', channelName, '| Echo connection ID at leave time:', window.Echo.socketId());
            window.Echo.leave(channelName);
        };
    }, [tenantId]);
}
