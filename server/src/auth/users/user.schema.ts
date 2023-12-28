// users/user.schema.ts

import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'superadmin'], default: 'user' }, // Assuming a 'role' field
});

export interface User extends mongoose.Document {
  email: string;
  password: string;
  role: string;
  // Other fields...
}
