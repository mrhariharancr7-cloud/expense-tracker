import type { Expense } from '../types';
import { CATEGORY_LABELS } from '../types';

export function exportToCSV(expenses: Expense[]): void {
  const headers = ['Date', 'Description', 'Category', 'Amount', 'Recurring'];
  const rows = expenses.map((e) => [
    e.date,
    `"${e.description}"`,
    CATEGORY_LABELS[e.category],
    e.amount.toFixed(2),
    e.isRecurring ? 'Yes' : 'No',
  ]);

  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `expenses-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
