// schools/school.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class School extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  // Add other school properties as needed
}

export const SchoolSchema = SchemaFactory.createForClass(School);
