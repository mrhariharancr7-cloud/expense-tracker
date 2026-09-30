import type { Category } from '../../types';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '../../types';

interface BadgeProps {
  category: Category;
}

export function Badge({ category }: BadgeProps) {
  const color = CATEGORY_COLORS[category];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{
        backgroundColor: `${color}18`,
        color: color,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {CATEGORY_LABELS[category]}
    </span>
  );
}
