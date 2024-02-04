import { helperUtils } from '../../../misc/helperUtils';
import { Request, Response, NextFunction } from 'express';
import { NestLogger } from './nestLogger';
import { LoggerModuleOptions } from './types/logger-module.types';
import { expressUtils } from '../../../misc/express/express.utils';

/**
 * Use this as a global middleware.
 */
export function loggerMiddleware(options: LoggerModuleOptions) {
  const nestLogger: NestLogger = new NestLogger(options);
  nestLogger.setOrigin('LoggerMiddleware');

  return (req: Request, res: Response, next: NextFunction) => {
    expressUtils.mergeContext(req, {
      trackingId: helperUtils.uuid.getUniqueId(),
      loggerContext: {},
    });

    res.setHeader('X-Tracking-Id', req.context?.trackingId ?? '');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((req as any).session) {
      expressUtils.addLoggerContext(req, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sessionId: (req as any).session.id,
      });
    }

    // Skip logging request for CORS request
    if (req.method !== 'OPTIONS') {
      nestLogger.info(
        'incoming-request',
        `${req.method} ${req.path}`,
        req.context,
        {
          properties: {
            method: req.method,
            path: req.path,
            queryParams: req.query,
            origin: req.headers['origin'],
            referer: req.headers['referer'],
            userAgent: req.headers['user-agent'],
            clientIp: options.behindProxy
              ? req.headers['x-forwarded-for'] || req.socket.remoteAddress
              : req.socket.remoteAddress,
          },
        },
      );

      res.once('finish', () => {
        nestLogger.info(
          'outgoing-response',
          `${req.method} ${req.path} ${res.statusCode} ${res.statusMessage}`,
          req.context,
          {
            properties: {
              method: req.method,
              path: req.path,
              statusCode: res.statusCode,
              statusMessage: res.statusMessage,
            },
          },
        );
      });
    }

    next();
  };
}
