import { Card } from '../components/ui/Card';
import { CategoryPieChart } from '../components/charts/CategoryPieChart';
import { TrendLineChart } from '../components/charts/TrendLineChart';
import { DailyBarChart } from '../components/charts/DailyBarChart';
import { useStore } from '../store/useStore';

export function Reports() {
  const { expenses } = useStore();

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
          Reports & Analytics
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Visualize your spending patterns
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <Card className="px-4 py-4 md:px-6 md:py-6">
          <h3 className="mb-2 text-base font-semibold text-gray-900 dark:text-white md:mb-4 md:text-lg">
            Category Breakdown
          </h3>
          <p className="mb-3 text-xs text-gray-500 md:mb-4 md:text-sm">
            How your spending is distributed
          </p>
          <CategoryPieChart expenses={expenses} />
        </Card>

        <Card className="px-4 py-4 md:px-6 md:py-6">
          <h3 className="mb-2 text-base font-semibold text-gray-900 dark:text-white md:mb-4 md:text-lg">
            Monthly Trend
          </h3>
          <p className="mb-3 text-xs text-gray-500 md:mb-4 md:text-sm">
            Total spending per month over time
          </p>
          <TrendLineChart expenses={expenses} />
        </Card>

        <Card className="px-4 py-4 md:px-6 md:py-6 lg:col-span-2">
          <h3 className="mb-2 text-base font-semibold text-gray-900 dark:text-white md:mb-4 md:text-lg">
            Daily Spending
          </h3>
          <p className="mb-3 text-xs text-gray-500 md:mb-4 md:text-sm">
            Daily expense amounts across all transactions
          </p>
          <DailyBarChart expenses={expenses} />
        </Card>
      </div>
    </div>
  );
}
