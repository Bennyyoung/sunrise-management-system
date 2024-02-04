import { UsersService } from '../users/users.service';
import { SchoolService } from './school.service';
export declare class SchoolController {
    private readonly schoolService;
    private readonly usersService;
    constructor(schoolService: SchoolService, usersService: UsersService);
    onboardAdmin(adminDto: any, req: any): Promise<import("./school.schema").School>;
}
