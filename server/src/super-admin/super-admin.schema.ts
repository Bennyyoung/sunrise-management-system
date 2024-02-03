// super-admin/super-admin.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SuperAdminDocument = SuperAdmin & Document;

@Schema()
export class SuperAdmin {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;

  // Add more properties as needed for super admin details

  // You may want to include timestamps for createdAt and updatedAt
}

export const SuperAdminSchema = SchemaFactory.createForClass(SuperAdmin);
