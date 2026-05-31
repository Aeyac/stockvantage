import { useAuth } from "@/hooks/useAuth";




export default function formatCurrency(value) {
    const { currencySymbol } = useAuth();

    return currencySymbol + parseFloat(value).toLocaleString('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}