"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const app_config_1 = require("../app.config");
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const nanoid = __importStar(require("nanoid"));
let AuthService = class AuthService {
    constructor(userService, prismaService, jwtService) {
        this.userService = userService;
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.otp = nanoid.customAlphabet('0123456789', 6);
    }
    async validateUser(email, userPassword) {
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email address');
        }
        const isPasswordValid = await bcrypt.compare(userPassword, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        const { password } = user, result = __rest(user, ["password"]);
        return result;
    }
    async generateAccessToken(user) {
        const payload = { email: user.email, sub: user.id, role: user.role };
        const accessTokenExpiresIn = app_config_1.appConfig.jwtAccessToken.expiresIn;
        return this.jwtService.signAsync(payload, {
            expiresIn: accessTokenExpiresIn,
        });
    }
    async generateRefreshToken(user) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);
        let token = null;
        token = await this.prismaService.token.findFirst({
            where: {
                userId: user.id,
            },
        });
        let refreshToken;
        if (!token) {
            const createRefreshToken = await this.prismaService.token.create({
                data: {
                    userId: user.id,
                    expiresAt: expirationDate,
                },
            });
            refreshToken = await this.jwtService.signAsync({ sub: user.id, tokenId: createRefreshToken.id, userId: user.id }, {
                secret: app_config_1.appConfig.jwtRefreshToken.secret,
                expiresIn: app_config_1.appConfig.jwtRefreshToken.expiresIn,
            });
            await this.prismaService.token.update({
                where: {
                    id: createRefreshToken.id,
                },
                data: {
                    refreshToken: refreshToken,
                },
            });
        }
        else {
            refreshToken = await this.jwtService.signAsync({ sub: user.id, tokenId: token.id, userId: user.id }, {
                secret: app_config_1.appConfig.jwtRefreshToken.secret,
                expiresIn: app_config_1.appConfig.jwtRefreshToken.expiresIn,
            });
            await this.prismaService.token.update({
                where: {
                    id: token.id,
                },
                data: {
                    refreshToken: refreshToken,
                },
            });
        }
        return refreshToken;
    }
    async signIn(email, password) {
        await this.validateUser(email, password);
        const user = await this.userService.findUserByEmail(email);
        if (user) {
            const accessToken = await this.generateAccessToken(user);
            const refreshToken = await this.generateRefreshToken(user);
            return {
                accessToken,
                refreshToken,
            };
        }
        return;
    }
    async verifyRefreshToken(token) {
        try {
            const verifyToken = await this.jwtService.verify(token);
            const { tokenId, userId } = verifyToken;
            const refreshToken = await this.prismaService.token.findUnique({
                where: {
                    id: tokenId,
                },
            });
            if (!refreshToken || refreshToken.expiresAt < new Date()) {
                return false;
            }
            return userId;
        }
        catch (err) {
            throw new common_1.BadRequestException('Invalid refresh token');
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map