/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaFindArgs } from '@/misc/types/helperTypes';
import { ApiProperty } from '@nestjs/swagger';
import { AccountStatus, PermissionEnum, Prisma } from '@prisma/client';
import { Allow, IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { UserConstants } from './user.constants';

export class UserSetupRequest {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password is too short',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  roleId: string;
}

export class Roles {
  id: string;
  name: string;
  permissions: PermissionEnum[];
}

export class UserDetailed {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string | null;
  staffId: string | null;
  phoneNumber: string | null;
  password: string;
  role: Roles;
  status: AccountStatus;
  isDeactivated: boolean;

  createdAt: Date;
  updatedAt: Date;

  constructor(
    detailedUserDetails: Prisma.UserGetPayload<
      PrismaFindArgs<typeof UserConstants.StandardIncludeSets.detailed>
    >,
  ) {
    this.id = detailedUserDetails.id;
    this.username = detailedUserDetails.username;
    this.firstName = detailedUserDetails.firstName;
    this.lastName = detailedUserDetails.lastName;
    this.email = detailedUserDetails?.email;
    this.phoneNumber = detailedUserDetails.phoneNumber;
    this.role = detailedUserDetails.role;
    this.password = detailedUserDetails.password;
    this.status = detailedUserDetails.status;
    this.isDeactivated = detailedUserDetails.isDeactivated;

    this.createdAt = detailedUserDetails.createdAt;
    this.updatedAt = detailedUserDetails.updatedAt;
  }
}

export class EditUserProfile {
  @ApiProperty()
  @Allow()
  username: string;

  @ApiProperty()
  @Allow()
  firstName: string;

  @ApiProperty()
  @Allow()
  lastName: string;

  @ApiProperty()
  @Allow()
  phoneNumber: string;
}

export type UserPaginationResult = {
  currentPage: number;
  totalPage: number;
  data: UserDetailed[];
};
