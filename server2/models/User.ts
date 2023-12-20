// models/User.ts

import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  adminId?: mongoose.Types.ObjectId;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['superAdmin', 'admin', 'teacher', 'student'],
    default: 'student',
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
