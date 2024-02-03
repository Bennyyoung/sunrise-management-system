// parents/parents.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParentController } from './parent.controller';
import { ParentService } from './parent.service';
import { Parent, ParentSchema } from './parent.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Parent.name, schema: ParentSchema }])],
  controllers: [ParentController],
  providers: [ParentService],
  exports: [ParentService], // Export the service to be used in other modules if needed
})
export class ParentsModule {}
