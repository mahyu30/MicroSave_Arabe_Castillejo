import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Expense from '@/models/Expense';
import Group from '@/models/Group';
import Budget from '@/models/Budget';
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

    const expenses = await Expense.find({ group: groupId })
      .populate('payer', 'name email')
      .populate('createdBy', 'name email')
      .populate('splits.user', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json({ expenses });
  } catch (error) {
    console.error('Get expenses error:', error);
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

    const { 
      title, 
      description, 
      amount, 
      type, 
      payer, 
      groupId, 
      budgetId, 
      category, 
      splits, 
      dueDate 
    } = await request.json();

    if (!title || !amount || !type || !payer || !groupId || !splits) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify user is member of the group
    const group = await Group.findOne({ _id: groupId, members: userId });
    if (!group) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const expense = new Expense({
      title,
      description,
      amount,
      type,
      payer,
      group: groupId,
      budget: budgetId,
      category,
      splits,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      createdBy: userId
    });

    await expense.save();

    // Update budget if specified
    if (budgetId && category) {
      await Budget.findOneAndUpdate(
        { _id: budgetId, 'categories.name': category },
        { 
          $inc: { 
            'categories.$.spent': amount,
            totalSpent: amount
          }
        }
      );
    }

    // Add expense to group
    await Group.findByIdAndUpdate(groupId, {
      $push: { expenses: expense._id }
    });

    const populatedExpense = await Expense.findById(expense._id)
      .populate('payer', 'name email')
      .populate('createdBy', 'name email')
      .populate('splits.user', 'name email');

    return NextResponse.json({
      message: 'Expense created successfully',
      expense: populatedExpense
    });
  } catch (error) {
    console.error('Create expense error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}