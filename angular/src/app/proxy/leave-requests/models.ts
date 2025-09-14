import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { LeaveType } from '../leave-type.enum';
import type { LeaveStatus } from '../leave-status.enum';
import type { EmployeeDto } from '../employees/models';

export interface GetLeaveRequestsInput extends GetLeaveRequestsInputBase {
}

export interface GetLeaveRequestsInputBase extends PagedAndSortedResultRequestDto {
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

export interface LeaveRequestCreateDto extends LeaveRequestCreateDtoBase {
}

export interface LeaveRequestCreateDtoBase {
  leaveType?: LeaveType;
  leaveStatus?: LeaveStatus;
  startDate?: string;
  endDate?: string;
  reason: string;
  requestDate?: string;
  employeeId?: string;
}

export interface LeaveRequestDto extends LeaveRequestDtoBase {
}

export interface LeaveRequestDtoBase extends FullAuditedEntityDto<string> {
  leaveType?: LeaveType;
  leaveStatus?: LeaveStatus;
  startDate?: string;
  endDate?: string;
  reason?: string;
  requestDate?: string;
  employeeId?: string;
  concurrencyStamp?: string;
}

export interface LeaveRequestExcelDownloadDto extends LeaveRequestExcelDownloadDtoBase {
}

export interface LeaveRequestExcelDownloadDtoBase {
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

export interface LeaveRequestUpdateDto extends LeaveRequestUpdateDtoBase {
}

export interface LeaveRequestUpdateDtoBase {
  leaveType?: LeaveType;
  leaveStatus?: LeaveStatus;
  startDate?: string;
  endDate?: string;
  reason: string;
  requestDate?: string;
  employeeId?: string;
  concurrencyStamp?: string;
}

export interface LeaveRequestWithNavigationPropertiesDto extends LeaveRequestWithNavigationPropertiesDtoBase {
}

export interface LeaveRequestWithNavigationPropertiesDtoBase {
  leaveRequest: LeaveRequestDto;
  employee: EmployeeDto;
}
