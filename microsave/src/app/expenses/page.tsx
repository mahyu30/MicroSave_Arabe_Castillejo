'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PlusCircle, Receipt, Calendar } from 'lucide-react';

interface Expense {
  _id: string;
  title: string;
  description: string;
  amount: number;
  type: string;
  payer: { _id: string; name: string; email: string };
  createdAt: string;
  splits: Array<{
    user: { _id: string; name: string };
    amount: number;
    paid: boolean;
  }>;
}

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (selectedGroupId) {
      fetchExpenses();
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

  const fetchExpenses = async () => {
    if (!selectedGroupId) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/expenses?groupId=${selectedGroupId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setExpenses(data.expenses);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
          <Button onClick={() => setShowCreateForm(true)}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Expense
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

        {/* Expenses List */}
        <div className="space-y-4">
          {expenses.map((expense) => (
            <Card key={expense._id}>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Receipt className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="text-lg font-semibold">{expense.title}</h3>
                      <p className="text-sm text-gray-600">{expense.description}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500">
                          Paid by {expense.payer.name}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(expense.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(expense.amount)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Split {expense.splits.length} way{expense.splits.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                
                {/* Split Details */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Split Details:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {expense.splits.map((split, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span>{split.user.name}</span>
                        <span className={`font-medium ${split.paid ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(split.amount)} {split.paid ? '✓' : '✗'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {expenses.length === 0 && selectedGroupId && (
          <div className="text-center py-12">
            <Receipt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses yet</h3>
            <p className="text-gray-600 mb-4">Start tracking expenses for this group.</p>
            <Button onClick={() => setShowCreateForm(true)}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add First Expense
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}