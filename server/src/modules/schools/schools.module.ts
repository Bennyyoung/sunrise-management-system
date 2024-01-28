// schools/schools.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { School, SchoolSchema } from './school.model'; // Import School model

@Module({
  imports: [MongooseModule.forFeature([{ name: 'School', schema: SchoolSchema }])], // Import School model and schema
  controllers: [SchoolsController],
  providers: [SchoolsService],
})
export class SchoolsModule {}
