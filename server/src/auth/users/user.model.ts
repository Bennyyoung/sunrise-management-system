// user.model.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserSchema } from './user.schema';

@Injectable()
export class UserModel {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(email: string, password: string): Promise<User> {
    const user = new this.userModel({ email, password });
    return await user.save();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }
}
