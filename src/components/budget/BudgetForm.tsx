import { useState } from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useStore } from '../../store/useStore';
import { CATEGORIES, CATEGORY_LABELS } from '../../types';
import type { Category } from '../../types';

interface BudgetFormProps {
  onClose: () => void;
}

const categoryOptions = [
  { value: 'overall', label: 'Overall Budget' },
  ...CATEGORIES.map((c) => ({ value: c, label: CATEGORY_LABELS[c] })),
];

export function BudgetForm({ onClose }: BudgetFormProps) {
  const setBudget = useStore((s) => s.setBudget);
  const currentMonth = new Date().toISOString().slice(0, 7);

  const [category, setCategory] = useState<string>('overall');
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState(currentMonth);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return;

    setBudget({
      category: category as Category | 'overall',
      amount: Number(amount),
      month,
    });
    onClose();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Category"
        options={categoryOptions}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <Input
        label="Budget Amount"
        type="number"
        step="0.01"
        placeholder="0.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Input
        label="Month"
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Set Budget</Button>
      </div>
    </form>
  );
}
