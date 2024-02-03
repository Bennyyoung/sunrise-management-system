// src/parent/parent.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Parent, ParentDocument } from './parent.schema';
import { ParentDto } from './parent.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ParentService {
  constructor(
    @InjectModel(Parent.name) private readonly parentModel: Model<ParentDocument>,
  ) {}



  async getParentByUsernameAndPassword(username: string, password: string): Promise<Parent | null> {
    // Use lean() to convert the Mongoose document to a plain JavaScript object
    const parent: Parent | null = await this.parentModel
      .findOne({ username })
      .select('+password') // Include the password field in the projection
      .lean()
      .exec();

    if (!parent) {
      return null; // Parent not found
    }

    const isPasswordValid = await bcrypt.compare(password, parent.password);

    if (!isPasswordValid) {
      return null; // Incorrect password
    }

    return parent; // Parent found and password is valid
  }
  


  async createParent(parentDto: ParentDto): Promise<Parent> {
    const createdParent = new this.parentModel(parentDto);
    return createdParent.save();
  }

  async getAllParents(): Promise<Parent[]> {
    return this.parentModel.find().exec();
  }

  async getParentById(id: string): Promise<Parent> {
    const parent = await this.parentModel.findById(id).exec();
    if (!parent) {
      throw new NotFoundException('Parent not found');
    }
    return parent;
  }

  // Add more methods as needed

}
