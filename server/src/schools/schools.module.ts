import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolsService } from './schools.service';
import { SchoolsController } from './schools.controller';
import { School, SchoolSchema } from './schemas/school.schema';
import { UsersModule } from '../users/users.module';
import { StudentsModule } from '../students/students.module';
import { TeachersModule } from '../teachers/teachers.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: School.name, schema: SchoolSchema }]),
    UsersModule,
    StudentsModule,
    TeachersModule,
  ],
  controllers: [SchoolsController],
  providers: [SchoolsService],
})
export class SchoolsModule {}
