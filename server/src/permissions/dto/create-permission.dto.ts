import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  // Add other fields as per your permission creation requirements
}
