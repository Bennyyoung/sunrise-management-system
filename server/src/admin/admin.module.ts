// admin/admin.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin, AdminSchema } from './admin.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])],
    controllers: [AdminController], // Make sure the import statement is correct
    providers: [AdminService],
    exports: [AdminService], // Export the service to be used in other modules if needed
})
export class AdminModule {}
