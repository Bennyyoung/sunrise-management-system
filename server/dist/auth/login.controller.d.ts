import { LoginService } from './login.service';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    loginUser(loginDto: any): Promise<any>;
}
