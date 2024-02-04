import { Injectable, HttpStatus, HttpException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Admin } from './admin.schema';
import { School } from '../schools/school.schema';
import { Student } from '../students/student.schema';
import { Staff } from '../staff/staff.schema';
import { Parent } from '../parents/parent.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Admin') private readonly adminModel: Model<Admin>,
    @InjectModel('Student') private readonly studentModel: Model<Student>,
    @InjectModel('Staff') private readonly staffModel: Model<Staff>,
    @InjectModel('Parent') private readonly parentModel: Model<Parent>,
  ) {}


  async getAdminByUsernameAndPassword(username: string, password: string): Promise<Admin | null> {
    const admin = await this.adminModel.findOne({ username }).exec();

    if (!admin) {
      return null; // Admin not found
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return null; // Incorrect password
    }

    return admin; // Admin found and password is valid
  }

  

  async getAdminById(id: string): Promise<Admin | null> {
    const admin = await this.adminModel.findById(id).exec();

    if (!admin) {
      return null; // Admin not found
    }

    return admin;
  }

  async generateLoginForSchoolAdmin(school: School): Promise<{ username: string; password: string }> {
    try {
      // Generate a username (e.g., combining school name and "admin")
      const username = `${school.name}_admin`;

      // Generate a random password
      const password = this.generateRandomPassword();

      // You may want to hash the password before storing it or providing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save the login details to the database
      await this.adminModel.create({ username, password: hashedPassword, schoolId: school._id });

      return { username, password: hashedPassword };
    } catch (error) {
      // Handle database errors or any other unexpected errors
      console.error('Error generating login for school admin:', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


 
  
    async onboardAdmin(adminDto: any): Promise<Admin> {
      // Check if the username is already taken
      const existingAdmin = await this.adminModel.findOne({ username: adminDto.username }).exec();
      if (existingAdmin) {
        throw new NotFoundException('Username is already taken.');
      }
  
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(adminDto.password, 10);
  
      // Create and save the new admin
      const newAdmin = await this.adminModel.create({ ...adminDto, password: hashedPassword });
      return newAdmin;
    }
    
  

  async generateLoginForUser(userDto: any, schoolAdminId: string): Promise<{ username: string; password: string }> {
    try {
      // Validate the userDto and handle role-specific logic to generate login details

      // For simplicity, let's use a common logic for all users in this example
      const username = `${userDto.name.toLowerCase()}_${userDto.role.toLowerCase()}`;
      const password = this.generateRandomPassword();

      // You may want to hash the password before storing it or providing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save the login details to the respective collection in the database
      switch (userDto.role) {
        case 'Student':
          await this.studentModel.create({ ...userDto, username, password: hashedPassword, schoolAdminId });
          break;
        case 'Staff':
          await this.staffModel.create({ ...userDto, username, password: hashedPassword, schoolAdminId });
          break;
        case 'Parent':
          await this.parentModel.create({ ...userDto, username, password: hashedPassword, schoolAdminId });
          break;
        // Add more cases for other roles if needed
      }

      return { username, password: hashedPassword };
    } catch (error) {
      // Handle database errors or any other unexpected errors
      console.error('Error generating login for user:', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private generateRandomPassword(): string {
    // Logic to generate a random password (customize as needed)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const passwordLength = 10;

    let randomPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomPassword += characters.charAt(randomIndex);
    }

    return randomPassword;
  }
}
