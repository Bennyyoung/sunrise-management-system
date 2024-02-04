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
exports.SuperAdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const super_admin_schema_1 = require("./super-admin.schema");
const admin_service_1 = require("../admin/admin.service");
const bcrypt = require("bcrypt");
let SuperAdminService = class SuperAdminService {
    constructor(superAdminModel, adminService) {
        this.superAdminModel = superAdminModel;
        this.adminService = adminService;
    }
    async onboardSuperAdmin(superAdminDto) {
        const createdSuperAdmin = new this.superAdminModel(superAdminDto);
        return createdSuperAdmin.save();
    }
    async getSuperAdminByUsernameAndPassword(username, password) {
        const superAdmin = await this.superAdminModel.findOne({ username }).exec();
        if (!superAdmin) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, superAdmin.password);
        if (!isPasswordValid) {
            return null;
        }
        return superAdmin;
    }
    async generateAdminLoginDetails(adminId) {
        const admin = await this.adminService.getAdminById(adminId);
        if (!admin) {
            throw new common_1.NotFoundException('Admin not found.');
        }
        const tempPassword = Math.random().toString(36).slice(-8);
        return { username: admin.username, password: tempPassword };
    }
    async getSuperAdminById(id) {
        const superAdmin = await this.superAdminModel.findById(id).exec();
        if (!superAdmin) {
            throw new common_1.NotFoundException('SuperAdmin not found.');
        }
        return superAdmin;
    }
    async updateSuperAdmin(id, updatedSuperAdminDto) {
        const updatedSuperAdmin = await this.superAdminModel.findByIdAndUpdate(id, updatedSuperAdminDto, { new: true }).exec();
        if (!updatedSuperAdmin) {
            throw new common_1.NotFoundException('SuperAdmin not found.');
        }
        return updatedSuperAdmin;
    }
};
exports.SuperAdminService = SuperAdminService;
exports.SuperAdminService = SuperAdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(super_admin_schema_1.SuperAdmin.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        admin_service_1.AdminService])
], SuperAdminService);
//# sourceMappingURL=super-admin.service.js.map