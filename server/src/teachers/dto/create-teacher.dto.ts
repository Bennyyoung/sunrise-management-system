import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTeacherDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  // Add other fields as per your teacher update requirements
}
