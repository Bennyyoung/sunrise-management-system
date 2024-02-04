import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

 


  async generateJwtToken(user: User): Promise<string> {
    const payload = { sub: user, username: user.username, role: user.role }; // Change _id to id
    return this.jwtService.sign(payload);
  }


  async register(userDto: any): Promise<User> {
    // Check if the username is already taken
    const existingUser = await this.usersService.findOneByUsername(userDto.username);
    if (existingUser) {
      throw new NotFoundException('Username is already taken.');
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    // Create and save the new user
    const newUser = await this.usersService.create({ ...userDto, password: hashedPassword });
    return newUser;
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    // Find the user by username
    const user = await this.usersService.findOneByUsername(username);

    // If the user is found, compare the provided password with the hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }
}
