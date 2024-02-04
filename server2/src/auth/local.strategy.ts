import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.usersService.validateUser(username, password);
    if (!user) {
      return null;
    }
    return user;
  }
}
