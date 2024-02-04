import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { appConfig } from './app.config';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import _ from 'lodash';
import { ValidationPipe } from '@nestjs/common';
import { InternalNestLogger } from './logging/loggers/nestLogger/internalNestLogger';
import { loggerMiddleware } from './logging/loggers/nestLogger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new InternalNestLogger(appConfig.logging.options),
  });

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  /**
   * Configure Security Middlewares
   */
  app.enableCors({
    origin: (origin, callback) => {
      if (
        appConfig.http.cors.whitelist.indexOf(origin) !== -1 ||
        (!origin && appConfig.http.cors.allowWithoutOrigin)
      ) {
        callback(null, true);
      } else {
        console.log(process.env.CORS_WHITELIST);
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
    credentials: true,
  });

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        },
      },
    }),
  );

  if (appConfig.http.requestLimit.max > 0) {
    app.use(
      rateLimit({
        windowMs: appConfig.http.requestLimit.windowMins * 60 * 1000,
        max: appConfig.http.requestLimit.max,
      }),
    );
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
    }),
  );

  /**
   * Configure Logger Middleware
   */
  app.use(loggerMiddleware(appConfig.logging.options));

  /**
   * Generate Open API Spec using Swagger
   */
  if (appConfig.isDev) {
    const swaggerServers = [];
    if (appConfig.isDev) {
      swaggerServers.push(`http://localhost:${appConfig.http.port}`);
    }
    swaggerServers.push('https://api.sunrise-management-system.app');

    const docBuilder = new DocumentBuilder()
      .setTitle('SUNRISE MANAGEMENT SYSTEM')
      .setDescription('SUNRISE MANAGEMENT SYSTEM Rest API')
      .setVersion('1.0.0')
      .addTag('sunriseManagementSystem')
      .addBearerAuth()
      .addSecurity('devKey', {
        type: 'apiKey',
        name: 'x-dev-key',
        in: 'header',
      })
      .addSecurity('apiKey', {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
      })
      .addSecurityRequirements('apiKey', []);
    for (const swaggerServer of swaggerServers) {
      docBuilder.addServer(swaggerServer);
    }

    const config = docBuilder.build();
    const document = SwaggerModule.createDocument(app, config, {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        _.startCase(methodKey),
    });
    SwaggerModule.setup('openapi', app, document, {
      customSiteTitle: 'SUNRISE MANAGEMENT SYSTEM OpenAPI',
      swaggerOptions: {
        persistAuthorization: true,
      },
      customCssUrl: '/css/custom-dark-swagger.css',
    });
  }

  await app.listen(appConfig.http.port);
}

bootstrap();
