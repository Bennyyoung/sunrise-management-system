// auth/login.controller.ts

import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  async loginUser(@Body() loginDto: any): Promise<any> {
    const { username, password, role } = loginDto;

    try {
      const user = await this.loginService.validateUser(username, password, role);
      const token = await this.loginService.generateToken(user);

      return { token, user };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
