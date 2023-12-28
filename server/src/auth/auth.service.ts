// auth.service.ts

import { Injectable } from '@nestjs/common';
import { UserModel } from '../auth/users/user.model';

@Injectable()
export class AuthService {
  constructor(private readonly userModel: UserModel) {}

  async register(email: string, password: string): Promise<any> {
    const existingUser = await this.userModel.findByEmail(email);
    if (existingUser) {
      return { message: 'User already exists' };
    }
    const user = await this.userModel.createUser(email, password);
    return user;
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userModel.findByEmail(email);
    if (!user || user.password !== password) {
      return { message: 'Invalid credentials' };
    }
    return user;
  }
}
