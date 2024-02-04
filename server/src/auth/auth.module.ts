/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { appConfig } from '@/app.config';
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from './auth.controller';
import { SunriseManagementAuthGuard } from './auth.guard';
import { LocalStrategy } from './auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: appConfig.jwtAccessToken.secret,
      signOptions: { expiresIn: appConfig.jwtAccessToken.expiresIn },
    }),
    JwtModule.register({
      secret: appConfig.jwtRefreshToken.secret,
      signOptions: { expiresIn: appConfig.jwtRefreshToken.expiresIn },
    }),
  ],
  providers: [AuthService, SunriseManagementAuthGuard, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
