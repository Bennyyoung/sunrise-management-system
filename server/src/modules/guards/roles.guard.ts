// common/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      // No specific roles required, so access is granted
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming your user information is stored in the request

    if (!user) {
      // No user, access is denied
      return false;
    }

    // Check if the user has any of the required roles
    const hasRole = () => roles.some(role => user.roles.includes(role));

    return user && user.roles && hasRole();
  }
}
