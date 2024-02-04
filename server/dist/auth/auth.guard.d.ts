import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
declare const SunriseManagementAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class SunriseManagementAuthGuard extends SunriseManagementAuthGuard_base {
    private reflector;
    private readonly userService;
    constructor(reflector: Reflector, userService: UserService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    getMetadata<T>(context: ExecutionContext, key: string): T;
}
export {};
