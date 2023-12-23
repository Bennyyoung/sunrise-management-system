import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true; // No roles defined, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming user info is stored in the request

    // Check if the user role matches any of the allowed roles
    const hasRole = () => roles.includes(user.role);
    return user && user.role && hasRole();
  }
}
