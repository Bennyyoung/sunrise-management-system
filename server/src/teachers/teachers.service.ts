import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher, TeacherDocument } from './schemas/teacher.schema';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(@InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>) {}

  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const createdTeacher = new this.teacherModel(createTeacherDto);
    return createdTeacher.save();
  }

  async updateTeacher(id: string, updateTeacherDto: UpdateTeacherDto): Promise<Teacher | null> {
    return this.teacherModel.findByIdAndUpdate(id, updateTeacherDto, { new: true }).exec();
  }

  async getTeacherById(id: string): Promise<Teacher | null> {
    return this.teacherModel.findById(id).exec();
  }
}
