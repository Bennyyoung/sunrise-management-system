import { Module } from '@nestjs/common';
import { EmailService } from './services/email.service';

@Module({
  providers: [EmailService],
  exports: [EmailService], // Exports EmailService to be used in other modules
})
export class EmailModule {}
