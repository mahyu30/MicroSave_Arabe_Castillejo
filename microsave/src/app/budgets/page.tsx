'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PlusCircle, Target, TrendingUp } from 'lucide-react';

interface Budget {
  _id: string;
  name: string;
  categories: Array<{
    name: string;
    limit: number;
    spent: number;
  }>;
  totalLimit: number;
  totalSpent: number;
  period: string;
  startDate: string;
  endDate: string;
}

export default function Budgets() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (selectedGroupId) {
      fetchBudgets();
    }
  }, [selectedGroupId]);

  const fetchGroups = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/groups', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setGroups(data.groups);
        if (data.groups.length > 0) {
          setSelectedGroupId(data.groups[0]._id);
        }
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const fetchBudgets = async () => {
    if (!selectedGroupId) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/budgets?groupId=${selectedGroupId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setBudgets(data.budgets);
      }
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getProgressPercentage = (spent: number, limit: number) => {
    return Math.min((spent / limit) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Budgets</h1>
          <Button>
            <PlusCircle className="w-4 h-4 mr-2" />
            Create Budget
          </Button>
        </div>

        {/* Group Selector */}
        {groups.length > 0 && (
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Group:</label>
                <select
                  value={selectedGroupId}
                  onChange={(e) => setSelectedGroupId(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {groups.map((group) => (
                    <option key={group._id} value={group._id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Budgets List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {budgets.map((budget) => (
            <Card key={budget._id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{budget.name}</h3>
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                {/* Overall Progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                    <span className="text-sm text-gray-600">
                      {formatCurrency(budget.totalSpent)} / {formatCurrency(budget.totalLimit)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${
                        getProgressColor(getProgressPercentage(budget.totalSpent, budget.totalLimit))
                      }`}
                      style={{ 
                        width: `${getProgressPercentage(budget.totalSpent, budget.totalLimit)}%` 
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">
                      {getProgressPercentage(budget.totalSpent, budget.totalLimit).toFixed(1)}% used
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      {budget.period}
                    </span>
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-700">Categories</h4>
                  {budget.categories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-sm text-gray-600">
                          {formatCurrency(category.spent)} / {formatCurrency(category.limit)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            getProgressColor(getProgressPercentage(category.spent, category.limit))
                          }`}
                          style={{ 
                            width: `${getProgressPercentage(category.spent, category.limit)}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Button size="sm" className="w-full">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {budgets.length === 0 && selectedGroupId && (
          <div className="text-center py-12">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No budgets yet</h3>
            <p className="text-gray-600 mb-4">Create your first budget to start tracking spending.</p>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Create First Budget
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}