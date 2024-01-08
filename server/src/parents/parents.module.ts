import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParentsService } from './parents.service';
import { ParentsController } from './parents.controller';
import { Parent, ParentSchema } from './schemas/parent.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Parent.name, schema: ParentSchema }]), UsersModule],
  controllers: [ParentsController],
  providers: [ParentsService],
})
export class ParentsModule {}
