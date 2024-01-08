import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<any> {
    return this.usersService.getUserById(id);
  }

  @Get(':id/roles')
  async getUserRoles(@Param('id') id: string): Promise<any> {
    return this.usersService.getUserRoles(id);
  }

  @Get(':id/permissions')
  async getUserPermissions(@Param('id') id: string): Promise<any> {
    return this.usersService.getUserPermissions(id);
  }
}
