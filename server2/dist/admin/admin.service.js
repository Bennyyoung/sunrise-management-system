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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let AdminService = class AdminService {
    constructor(adminModel, studentModel, staffModel, parentModel) {
        this.adminModel = adminModel;
        this.studentModel = studentModel;
        this.staffModel = staffModel;
        this.parentModel = parentModel;
    }
    async getAdminByUsernameAndPassword(username, password) {
        const admin = await this.adminModel.findOne({ username }).exec();
        if (!admin) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return null;
        }
        return admin;
    }
    async getAdminById(id) {
        const admin = await this.adminModel.findById(id).exec();
        if (!admin) {
            return null;
        }
        return admin;
    }
    async generateLoginForSchoolAdmin(school) {
        try {
            const username = `${school.name}_admin`;
            const password = this.generateRandomPassword();
            const hashedPassword = await bcrypt.hash(password, 10);
            await this.adminModel.create({ username, password: hashedPassword, schoolId: school._id });
            return { username, password: hashedPassword };
        }
        catch (error) {
            console.error('Error generating login for school admin:', error);
            throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async onboardAdmin(adminDto) {
        const existingAdmin = await this.adminModel.findOne({ username: adminDto.username }).exec();
        if (existingAdmin) {
            throw new common_1.NotFoundException('Username is already taken.');
        }
        const hashedPassword = await bcrypt.hash(adminDto.password, 10);
        const newAdmin = await this.adminModel.create({ ...adminDto, password: hashedPassword });
        return newAdmin;
    }
    async generateLoginForUser(userDto, schoolAdminId) {
        try {
            const username = `${userDto.name.toLowerCase()}_${userDto.role.toLowerCase()}`;
            const password = this.generateRandomPassword();
            const hashedPassword = await bcrypt.hash(password, 10);
            switch (userDto.role) {
                case 'Student':
                    await this.studentModel.create({ ...userDto, username, password: hashedPassword, schoolAdminId });
                    break;
                case 'Staff':
                    await this.staffModel.create({ ...userDto, username, password: hashedPassword, schoolAdminId });
                    break;
                case 'Parent':
                    await this.parentModel.create({ ...userDto, username, password: hashedPassword, schoolAdminId });
                    break;
            }
            return { username, password: hashedPassword };
        }
        catch (error) {
            console.error('Error generating login for user:', error);
            throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    generateRandomPassword() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const passwordLength = 10;
        let randomPassword = '';
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomPassword += characters.charAt(randomIndex);
        }
        return randomPassword;
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Admin')),
    __param(1, (0, mongoose_2.InjectModel)('Student')),
    __param(2, (0, mongoose_2.InjectModel)('Staff')),
    __param(3, (0, mongoose_2.InjectModel)('Parent')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], AdminService);
//# sourceMappingURL=admin.service.js.map