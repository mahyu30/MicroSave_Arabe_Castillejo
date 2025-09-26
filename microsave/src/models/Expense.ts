import mongoose, { Schema, Document } from 'mongoose';

export interface IExpenseSplit {
  user: mongoose.Types.ObjectId;
  amount: number;
  paid: boolean;
}

export interface IExpense extends Document {
  title: string;
  description: string;
  amount: number;
  type: string;
  payer: mongoose.Types.ObjectId;
  group: mongoose.Types.ObjectId;
  budget?: mongoose.Types.ObjectId;
  category?: string;
  splits: IExpenseSplit[];
  dueDate?: Date;
  receipt?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSplitSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true, min: 0 },
  paid: { type: Boolean, default: false }
});

const ExpenseSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  amount: { type: Number, required: true, min: 0 },
  type: { type: String, required: true },
  payer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  group: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
  budget: { type: Schema.Types.ObjectId, ref: 'Budget' },
  category: { type: String },
  splits: [ExpenseSplitSchema],
  dueDate: { type: Date },
  receipt: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

export default mongoose.models.Expense || mongoose.model<IExpense>('Expense', ExpenseSchema);