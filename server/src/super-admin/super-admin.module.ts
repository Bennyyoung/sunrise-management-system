// super-admin/super-admin.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperAdminController } from './super-admin.controller';
import { SuperAdminService } from './super-admin.service';
import { SuperAdmin, SuperAdminSchema } from './super-admin.schema';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SuperAdmin.name, schema: SuperAdminSchema }]),
    AdminModule, // Import the AdminModule to use its services
  ],
  controllers: [SuperAdminController],
  providers: [SuperAdminService],
  exports: [SuperAdminService], // Export the service to be used in other modules if needed
})
export class SuperAdminModule {}
