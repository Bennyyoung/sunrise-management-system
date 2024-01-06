import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePermissionDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  // Add other fields as per your permission update requirements
}
