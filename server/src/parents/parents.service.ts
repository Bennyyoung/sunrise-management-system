import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Parent, ParentDocument } from './schemas/parent.schema';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';

@Injectable()
export class ParentsService {
  constructor(@InjectModel(Parent.name) private parentModel: Model<ParentDocument>) {}

  async createParent(createParentDto: CreateParentDto): Promise<Parent> {
    const createdParent = new this.parentModel(createParentDto);
    return createdParent.save();
  }

  async updateParent(id: string, updateParentDto: UpdateParentDto): Promise<Parent | null> {
    return this.parentModel.findByIdAndUpdate(id, updateParentDto, { new: true }).exec();
  }

  async getParentById(id: string): Promise<Parent | null> {
    return this.parentModel.findById(id).exec();
  }
}
