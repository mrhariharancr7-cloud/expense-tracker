import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { BudgetAlertBanner } from '../components/budget/BudgetAlertBanner';
import { CategoryPieChart } from '../components/charts/CategoryPieChart';
import { DailyBarChart } from '../components/charts/DailyBarChart';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useStore } from '../store/useStore';
import { useFormatCurrency } from '../hooks/useFormatCurrency';
import { getMonthKey } from '../utils/filter';
import { currentMonthKey, prevMonthKey } from '../utils/date';
import { formatDate } from '../utils/format';
import { CATEGORIES, CATEGORY_LABELS } from '../types';
import type { Category } from '../types';

export function Dashboard() {
  const { expenses } = useStore();
  const formatCurrency = useFormatCurrency();
  const currentMonth = currentMonthKey();
  const prevMonth = prevMonthKey();

  const monthExpenses = expenses.filter(
    (e) => getMonthKey(e.date) === currentMonth
  );
  const lastMonthExpenses = expenses.filter(
    (e) => getMonthKey(e.date) === prevMonth
  );

  const totalMonth = monthExpenses.reduce((s, e) => s + e.amount, 0);
  const totalLastMonth = lastMonthExpenses.reduce((s, e) => s + e.amount, 0);

  const avgDaily =
    monthExpenses.length > 0
      ? totalMonth / new Date().getDate()
      : 0;

  const totalsByCategory: Partial<Record<Category, number>> = {};
  for (const e of monthExpenses) {
    totalsByCategory[e.category] =
      (totalsByCategory[e.category] ?? 0) + e.amount;
  }
  const topCategory = CATEGORIES.reduce<{
    category: Category | null;
    amount: number;
  }>(
    (best, cat) => {
      const amt = totalsByCategory[cat] ?? 0;
      return amt > best.amount ? { category: cat, amount: amt } : best;
    },
    { category: null, amount: 0 }
  );

  const monthChange =
    totalLastMonth > 0
      ? ((totalMonth - totalLastMonth) / totalLastMonth) * 100
      : 0;

  const recentExpenses = [...expenses]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <div className="space-y-4 md:space-y-6">
      <BudgetAlertBanner />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4">
        <StatCard
          title="This Month"
          value={formatCurrency(totalMonth)}
          icon={<Wallet size={20} className="md:size-6" />}
          trend={{
            value: `${Math.abs(monthChange).toFixed(1)}%`,
            positive: monthChange <= 0,
          }}
        />
        <StatCard
          title="Daily Average"
          value={formatCurrency(avgDaily)}
          icon={<TrendingUp size={20} className="md:size-6" />}
        />
        <StatCard
          title="Top Category"
          value={
            topCategory.category
              ? CATEGORY_LABELS[topCategory.category]
              : 'N/A'
          }
          icon={<TrendingDown size={20} className="md:size-6" />}
        />
        <StatCard
          title="Transactions"
          value={monthExpenses.length.toString()}
          icon={<PiggyBank size={20} className="md:size-6" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <Card className="px-4 py-4 md:px-6 md:py-6">
          <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white md:mb-4 md:text-lg">
            Spending by Category
          </h3>
          <CategoryPieChart expenses={monthExpenses} />
        </Card>
        <Card className="px-4 py-4 md:px-6 md:py-6">
          <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white md:mb-4 md:text-lg">
            Daily Spending
          </h3>
          <DailyBarChart expenses={monthExpenses} />
        </Card>
      </div>

      <Card className="px-4 py-4 md:px-6 md:py-6">
        <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white md:mb-4 md:text-lg">
          Recent Transactions
        </h3>
        {recentExpenses.length === 0 ? (
          <p className="py-4 text-center text-sm text-gray-400">
            No transactions yet
          </p>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {recentExpenses.map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between py-2.5 md:py-3"
              >
                <div className="flex min-w-0 items-center gap-2 md:gap-3">
                  <Badge category={e.category} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {e.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(e.date)}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-sm font-semibold text-gray-900 dark:text-white md:text-base">
                  {formatCurrency(e.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
