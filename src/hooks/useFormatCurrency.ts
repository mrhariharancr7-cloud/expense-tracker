import { useCallback, useMemo } from 'react';
import { useStore } from '../store/useStore';

export function useFormatCurrency() {
  const currency = useStore((s) => s.currency);

  return useCallback(
    (amount: number) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
      }).format(amount),
    [currency]
  );
}

export function useCurrencySymbol() {
  const currency = useStore((s) => s.currency);

  return useMemo(() => {
    const parts = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).formatToParts(0);
    return parts.find((p) => p.type === 'currency')?.value ?? '$';
  }, [currency]);
}
