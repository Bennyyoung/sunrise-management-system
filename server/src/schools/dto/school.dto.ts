import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSchoolDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  // Add other fields as per your school update requirements
}
