import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization Header');
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
      throw new UnauthorizedException('Invalid Authorization Header');
    }

    try {
      const decoded = this.jwtService.verify(token);

      // Attach user information to the request for later use in controllers
      req['user'] = decoded;

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid Token');
    }
  }
}
