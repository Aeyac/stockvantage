import { useAuth } from "./useAuth";

// const currencySymbols = {
//     USD: '$',
//     PHP: '₱',
//     EUR: '€',
//     GBP: '£',
// };

// export const useSymbol = (currency) => {
//     return currencySymbols[currency] || '';
// }


export function formatCurrency(value) {
    const { currencySymbol } = useAuth();

    return currencySymbol + parseFloat(value).toLocaleString('en-PH', {
        minimumFractionDigits: 2, maximumFractionDigits: 2,
    })
}