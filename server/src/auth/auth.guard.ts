/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserService } from '../user/user.service';
import { isObservable, lastValueFrom, Observable } from 'rxjs';
import { expressUtils } from '../misc/express/express.utils';

@Injectable()
export class SunriseManagementAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
  ) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.getMetadata<boolean>(context, 'public');
    if (isPublic) {
      return true;
    }

    return new Promise(async (resolve, reject) => {
      try {
        let res = super.canActivate(context);
        if (isObservable(res)) {
          res = lastValueFrom(res);
        }
        res = await res;
        if (!res) {
          resolve(false);
          return;
        }

        const request = context.switchToHttp().getRequest<Request>();
        if (!request.user?.id) {
          throw new UnauthorizedException('Cannot retrieve auth payload');
        }

        // Checks and assigns authUser on the context
        const user = await this.userService.findUserByEmail(
          request.user?.email,
        );
        expressUtils.mergeContext(request, {
          authUser: user ?? undefined,
        });

        const skipUserSetupCheck = this.getMetadata<boolean>(
          context,
          'skipUserSetupCheck',
        );
        if (!skipUserSetupCheck) {
          if (!user) {
            throw new ForbiddenException('User setup is pending');
          }
        }

        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  }

  getMetadata<T>(context: ExecutionContext, key: string) {
    return this.reflector.getAllAndOverride<T>(key, [
      context.getHandler(),
      context.getClass(),
    ]);
  }
}
