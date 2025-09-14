import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { IdentityUserDto } from '../volo/abp/identity/models';

export interface GetHRManagersInput extends GetHRManagersInputBase {
}

export interface GetHRManagersInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  hrNumber?: string;
  department?: string;
  identityUserId?: string;
}

export interface HRManagerCreateDto extends HRManagerCreateDtoBase {
}

export interface HRManagerCreateDtoBase {
  hrNumber: string;
  department: string;
  identityUserId?: string;
}

export interface HRManagerDto extends HRManagerDtoBase {
}

export interface HRManagerDtoBase extends FullAuditedEntityDto<string> {
  hrNumber?: string;
  department?: string;
  identityUserId?: string;
  concurrencyStamp?: string;
}

export interface HRManagerExcelDownloadDto extends HRManagerExcelDownloadDtoBase {
}

export interface HRManagerExcelDownloadDtoBase {
  downloadToken?: string;
  filterText?: string;
  hrNumber?: string;
  department?: string;
  identityUserId?: string;
}

export interface HRManagerUpdateDto extends HRManagerUpdateDtoBase {
}

export interface HRManagerUpdateDtoBase {
  hrNumber: string;
  department: string;
  identityUserId?: string;
  concurrencyStamp?: string;
}

export interface HRManagerWithNavigationPropertiesDto extends HRManagerWithNavigationPropertiesDtoBase {
}

export interface HRManagerWithNavigationPropertiesDtoBase {
  hrManager: HRManagerDto;
  identityUser: IdentityUserDto;
}
