/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { EditUserProfile, UserDetailed, UserSetupRequest } from './user.dto';
import { AccountStatus, Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserConstants } from './user.constants';
import { PaginationContext } from '@/misc/pagination/pagination.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findUserByEmail(email: string): Promise<UserDetailed | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
      include: UserConstants.StandardIncludeSets.detailed,
    });

    if (user) {
      return new UserDetailed(user);
    } else {
      return null;
    }
  }

  public async findUserByPhoneNumber(
    phoneNumber: string,
  ): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        phoneNumber: phoneNumber,
      },
    });

    if (user) {
      return user;
    } else {
      return null;
    }
  }

  public async findUserByUsername(username: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        username: username,
      },
    });

    if (user) {
      return user;
    } else {
      return null;
    }
  }

  public async setupCurrentUser(userSetupRequest: UserSetupRequest) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      userSetupRequest.password,
      saltRounds,
    );

    return await this.prismaService.user.create({
      data: {
        email: userSetupRequest.email,
        firstName: userSetupRequest.firstName,
        lastName: userSetupRequest.lastName,
        roleId: userSetupRequest.roleId,
        password: hashedPassword,
        username: userSetupRequest.username,
        phoneNumber: userSetupRequest.phoneNumber,
      },
    });
  }

  public async getAllUsers(
    userId: string | undefined,
    userName: string | undefined,
    status: AccountStatus | undefined,
    paginationContext: PaginationContext,
  ) {
    let filter: Prisma.UserWhereInput = {};

    if (userName || status || userId) {
      filter = {
        OR: [
          {
            username: {
              contains: userName,
              mode: 'insensitive',
            },
          },
          {
            status: {
              equals: status,
            },
          },
          {
            id: {
              equals: userId,
            },
          },
        ],
      };
    }

    if (userId && !status && !userId) {
      filter = {
        id: {
          equals: userId,
        },
      };
    }

    if (userName && !status && !userId) {
      filter = {
        username: {
          contains: userName,
          mode: 'insensitive',
        },
      };
    }

    if (status && !userName && !userId) {
      filter = {
        status: {
          equals: status,
        },
      };
    }

    const allUsers = await this.prismaService.user.findMany({
      where: {
        ...filter,
        NOT: {
          isDeactivated: true,
        },
      },
      take: paginationContext.take,
      skip: paginationContext.skip,
      include: UserConstants.StandardIncludeSets.detailed,
    });

    const totalCount = await this.prismaService.user.count({
      where: filter,
    });
    return {
      data: allUsers.map((c) => new UserDetailed(c)),
      total: totalCount,
    };
  }

  public async getUserById(userId: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
      include: UserConstants.StandardIncludeSets.detailed,
    });

    return new UserDetailed(user!);
  }

  public async editUser(userId: string, data: EditUserProfile) {
    return await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        lastName: data.lastName,
        firstName: data.firstName,
        phoneNumber: data.phoneNumber,
        username: data.username,
      },
    });
  }

  public async deactivateUser(userId: string) {
    return await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        isDeactivated: true,
        status: 'DEACTIVATED',
      },
    });
  }
}
