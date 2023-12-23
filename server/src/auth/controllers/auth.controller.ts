import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDTO, RegisterDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: LoginDTO) {
    return this.authService.login(credentials);
  }

  @Post('register')
  async register(@Body() userData: RegisterDTO) {
    return this.authService.register(userData);
  }

  // Other auth-related endpoints (password recovery, etc.)
}
