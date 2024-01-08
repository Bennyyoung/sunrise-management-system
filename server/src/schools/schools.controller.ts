import { Controller, Post, Body, UseGuards, Put, Param, Get } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('schools')
@UseGuards(JwtAuthGuard)
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  async createSchool(@Body() createSchoolDto: CreateSchoolDto): Promise<any> {
    return this.schoolsService.createSchool(createSchoolDto);
  }

  @Put(':id')
  async updateSchool(@Param('id') id: string, @Body() updateSchoolDto: UpdateSchoolDto): Promise<any> {
    return this.schoolsService.updateSchool(id, updateSchoolDto);
  }

  @Get(':id')
  async getSchoolById(@Param('id') id: string): Promise<any> {
    return this.schoolsService.getSchoolById(id);
  }
}
