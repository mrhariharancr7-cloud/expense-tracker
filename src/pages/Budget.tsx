import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { BudgetForm } from '../components/budget/BudgetForm';
import { BudgetProgress } from '../components/budget/BudgetProgress';
import { BudgetAlertBanner } from '../components/budget/BudgetAlertBanner';

export function Budget() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-4 md:space-y-6">
      <BudgetAlertBanner />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
            Budget Management
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Set and track your monthly spending limits
          </p>
        </div>
        <Button size="sm" onClick={() => setShowForm(true)}>
          <Plus size={16} />
          Set Budget
        </Button>
      </div>

      <BudgetProgress />

      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title="Set Budget"
      >
        <BudgetForm onClose={() => setShowForm(false)} />
      </Modal>
    </div>
  );
}
