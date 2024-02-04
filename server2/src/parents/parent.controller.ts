import { Controller, Get, Request } from '@nestjs/common';

@Controller('parents')
export class ParentController {
  @Get('dashboard')
  getParentDashboard(@Request() req) {
    // Assuming you have authentication middleware that sets user details in req.user
    const parent = req.user;

    // Implement logic to fetch parent-specific dashboard data
    const dashboardData = {
      // ... fetch data for parent dashboard
    };

    return {
      message: 'Parent Dashboard',
      parent,
      dashboardData,
    };
  }
}