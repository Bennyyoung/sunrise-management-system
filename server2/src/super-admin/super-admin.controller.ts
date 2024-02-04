import { Controller, Post } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';

@Controller('super-admin')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @Post('create-admin')
  createAdmin() {
    // Implement logic to create admin
    return 'Admin created successfully';
  }

  @Post('generate-login')
  generateLogin() {
    // Implement logic to generate login details for admin
    return 'Login details generated successfully';
  }
}
