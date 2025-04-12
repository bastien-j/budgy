export function numberToCurrency(value: number) {
  return new Intl.NumberFormat(undefined, {
    currency: 'EUR',
    currencyDisplay: 'narrowSymbol',
    style: 'currency',
  }).format(value)
}
