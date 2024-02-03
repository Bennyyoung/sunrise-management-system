/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document } from 'mongoose';
export declare class Staff {
    fullName: string;
    email: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    phoneNumber: string;
    contactAddress: string;
    role: string;
    class?: string;
    schoolId: string;
    password: string;
}
export type StaffDocument = Staff & Document;
export declare const StaffSchema: import("mongoose").Schema<Staff, import("mongoose").Model<Staff, any, any, any, Document<unknown, any, Staff> & Staff & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Staff, Document<unknown, {}, import("mongoose").FlatRecord<Staff>> & import("mongoose").FlatRecord<Staff> & {
    _id: import("mongoose").Types.ObjectId;
}>;
