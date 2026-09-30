import { useLocation } from 'react-router-dom';
import { Sun, Moon, Menu } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface HeaderProps {
  onMenuToggle: () => void;
}

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/expenses': 'Expenses',
  '/budget': 'Budget',
  '/reports': 'Reports & Analytics',
  '/settings': 'Settings',
};

export function Header({ onMenuToggle }: HeaderProps) {
  const { theme, toggleTheme } = useStore();
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Expense Tracker';

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800 md:px-6 md:py-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:hidden"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white md:text-xl">
          {title}
        </h1>
      </div>
      <button
        onClick={toggleTheme}
        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </header>
  );
}
