import { Request, Response } from 'express';
import User from '../models/User';

const studentController = {
  viewProfile: async (req: Request, res: Response) => {
    try {
      // Ensure that req.user is defined before accessing its properties
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized. User not found.' });
      }

      const studentId = req.user._id; // Assuming the student's ID is set in the auth middleware

      if (!studentId) {
        return res.status(401).json({ message: 'Unauthorized. Student ID not found.' });
      }

      const student = await User.findById(studentId);

      if (!student || student.role !== 'student') {
        return res.status(404).json({ message: 'Student not found.' });
      }

      res.status(200).json({ student });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error.' });
    }
  },
};

export default studentController;
