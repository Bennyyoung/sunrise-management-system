/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
