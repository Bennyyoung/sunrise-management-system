import { Controller, Post, Body, Param, Patch, UseGuards, Request, ForbiddenException, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() userDto: any, @Request() req) {
    // Check if the user making the request is updating their own details
    if (req.user.sub !== id) {
      throw new ForbiddenException('You are not authorized to update this user.');
    }

    // Update user details
    return this.usersService.update(id, userDto);
  }
  
  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<string | null> {
    return this.usersService.getUserById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/role')
  async updateRole(@Param('id') id: string, @Body('role') role: string, @Request() req) {
    // Check if the user making the request has the necessary role to update roles
    if (req.user.role !== 'Admin') {
      throw new ForbiddenException('You are not authorized to update user roles.');
    }

    // Update user role
    return this.usersService.updateRole(id, role);
  }
}
