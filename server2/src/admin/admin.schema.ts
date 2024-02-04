// admin/admin.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Admin {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  schoolName: string;

  @Prop({ required: true })
  schoolAddress: string;

  @Prop({ required: true })
  schoolContactDetails: string;

  @Prop({ required: true })
  cacFile: string;

  // You may want to include timestamps for createdAt and updatedAt
}

export type AdminDocument = Admin & Document;

export const AdminSchema = SchemaFactory.createForClass(Admin);
