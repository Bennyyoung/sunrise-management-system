import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../users/user.schema';

@Schema({ timestamps: true })
export class School extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  admin: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  contactPerson: User;

  @Prop({ required: true })
  name: string;

  @Prop()
  address: string;

  @Prop()
  contactDetails: string;

  @Prop()
  cacFile: string; // Replace with appropriate file storage mechanism

  // Add more fields as needed

  createdAt: Date;
  updatedAt: Date;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
