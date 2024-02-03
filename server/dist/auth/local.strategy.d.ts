import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    validate(username: string, password: string): Promise<any>;
}
export {};
