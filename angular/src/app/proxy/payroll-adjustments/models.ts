import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { PayrollRecordStatus } from '../payroll-record-status.enum';
import type { LeaveRequestDto } from '../leave-requests/models';
import type { EmployeeDto } from '../employees/models';

export interface GetPayrollAdjustmentsInput extends GetPayrollAdjustmentsInputBase {
}

export interface GetPayrollAdjustmentsInputBase extends PagedAndSortedResultRequestDto {
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

export interface PayrollAdjustmentCreateDto extends PayrollAdjustmentCreateDtoBase {
}

export interface PayrollAdjustmentCreateDtoBase {
  month: number;
  year: number;
  status?: PayrollRecordStatus;
  netpay: number;
  leaveRequestId?: string;
  employeeId?: string;
}

export interface PayrollAdjustmentDto extends PayrollAdjustmentDtoBase {
}

export interface PayrollAdjustmentDtoBase extends FullAuditedEntityDto<string> {
  month: number;
  year: number;
  status?: PayrollRecordStatus;
  netpay: number;
  leaveRequestId?: string;
  employeeId?: string;
  concurrencyStamp?: string;
}

export interface PayrollAdjustmentExcelDownloadDto extends PayrollAdjustmentExcelDownloadDtoBase {
}

export interface PayrollAdjustmentExcelDownloadDtoBase {
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

export interface PayrollAdjustmentUpdateDto extends PayrollAdjustmentUpdateDtoBase {
}

export interface PayrollAdjustmentUpdateDtoBase {
  month: number;
  year: number;
  status?: PayrollRecordStatus;
  netpay: number;
  leaveRequestId?: string;
  employeeId?: string;
  concurrencyStamp?: string;
}

export interface PayrollAdjustmentWithNavigationPropertiesDto extends PayrollAdjustmentWithNavigationPropertiesDtoBase {
}

export interface PayrollAdjustmentWithNavigationPropertiesDtoBase {
  payrollAdjustment: PayrollAdjustmentDto;
  leaveRequest: LeaveRequestDto;
  employee: EmployeeDto;
}
