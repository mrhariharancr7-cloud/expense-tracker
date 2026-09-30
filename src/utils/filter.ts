import { startOfMonth, endOfMonth, parseISO, isWithinInterval } from 'date-fns';
import type { Expense, Filters } from '../types';

export function filterExpenses(expenses: Expense[], filters: Filters): Expense[] {
  let filtered = [...expenses];

  if (filters.dateRange) {
    const [start, end] = filters.dateRange;
    const startDate = parseISO(start);
    const endDate = parseISO(end);
    filtered = filtered.filter((e) => {
      const d = parseISO(e.date);
      return isWithinInterval(d, { start: startDate, end: endDate });
    });
  }

  if (filters.categories.length > 0) {
    filtered = filtered.filter((e) => filters.categories.includes(e.category));
  }

  if (filters.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter(
      (e) =>
        e.description.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
    );
  }

  filtered.sort((a, b) => {
    let cmp = 0;
    if (filters.sortBy === 'date') cmp = a.date.localeCompare(b.date);
    else if (filters.sortBy === 'amount') cmp = a.amount - b.amount;
    else if (filters.sortBy === 'category') cmp = a.category.localeCompare(b.category);
    return filters.sortOrder === 'asc' ? cmp : -cmp;
  });

  return filtered;
}

export function getMonthRange(dateStr: string): { start: string; end: string } {
  const d = parseISO(dateStr);
  return {
    start: startOfMonth(d).toISOString().split('T')[0],
    end: endOfMonth(d).toISOString().split('T')[0],
  };
}

export function getMonthKey(dateStr: string): string {
  return dateStr.slice(0, 7);
}
