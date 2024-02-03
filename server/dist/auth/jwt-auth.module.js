"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const users_module_1 = require("../users/users.module");
const jwt_strategy_1 = require("./jwt.strategy");
let JwtAuthModule = class JwtAuthModule {
};
exports.JwtAuthModule = JwtAuthModule;
exports.JwtAuthModule = JwtAuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: 'yourSecretKey',
                signOptions: { expiresIn: '1h' },
            }),
            users_module_1.UsersModule,
        ],
        providers: [jwt_auth_guard_1.JwtAuthGuard, jwt_strategy_1.JwtStrategy],
        exports: [jwt_auth_guard_1.JwtAuthGuard],
    })
], JwtAuthModule);
//# sourceMappingURL=jwt-auth.module.js.map