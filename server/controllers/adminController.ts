import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';  // Import bcrypt

import User from '../models/User';
import roles from '../utils/roles';

const adminController = {
  createUser: async (req: Request, res: Response) => {
    try {
      const { name, email, password, role, adminId } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ name, email, password: hashedPassword, role, adminId });
      await newUser.save();

      res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error.' });
    }
  },

  assignRole: async (req: Request, res: Response) => {
    try {
      const { userId, role } = req.body;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      user.role = role;
      await user.save();

      res.status(200).json({ message: 'Role assigned successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error.' });
    }
  },
};

export default adminController;
