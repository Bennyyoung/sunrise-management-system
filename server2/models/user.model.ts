import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  passwordHash: string;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
