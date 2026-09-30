import { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { ExpenseForm } from '../components/expenses/ExpenseForm';
import { ExpenseFilters } from '../components/expenses/ExpenseFilters';
import { ExpenseList } from '../components/expenses/ExpenseList';
import { useStore } from '../store/useStore';
import { filterExpenses } from '../utils/filter';
import { exportToCSV } from '../utils/export';

export function Expenses() {
  const [showForm, setShowForm] = useState(false);
  const { expenses, filters } = useStore();

  const filtered = filterExpenses(expenses, filters);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
            Expenses
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filtered.length} of {expenses.length} transactions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => exportToCSV(filtered)}
            disabled={filtered.length === 0}
          >
            <Download size={16} />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>
          <Button size="sm" onClick={() => setShowForm(true)}>
            <Plus size={16} />
            <span className="hidden sm:inline">Add Expense</span>
          </Button>
        </div>
      </div>

      <ExpenseFilters />
      <ExpenseList />

      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title="Add Expense"
      >
        <ExpenseForm onClose={() => setShowForm(false)} />
      </Modal>
    </div>
  );
}
