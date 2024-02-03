// super-admin/super-admin.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuperAdmin, SuperAdminDocument } from './super-admin.schema';
import { AdminService } from '../admin/admin.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SuperAdminService {
  constructor(
    @InjectModel(SuperAdmin.name) private readonly superAdminModel: Model<SuperAdminDocument>,
    private readonly adminService: AdminService,
  ) {}

  async onboardSuperAdmin(superAdminDto: any): Promise<SuperAdmin> {
    const createdSuperAdmin = new this.superAdminModel(superAdminDto);
    return createdSuperAdmin.save();
  }

  async getSuperAdminByUsernameAndPassword(username: string, password: string): Promise<SuperAdmin | null> {
    const superAdmin = await this.superAdminModel.findOne({ username }).exec();

    if (!superAdmin) {
      return null; // SuperAdmin not found
    }

    const isPasswordValid = await bcrypt.compare(password, superAdmin.password);

    if (!isPasswordValid) {
      return null; // Incorrect password
    }

    return superAdmin; // SuperAdmin found and password is valid
  }

  async generateAdminLoginDetails(adminId: string): Promise<any> {
    const admin = await this.adminService.getAdminById(adminId);
    if (!admin) {
      throw new NotFoundException('Admin not found.');
    }

    // Implement logic to generate login details for admin
    // For example, generate a temporary password and return it

    const tempPassword = Math.random().toString(36).slice(-8);
    // You may want to handle password hashing here before saving it

    return { username: admin.username, password: tempPassword };
  }

  async getSuperAdminById(id: string): Promise<SuperAdmin> {
    const superAdmin = await this.superAdminModel.findById(id).exec();
    if (!superAdmin) {
      throw new NotFoundException('SuperAdmin not found.');
    }
    return superAdmin;
  }

  async updateSuperAdmin(id: string, updatedSuperAdminDto: any): Promise<SuperAdmin> {
    const updatedSuperAdmin = await this.superAdminModel.findByIdAndUpdate(id, updatedSuperAdminDto, { new: true }).exec();
    if (!updatedSuperAdmin) {
      throw new NotFoundException('SuperAdmin not found.');
    }
    return updatedSuperAdmin;
  }

  // Add more methods as needed for super admin-related functionality
}
