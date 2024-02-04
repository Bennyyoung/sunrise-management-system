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
exports.SunriseManagementAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const core_1 = require("@nestjs/core");
const user_service_1 = require("../user/user.service");
const rxjs_1 = require("rxjs");
const express_utils_1 = require("../misc/express/express.utils");
let SunriseManagementAuthGuard = class SunriseManagementAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector, userService) {
        super();
        this.reflector = reflector;
        this.userService = userService;
    }
    canActivate(context) {
        const isPublic = this.getMetadata(context, 'public');
        if (isPublic) {
            return true;
        }
        return new Promise(async (resolve, reject) => {
            var _a, _b;
            try {
                let res = super.canActivate(context);
                if ((0, rxjs_1.isObservable)(res)) {
                    res = (0, rxjs_1.lastValueFrom)(res);
                }
                res = await res;
                if (!res) {
                    resolve(false);
                    return;
                }
                const request = context.switchToHttp().getRequest();
                if (!((_a = request.user) === null || _a === void 0 ? void 0 : _a.id)) {
                    throw new common_1.UnauthorizedException('Cannot retrieve auth payload');
                }
                const user = await this.userService.findUserByEmail((_b = request.user) === null || _b === void 0 ? void 0 : _b.email);
                express_utils_1.expressUtils.mergeContext(request, {
                    authUser: user !== null && user !== void 0 ? user : undefined,
                });
                const skipUserSetupCheck = this.getMetadata(context, 'skipUserSetupCheck');
                if (!skipUserSetupCheck) {
                    if (!user) {
                        throw new common_1.ForbiddenException('User setup is pending');
                    }
                }
                resolve(true);
            }
            catch (err) {
                reject(err);
            }
        });
    }
    getMetadata(context, key) {
        return this.reflector.getAllAndOverride(key, [
            context.getHandler(),
            context.getClass(),
        ]);
    }
};
SunriseManagementAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        user_service_1.UserService])
], SunriseManagementAuthGuard);
exports.SunriseManagementAuthGuard = SunriseManagementAuthGuard;
//# sourceMappingURL=auth.guard.js.map