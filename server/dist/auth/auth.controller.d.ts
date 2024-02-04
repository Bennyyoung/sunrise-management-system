import { NestLogger } from '@/logging/loggers/nestLogger/nestLogger';
import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from '@/user/user.service';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { UserDetailed } from '@/user/user.dto';
import { RefreshTokenRequest } from './auth.dto';
export declare class AuthController {
    private readonly userService;
    private readonly prismaService;
    private readonly nestLogger;
    private readonly authService;
    constructor(userService: UserService, prismaService: PrismaService, nestLogger: NestLogger, authService: AuthService);
    signIn(signInDto: Record<string, any>): Promise<{
        accessToken: string;
        refreshToken: string;
    } | undefined>;
    getCurrentUser(req: Request): Promise<UserDetailed>;
    refreshAccessToken(req: Request, data: RefreshTokenRequest): Promise<{
        accessToken: string;
        refreshToken: string;
    } | undefined>;
}
