import { Controller, Post, Body, UseGuards, Put, Param, Get } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('teachers')
@UseGuards(JwtAuthGuard)
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  async createTeacher(@Body() createTeacherDto: CreateTeacherDto): Promise<any> {
    return this.teachersService.createTeacher(createTeacherDto);
  }

  @Put(':id')
  async updateTeacher(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto): Promise<any> {
    return this.teachersService.updateTeacher(id, updateTeacherDto);
  }

  @Get(':id')
  async getTeacherById(@Param('id') id: string): Promise<any> {
    return this.teachersService.getTeacherById(id);
  }
}
