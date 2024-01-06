import { IsNotEmpty, IsString } from 'class-validator';

export class AssignRoleDto {
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly roleName: string;
}
