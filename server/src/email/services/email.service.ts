import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      // Configure your email provider details here
      service: 'gmail',
      auth: {
        user: 'your_email@gmail.com',
        pass: 'your_password',
      },
    });
  }

  async sendLoginDetails(email: string, username: string, password: string): Promise<void> {
    const mailOptions = {
      from: 'your_email@gmail.com',
      to: email,
      subject: 'Login Details',
      text: `Username: ${username}\nPassword: ${password}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
