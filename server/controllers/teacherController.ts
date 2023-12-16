import { Request, Response } from 'express';
import User from '../models/User';
import roles from '../utils/roles';

const teacherController = {
  viewStudents: async (req: Request, res: Response) => {
    try {
      // Ensure that req.user is defined before accessing its properties
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized. User not found.' });
      }

      const adminId = req.user.adminId; // Assuming adminId is set in the auth middleware

      if (!adminId) {
        return res.status(401).json({ message: 'Unauthorized. Admin ID not found.' });
      }

      const students = await User.find({ adminId, role: roles.student });

      res.status(200).json({ students });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error.' });
    }
  },
};

export default teacherController;
