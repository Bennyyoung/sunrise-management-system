// student.dto.ts
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class StudentDto {
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsNumber()
  readonly age: number;

  @IsOptional()
  @IsString()
  readonly address?: string;

  // Add more properties as needed

  constructor(data: { firstName: string; lastName: string; age: number; address?: string }) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.age = data.age;
    this.address = data.address;
  }
}
