import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { AdminDto } from '../admin/admin.dto';

@Injectable()
export class UserModel {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(email: string, password: string): Promise<User> {
    const user = new this.userModel({ email, password });
    return await user.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).lean().exec();
  }

  async findById(id: string): Promise<User | null> {
    return await this.userModel.findById(id).lean().exec();
  }

  async findByIdAndUpdate(id: string, user: Partial<User>): Promise<User | null> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true }).lean().exec();
  }

  async findByIdAndDelete(id: string): Promise<User | null> {
    return await this.userModel.findByIdAndDelete(id).lean().exec();
  }
}

@Injectable()
export class AdminService {
  constructor(private readonly userModel: UserModel) {}

  async createAdmin(adminDto: AdminDto): Promise<User> {
    const { email, password } = adminDto;
    return await this.userModel.createUser(email, password);
  }

  // Other methods remain unchanged...
}
