import { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

// Extend the Request type to include a user property
interface AuthRequest extends Request {
  user?: string; // Change the type based on your user data structure
}

async function auth(req: AuthRequest, res: Response, next: NextFunction): Promise<void | Response> {
  try {
    const token =
      req.body.token ||
      req.query.token ||
      req.cookies['x-access-token'] ||
      req.headers['x-access-token'];
    console.log(token);

    if (!token) {
      return res.status(401).json({ errorMessage: 'Unauthorized' });
    }

    const verified = await jwt.verify(token, process.env.JWT_SECRET!);
    req.user = (verified as { user: string }).user;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ ErrorMessage: 'Unauthorized' });
  }
}

export default auth;
