import { mapEnumToOptions } from '@abp/ng.core';

export enum LeaveType {
  SickLeave = 0,
  PaidLeave = 1,
  UnpaidLeave = 2,
}

export const leaveTypeOptions = mapEnumToOptions(LeaveType);
