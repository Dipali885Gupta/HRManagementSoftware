import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { PayrollRecordStatus } from '../payroll-record-status.enum';
import type { LeaveRequestDto } from '../leave-requests/models';
import type { EmployeeDto } from '../employees/models';

export interface GetPayrollAdjustmentsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  monthMin?: number;
  monthMax?: number;
  yearMin?: number;
  yearMax?: number;
  status?: PayrollRecordStatus;
  netpayMin?: number;
  netpayMax?: number;
  leaveRequestId?: string;
  employeeId?: string;
}

export interface PayrollAdjustmentCreateDto {
  month: number;
  year: number;
  status: PayrollRecordStatus;
  netpay: number;
  leaveRequestId?: string;
  employeeId?: string;
}

export interface PayrollAdjustmentDto extends FullAuditedEntityDto<string> {
  month: number;
  year: number;
  status: PayrollRecordStatus;
  netpay: number;
  leaveRequestId?: string;
  employeeId?: string;
  concurrencyStamp?: string;
}

export interface PayrollAdjustmentExcelDownloadDto {
  downloadToken?: string;
  filterText?: string;
  monthMin?: number;
  monthMax?: number;
  yearMin?: number;
  yearMax?: number;
  status?: PayrollRecordStatus;
  netpayMin?: number;
  netpayMax?: number;
  leaveRequestId?: string;
  employeeId?: string;
}

export interface PayrollAdjustmentUpdateDto {
  month: number;
  year: number;
  status: PayrollRecordStatus;
  netpay: number;
  leaveRequestId?: string;
  employeeId?: string;
  concurrencyStamp?: string;
}

export interface PayrollAdjustmentWithNavigationPropertiesDto {
  payrollAdjustment: PayrollAdjustmentDto;
  leaveRequest: LeaveRequestDto;
  employee: EmployeeDto;
}
