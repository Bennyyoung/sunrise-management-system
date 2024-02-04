// // auth/login.service.ts

// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UsersService } from '../users/users.service';
// import { AdminService } from '../admin/admin.service';
// import { SuperAdminService } from '../super-admin/super-admin.service';
// import { ParentService } from '../parents/parent.service';
// import { StaffService } from '../staff/staff.service';

// @Injectable()
// export class LoginService {
//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly usersService: UsersService,
//     private readonly adminService: AdminService,
//     private readonly superAdminService: SuperAdminService,
//     private readonly parentService: ParentService,
//     private readonly staffService: StaffService,
//   ) {}

//   async validateUser(username: string, password: string, role: string): Promise<any> {
//     let user;

//     switch (role.toLowerCase()) {
//       case 'user':
//         user = await this.usersService.getUserByUsernameAndPassword(username, password);
//         break;
//       case 'admin':
//         user = await this.adminService.getAdminByUsernameAndPassword(username, password);
//         break;
//       case 'superadmin':
//         user = await this.superAdminService.getSuperAdminByUsernameAndPassword(username, password);
//         break;
//       case 'parent':
//         user = await this.parentService.getParentByUsernameAndPassword(username, password);
//         break;
//       case 'staff':
//         user = await this.staffService.getStaffByUsernameAndPassword(username, password);
//         break;
//       default:
//         throw new UnauthorizedException('Invalid role specified');
//     }

//     if (!user) {
//       throw new UnauthorizedException('Invalid credentials');
//     }

//     return user;
//   }

//   async generateToken(user: any): Promise<string> {
//     const payload = { username: user.username, sub: user._id, role: user.role };
//     return this.jwtService.sign(payload);
//   }
// }



// auth/login.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AdminService } from '../admin/admin.service';
import { SuperAdminService } from '../super-admin/super-admin.service';
import { ParentService } from '../parents/parent.service';
import { StaffService } from '../staff/staff.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly adminService: AdminService,
    private readonly superAdminService: SuperAdminService,
    private readonly parentService: ParentService,
    private readonly staffService: StaffService,
  ) {}

  async validateUser(username: string, password: string, role: string): Promise<any> {
    let user;

    switch (role.toLowerCase()) {
      case 'user':
        user = await this.usersService.findOneByUsername(username);
        break;
      case 'admin':
        user = await this.adminService.getAdminByUsernameAndPassword(username, password);
        break;
      case 'superadmin':
        user = await this.superAdminService.getSuperAdminByUsernameAndPassword(username, password);
        break;
      case 'parent':
        user = await this.parentService.getParentByUsernameAndPassword(username, password);
        break;
      case 'staff':
        user = await this.staffService.getStaffByUsernameAndPassword(username, password);
        break;
      default:
        throw new UnauthorizedException('Invalid role specified');
    }

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async generateToken(user: any): Promise<string> {
    const payload = { username: user.username, sub: user._id, role: user.role };
    return this.jwtService.sign(payload);
  }
}
