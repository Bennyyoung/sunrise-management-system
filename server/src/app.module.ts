// app.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { mongooseConfig } from './config/mongoose.config';

@Module({
  imports: [
    MongooseModule.forRoot(mongooseConfig),
    AuthModule,
  ],
})
export class AppModule {}
