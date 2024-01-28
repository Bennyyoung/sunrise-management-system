
// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller'; // Import AuthController
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule, // Import UsersModule
    JwtModule.register({
      secret: 'cnnnfjforjfkgjejj2j3j4j5jdhfhfe',
    }),
  ],
  controllers: [AuthController], // Include AuthController in the controllers array
  providers: [AuthService],
})
export class AuthModule {}

