import { usePage } from '@inertiajs/react'

export function useAuth() {
    const { auth, settings } = usePage().props
    const user = auth.user

    return {
        user,
        isAdmin: user.role === 'tenant_admin',
        isManager: user.role === 'department_manager',
        isWarehouse: user.role === 'warehouse_staff',
        isEmployee: user.role === 'employee',
        hasRole: (...roles) => roles.includes(user.role),
        currencySymbol: settings?.currency_symbol ?? '₱',
        approvalThreshold: settings?.approval_threshold ?? 50.00,
    }
}