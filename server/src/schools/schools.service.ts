import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { School, SchoolDocument } from './schemas/school.schema';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Injectable()
export class SchoolsService {
  constructor(@InjectModel(School.name) private schoolModel: Model<SchoolDocument>) {}

  async createSchool(createSchoolDto: CreateSchoolDto): Promise<School> {
    const createdSchool = new this.schoolModel(createSchoolDto);
    return createdSchool.save();
  }

  async updateSchool(id: string, updateSchoolDto: UpdateSchoolDto): Promise<School | null> {
    return this.schoolModel.findByIdAndUpdate(id, updateSchoolDto, { new: true }).exec();
  }

  async getSchoolById(id: string): Promise<School | null> {
    return this.schoolModel.findById(id).exec();
  }
}
