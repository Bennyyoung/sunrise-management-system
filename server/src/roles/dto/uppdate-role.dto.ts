import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  // Add other fields as per your role update requirements
}
