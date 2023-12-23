import { Injectable } from '@nestjs/common';
import { Role } from './role.model';
import { CreateRoleDTO, UpdateRoleDTO } from './dto/role.dto'; // Update the path based on your file structure

@Injectable()
export class RoleService {
  private roles: Role[] = []; // Simulating role data (replace with database interaction)

  getAllRoles(): Role[] {
    return this.roles;
  }

  getRoleById(id: string): Role {
    return this.roles.find(role => role.id === id);
  }

  createRole(createRoleDTO: CreateRoleDTO): Role {
    const newRole: Role = {
      id: /* Generate unique ID */,
      name: createRoleDTO.name,
      // Other role-related properties as needed
    };

    this.roles.push(newRole);
    return newRole;
  }

  updateRole(id: string, updateRoleDTO: UpdateRoleDTO): Role {
    const roleIndex = this.roles.findIndex(role => role.id === id);
    if (roleIndex !== -1) {
      this.roles[roleIndex] = { ...this.roles[roleIndex], ...updateRoleDTO };
      return this.roles[roleIndex];
    }
    return null;
  }

  deleteRole(id: string): void {
    this.roles = this.roles.filter(role => role.id !== id);
  }
}
