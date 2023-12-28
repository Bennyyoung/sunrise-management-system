// auth/auth.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SuperAdminGuard } from './super-admin.guard';
import { UserModel } from '../auth/users/user.model';
import { UserSchema } from '../auth/users/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserModel,
    SuperAdminGuard,
  ],
  exports: [AuthService], // Optionally export the AuthService if needed in other modules
})
export class AuthModule {}
