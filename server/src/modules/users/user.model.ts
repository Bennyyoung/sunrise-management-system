import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: new Types.ObjectId() }) // Set a default value for userId
  userId: Types.ObjectId;

  @Prop({ required: true })
  role: string;

  // Add other user properties as needed
}

export const UserSchema = SchemaFactory.createForClass(User);
