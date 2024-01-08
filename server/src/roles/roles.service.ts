import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AssignRoleDto } from './dto/assign-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const createdRole = new this.roleModel(createRoleDto);
    return createdRole.save();
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto): Promise<Role | null> {
    return this.roleModel.findByIdAndUpdate(id, updateRoleDto, { new: true }).exec();
  }

  async getRoleById(id: string): Promise<Role | null> {
    return this.roleModel.findById(id).exec();
  }

  async assignRole(assignRoleDto: AssignRoleDto): Promise<any> {
    const { userId, roleName } = assignRoleDto;
    const user = await this.userModel.findById(userId);

    if (!user) {
      return { message: 'User not found' };
    }

    // Check if the user already has the assigned role
    if (user.roles.includes(roleName)) {
      return { message: 'User already has the assigned role' };
    }

    // Assign the role to the user
    user.roles.push(roleName);
    await user.save();

    return { message: 'Role assigned successfully' };
  }
}
