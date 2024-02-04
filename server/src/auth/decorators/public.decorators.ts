import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { SunriseManagementAuthGuard } from '../auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export const IS_PUBLIC_KEY = 'isPublic';
export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
export const SkipUserSetupCheck = () => SetMetadata('skipUserSetupCheck', true);

export const UnifiedAuth = () => {
  return applyDecorators(
    ApiBearerAuth(),
    UseGuards(SunriseManagementAuthGuard),
  );
};

export const Permissions = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);
