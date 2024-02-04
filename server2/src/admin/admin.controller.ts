// import { Controller, Post, Body, Request } from '@nestjs/common';
// import { AdminService } from './admin.service';

// @Controller('admin')
// export class AdminController {
//   constructor(private readonly adminService: AdminService) {}

//   @Post('onboard')
//   async onboardAdmin(@Body() adminDto: any, @Request() req: any) {
//     // Validate that the request is coming from an authenticated super admin
//     const superAdminId = req.user.id; // Assuming you have a user ID in the request

//     // Implement additional validation and authorization checks as needed

//     // Onboard the new admin
//     const admin = await this.adminService.onboardAdmin(adminDto, superAdminId);

//     // Generate login details and password for the new admin
//     const loginDetails = await this.adminService.generateLoginForUser(adminDto, superAdminId);

//     return {
//       message: 'Admin onboarded successfully',
//       admin,
//       loginDetails,
//     };
//   }

//   // Add more endpoints as needed
// }


import { Controller, Post, Body, Request } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('onboard')
  async onboardAdmin(@Body() adminDto: any, @Request() req: any) {
    // Validate that the request is coming from an authenticated super admin
    const superAdminId = req.user.id; // Assuming you have a user ID in the request

    // Implement additional validation and authorization checks as needed

    // Onboard the new admin
    const admin = await this.adminService.onboardAdmin({
      ...adminDto,
      superAdminId: superAdminId, // or simply superAdminId, based on your service implementation
    });

    // Generate login details and password for the new admin
    const loginDetails = await this.adminService.generateLoginForUser(adminDto, superAdminId);

    return {
      message: 'Admin onboarded successfully',
      admin,
      loginDetails,
    };
  }

  // Add more endpoints as needed
}
