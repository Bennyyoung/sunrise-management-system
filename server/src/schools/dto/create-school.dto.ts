import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSchoolDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  // Add other fields as per your school creation requirements
}
