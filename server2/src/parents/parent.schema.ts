// // src/parent/parent.schema.ts

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// @Schema()
// export class Parent {
//   @Prop({ required: true })
//   fullName: string;

//   @Prop({ required: true, unique: true })
//   email: string;

//   @Prop({ required: true })
//   dateOfBirth: string;

//   @Prop({ required: true })
//   gender: string;

//   @Prop({ required: true })
//   nationality: string;

//   @Prop({ required: true })
//   phoneNumber: string;

//   @Prop({ required: true })
//   contactAddress: string;

//   @Prop({ required: true }) // Add this line for schoolId
//   schoolId: string;

//   @Prop({ default: 'Parent' }) // Defaults to 'Parent' if not provided
//   role: string;
// }

// export type ParentDocument = Parent & Document;

// export const ParentSchema = SchemaFactory.createForClass(Parent);



// src/parent/parent.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Parent {
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

  @Prop({ required: true, select: false }) // Include select: false for the password field
  password: string;

  @Prop({ required: true }) // Add this line for schoolId
  schoolId: string;

  @Prop({ default: 'Parent' }) // Defaults to 'Parent' if not provided
  role: string;
}

export type ParentDocument = Parent & Document;

export const ParentSchema = SchemaFactory.createForClass(Parent);
