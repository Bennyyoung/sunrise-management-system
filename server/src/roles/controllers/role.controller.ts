import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RoleService } from '../services/roles.service';
import { CreateRoleDTO, UpdateRoleDTO } from '../dto/roles.dto';
import { Role } from '../model/role.model';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getAllRoles(): Promise<Role[]> {
    return this.roleService.getAllRoles();
  }

  @Get(':id')
  async getRoleById(@Param('id') id: string): Promise<Role> {
    return this.roleService.getRoleById(id);
  }

  @Post()
  async createRole(@Body() createRoleDTO: CreateRoleDTO): Promise<Role> {
    return this.roleService.createRole(createRoleDTO);
  }

  @Put(':id')
  async updateRole(@Param('id') id: string, @Body() updateRoleDTO: UpdateRoleDTO): Promise<Role> {
    return this.roleService.updateRole(id, updateRoleDTO);
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: string): Promise<void> {
    return this.roleService.deleteRole(id);
  }
}
