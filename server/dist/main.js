"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const core_1 = require("@nestjs/core");
const app_config_1 = require("./app.config");
const app_module_1 = require("./app.module");
const prisma_service_1 = require("./prisma/prisma.service");
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const swagger_1 = require("@nestjs/swagger");
const lodash_1 = __importDefault(require("lodash"));
const common_1 = require("@nestjs/common");
const internalNestLogger_1 = require("./logging/loggers/nestLogger/internalNestLogger");
const logger_middleware_1 = require("./logging/loggers/nestLogger/logger.middleware");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: new internalNestLogger_1.InternalNestLogger(app_config_1.appConfig.logging.options),
    });
    const prismaService = app.get(prisma_service_1.PrismaService);
    await prismaService.enableShutdownHooks(app);
    app.enableCors({
        origin: (origin, callback) => {
            if (app_config_1.appConfig.http.cors.whitelist.indexOf(origin) !== -1 ||
                (!origin && app_config_1.appConfig.http.cors.allowWithoutOrigin)) {
                callback(null, true);
            }
            else {
                console.log(process.env.CORS_WHITELIST);
                callback(new Error(`Not allowed by CORS: ${origin}`));
            }
        },
        credentials: true,
    });
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: [`'self'`],
                styleSrc: [`'self'`, `'unsafe-inline'`],
                imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
                scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
            },
        },
    }));
    if (app_config_1.appConfig.http.requestLimit.max > 0) {
        app.use((0, express_rate_limit_1.default)({
            windowMs: app_config_1.appConfig.http.requestLimit.windowMins * 60 * 1000,
            max: app_config_1.appConfig.http.requestLimit.max,
        }));
    }
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
        whitelist: true,
    }));
    app.use((0, logger_middleware_1.loggerMiddleware)(app_config_1.appConfig.logging.options));
    if (app_config_1.appConfig.isDev) {
        const swaggerServers = [];
        if (app_config_1.appConfig.isDev) {
            swaggerServers.push(`http://localhost:${app_config_1.appConfig.http.port}`);
        }
        swaggerServers.push('https://api.sunrise-management-system.app');
        const docBuilder = new swagger_1.DocumentBuilder()
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
        const document = swagger_1.SwaggerModule.createDocument(app, config, {
            operationIdFactory: (controllerKey, methodKey) => lodash_1.default.startCase(methodKey),
        });
        swagger_1.SwaggerModule.setup('openapi', app, document, {
            customSiteTitle: 'SUNRISE MANAGEMENT SYSTEM OpenAPI',
            swaggerOptions: {
                persistAuthorization: true,
            },
            customCssUrl: '/css/custom-dark-swagger.css',
        });
    }
    await app.listen(app_config_1.appConfig.http.port);
}
bootstrap();
//# sourceMappingURL=main.js.map