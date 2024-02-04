// // staff/staff.schema.ts

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// @Schema()
// export class Staff {
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

//   @Prop({ required: true })
//   role: string; // 'Admin', 'Teacher', 'Non-Teaching Staff'

//   @Prop({ required: false })
//   class?: string; // Only for teachers, can be optional for other staff

//   @Prop({ required: true, type: String }) // Assuming schoolId is of type String, adjust as needed
//   schoolId: string;
// }

// export type StaffDocument = Staff & Document;

// export const StaffSchema = SchemaFactory.createForClass(Staff);



// staff/staff.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Staff {
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

  @Prop({ required: true })
  role: string; // 'Admin', 'Teacher', 'Non-Teaching Staff'

  @Prop({ required: false })
  class?: string; // Only for teachers, can be optional for other staff

  @Prop({ required: true, type: String }) // Assuming schoolId is of type String, adjust as needed
  schoolId: string;

  @Prop({ required: true, select: false }) // Include select: false for the password field
  password: string;
}

export type StaffDocument = Staff & Document;

export const StaffSchema = SchemaFactory.createForClass(Staff);
