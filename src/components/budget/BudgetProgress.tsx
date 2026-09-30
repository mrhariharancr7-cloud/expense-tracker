import { Trash2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useStore } from '../../store/useStore';
import { useFormatCurrency } from '../../hooks/useFormatCurrency';
import { getMonthKey } from '../../utils/filter';
import { CATEGORIES } from '../../types';
import type { Category } from '../../types';

export function BudgetProgress() {
  const { expenses, budgets, removeBudget } = useStore();
  const formatCurrency = useFormatCurrency();
  const currentMonth = getMonthKey(new Date().toISOString());

  const monthExpenses = expenses.filter(
    (e) => getMonthKey(e.date) === currentMonth
  );

  const totalSpent = monthExpenses.reduce((s, e) => s + e.amount, 0);
  const overallBudget = budgets.find(
    (b) => b.category === 'overall' && b.month === currentMonth
  );

  const categoryBudgets = budgets.filter(
    (b) =>
      b.category !== 'overall' &&
      b.month === currentMonth &&
      CATEGORIES.includes(b.category as Category)
  );

  return (
    <div className="space-y-3 md:space-y-4">
      {overallBudget && (
        <Card className="px-4 py-4 md:px-6 md:py-6">
          <div className="mb-2 flex items-center justify-between md:mb-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white md:text-base">
              Overall Budget
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 md:text-sm">
                {formatCurrency(totalSpent)} / {formatCurrency(overallBudget.amount)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeBudget('overall', currentMonth)}
              >
                <Trash2 size={14} className="text-red-500 md:size-4" />
              </Button>
            </div>
          </div>
          <ProgressBar value={totalSpent} max={overallBudget.amount} />
        </Card>
      )}

      {categoryBudgets.map((budget) => {
        const spent = monthExpenses
          .filter((e) => e.category === budget.category)
          .reduce((s, e) => s + e.amount, 0);

        return (
          <Card key={budget.category} className="px-4 py-4 md:px-6 md:py-6">
            <div className="mb-2 flex items-center justify-between md:mb-3">
              <Badge category={budget.category as Category} />
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 md:text-sm">
                  {formatCurrency(spent)} / {formatCurrency(budget.amount)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeBudget(budget.category, currentMonth)}
                >
                  <Trash2 size={14} className="text-red-500 md:size-4" />
                </Button>
              </div>
            </div>
            <ProgressBar value={spent} max={budget.amount} />
          </Card>
        );
      })}

      {!overallBudget && categoryBudgets.length === 0 && (
        <p className="py-6 text-center text-sm text-gray-400 md:py-8">
          No budgets set for this month. Add one above!
        </p>
      )}
    </div>
  );
}
