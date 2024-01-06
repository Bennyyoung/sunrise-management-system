import { IsNotEmpty, IsString } from 'class-validator';

export class AssignPermissionDto {
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly permissionName: string;
}
