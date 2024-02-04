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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const users_service_1 = require("../users/users.service");
const school_service_1 = require("./school.service");
let SchoolController = class SchoolController {
    constructor(schoolService, usersService) {
        this.schoolService = schoolService;
        this.usersService = usersService;
    }
    async onboardAdmin(adminDto, req) {
        if (req.user.role !== 'SuperAdmin') {
            throw new common_1.ForbiddenException('You are not authorized to onboard admins.');
        }
        const adminUser = await this.usersService.create({
            username: adminDto.username,
            password: adminDto.password,
            role: 'Admin',
        });
        return this.schoolService.onboardAdmin(adminUser, adminDto.schoolDetails);
    }
};
exports.SchoolController = SchoolController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('onboard-admin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "onboardAdmin", null);
exports.SchoolController = SchoolController = __decorate([
    (0, common_1.Controller)('schools'),
    __metadata("design:paramtypes", [school_service_1.SchoolService,
        users_service_1.UsersService])
], SchoolController);
//# sourceMappingURL=school.controller.js.map