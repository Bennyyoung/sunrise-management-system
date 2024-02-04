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
import { Admin } from './admin.schema';
import { School } from '../schools/school.schema';
import { Student } from '../students/student.schema';
import { Staff } from '../staff/staff.schema';
import { Parent } from '../parents/parent.schema';
import { Model } from 'mongoose';
export declare class AdminService {
    private readonly adminModel;
    private readonly studentModel;
    private readonly staffModel;
    private readonly parentModel;
    constructor(adminModel: Model<Admin>, studentModel: Model<Student>, staffModel: Model<Staff>, parentModel: Model<Parent>);
    getAdminByUsernameAndPassword(username: string, password: string): Promise<Admin | null>;
    getAdminById(id: string): Promise<Admin | null>;
    generateLoginForSchoolAdmin(school: School): Promise<{
        username: string;
        password: string;
    }>;
    onboardAdmin(adminDto: any): Promise<Admin>;
    generateLoginForUser(userDto: any, schoolAdminId: string): Promise<{
        username: string;
        password: string;
    }>;
    private generateRandomPassword;
}
