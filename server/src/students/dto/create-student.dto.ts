import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStudentDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  // Add other fields as per your student update requirements
}
