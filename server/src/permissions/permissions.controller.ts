import { Controller, Post, Body, UseGuards, Put, Param, Get } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { AssignPermissionDto } from './dto/assign-permission.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('permissions')
@UseGuards(JwtAuthGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  async createPermission(@Body() createPermissionDto: CreatePermissionDto): Promise<any> {
    return this.permissionsService.createPermission(createPermissionDto);
  }

  @Put(':id')
  async updatePermission(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto): Promise<any> {
    return this.permissionsService.updatePermission(id, updatePermissionDto);
  }

  @Get(':id')
  async getPermissionById(@Param('id') id: string): Promise<any> {
    return this.permissionsService.getPermissionById(id);
  }

  @Post('assign')
  async assignPermission(@Body() assignPermissionDto: AssignPermissionDto): Promise<any> {
    return this.permissionsService.assignPermission(assignPermissionDto);
  }
}
