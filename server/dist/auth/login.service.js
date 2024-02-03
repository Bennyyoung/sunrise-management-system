"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const admin_service_1 = require("../admin/admin.service");
const super_admin_service_1 = require("../super-admin/super-admin.service");
const parent_service_1 = require("../parents/parent.service");
const staff_service_1 = require("../staff/staff.service");
let LoginService = class LoginService {
    constructor(jwtService, usersService, adminService, superAdminService, parentService, staffService) {
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.adminService = adminService;
        this.superAdminService = superAdminService;
        this.parentService = parentService;
        this.staffService = staffService;
    }
    async validateUser(username, password, role) {
        let user;
        switch (role.toLowerCase()) {
            case 'user':
                user = await this.usersService.findOneByUsername(username);
                break;
            case 'admin':
                user = await this.adminService.getAdminByUsernameAndPassword(username, password);
                break;
            case 'superadmin':
                user = await this.superAdminService.getSuperAdminByUsernameAndPassword(username, password);
                break;
            case 'parent':
                user = await this.parentService.getParentByUsernameAndPassword(username, password);
                break;
            case 'staff':
                user = await this.staffService.getStaffByUsernameAndPassword(username, password);
                break;
            default:
                throw new common_1.UnauthorizedException('Invalid role specified');
        }
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return user;
    }
    async generateToken(user) {
        const payload = { username: user.username, sub: user._id, role: user.role };
        return this.jwtService.sign(payload);
    }
};
exports.LoginService = LoginService;
exports.LoginService = LoginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService,
        admin_service_1.AdminService,
        super_admin_service_1.SuperAdminService,
        parent_service_1.ParentService,
        staff_service_1.StaffService])
], LoginService);
//# sourceMappingURL=login.service.js.map