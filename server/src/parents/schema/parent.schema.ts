import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Parent {
  @Prop({ required: true })
  name: string;

  // Add other fields as per your parent schema requirements

}

export type ParentDocument = Parent & Document;
export const ParentSchema = SchemaFactory.createForClass(Parent);
