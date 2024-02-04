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
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const staff_schema_1 = require("./staff.schema");
const bcrypt = require("bcrypt");
let StaffService = class StaffService {
    constructor(staffModel) {
        this.staffModel = staffModel;
    }
    async onboardStaff(staffDto) {
        const createdStaff = new this.staffModel(staffDto);
        return createdStaff.save();
    }
    async getStaffByUsernameAndPassword(username, password) {
        const staff = await this.staffModel.findOne({ username }).exec();
        if (!staff) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, staff.password);
        if (!isPasswordValid) {
            return null;
        }
        return staff;
    }
    async getStaffById(id) {
        const staff = await this.staffModel.findById(id).exec();
        if (!staff) {
            throw new common_1.NotFoundException('Staff not found.');
        }
        return staff;
    }
    async updateStaff(id, updatedStaffDto) {
        const updatedStaff = await this.staffModel.findByIdAndUpdate(id, updatedStaffDto, { new: true }).exec();
        if (!updatedStaff) {
            throw new common_1.NotFoundException('Staff not found.');
        }
        return updatedStaff;
    }
};
exports.StaffService = StaffService;
exports.StaffService = StaffService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(staff_schema_1.Staff.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StaffService);
//# sourceMappingURL=staff.service.js.map