import { useState } from 'react';
import { Pencil, Trash2, Repeat } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { ExpenseForm } from './ExpenseForm';
import { useStore } from '../../store/useStore';
import { useFormatCurrency } from '../../hooks/useFormatCurrency';
import { formatDate } from '../../utils/format';
import { filterExpenses } from '../../utils/filter';
import type { Expense } from '../../types';

const intervalLabels = {
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Yearly',
} as const;

export function ExpenseList() {
  const { expenses, filters, deleteExpense } = useStore();
  const formatCurrency = useFormatCurrency();
  const [editing, setEditing] = useState<Expense | null>(null);

  const filtered = filterExpenses(expenses, filters);

  if (filtered.length === 0) {
    return (
      <Card>
        <div className="flex flex-col items-center gap-2 py-8 text-gray-400 md:py-12">
          <p className="text-base font-medium md:text-lg">No expenses found</p>
          <p className="text-xs md:text-sm">
            {expenses.length === 0
              ? 'Add your first expense to get started'
              : 'Try adjusting your filters'}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-2 md:space-y-3">
        {filtered.map((expense) => (
          <Card key={expense.id} className="py-3 md:py-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Badge category={expense.category} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {expense.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(expense.date)}
                    {expense.isRecurring && expense.recurringInterval && (
                      <span className="ml-1.5 inline-flex items-center gap-0.5 text-indigo-500 dark:text-indigo-400">
                        <Repeat size={10} className="inline" />
                        {intervalLabels[expense.recurringInterval]}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1 md:gap-3">
                <span className="text-sm font-semibold text-gray-900 dark:text-white md:text-lg">
                  {formatCurrency(expense.amount)}
                </span>
                <Button variant="ghost" size="sm" onClick={() => setEditing(expense)} aria-label={`Edit ${expense.description}`}>
                  <Pencil size={14} className="md:size-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deleteExpense(expense.id)} aria-label={`Delete ${expense.description}`}>
                  <Trash2 size={14} className="text-red-500 md:size-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title="Edit Expense"
      >
        {editing && (
          <ExpenseForm
            editExpense={editing}
            onClose={() => setEditing(null)}
          />
        )}
      </Modal>
    </>
  );
}
