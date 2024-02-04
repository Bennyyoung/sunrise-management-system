/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestLogger } from '@/logging/loggers/nestLogger/nestLogger';
import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from '@/user/user.service';
import {
  Controller,
  HttpCode,
  Post,
  Body,
  HttpStatus,
  Get,
  Req,
  HttpException,
  UseGuards,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic, SkipUserSetupCheck } from './decorators/public.decorators';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SunriseManagementAuthGuard } from './auth.guard';
import { UserDetailed } from '@/user/user.dto';
import { UserConstants } from '@/user/user.constants';
import {
  RefreshTokenRequest,
} from './auth.dto';
import moment from 'moment';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly nestLogger: NestLogger,
    private readonly authService: AuthService,
  ) {}

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @ApiBearerAuth()
  @IsPublic()
  @UseGuards(SunriseManagementAuthGuard)
  @Get('me')
  async getCurrentUser(@Req() req: Request): Promise<UserDetailed> {
    if (!req.context?.authUser) {
      throw new HttpException('User not setup', HttpStatus.PRECONDITION_FAILED);
    }

    const { id } = req.context.authUser;

    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      include: UserConstants.StandardIncludeSets.detailed,
    });

    if (!user) {
      throw new BadRequestException('Invalid user');
    }

    // Return the user information
    return new UserDetailed(user);
  }

  @Post('/refresh')
  async refreshAccessToken(
    @Req() req: Request,
    @Body() data: RefreshTokenRequest,
  ) {
    // Verify the refresh token
    const userId = await this.authService.verifyRefreshToken(data.refreshToken);
    if (userId) {
      const user = await this.userService.getUserById(userId);
      // Generate a new access token
      const accessToken = await this.authService.generateAccessToken(user);
      // Return the new access token and new refresh token
      const refreshToken = await this.authService.generateRefreshToken(user);
      return { accessToken, refreshToken };
    }
  }

}
