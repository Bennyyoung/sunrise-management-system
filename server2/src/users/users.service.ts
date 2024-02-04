import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(userDto: any): Promise<User> {
    // Check if the username is already taken
    const existingUser = await this.userModel.findOne({ username: userDto.username });
    if (existingUser) {
      throw new NotFoundException('Username is already taken.');
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    // Create and save the new user
    const newUser = new this.userModel({ ...userDto, password: hashedPassword });
    return newUser.save();
  }


  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec();

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password.');
    }

    return user;
  }

  async getUserById(userId: string): Promise<string | null> {
    try {
      const userInstance = await this.userModel.findById(userId);
      return userInstance ? userInstance.name : null;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      return null;
    }
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, userDto: any): Promise<User> {
    const existingUser = await this.userModel.findById(id).exec();
    if (!existingUser) {
      throw new NotFoundException('User not found.');
    }

    // Update user details
    existingUser.name = userDto.name || existingUser.name;
    existingUser.email = userDto.email || existingUser.email;

    // Save the updated user
    return existingUser.save();
  }

  async updateRole(id: string, role: string): Promise<User> {
    const existingUser = await this.userModel.findById(id).exec();
    if (!existingUser) {
      throw new NotFoundException('User not found.');
    }

    // Update user role
    existingUser.role = role;

    // Save the updated user
    return existingUser.save();
  }
}
