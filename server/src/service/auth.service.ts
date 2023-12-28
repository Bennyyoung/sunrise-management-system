// // auth.service.ts
// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthService {
//   constructor(private jwtService: JwtService) {}

//   async generateToken(payload: any) {
//     return this.jwtService.sign(payload);
//   }

//   async validateUser(username: string, password: string) {
//     // Validate user logic against database
//     // Return user if validated, otherwise return null
//   }
// }


import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(createUserDto: CreateUserDto) {
    // Logic to create a new user and assign 'superadmin' role
    return this.userService.create(createUserDto);
  }

  // Other authentication-related methods
}
