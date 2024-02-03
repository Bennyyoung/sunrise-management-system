import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    register(userDto: any): Promise<{
        message: string;
        user: import("../users/user.schema").User;
    }>;
    getUser(req: any): any;
}
