import { HydratedDocument, Schema, model } from 'mongoose';

interface IUser {
  email: string,
  name: string,
  age: number,
  address: string,
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Schema<IUser>({
  email: { type: String, require: true, unique: true, trim: true, lowercase: true },
  name: { type: String, maxlength: 50 },
  age: { type: Number, min: 1, max: 120 },
  address: { type: String, maxlength: 100 },
}, {
  timestamps: true,
});

export const User = model<IUser>('User', userSchema);
export type UserDocument = HydratedDocument<IUser>;