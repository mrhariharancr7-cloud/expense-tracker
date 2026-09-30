import { AlertTriangle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useFormatCurrency } from '../../hooks/useFormatCurrency';
import { getMonthKey } from '../../utils/filter';

export function BudgetAlertBanner() {
  const { expenses, budgets } = useStore();
  const formatCurrency = useFormatCurrency();
  const currentMonth = getMonthKey(new Date().toISOString());

  const monthExpenses = expenses.filter(
    (e) => getMonthKey(e.date) === currentMonth
  );
  const totalSpent = monthExpenses.reduce((s, e) => s + e.amount, 0);

  const overallBudget = budgets.find(
    (b) => b.category === 'overall' && b.month === currentMonth
  );

  if (!overallBudget) return null;

  const pct = (totalSpent / overallBudget.amount) * 100;

  if (pct < 80) return null;

  const isOver = pct >= 100;

  return (
    <div
      className={`flex items-start gap-3 rounded-lg border px-3 py-3 md:items-center md:px-4 ${
        isOver
          ? 'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300'
          : 'border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      }`}
    >
      <AlertTriangle size={18} className="mt-0.5 shrink-0 md:mt-0" />
      <p className="text-xs font-medium md:text-sm">
        {isOver
          ? `Budget exceeded! You've spent ${formatCurrency(totalSpent)} of ${formatCurrency(overallBudget.amount)}`
          : `Budget warning: You've spent ${Math.round(pct)}% (${formatCurrency(totalSpent)} of ${formatCurrency(overallBudget.amount)})`}
      </p>
    </div>
  );
}
