// src/student/student.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Student {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  dateOfBirth: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  nationality: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  contactAddress: string;

  @Prop({ default: 'Student' }) // Defaults to 'Student' if not provided
  role: string;

  @Prop({ type: String }) // Assuming schoolId is of type String, adjust as needed
  schoolId: string;
}

export type StudentDocument = Student & Document;

export const StudentSchema = SchemaFactory.createForClass(Student);
