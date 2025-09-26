import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Budget from '@/models/Budget';
import Group from '@/models/Group';
import { getAuthUser } from '@/middleware/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const userId = getAuthUser(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const groupId = searchParams.get('groupId');

    if (!groupId) {
      return NextResponse.json({ error: 'Group ID is required' }, { status: 400 });
    }

    // Verify user is member of the group
    const group = await Group.findOne({ _id: groupId, members: userId });
    if (!group) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const budgets = await Budget.find({ group: groupId })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json({ budgets });
  } catch (error) {
    console.error('Get budgets error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const userId = getAuthUser(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, groupId, categories, period, startDate, endDate } = await request.json();

    if (!name || !groupId || !categories || !period || !startDate || !endDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify user is member of the group
    const group = await Group.findOne({ _id: groupId, members: userId });
    if (!group) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const totalLimit = categories.reduce((sum: number, cat: any) => sum + cat.limit, 0);

    const budget = new Budget({
      name,
      group: groupId,
      categories,
      totalLimit,
      period,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      createdBy: userId
    });

    await budget.save();

    // Add budget to group
    await Group.findByIdAndUpdate(groupId, {
      $push: { budgets: budget._id }
    });

    const populatedBudget = await Budget.findById(budget._id)
      .populate('createdBy', 'name email');

    return NextResponse.json({
      message: 'Budget created successfully',
      budget: populatedBudget
    });
  } catch (error) {
    console.error('Create budget error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}