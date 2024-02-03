"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const super_admin_controller_1 = require("./super-admin/super-admin.controller");
const admin_controller_1 = require("./admin/admin.controller");
const login_controller_1 = require("./auth/login.controller");
const user_controller_1 = require("./users/user.controller");
const school_controller_1 = require("./schools/school.controller");
const student_controller_1 = require("./students/student.controller");
const staff_controller_1 = require("./staff/staff.controller");
const parent_controller_1 = require("./parents/parent.controller");
const super_admin_service_1 = require("./super-admin/super-admin.service");
const admin_service_1 = require("./admin/admin.service");
const login_service_1 = require("./auth/login.service");
const users_service_1 = require("./users/users.service");
const school_service_1 = require("./schools/school.service");
const student_service_1 = require("./students/student.service");
const staff_service_1 = require("./staff/staff.service");
const parent_service_1 = require("./parents/parent.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://sunrise:sunrise@cluster0.o62vzf8.mongodb.net/sunrise'),
        ],
        controllers: [
            super_admin_controller_1.SuperAdminController,
            admin_controller_1.AdminController,
            login_controller_1.LoginController,
            user_controller_1.UsersController,
            school_controller_1.SchoolController,
            student_controller_1.StudentController,
            staff_controller_1.StaffController,
            parent_controller_1.ParentController,
        ],
        providers: [
            super_admin_service_1.SuperAdminService,
            admin_service_1.AdminService,
            login_service_1.LoginService,
            users_service_1.UsersService,
            school_service_1.SchoolService,
            student_service_1.StudentService,
            staff_service_1.StaffService,
            parent_service_1.ParentService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map