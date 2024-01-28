// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SchoolsModule } from './modules/schools/schools.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://sunrise:sunrise@cluster0.o62vzf8.mongodb.net/sunrise', {
      
    }),
    AuthModule,
    UsersModule,
    SchoolsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
