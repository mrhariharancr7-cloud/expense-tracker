import { useState } from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { CATEGORIES, CATEGORY_LABELS } from '../../types';
import { useStore } from '../../store/useStore';
import { todayISO } from '../../utils/date';
import type { Category, Expense } from '../../types';

interface ExpenseFormProps {
  onClose: () => void;
  editExpense?: Expense;
}

const categoryOptions = CATEGORIES.map((c) => ({
  value: c,
  label: CATEGORY_LABELS[c],
}));

export function ExpenseForm({ onClose, editExpense }: ExpenseFormProps) {
  const addExpense = useStore((s) => s.addExpense);
  const updateExpense = useStore((s) => s.updateExpense);

  const [form, setForm] = useState({
    amount: editExpense?.amount.toString() || '',
    category: editExpense?.category || 'food' as Category,
    description: editExpense?.description || '',
    date: editExpense?.date || todayISO(),
    isRecurring: editExpense?.isRecurring || false,
    recurringInterval: editExpense?.recurringInterval || undefined as 'weekly' | 'monthly' | 'yearly' | undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
      errs.amount = 'Enter a valid amount';
    }
    if (!form.description.trim()) errs.description = 'Description is required';
    if (!form.date) errs.date = 'Date is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      amount: Number(form.amount),
      category: form.category,
      description: form.description.trim(),
      date: form.date,
      isRecurring: form.isRecurring,
      recurringInterval: form.isRecurring ? form.recurringInterval : undefined,
    };

    if (editExpense) {
      updateExpense(editExpense.id, data);
    } else {
      addExpense(data);
    }
    onClose();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Amount"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          error={errors.amount}
        />
        <Select
          label="Category"
          options={categoryOptions}
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value as Category })
          }
        />
      </div>
      <Input
        label="Description"
        placeholder="What was this for?"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        error={errors.description}
      />
      <Input
        label="Date"
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        error={errors.date}
      />
      <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
        <input
          type="checkbox"
          checked={form.isRecurring}
          onChange={(e) =>
            setForm({ ...form, isRecurring: e.target.checked })
          }
          className="rounded border-gray-300"
        />
        Recurring expense
      </label>
      {form.isRecurring && (
        <Select
          label="Repeat every"
          options={[
            { value: 'weekly', label: 'Week' },
            { value: 'monthly', label: 'Month' },
            { value: 'yearly', label: 'Year' },
          ]}
          value={form.recurringInterval || 'monthly'}
          onChange={(e) =>
            setForm({
              ...form,
              recurringInterval: e.target.value as 'weekly' | 'monthly' | 'yearly',
            })
          }
        />
      )}
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">{editExpense ? 'Update' : 'Add'} Expense</Button>
      </div>
    </form>
  );
}
