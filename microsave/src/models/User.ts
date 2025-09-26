import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  groups: mongoose.Types.ObjectId[];
  incomeSchedule: {
    type: "weekly" | "bi-weekly" | "monthly" | "irregular";
    amount: number;
    nextPayment?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    groups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
    incomeSchedule: {
      type: {
        type: String,
        enum: ["weekly", "bi-weekly", "monthly", "irregular"],
        default: "monthly",
      },
      amount: { type: Number, default: 0 },
      nextPayment: { type: Date },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
