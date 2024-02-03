import { Controller, Get, Request } from '@nestjs/common';

@Controller('staff')
export class StaffController {
  @Get('dashboard')
  getStaffDashboard(@Request() req) {
    // Assuming you have authentication middleware that sets user details in req.user
    const staff = req.user;

    // Implement logic to fetch staff-specific dashboard data
    const dashboardData = {
      // ... fetch data for staff dashboard
    };

    return {
      message: 'Staff Dashboard',
      staff,
      dashboardData,
    };
  }
}
