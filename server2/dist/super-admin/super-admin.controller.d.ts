import { SuperAdminService } from './super-admin.service';
export declare class SuperAdminController {
    private readonly superAdminService;
    constructor(superAdminService: SuperAdminService);
    createAdmin(): string;
    generateLogin(): string;
}
