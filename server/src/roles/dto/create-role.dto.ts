import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  // Add other fields as per your role creation requirements
}
