// auth/super-admin.guard.ts

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '../auth/users/user.schema'; // Import your User interface

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user; // Assuming user information is in the request

    if (user && user.role === 'superadmin') {
      return true; // User is a super admin, allow access
    }

    return false; // User is not a super admin, deny access
  }
}
