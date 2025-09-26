import mongoose, { Schema, Document } from 'mongoose';

export interface IContribution {
  user: mongoose.Types.ObjectId;
  amount: number;
  date: Date;
}

export interface ISavingsGoal extends Document {
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  group: mongoose.Types.ObjectId;
  targetDate?: Date;
  contributions: IContribution[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ContributionSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now }
});

const SavingsGoalSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  targetAmount: { type: Number, required: true, min: 0 },
  currentAmount: { type: Number, default: 0, min: 0 },
  group: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
  targetDate: { type: Date },
  contributions: [ContributionSchema],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

export default mongoose.models.SavingsGoal || mongoose.model<ISavingsGoal>('SavingsGoal', SavingsGoalSchema);