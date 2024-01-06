import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { UsersModule } from './users/users.module';
import { SchoolsModule } from './schools/schools.module';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';
import { ParentsModule } from './parents/parents.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/school-management', { 
       }),
    AuthModule,
    RolesModule,
    PermissionsModule,
    UsersModule,
    SchoolsModule,
    TeachersModule,
    StudentsModule,
    ParentsModule,
  ],
})
export class AppModule {}
