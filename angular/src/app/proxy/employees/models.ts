import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { IdentityUserDto } from '../volo/abp/identity/models';

export interface EmployeeCreateDto {
  employeeNumber: string;
  jobTitle: string;
  dateOfJoining?: string;
  paidLeaveBalance: number;
  sickLeaveBalance: number;
  unpaidLeaveBalance: number;
  baseSalary: number;
  identityUserId?: string;
}

export interface EmployeeDto extends FullAuditedEntityDto<string> {
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

export interface EmployeeExcelDownloadDto {
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

export interface EmployeeUpdateDto {
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

export interface EmployeeWithNavigationPropertiesDto {
  employee: EmployeeDto;
  identityUser: IdentityUserDto;
}

export interface GetEmployeesInput extends PagedAndSortedResultRequestDto {
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
