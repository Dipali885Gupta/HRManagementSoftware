import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { IdentityUserDto } from '../volo/abp/identity/models';

export interface EmployeeCreateDto extends EmployeeCreateDtoBase {
}

export interface EmployeeCreateDtoBase {
  employeeNumber: string;
  jobTitle: string;
  dateOfJoining?: string;
  paidLeaveBalance: number;
  sickLeaveBalance: number;
  unpaidLeaveBalance: number;
  baseSalary: number;
  identityUserId?: string;
}

export interface EmployeeDto extends EmployeeDtoBase {
}

export interface EmployeeDtoBase extends FullAuditedEntityDto<string> {
  employeeNumber?: string;
  jobTitle?: string;
  dateOfJoining?: string;
  paidLeaveBalance: number;
  sickLeaveBalance: number;
  unpaidLeaveBalance: number;
  baseSalary: number;
  identityUserId?: string;
  concurrencyStamp?: string;
}

export interface EmployeeExcelDownloadDto extends EmployeeExcelDownloadDtoBase {
}

export interface EmployeeExcelDownloadDtoBase {
  downloadToken?: string;
  filterText?: string;
  employeeNumber?: string;
  jobTitle?: string;
  dateOfJoiningMin?: string;
  dateOfJoiningMax?: string;
  paidLeaveBalanceMin?: number;
  paidLeaveBalanceMax?: number;
  sickLeaveBalanceMin?: number;
  sickLeaveBalanceMax?: number;
  unpaidLeaveBalanceMin?: number;
  unpaidLeaveBalanceMax?: number;
  baseSalaryMin?: number;
  baseSalaryMax?: number;
  identityUserId?: string;
}

export interface EmployeeUpdateDto extends EmployeeUpdateDtoBase {
}

export interface EmployeeUpdateDtoBase {
  employeeNumber: string;
  jobTitle: string;
  dateOfJoining?: string;
  paidLeaveBalance: number;
  sickLeaveBalance: number;
  unpaidLeaveBalance: number;
  baseSalary: number;
  identityUserId?: string;
  concurrencyStamp?: string;
}

export interface EmployeeWithNavigationPropertiesDto extends EmployeeWithNavigationPropertiesDtoBase {
}

export interface EmployeeWithNavigationPropertiesDtoBase {
  employee: EmployeeDto;
  identityUser: IdentityUserDto;
}

export interface GetEmployeesInput extends GetEmployeesInputBase {
}

export interface GetEmployeesInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  employeeNumber?: string;
  jobTitle?: string;
  dateOfJoiningMin?: string;
  dateOfJoiningMax?: string;
  paidLeaveBalanceMin?: number;
  paidLeaveBalanceMax?: number;
  sickLeaveBalanceMin?: number;
  sickLeaveBalanceMax?: number;
  unpaidLeaveBalanceMin?: number;
  unpaidLeaveBalanceMax?: number;
  baseSalaryMin?: number;
  baseSalaryMax?: number;
  identityUserId?: string;
}
