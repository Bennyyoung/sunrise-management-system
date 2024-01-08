import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async validateUserById(userId: string): Promise<any> {
    return this.usersService.findById(userId);
  }

  async register(user): Promise<any> {
    const createdUser = await this.usersService.registerUser(user);
    const { password, ...result } = createdUser;

    return result;
  }

  async login(user): Promise<any> {
    const payload = {
      sub: user.userId,
      username: user.username,
      roles: user.roles,
      permissions: user.permissions,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
