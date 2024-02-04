/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from './user.service';
import { NestLogger } from '@/logging/loggers/nestLogger/nestLogger';
import { Request, Response } from 'express';
import {
  EditUserProfile,
  UserDetailed,
  UserPaginationResult,
  UserSetupRequest,
} from './user.dto';
import {
  IsPublic,
  Permissions,
  UnifiedAuth,
} from '@/auth/decorators/public.decorators';
import { Pagination } from '@/misc/pagination/pagination.decorators';
import { AccountStatus, PermissionEnum, User } from '@prisma/client';
import { paginationUtils } from '@/misc/pagination/pagination.utils';
import { ApiParam } from '@nestjs/swagger';
import _ from 'lodash';
import { RolesGuard } from '@/auth/Role/roles.guard';

// @UnifiedAuth()
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly nestLogger: NestLogger,
  ) {
    nestLogger.setOrigin(UserController.name);
  }

  /**
   * @description
   * Creates a new user entry in the database
   */
  @IsPublic()
  @Post('setup')
  async setupCurrentUser(
    @Req() req: Request,
    @Body() userSetupRequest: UserSetupRequest,
  ) {
    const existingUserEmail = await this.userService.findUserByEmail(
      userSetupRequest.email,
    );
    if (existingUserEmail) {
      throw new ConflictException('Email address already registered');
    }
    const existingUserPhoneNumber =
      await this.userService.findUserByPhoneNumber(
        userSetupRequest.phoneNumber,
      );

    if (existingUserPhoneNumber) {
      throw new BadRequestException(
        'User with this phone number already existed',
      );
    }
    const existingUserUsername = await this.userService.findUserByUsername(
      userSetupRequest.username,
    );

    if (existingUserUsername) {
      throw new BadRequestException('User with this username already existed');
    }

    const verifyUserRole = await this.prismaService.roles.findUnique({
      where: {
        id: userSetupRequest.roleId,
      },
    });

    if (!verifyUserRole) {
      throw new BadRequestException('Invalid User role');
    }

    return this.userService.setupCurrentUser(userSetupRequest);
  }

  /**
   * Get all users
   *
   * Returns users details
   *
   * Supports Pagination
   */

  @Pagination({
    maxTake: 20,
  })
  @UseGuards(RolesGuard)
  @Permissions(PermissionEnum.ManageAdmins, PermissionEnum.ManageSchoolAdmin)
  @Get('/')
  async getAllUsers(
    @Req() req: Request,
    @Res() res: Response,
    @Query('userName') userName: string,
    @Query('status') status: AccountStatus,
    @Query('userId') userId: string,
  ): Promise<UserPaginationResult> {
    const result = await this.userService.getAllUsers(
      userId,
      userName,
      status,
      req!.context!.pagination!,
    );

    const skip = req!.context!.pagination?.skip ?? 0;
    const take = req!.context!.pagination?.take ?? 20;

    return paginationUtils.sendPaginatedResponse(res, result, skip, take);
  }

  @UseGuards(RolesGuard)
  @Permissions(PermissionEnum.ManageAdmins, PermissionEnum.ManageSchoolAdmin)
  @ApiParam({
    name: 'userId',
    description: 'User ID',
  })
  @Get(':userId')
  async getUserById(
    @Req() req: Request,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserDetailed | null> {
    if (_.isNil(userId)) {
      throw new BadRequestException('Invalid user');
    }
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || user.isDeactivated) {
      this.nestLogger.error(
        'attempt-to-get-user-by-id',
        'Invalid user',
        req.context,
        {
          properties: {
            userId: userId,
            staffId: req.context?.authUser?.id,
          },
        },
      );
      throw new BadRequestException('Invalid user');
    }

    return await this.userService.getUserById(userId);
  }

  /**
   * Update user
   *
   * Returns user details
   */
  @ApiParam({
    name: 'userId',
    description: 'User ID',
  })
  @Put(':userId')
  async editUser(
    @Req() req: Request,
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() data: EditUserProfile,
  ): Promise<User> {
    if (_.isNil(userId)) {
      throw new BadRequestException('Invalid user');
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id: req.context?.authUser?.id,
      },
    });

    if (!user || user.isDeactivated) {
      this.nestLogger.error(
        'attempt-to-edit-user',
        'Invalid role',
        req.context,
        {
          properties: {
            userId,
            staffId: req.context?.authUser?.id,
          },
        },
      );
      throw new BadRequestException('Invalid user');
    }

    if (data.phoneNumber) {
      const existingUserPhoneNumber = await this.prismaService.user.findUnique({
        where: {
          phoneNumber: data.phoneNumber,
        },
      });

      if (existingUserPhoneNumber && user.phoneNumber !== data.phoneNumber) {
        this.nestLogger.error(
          'attempt-to-edit-user-phone-number',
          'Invalid phone number',
          req.context,
          {
            properties: {
              userId,
              staffId: req.context?.authUser?.id,
            },
          },
        );
        throw new BadRequestException('Invalid phone number');
      }
    }

    if (data.username) {
      const existingUserUsername = await this.prismaService.user.findUnique({
        where: {
          username: data.username,
        },
      });

      if (existingUserUsername && user.username !== data.username) {
        this.nestLogger.error(
          'attempt-to-edit-user-user-name',
          'Invalid user name',
          req.context,
          {
            properties: {
              userId,
              staffId: req.context?.authUser?.id,
            },
          },
        );
        throw new BadRequestException('Invalid user name');
      }
    }

    return await this.userService.editUser(userId, data);
  }

  /**
   * Deactivate user
   *
   */
  @UseGuards(RolesGuard)
  @Permissions(PermissionEnum.ManageAdmins, PermissionEnum.ManageSchoolAdmin)
  @ApiParam({
    name: 'userId',
    description: 'User ID',
  })
  @Post('deactivate/:userId')
  async deactivateUser(
    @Req() req: Request,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<User> {
    if (_.isNil(userId)) {
      throw new BadRequestException('Invalid user');
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      this.nestLogger.error(
        'attempt-to-deactivate-user',
        'Invalid role',
        req.context,
        {
          properties: {
            userId,
            staffId: req.context?.authUser?.id,
          },
        },
      );
      throw new BadRequestException('Invalid user');
    }

    return await this.userService.deactivateUser(userId);
  }
}
