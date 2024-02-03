// src/student/student.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './student.schema';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
