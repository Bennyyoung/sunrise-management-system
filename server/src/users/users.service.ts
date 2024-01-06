import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Role, RoleDocument } from '../roles/schemas/role.schema';
import { Permission, PermissionDocument } from '../permissions/schemas/permission.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>,
  ) {}

  async getUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async getUserRoles(id: string): Promise<Role[]> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      return [];
    }

    return this.roleModel.find({ _id: { $in: user.roles } }).exec();
  }

  async getUserPermissions(id: string): Promise<Permission[]> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      return [];
    }

    return this.permissionModel.find({ _id: { $in: user.permissions } }).exec();
  }
}
