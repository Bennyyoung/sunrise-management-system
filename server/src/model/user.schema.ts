import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

export type UserDocument = User & Document

@Schema()
// Regular user without administrative privileges
export class User {
    @Prop({ required: true, unique: true, lowercase: true })
    ID: string

    @Prop({ required: true })
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User)