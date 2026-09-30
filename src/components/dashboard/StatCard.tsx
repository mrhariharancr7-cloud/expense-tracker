import type { ReactNode } from 'react';
import { Card } from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: { value: string; positive: boolean };
}

export function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <Card className="flex items-center gap-3 px-4 py-4 md:gap-4 md:px-6 md:py-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 md:h-12 md:w-12">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 dark:text-gray-400 md:text-sm">
          {title}
        </p>
        <p className="text-lg font-bold text-gray-900 dark:text-white md:text-2xl">
          {value}
        </p>
        {trend && (
          <p
            className={`text-xs ${
              trend.positive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {trend.positive ? '↑' : '↓'} {trend.value} vs last month
          </p>
        )}
      </div>
    </Card>
  );
}
