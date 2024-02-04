import { PrismaService } from '@/prisma/prisma.service';
import { UserDetailed } from '@/user/user.dto';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private readonly prismaService;
    private readonly jwtService;
    constructor(userService: UserService, prismaService: PrismaService, jwtService: JwtService);
    private otp;
    validateUser(email: string, userPassword: string): Promise<{
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string | null;
        staffId: string | null;
        phoneNumber: string | null;
        role: import("@/user/user.dto").Roles;
        status: import(".prisma/client").AccountStatus;
        isDeactivated: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    generateAccessToken(user: UserDetailed): Promise<string>;
    generateRefreshToken(user: UserDetailed): Promise<string>;
    signIn(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
    } | undefined>;
    verifyRefreshToken(token: string): Promise<any>;
}
