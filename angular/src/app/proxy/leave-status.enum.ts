import { mapEnumToOptions } from '@abp/ng.core';

export enum LeaveStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
  Cancelled = 3,
}

export const leaveStatusOptions = mapEnumToOptions(LeaveStatus);
