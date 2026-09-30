import { format, parseISO } from 'date-fns';

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return format(parseISO(dateStr), 'MMM d, yyyy');
}

export function formatMonth(dateStr: string): string {
  return format(parseISO(dateStr), 'MMM yyyy');
}

export function formatDay(dateStr: string): string {
  return format(parseISO(dateStr), 'MMM d');
}
