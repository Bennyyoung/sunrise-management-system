import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // Upon successful login, generate JWT token
    return { access_token: await this.authService.generateJwtToken(req.user) };
  }

  @Post('register')
  async register(@Body() userDto: any) {
    // Register a new user
    const newUser = await this.authService.register(userDto);
    return { message: 'User registered successfully', user: newUser };
  }

  @Post('user')
  getUser(@Request() req) {
    // Return user details from the request (assuming the user is authenticated)
    return req.user;
  }
}
