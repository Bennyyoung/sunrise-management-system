/* eslint-disable @typescript-eslint/no-unused-vars */
import { appConfig } from '@/app.config';
import { PrismaService } from '@/prisma/prisma.service';
import { UserDetailed } from '@/user/user.dto';
import { UserService } from '@/user/user.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Token } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as nanoid from 'nanoid';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private otp = nanoid.customAlphabet('0123456789', 6);

  public async validateUser(email: string, userPassword: string) {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email address');
    }

    const isPasswordValid = await bcrypt.compare(userPassword, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const { password, ...result } = user;

    return result;
  }

  public async generateAccessToken(user: UserDetailed): Promise<string> {
    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessTokenExpiresIn = appConfig.jwtAccessToken.expiresIn;

    return this.jwtService.signAsync(payload, {
      expiresIn: accessTokenExpiresIn,
    });
  }

  public async generateRefreshToken(user: UserDetailed): Promise<string> {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    let token: Token | null = null;

    token = await this.prismaService.token.findFirst({
      where: {
        userId: user.id,
      },
    });

    let refreshToken: string;

    if (!token) {
      const createRefreshToken = await this.prismaService.token.create({
        data: {
          userId: user.id,
          expiresAt: expirationDate,
        },
      });

      refreshToken = await this.jwtService.signAsync(
        { sub: user.id, tokenId: createRefreshToken.id, userId: user.id },
        {
          secret: appConfig.jwtRefreshToken.secret,
          expiresIn: appConfig.jwtRefreshToken.expiresIn,
        },
      );

      await this.prismaService.token.update({
        where: {
          id: createRefreshToken.id,
        },
        data: {
          refreshToken: refreshToken,
        },
      });
    } else {
      refreshToken = await this.jwtService.signAsync(
        { sub: user.id, tokenId: token.id, userId: user.id },
        {
          secret: appConfig.jwtRefreshToken.secret,
          expiresIn: appConfig.jwtRefreshToken.expiresIn,
        },
      );

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

  public async signIn(email: string, password: string) {
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

  public async verifyRefreshToken(token: string) {
    //Verify JWT refresh token
    try {
      const verifyToken = await this.jwtService.verify(token);
      const { tokenId, userId } = verifyToken;
      // Retrieve the token from the database
      const refreshToken = await this.prismaService.token.findUnique({
        where: {
          id: tokenId,
          // userId: userId,
        },
      });

      if (!refreshToken || refreshToken.expiresAt < new Date()) {
        return false;
      }
      return userId;
    } catch (err) {
      throw new BadRequestException('Invalid refresh token');
    }
  }
}
