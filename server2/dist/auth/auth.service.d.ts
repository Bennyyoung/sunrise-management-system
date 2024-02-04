import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.schema';
export declare class AuthService {
    private readonly jwtService;
    private readonly usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    generateJwtToken(user: User): Promise<string>;
    register(userDto: any): Promise<User>;
    validateUser(username: string, password: string): Promise<User | null>;
}
