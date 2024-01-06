import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Student {
  @Prop({ required: true })
  name: string;

  // Add other fields as per your student schema requirements

}

export type StudentDocument = Student & Document;
export const StudentSchema = SchemaFactory.createForClass(Student);
