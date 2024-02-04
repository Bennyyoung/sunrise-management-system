import { Controller, Get, Request } from '@nestjs/common';

@Controller('students')
export class StudentController {
  @Get('dashboard')
  getStudentDashboard(@Request() req) {
    // Assuming you have authentication middleware that sets user details in req.user
    const student = req.user;

    // Implement logic to fetch student-specific dashboard data
    const dashboardData = {
      // ... fetch data for student dashboard
    };

    return {
      message: 'Student Dashboard',
      student,
      dashboardData,
    };
  }
}
