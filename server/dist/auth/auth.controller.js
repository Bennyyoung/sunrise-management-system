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
exports.AuthController = void 0;
const nestLogger_1 = require("../logging/loggers/nestLogger/nestLogger");
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const public_decorators_1 = require("./decorators/public.decorators");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("./auth.guard");
const user_dto_1 = require("../user/user.dto");
const user_constants_1 = require("../user/user.constants");
const auth_dto_1 = require("./auth.dto");
let AuthController = class AuthController {
    constructor(userService, prismaService, nestLogger, authService) {
        this.userService = userService;
        this.prismaService = prismaService;
        this.nestLogger = nestLogger;
        this.authService = authService;
    }
    signIn(signInDto) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }
    async getCurrentUser(req) {
        var _a;
        if (!((_a = req.context) === null || _a === void 0 ? void 0 : _a.authUser)) {
            throw new common_1.HttpException('User not setup', common_1.HttpStatus.PRECONDITION_FAILED);
        }
        const { id } = req.context.authUser;
        const user = await this.prismaService.user.findUnique({
            where: {
                id: id,
            },
            include: user_constants_1.UserConstants.StandardIncludeSets.detailed,
        });
        if (!user) {
            throw new common_1.BadRequestException('Invalid user');
        }
        return new user_dto_1.UserDetailed(user);
    }
    async refreshAccessToken(req, data) {
        const userId = await this.authService.verifyRefreshToken(data.refreshToken);
        if (userId) {
            const user = await this.userService.getUserById(userId);
            const accessToken = await this.authService.generateAccessToken(user);
            const refreshToken = await this.authService.generateRefreshToken(user);
            return { accessToken, refreshToken };
        }
    }
};
__decorate([
    (0, public_decorators_1.IsPublic)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, public_decorators_1.IsPublic)(),
    (0, common_1.UseGuards)(auth_guard_1.SunriseManagementAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Post)('/refresh'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.RefreshTokenRequest]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshAccessToken", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        prisma_service_1.PrismaService,
        nestLogger_1.NestLogger,
        auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map