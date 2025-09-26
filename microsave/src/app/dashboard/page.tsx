'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PlusCircle, Users, DollarSign, Target } from 'lucide-react';

interface DashboardStats {
  totalGroups: number;
  totalExpenses: number;
  totalBudgets: number;
  totalSavingsGoals: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalGroups: 0,
    totalExpenses: 0,
    totalBudgets: 0,
    totalSavingsGoals: 0
  });

  useEffect(() => {
    // In a real app, fetch dashboard stats from API
    setStats({
      totalGroups: 3,
      totalExpenses: 25,
      totalBudgets: 5,
      totalSavingsGoals: 2
    });
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Here&apos;s your financial overview</p>
          </div>
          <Button variant="success">
            <PlusCircle className="w-5 h-5 mr-2" />
            Quick Add
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:scale-105 transition-transform duration-200">
            <CardContent className="flex items-center p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-600">Active Groups</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalGroups}</p>
                <p className="text-xs text-green-600 font-medium">+2 this month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:scale-105 transition-transform duration-200">
            <CardContent className="flex items-center p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-600">Total Expenses</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalExpenses}</p>
                <p className="text-xs text-green-600 font-medium">$2,450 this month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:scale-105 transition-transform duration-200">
            <CardContent className="flex items-center p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-600">Active Budgets</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalBudgets}</p>
                <p className="text-xs text-green-600 font-medium">75% on track</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:scale-105 transition-transform duration-200">
            <CardContent className="flex items-center p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-green-700 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-600">Savings Goals</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalSavingsGoals}</p>
                <p className="text-xs text-green-600 font-medium">$1,200 saved</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Recent Expenses</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900">Groceries</p>
                    <p className="text-sm text-gray-600">Family Group • 2 hours ago</p>
                  </div>
                  <span className="text-lg font-bold text-green-700">$85.50</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900">Rent</p>
                    <p className="text-sm text-gray-600">Roommates • 1 day ago</p>
                  </div>
                  <span className="text-lg font-bold text-green-700">$1,200.00</span>
                </div>
                <Button variant="outline" className="w-full">
                  View All Expenses
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Budget Overview</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Food & Dining</span>
                    <span className="text-sm font-bold text-gray-900">$450 / $600</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-xs text-green-600 font-medium mt-1">75% used • $150 remaining</p>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Transportation</span>
                    <span className="text-sm font-bold text-gray-900">$120 / $200</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-emerald-500 to-green-600 h-3 rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-xs text-green-600 font-medium mt-1">60% used • $80 remaining</p>
                </div>
                <Button variant="outline" className="w-full">
                  View All Budgets
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}