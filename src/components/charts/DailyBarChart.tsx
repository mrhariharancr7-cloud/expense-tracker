import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { parseISO, format } from 'date-fns';
import type { Expense } from '../../types';
import { useFormatCurrency, useCurrencySymbol } from '../../hooks/useFormatCurrency';

interface Props {
  expenses: Expense[];
}

export function DailyBarChart({ expenses }: Props) {
  const formatCurrency = useFormatCurrency();
  const symbol = useCurrencySymbol();
  const grouped: Record<string, number> = {};
  const sorted = [...expenses].sort(
    (a, b) => a.date.localeCompare(b.date)
  );

  for (const e of sorted) {
    grouped[e.date] = (grouped[e.date] || 0) + e.amount;
  }

  const data = Object.entries(grouped).map(([date, total]) => ({
    date: format(parseISO(date), 'MMM d'),
    total,
  }));

  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-400">
        No data to display
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
        <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `${symbol}${v}`} />
        <Tooltip formatter={(v) => formatCurrency(Number(v))} />
        <Bar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
