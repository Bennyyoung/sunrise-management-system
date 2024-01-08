import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student, StudentSchema } from './schemas/student.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]), UsersModule],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
