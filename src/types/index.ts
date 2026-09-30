export type Category =
  | 'food'
  | 'transport'
  | 'utilities'
  | 'entertainment'
  | 'shopping'
  | 'health'
  | 'education'
  | 'other';

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  description: string;
  date: string;
  isRecurring: boolean;
  recurringInterval?: 'weekly' | 'monthly' | 'yearly';
  createdAt: string;
}

export interface Budget {
  category: Category | 'overall';
  amount: number;
  month: string;
}

export interface Filters {
  dateRange: [string, string] | null;
  categories: Category[];
  search: string;
  sortBy: 'date' | 'amount' | 'category';
  sortOrder: 'asc' | 'desc';
}

export const CATEGORIES: Category[] = [
  'food',
  'transport',
  'utilities',
  'entertainment',
  'shopping',
  'health',
  'education',
  'other',
];

export const CATEGORY_LABELS: Record<Category, string> = {
  food: 'Food & Dining',
  transport: 'Transport',
  utilities: 'Utilities',
  entertainment: 'Entertainment',
  shopping: 'Shopping',
  health: 'Health',
  education: 'Education',
  other: 'Other',
};

export const CATEGORY_COLORS: Record<Category, string> = {
  food: '#ef4444',
  transport: '#f59e0b',
  utilities: '#3b82f6',
  entertainment: '#8b5cf6',
  shopping: '#ec4899',
  health: '#22c55e',
  education: '#14b8a6',
  other: '#6b7280',
};
