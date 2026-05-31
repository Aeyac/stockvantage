const currencySymbols = {
    USD: '$',
    PHP: '₱',
    EUR: '€',
    GBP: '£',
};

export const useSymbol = (currency) => {
    return currencySymbols[currency] || '';
}