export const LOCALES = 'de-DE';
export const CURRENCY = 'EUR';

export function formatCurrency(price: number) {
    return new Intl.NumberFormat(LOCALES, { style: 'currency', currency: CURRENCY }).format(price / 100);
}
