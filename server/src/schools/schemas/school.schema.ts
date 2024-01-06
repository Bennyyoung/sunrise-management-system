import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class School {
  @Prop({ required: true })
  name: string;

  // Add other fields as per your school schema requirements
}

export type SchoolDocument = School & Document;
export const SchoolSchema = SchemaFactory.createForClass(School);
