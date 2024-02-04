/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ExceptionFilter,
  Catch,
  UnauthorizedException,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(UnauthorizedException)
export class UnauthorizedFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: 'You are not authorized.',
      type: 'Invalid token',
    });
  }
}
