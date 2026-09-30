import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import type { Expense } from '../../types';
import { CATEGORIES, CATEGORY_COLORS, CATEGORY_LABELS } from '../../types';
import { useFormatCurrency } from '../../hooks/useFormatCurrency';

interface Props {
  expenses: Expense[];
}

export function CategoryPieChart({ expenses }: Props) {
  const formatCurrency = useFormatCurrency();
  const data = CATEGORIES.map((cat) => {
    const total = expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0);
    return { name: CATEGORY_LABELS[cat], value: total, color: CATEGORY_COLORS[cat] };
  }).filter((d) => d.value > 0);

  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-400">
        No data to display
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(v) => formatCurrency(Number(v))} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
