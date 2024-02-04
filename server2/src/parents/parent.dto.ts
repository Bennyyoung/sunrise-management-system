// src/parent/dto/parent.dto.ts

import { IsNotEmpty, IsEmail, IsString, IsOptional } from 'class-validator';

export class ParentDto {
  @IsNotEmpty()
  @IsString()
  readonly fullName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly dateOfBirth: string;

  @IsNotEmpty()
  @IsString()
  readonly gender: string;

  @IsNotEmpty()
  @IsString()
  readonly nationality: string;

  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  readonly contactAddress: string;

  @IsOptional()
  @IsString()
  readonly role: string; // Defaults to 'Parent'
}
