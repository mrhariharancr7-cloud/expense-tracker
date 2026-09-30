import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { Expense, Budget, Filters } from '../types';

interface AppState {
  expenses: Expense[];
  budgets: Budget[];
  filters: Filters;
  theme: 'light' | 'dark';
  currency: string;

  addExpense: (data: Omit<Expense, 'id' | 'createdAt'>) => void;
  updateExpense: (id: string, data: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  setBudget: (budget: Budget) => void;
  removeBudget: (category: string, month: string) => void;
  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;
  toggleTheme: () => void;
  setCurrency: (c: string) => void;
  clearAll: () => void;
}

const defaultFilters: Filters = {
  dateRange: null,
  categories: [],
  search: '',
  sortBy: 'date',
  sortOrder: 'desc',
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      expenses: [],
      budgets: [],
      filters: defaultFilters,
      theme: 'light',
      currency: 'USD',

      addExpense: (data) =>
        set((state) => ({
          expenses: [
            {
              ...data,
              id: uuidv4(),
              createdAt: new Date().toISOString(),
            },
            ...state.expenses,
          ],
        })),

      updateExpense: (id, data) =>
        set((state) => ({
          expenses: state.expenses.map((e) =>
            e.id === id ? { ...e, ...data } : e
          ),
        })),

      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),

      setBudget: (budget) =>
        set((state) => {
          const idx = state.budgets.findIndex(
            (b) => b.category === budget.category && b.month === budget.month
          );
          const newBudget: Budget = {
            category: budget.category,
            amount: budget.amount,
            month: budget.month,
          };
          if (idx >= 0) {
            const updated = [...state.budgets];
            updated[idx] = newBudget;
            return { budgets: updated };
          }
          return { budgets: [...state.budgets, newBudget] };
        }),

      removeBudget: (category, month) =>
        set((state) => ({
          budgets: state.budgets.filter(
            (b) => !(b.category === category && b.month === month)
          ),
        })),

      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),

      resetFilters: () => set({ filters: defaultFilters }),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      setCurrency: (currency) => set({ currency }),

      clearAll: () => set({ expenses: [], budgets: [] }),
    }),
    {
      name: 'expense-tracker-store',
    }
  )
);
