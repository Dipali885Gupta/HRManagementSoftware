import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { LeaveType } from '../leave-type.enum';
import type { LeaveStatus } from '../leave-status.enum';
import type { EmployeeDto } from '../employees/models';

export interface GetLeaveRequestsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  leaveType?: LeaveType;
  leaveStatus?: LeaveStatus;
  startDateMin?: string;
  startDateMax?: string;
  endDateMin?: string;
  endDateMax?: string;
  reason?: string;
  requestDateMin?: string;
  requestDateMax?: string;
  employeeId?: string;
}

export interface LeaveRequestCreateDto {
  leaveType: LeaveType;
  leaveStatus: LeaveStatus;
  startDate?: string;
  endDate?: string;
  reason: string;
  requestDate?: string;
  employeeId?: string;
}

export interface LeaveRequestDto extends FullAuditedEntityDto<string> {
  leaveType: LeaveType;
  leaveStatus: LeaveStatus;
  startDate?: string;
  endDate?: string;
  reason: string;
  requestDate?: string;
  employeeId?: string;
  concurrencyStamp?: string;
}

export interface LeaveRequestExcelDownloadDto {
  downloadToken?: string;
  filterText?: string;
  leaveType?: LeaveType;
  leaveStatus?: LeaveStatus;
  startDateMin?: string;
  startDateMax?: string;
  endDateMin?: string;
  endDateMax?: string;
  reason?: string;
  requestDateMin?: string;
  requestDateMax?: string;
  employeeId?: string;
}

export interface LeaveRequestUpdateDto {
  leaveType: LeaveType;
  leaveStatus: LeaveStatus;
  startDate?: string;
  endDate?: string;
  reason: string;
  requestDate?: string;
  employeeId?: string;
  concurrencyStamp?: string;
}

export interface LeaveRequestWithNavigationPropertiesDto {
  leaveRequest: LeaveRequestDto;
  employee: EmployeeDto;
}
