import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AdminService } from '../admin/admin.service';
import { SuperAdminService } from '../super-admin/super-admin.service';
import { ParentService } from '../parents/parent.service';
import { StaffService } from '../staff/staff.service';
export declare class LoginService {
    private readonly jwtService;
    private readonly usersService;
    private readonly adminService;
    private readonly superAdminService;
    private readonly parentService;
    private readonly staffService;
    constructor(jwtService: JwtService, usersService: UsersService, adminService: AdminService, superAdminService: SuperAdminService, parentService: ParentService, staffService: StaffService);
    validateUser(username: string, password: string, role: string): Promise<any>;
    generateToken(user: any): Promise<string>;
}
