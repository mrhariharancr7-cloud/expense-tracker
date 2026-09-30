import { Sun, Moon, Trash2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { useStore } from '../store/useStore';

const currencies = [
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'GBP', label: 'GBP - British Pound' },
  { value: 'JPY', label: 'JPY - Japanese Yen' },
  { value: 'INR', label: 'INR - Indian Rupee' },
  { value: 'CAD', label: 'CAD - Canadian Dollar' },
  { value: 'AUD', label: 'AUD - Australian Dollar' },
];

export function Settings() {
  const { theme, toggleTheme, currency, setCurrency, clearAll, expenses } =
    useStore();

  return (
    <div className="space-y-4 md:max-w-2xl md:space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
          Settings
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Customize your experience
        </p>
      </div>

      <Card className="px-4 py-4 md:px-6 md:py-6">
        <h3 className="mb-4 text-base font-semibold text-gray-900 dark:text-white md:text-lg">
          Appearance
        </h3>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white md:text-base">
              Dark Mode
            </p>
            <p className="text-xs text-gray-500 md:text-sm">
              Toggle between light and dark themes
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            {theme === 'light' ? ' Dark' : ' Light'}
          </Button>
        </div>
      </Card>

      <Card className="px-4 py-4 md:px-6 md:py-6">
        <h3 className="mb-4 text-base font-semibold text-gray-900 dark:text-white md:text-lg">
          Currency
        </h3>
        <Select
          label="Display Currency"
          options={currencies}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        />
      </Card>

      <Card className="px-4 py-4 md:px-6 md:py-6">
        <h3 className="mb-4 text-base font-semibold text-red-600 dark:text-red-400 md:text-lg">
          Danger Zone
        </h3>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white md:text-base">
              Clear All Data
            </p>
            <p className="text-xs text-gray-500 md:text-sm">
              Permanently delete all {expenses.length} expenses and budgets
            </p>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              if (
                window.confirm(
                  'Are you sure? This will delete all your data permanently.'
                )
              ) {
                clearAll();
              }
            }}
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Clear All</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
