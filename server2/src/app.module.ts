// // app.module.ts

// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
// import { ParentsModule } from './parents/parents.module'; // Add other modules as needed

// @Module({
//   imports: [
//     MongooseModule.forRoot('mongodb://localhost/school-management', {
      
//     }),
//     UsersModule,
//     AuthModule,
//     ParentsModule, // Include other modules here
//   ],
//   controllers: [],
//   providers: [],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperAdminController } from './super-admin/super-admin.controller';
import { AdminController } from './admin/admin.controller';
import { LoginController } from './auth/login.controller';
import { UsersController } from './users/user.controller';
import { SchoolController } from './schools/school.controller';
import { StudentController } from './students/student.controller';
import { StaffController } from './staff/staff.controller';
import { ParentController } from './parents/parent.controller';
import { SuperAdminService } from './super-admin/super-admin.service';
import { AdminService } from './admin/admin.service';
import { LoginService } from './auth/login.service';
import { UsersService } from './users/users.service';
import { SchoolService } from './schools/school.service';
import { StudentService } from './students/student.service';
import { StaffService } from './staff/staff.service';
import { ParentService } from './parents/parent.service';
import { DatabaseConfig } from './config/database.config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://sunrise:sunrise@cluster0.o62vzf8.mongodb.net/sunrise'), // Adjust with your database configuration
    // TypeOrmModule.forFeature([/* Add your entities here */]),
  ],
  controllers: [
    SuperAdminController,
    AdminController,
    LoginController,
    UsersController,
    SchoolController,
    StudentController,
    StaffController,
    ParentController,
  ],
  providers: [
    SuperAdminService,
    AdminService,
    LoginService,
    UsersService,
    SchoolService,
    StudentService,
    StaffService,
    ParentService,
  ],
})
export class AppModule {}

