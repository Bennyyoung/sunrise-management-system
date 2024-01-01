import { Document, Schema } from 'mongoose';

export interface User {
  // Define your User interface/schema fields
  email: string;
  password: string;
  // Other fields...
}

export type UserDocument = User & Document; // Define the UserDocument type

export const UserSchema = new Schema<User>({
  // Define your schema structure here
});
