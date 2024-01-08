import { Controller, Post, Body, UseGuards, Put, Param, Get } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('students')
@UseGuards(JwtAuthGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async createStudent(@Body() createStudentDto: CreateStudentDto): Promise<any> {
    return this.studentsService.createStudent(createStudentDto);
  }

  @Put(':id')
  async updateStudent(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto): Promise<any> {
    return this.studentsService.updateStudent(id, updateStudentDto);
  }

  @Get(':id')
  async getStudentById(@Param('id') id: string): Promise<any> {
    return this.studentsService.getStudentById(id);
  }
}
