import { Controller, Post, Body, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { SchoolService } from './school.service';

@Controller('schools')
export class SchoolController {
  constructor(
    private readonly schoolService: SchoolService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('onboard-admin')
  async onboardAdmin(@Body() adminDto: any, @Request() req) {
    // Check if the user making the request has the necessary role to onboard admins
    if (req.user.role !== 'SuperAdmin') {
      throw new ForbiddenException('You are not authorized to onboard admins.');
    }

    // Create admin user
    const adminUser = await this.usersService.create({
      username: adminDto.username,
      password: adminDto.password,
      role: 'Admin',
    });

    // Onboard admin with additional school details
    return this.schoolService.onboardAdmin(adminUser, adminDto.schoolDetails);
  }

  // Similar endpoints can be created for onboarding students, staff, and parents
  // Use appropriate roles and service methods for each user type
}
