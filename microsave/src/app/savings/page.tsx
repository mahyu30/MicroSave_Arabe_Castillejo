'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PlusCircle, Target, TrendingUp, Calendar } from 'lucide-react';

interface SavingsGoal {
  _id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: string;
  contributions: Array<{
    user: { _id: string; name: string };
    amount: number;
    date: string;
  }>;
  createdBy: { _id: string; name: string; email: string };
}

export default function SavingsGoals() {
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (selectedGroupId) {
      fetchSavingsGoals();
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

  const fetchSavingsGoals = async () => {
    if (!selectedGroupId) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/savings-goals?groupId=${selectedGroupId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSavingsGoals(data.savingsGoals);
      }
    } catch (error) {
      console.error('Error fetching savings goals:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysRemaining = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Savings Goals</h1>
          <Button>
            <PlusCircle className="w-4 h-4 mr-2" />
            Create Goal
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

        {/* Savings Goals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {savingsGoals.map((goal) => {
            const progressPercentage = getProgressPercentage(goal.currentAmount, goal.targetAmount);
            const daysRemaining = goal.targetDate ? getDaysRemaining(goal.targetDate) : null;
            
            return (
              <Card key={goal._id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{goal.name}</h3>
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  {goal.description && (
                    <p className="text-sm text-gray-600">{goal.description}</p>
                  )}
                </CardHeader>
                <CardContent>
                  {/* Progress Section */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {formatCurrency(goal.currentAmount)}
                      </span>
                      <span className="text-lg text-gray-600">
                        of {formatCurrency(goal.targetAmount)}
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>{progressPercentage.toFixed(1)}% complete</span>
                      {goal.targetDate && (
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {daysRemaining !== null && daysRemaining > 0 
                            ? `${daysRemaining} days left`
                            : daysRemaining === 0 
                            ? 'Due today'
                            : 'Overdue'
                          }
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Recent Contributions */}
                  {goal.contributions.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Contributions</h4>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {goal.contributions.slice(0, 3).map((contribution, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">{contribution.user.name}</span>
                            <div className="text-right">
                              <div className="font-medium text-green-600">
                                +{formatCurrency(contribution.amount)}
                              </div>
                              <div className="text-xs text-gray-500">
                                {formatDate(contribution.date)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <PlusCircle className="w-4 h-4 mr-1" />
                      Contribute
                    </Button>
                    <Button size="sm" variant="secondary" className="flex-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {savingsGoals.length === 0 && selectedGroupId && (
          <div className="text-center py-12">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No savings goals yet</h3>
            <p className="text-gray-600 mb-4">Create your first savings goal to start building towards your financial targets.</p>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Create First Goal
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}