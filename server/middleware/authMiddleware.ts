// authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

const authMiddleware = {
  verifyToken: async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Access denied. Token not provided.' });
    }

    try {
      const decoded = jwt.verify(token, 'your-secret-key') as { id: string }; // Type assertion
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ message: 'Invalid token. User not found.' });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  },
};

export default authMiddleware;
