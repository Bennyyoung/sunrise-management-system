import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_secret_key', // Change this to a more secure secret key
      signOptions: { expiresIn: '1d' }, // Token expiration time
    }),
    // Other necessary imports (e.g., database module)
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
