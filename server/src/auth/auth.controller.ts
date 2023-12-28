// auth/auth.controller.ts

import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SuperAdminGuard } from './super-admin.guard'; // Import the SuperAdminGuard

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(SuperAdminGuard) // Apply the SuperAdminGuard to the registration route
  async register(@Body('email') email: string, @Body('password') password: string) {
    try {
      const user = await this.authService.register(email, password);
      return { message: 'Registration successful', user };
    } catch (error) {
      return { message: 'Registration failed', error: error.message };
    }
  }

  @Post('login')
  @UseGuards(SuperAdminGuard) // Apply the SuperAdminGuard to the login route
  async login(@Body('email') email: string, @Body('password') password: string) {
    try {
      const user = await this.authService.login(email, password);
      return { message: 'Login successful', user };
    } catch (error) {
      return { message: 'Login failed', error: error.message };
    }
  }
}
