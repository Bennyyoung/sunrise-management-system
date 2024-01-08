import { Controller, Post, Body, UseGuards, Put, Param, Get } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from '@/parents/dto/update-parent.dto';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';

@Controller('parents')
@UseGuards(JwtAuthGuard)
export class ParentsController {
  constructor(private readonly parentsService: ParentsService) {}

  @Post()
  async createParent(@Body() createParentDto: CreateParentDto): Promise<any> {
    return this.parentsService.createParent(createParentDto);
  }

  @Put(':id')
  async updateParent(@Param('id') id: string, @Body() updateParentDto: UpdateParentDto): Promise<any> {
    return this.parentsService.updateParent(id, updateParentDto);
  }

  @Get(':id')
  async getParentById(@Param('id') id: string): Promise<any> {
    return this.parentsService.getParentById(id);
  }
}
