import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

export type AdminDocument = Admin & Document
@Schema()

// Admin user with standard administrative privileges
export class Admin {
    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    address: string

    @Prop({ required: true, unique: true, lowercase: true })
    emailAddress: string

    @Prop({ required: true })
    password: string

    @Prop({ required: true })
    primaryPhoneNumber: string

    @Prop({ required: true })
    secondaryPhoneNumber: string

    @Prop({ required: true })
    CAC: string

    @Prop({ required: true })
    role: string
}

export const AdminSchema = SchemaFactory.createForClass(Admin)