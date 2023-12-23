import { Injectable } from '@nestjs/common';
import { User } from '../model/user.model';
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto'; // Update the path based on your file structure

@Injectable()
export class UserService {
  private users: User[] = []; // Simulating user data (replace with database interaction)

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User {
    return this.users.find(user => user.id === id);
  }

  createUser(createUserDTO: CreateUserDTO): User {
    const newUser: User = {
      id: /* Generate unique ID */,
      username: createUserDTO.username,
      password: createUserDTO.password,
      email: createUserDTO.email,
      role: createUserDTO.role,
      // Other user-related properties as needed
    };

    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: string, updateUserDTO: UpdateUserDTO): User {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updateUserDTO };
      return this.users[userIndex];
    }
    return null;
  }

  deleteUser(id: string): void {
    this.users = this.users.filter(user => user.id !== id);
  }
}
