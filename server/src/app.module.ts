import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SchoolAdminModule } from './school-admin/school-admin.module';
import { PassportModule } from '@nestjs/passport';
import { LoggerModule } from './logging/loggers/nestLogger/logger.module';
import { appConfig } from './app.config';
import { APP_FILTER } from '@nestjs/core';
import { UnauthorizedFilter } from './misc/UnauthorizedFilter';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PassportModule,
    LoggerModule.register(appConfig.logging.options),
    AuthModule,
    UserModule,
    PrismaModule,
    SchoolAdminModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: UnauthorizedFilter,
    },
  ],
})
export class AppModule {}
