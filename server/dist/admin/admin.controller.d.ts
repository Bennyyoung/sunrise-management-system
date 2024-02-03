import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    onboardAdmin(adminDto: any, req: any): Promise<{
        message: string;
        admin: import("./admin.schema").Admin;
        loginDetails: {
            username: string;
            password: string;
        };
    }>;
}
