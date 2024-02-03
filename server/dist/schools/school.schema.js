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
exports.SchoolSchema = exports.School = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../users/user.schema");
let School = class School extends mongoose_2.Document {
};
exports.School = School;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], School.prototype, "admin", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], School.prototype, "contactPerson", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], School.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], School.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], School.prototype, "contactDetails", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], School.prototype, "cacFile", void 0);
exports.School = School = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], School);
exports.SchoolSchema = mongoose_1.SchemaFactory.createForClass(School);
//# sourceMappingURL=school.schema.js.map