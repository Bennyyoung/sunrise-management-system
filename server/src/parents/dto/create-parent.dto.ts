import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateParentDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  // Add other fields as per your parent update requirements
}
