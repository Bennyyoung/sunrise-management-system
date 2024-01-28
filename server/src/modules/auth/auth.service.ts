// auth/auth.service.ts

import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (user && user.password === password) {
      const { password: _, ...result } = user.toObject();
      return result;
    }

    return undefined;
  }

  async login(username: string, password: string): Promise<{ access_token: string; user: any }> {
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      user, // Include user information in the response
    };
  }

  async register(createUserDto: CreateUserDto): Promise<{ access_token: string; user: any }> {
    try {
      // Check if the username is already taken
      const existingUser = await this.usersService.findByUsername(createUserDto.username);
      if (existingUser) {
        throw new ConflictException('Username is already taken');
      }

      // Create a new user
      const createdUser = await this.usersService.createUser(createUserDto);

      // Additional logic after user registration can be added here

      const payload = { username: createdUser.username, sub: createdUser.userId };
      return {
        access_token: this.jwtService.sign(payload),
        user: createdUser, // Include user information in the response
      };
    } catch (error) {
      // Log the error for further investigation
      console.error(error);
      throw new ConflictException('Registration failed'); // Handle other errors as needed
    }
  }
}
