import { Search, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { useStore } from '../../store/useStore';
import { CATEGORIES, CATEGORY_LABELS } from '../../types';
import type { Category } from '../../types';

export function ExpenseFilters() {
  const { filters, setFilters, resetFilters } = useStore();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="relative flex-1 min-w-[200px]">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search expenses..."
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3">
        <Select
          options={[
            { value: '', label: 'All Categories' },
            ...CATEGORIES.map((c) => ({
              value: c,
              label: CATEGORY_LABELS[c],
            })),
          ]}
          value={
            filters.categories.length === 1 ? filters.categories[0] : ''
          }
          onChange={(e) =>
            setFilters({
              categories: e.target.value ? [e.target.value as Category] : [],
            })
          }
        />
        <Select
          options={[
            { value: 'date', label: 'Sort by Date' },
            { value: 'amount', label: 'Sort by Amount' },
            { value: 'category', label: 'Sort by Category' },
          ]}
          value={filters.sortBy}
          onChange={(e) =>
            setFilters({
              sortBy: e.target.value as 'date' | 'amount' | 'category',
            })
          }
        />
        <Select
          options={[
            { value: 'desc', label: 'Newest First' },
            { value: 'asc', label: 'Oldest First' },
          ]}
          value={filters.sortOrder}
          onChange={(e) =>
            setFilters({ sortOrder: e.target.value as 'asc' | 'desc' })
          }
        />
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          <RotateCcw size={16} />
          Reset
        </Button>
      </div>
    </div>
  );
}
