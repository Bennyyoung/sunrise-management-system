import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from './schemas/permission.schema';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { AssignPermissionDto } from './dto/assign-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createPermission(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const createdPermission = new this.permissionModel(createPermissionDto);
    return createdPermission.save();
  }

  async updatePermission(id: string, updatePermissionDto: UpdatePermissionDto): Promise<Permission | null> {
    return this.permissionModel.findByIdAndUpdate(id, updatePermissionDto, { new: true }).exec();
  }

  async getPermissionById(id: string): Promise<Permission | null> {
    return this.permissionModel.findById(id).exec();
  }

  async assignPermission(assignPermissionDto: AssignPermissionDto): Promise<any> {
    const { userId, permissionName } = assignPermissionDto;
    const user = await this.userModel.findById(userId);

    if (!user) {
      return { message: 'User not found' };
    }

    // Check if the user already has the assigned permission
    if (user.permissions.includes(permissionName)) {
      return { message: 'User already has the assigned permission' };
    }

    // Assign the permission to the user
    user.permissions.push(permissionName);
    await user.save();

    return { message: 'Permission assigned successfully' };
  }
}
