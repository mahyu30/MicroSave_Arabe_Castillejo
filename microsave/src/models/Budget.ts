import mongoose, { Schema, Document } from 'mongoose';

export interface IBudgetCategory {
  name: string;
  limit: number;
  spent: number;
}

export interface IBudget extends Document {
  name: string;
  group: mongoose.Types.ObjectId;
  categories: IBudgetCategory[];
  totalLimit: number;
  totalSpent: number;
  period: 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BudgetCategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  limit: { type: Number, required: true, min: 0 },
  spent: { type: Number, default: 0, min: 0 }
});

const BudgetSchema: Schema = new Schema({
  name: { type: String, required: true },
  group: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
  categories: [BudgetCategorySchema],
  totalLimit: { type: Number, required: true, min: 0 },
  totalSpent: { type: Number, default: 0, min: 0 },
  period: { type: String, enum: ['weekly', 'monthly', 'yearly'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

export default mongoose.models.Budget || mongoose.model<IBudget>('Budget', BudgetSchema);