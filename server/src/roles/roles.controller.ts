import { Controller, Post, Body, UseGuards, Put, Param, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('roles')
@UseGuards(JwtAuthGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<any> {
    return this.rolesService.createRole(createRoleDto);
  }

  @Put(':id')
  async updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<any> {
    return this.rolesService.updateRole(id, updateRoleDto);
  }

  @Get(':id')
  async getRoleById(@Param('id') id: string): Promise<any> {
    return this.rolesService.getRoleById(id);
  }

  @Post('assign')
  async assignRole(@Body() assignRoleDto: AssignRoleDto): Promise<any> {
    return this.rolesService.assignRole(assignRoleDto);
  }
}
