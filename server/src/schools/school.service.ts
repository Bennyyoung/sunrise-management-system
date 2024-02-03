// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User } from '../users/user.schema';
// import { School } from './school.schema';

// @Injectable()
// export class SchoolService {
//   constructor(
//     @InjectModel('School') private readonly schoolModel: Model<School>,
//     @InjectModel('User') private readonly userModel: Model<User>,
//   ) {}

//   async onboardAdmin(adminId: string, schoolDetails: any): Promise<School> {
//     // Find the admin user
//     const adminUser = await this.userModel.findById(adminId).exec();
//     if (!adminUser) {
//       throw new NotFoundException('Admin user not found.');
//     }

//     // Create and save the school with the admin as the contact person
//     const newSchool = new this.schoolModel({
//       admin: adminId,
//       contactPerson: adminUser,
//       ...schoolDetails,
//     });

//     return newSchool.save();
//   }

//   async onboardSchool(schoolDetails: any): Promise<School> {
//     // Create and save the school without linking it to a specific admin
//     const newSchool = new this.schoolModel(schoolDetails);

//     return newSchool.save();
//   }

//   // Similar methods can be created for onboarding students, staff, and parents
//   // Ensure to use the appropriate user roles and update the service methods accordingly
// }


// Update the onboardAdmin method in the school.service.ts

// Update the onboardAdmin method in the school.service.ts



// school/school.service.ts

// school/school.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.schema'; // Import the User schema
import { School } from './school.schema';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel('School') private readonly schoolModel: Model<School>,
    @InjectModel('User') private readonly userModel: Model<User>, // Inject the User model
  ) {}

  async onboardAdmin(adminUser: User, schoolDetails: any): Promise<School> {
    // Find the admin user
    const admin = await this.userModel.findById(adminUser).exec();
    if (!admin) {
      throw new NotFoundException('Admin user not found.');
    }

    // Create and save the school with the admin as the contact person
    const newSchool = new this.schoolModel({
      admin: adminUser,
      contactPerson: admin,
      ...schoolDetails,
    });

    return newSchool.save();
  }

  // Other methods...

}



