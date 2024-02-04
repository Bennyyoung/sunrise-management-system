// staff/staff.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Staff, StaffDocument } from './staff.schema';
import * as bcrypt from 'bcrypt';


@Injectable()
export class StaffService {
  constructor(@InjectModel(Staff.name) private readonly staffModel: Model<StaffDocument>) {}

  async onboardStaff(staffDto: any): Promise<Staff> {
    const createdStaff = new this.staffModel(staffDto);
    return createdStaff.save();
  }

  async getStaffByUsernameAndPassword(username: string, password: string): Promise<Staff | null> {
    const staff = await this.staffModel.findOne({ username }).exec();

    if (!staff) {
      return null; // Staff not found
    }

    const isPasswordValid = await bcrypt.compare(password, staff.password);

    if (!isPasswordValid) {
      return null; // Incorrect password
    }

    return staff; // Staff found and password is valid
  }

  async getStaffById(id: string): Promise<Staff> {
    const staff = await this.staffModel.findById(id).exec();
    if (!staff) {
      throw new NotFoundException('Staff not found.');
    }
    return staff;
  }

  async updateStaff(id: string, updatedStaffDto: any): Promise<Staff> {
    const updatedStaff = await this.staffModel.findByIdAndUpdate(id, updatedStaffDto, { new: true }).exec();
    if (!updatedStaff) {
      throw new NotFoundException('Staff not found.');
    }
    return updatedStaff;
  }

  // Add more methods as needed for staff-related functionality
}
