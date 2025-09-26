import mongoose, { Schema, Document } from 'mongoose';

export interface IGroup extends Document {
  name: string;
  description: string;
  members: mongoose.Types.ObjectId[];
  admin: mongoose.Types.ObjectId;
  budgets: mongoose.Types.ObjectId[];
  expenses: mongoose.Types.ObjectId[];
  savingsGoals: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const GroupSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  budgets: [{ type: Schema.Types.ObjectId, ref: 'Budget' }],
  expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense' }],
  savingsGoals: [{ type: Schema.Types.ObjectId, ref: 'SavingsGoal' }]
}, {
  timestamps: true
});

export default mongoose.models.Group || mongoose.model<IGroup>('Group', GroupSchema);