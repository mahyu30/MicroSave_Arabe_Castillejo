import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './ui/Button';
import { NotificationBell } from './NotificationBell';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-18">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                  MicroSave
                </span>
              </Link>
              <div className="ml-12 flex space-x-1">
                <Link href="/dashboard" className="px-4 py-2 rounded-xl text-gray-700 hover:text-green-700 hover:bg-green-50 transition-all duration-200 font-medium">
                  Dashboard
                </Link>
                <Link href="/groups" className="px-4 py-2 rounded-xl text-gray-700 hover:text-green-700 hover:bg-green-50 transition-all duration-200 font-medium">
                  Groups
                </Link>
                <Link href="/expenses" className="px-4 py-2 rounded-xl text-gray-700 hover:text-green-700 hover:bg-green-50 transition-all duration-200 font-medium">
                  Expenses
                </Link>
                <Link href="/budgets" className="px-4 py-2 rounded-xl text-gray-700 hover:text-green-700 hover:bg-green-50 transition-all duration-200 font-medium">
                  Budgets
                </Link>
                <Link href="/savings" className="px-4 py-2 rounded-xl text-gray-700 hover:text-green-700 hover:bg-green-50 transition-all duration-200 font-medium">
                  Savings
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationBell />
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};