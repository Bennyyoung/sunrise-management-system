/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { Request } from 'express';
import { PrismaService } from '@/prisma/prisma.service';
import { PermissionEnum } from '@prisma/client';
import { CustomUnauthorizedException } from './customException';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions = this.getRequiredPermissions(context);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    return new Promise(async (resolve, reject) => {
      try {
        const request = context.switchToHttp().getRequest<Request>();
        const user = request.context?.authUser;

        if (!user || !user || !user.role) {
          // If the user or the user's roles are not present, deny access
          throw new CustomUnauthorizedException('Invalid User');
        }

        const userRoles = await this.prismaService.roles.findMany({
          where: {
            id: user.role.id,
          },
        });

        const userPermissions = userRoles.flatMap((role) => role.permissions);
        const hasRequiredPermissions = requiredPermissions.every(
          (requiredPermission) =>
            userPermissions.includes(requiredPermission as PermissionEnum),
        );

        if (hasRequiredPermissions) {
          resolve(true);
        } else {
          throw new CustomUnauthorizedException('Not enough Permission');
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  private getRequiredPermissions(
    context: ExecutionContext,
  ): string[] | undefined {
    const handler = context.getHandler();
    const requiredPermissions = Reflect.getMetadata('permissions', handler);

    return requiredPermissions;
  }
}
