import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '@/auth/guard/local-auth.guard';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { RolesGuard } from '@/auth/guard/roles.guard';
import { PermissionsGuard } from '@/auth/guard/permissions.guard';
import { Roles } from '@/common/decorators/roles.decorator';
// no permissions decorator
import { Permissions } from '@/permissions/permissions.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any): Promise<any> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles('admin')
  @Permissions('manage_users')
  @Post('protected')
  getProtectedData() {
    return { message: 'This data is protected.' };
  }
}
