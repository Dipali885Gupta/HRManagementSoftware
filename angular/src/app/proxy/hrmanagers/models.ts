import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { IdentityUserDto } from '../volo/abp/identity/models';

export interface GetHRManagersInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  hrNumber?: string;
  department?: string;
  identityUserId?: string;
}

export interface HRManagerCreateDto {
  hrNumber: string;
  department: string;
  identityUserId?: string;
}

export interface HRManagerDto extends FullAuditedEntityDto<string> {
  hrNumber: string;
  department: string;
  identityUserId?: string;
  concurrencyStamp?: string;
}

export interface HRManagerExcelDownloadDto {
  downloadToken?: string;
  filterText?: string;
  hrNumber?: string;
  department?: string;
  identityUserId?: string;
}

export interface HRManagerUpdateDto {
  hrNumber: string;
  department: string;
  identityUserId?: string;
  concurrencyStamp?: string;
}

export interface HRManagerWithNavigationPropertiesDto {
  hrManager: HRManagerDto;
  identityUser: IdentityUserDto;
}
