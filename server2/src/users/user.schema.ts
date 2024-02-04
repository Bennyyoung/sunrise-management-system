// // src/users/user.schema.ts

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// @Schema()
// export class User {
//   @Prop({ required: true, unique: true })
//   username: string;

//   @Prop({ required: true })
//   password: string;

//   @Prop({ required: true })
//   role: string;

//   @Prop({ required: true })
//   name: string;

//   @Prop({ required: true })
//   email: string;

//   // Add more properties as needed for user details
// }

// // Extend the Document type to include '_id'
// export interface UserDocument extends User, Document {
//   // Mongoose will automatically handle _id transformation
// }

// export const UserSchema = SchemaFactory.createForClass(User);


// src/users/user.schema.ts

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// @Schema()
// export class User {
//     @Prop({ required: true })
//   name: string; 
//     @Prop({ required: true })
//   email: string; 
//   @Prop({ required: true, unique: true })
//   username: string;

//   @Prop({ required: true })
//   password: string;

//   @Prop({ required: true })
//   role: string;

//   // Add more properties as needed for user details

//   // Mongoose will use '_id' as the default identifier
// }

// export type UserDocument = User & Document;

// export const UserSchema = SchemaFactory.createForClass(User);



// user.schema.ts
// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  // Add more properties as needed for user details
}

// Define the Mongoose document type
export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

// Extend the Document type to include 'id'
UserSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
