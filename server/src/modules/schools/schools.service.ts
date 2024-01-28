// schools/schools.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSchoolDto } from '../schools/dto/create-school.dto';
import { UpdateSchoolDto } from '../schools/dto/update-school.dto';
import { School } from './school.model';

@Injectable()
export class SchoolsService {
  constructor(@InjectModel('School') private readonly schoolModel: Model<School>) {}

  async createSchool(createSchoolDto: CreateSchoolDto): Promise<School> {
    const createdSchool = new this.schoolModel(createSchoolDto);
    return createdSchool.save();
  }

  async findAllSchools(): Promise<School[]> {
    return this.schoolModel.find().exec();
  }

  async findSchoolById(id: string): Promise<School> {
    const school = await this.schoolModel.findById(id).exec();
    if (!school) {
      throw new NotFoundException('School not found');
    }
    return school;
  }

  async updateSchool(id: string, updateSchoolDto: UpdateSchoolDto): Promise<School> {
    const updatedSchool = await this.schoolModel.findByIdAndUpdate(id, updateSchoolDto, { new: true }).exec();
    if (!updatedSchool) {
      throw new NotFoundException('School not found');
    }
    return updatedSchool;
  }

  async deleteSchool(id: string): Promise<void> {
    const result = await this.schoolModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('School not found');
    }
  }
}
