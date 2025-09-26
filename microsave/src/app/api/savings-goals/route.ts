import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SavingsGoal from '@/models/SavingsGoal';
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

    const savingsGoals = await SavingsGoal.find({ group: groupId })
      .populate('createdBy', 'name email')
      .populate('contributions.user', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json({ savingsGoals });
  } catch (error) {
    console.error('Get savings goals error:', error);
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

    const { name, description, targetAmount, groupId, targetDate } = await request.json();

    if (!name || !targetAmount || !groupId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify user is member of the group
    const group = await Group.findOne({ _id: groupId, members: userId });
    if (!group) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const savingsGoal = new SavingsGoal({
      name,
      description,
      targetAmount,
      group: groupId,
      targetDate: targetDate ? new Date(targetDate) : undefined,
      createdBy: userId
    });

    await savingsGoal.save();

    // Add savings goal to group
    await Group.findByIdAndUpdate(groupId, {
      $push: { savingsGoals: savingsGoal._id }
    });

    const populatedGoal = await SavingsGoal.findById(savingsGoal._id)
      .populate('createdBy', 'name email');

    return NextResponse.json({
      message: 'Savings goal created successfully',
      savingsGoal: populatedGoal
    });
  } catch (error) {
    console.error('Create savings goal error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}