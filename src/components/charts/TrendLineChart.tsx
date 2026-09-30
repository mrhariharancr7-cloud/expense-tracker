import {
  LineChart,
  Line,
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

export function TrendLineChart({ expenses }: Props) {
  const formatCurrency = useFormatCurrency();
  const symbol = useCurrencySymbol();
  const grouped: Record<string, number> = {};
  const sorted = [...expenses].sort(
    (a, b) => a.date.localeCompare(b.date)
  );

  for (const e of sorted) {
    const key = e.date.slice(0, 7);
    grouped[key] = (grouped[key] || 0) + e.amount;
  }

  const data = Object.entries(grouped).map(([month, total]) => ({
    month: format(parseISO(`${month}-01`), 'MMM yyyy'),
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
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
        <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `${symbol}${v}`} />
        <Tooltip formatter={(v) => formatCurrency(Number(v))} />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#6366f1"
          strokeWidth={2}
          dot={{ fill: '#6366f1', r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
