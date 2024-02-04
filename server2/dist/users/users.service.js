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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(userDto) {
        const existingUser = await this.userModel.findOne({ username: userDto.username });
        if (existingUser) {
            throw new common_1.NotFoundException('Username is already taken.');
        }
        const hashedPassword = await bcrypt.hash(userDto.password, 10);
        const newUser = new this.userModel({ ...userDto, password: hashedPassword });
        return newUser.save();
    }
    async validateUser(username, password) {
        const user = await this.userModel.findOne({ username }).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid password.');
        }
        return user;
    }
    async getUserById(userId) {
        try {
            const userInstance = await this.userModel.findById(userId);
            return userInstance ? userInstance.name : null;
        }
        catch (error) {
            console.error('Error fetching user by ID:', error);
            return null;
        }
    }
    async findOneByUsername(username) {
        return this.userModel.findOne({ username }).exec();
    }
    async findById(id) {
        return this.userModel.findById(id).exec();
    }
    async update(id, userDto) {
        const existingUser = await this.userModel.findById(id).exec();
        if (!existingUser) {
            throw new common_1.NotFoundException('User not found.');
        }
        existingUser.name = userDto.name || existingUser.name;
        existingUser.email = userDto.email || existingUser.email;
        return existingUser.save();
    }
    async updateRole(id, role) {
        const existingUser = await this.userModel.findById(id).exec();
        if (!existingUser) {
            throw new common_1.NotFoundException('User not found.');
        }
        existingUser.role = role;
        return existingUser.save();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map