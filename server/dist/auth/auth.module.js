"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const jwt_1 = require("@nestjs/jwt");
const app_config_1 = require("../app.config");
const auth_controller_1 = require("./auth.controller");
const auth_guard_1 = require("./auth.guard");
const auth_strategy_1 = require("./auth.strategy");
const passport_1 = require("@nestjs/passport");
const user_module_1 = require("../user/user.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: app_config_1.appConfig.jwtAccessToken.secret,
                signOptions: { expiresIn: app_config_1.appConfig.jwtAccessToken.expiresIn },
            }),
            jwt_1.JwtModule.register({
                secret: app_config_1.appConfig.jwtRefreshToken.secret,
                signOptions: { expiresIn: app_config_1.appConfig.jwtRefreshToken.expiresIn },
            }),
        ],
        providers: [auth_service_1.AuthService, auth_guard_1.SunriseManagementAuthGuard, auth_strategy_1.LocalStrategy],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map