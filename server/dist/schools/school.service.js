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
exports.SchoolService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let SchoolService = class SchoolService {
    constructor(schoolModel, userModel) {
        this.schoolModel = schoolModel;
        this.userModel = userModel;
    }
    async onboardAdmin(adminUser, schoolDetails) {
        const admin = await this.userModel.findById(adminUser).exec();
        if (!admin) {
            throw new common_1.NotFoundException('Admin user not found.');
        }
        const newSchool = new this.schoolModel({
            admin: adminUser,
            contactPerson: admin,
            ...schoolDetails,
        });
        return newSchool.save();
    }
};
exports.SchoolService = SchoolService;
exports.SchoolService = SchoolService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('School')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], SchoolService);
//# sourceMappingURL=school.service.js.map