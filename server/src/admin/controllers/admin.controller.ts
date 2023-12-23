import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from '../services/email.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-login-details')
  async sendLoginDetailsToUsers(@Body() userDetails: { email: string, username: string, password: string }) {
    try {
      await this.emailService.sendLoginDetails(userDetails.email, userDetails.username, userDetails.password);
      return { message: 'Login details sent successfully!' };
    } catch (error) {
      throw new Error('Failed to send login details.');
    }
  }
}
