// import { Module } from '@nestjs/common';
// import { AuthService } from './services/auth.service';
// import { AuthController } from './controllers/auth.controller';
// import { JwtModule } from '@nestjs/jwt';
// import { JwtStrategy } from './strategies/jwt.strategy';

// @Module({
//   imports: [
//     JwtModule.register({
//       secret: 'your_secret_key', // Replace with your actual secret key
//       signOptions: { expiresIn: '1h' }, // Adjust expiration time as needed
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, JwtStrategy],
// })
// export class AuthModule {}
