import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    update(id: string, userDto: any, req: any): Promise<import("./user.schema").User>;
    getUserById(userId: string): Promise<string | null>;
    updateRole(id: string, role: string, req: any): Promise<import("./user.schema").User>;
}
