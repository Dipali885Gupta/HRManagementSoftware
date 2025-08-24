import { ABP, eLayoutType } from '@abp/ng.core';

export const PAYROLL_ADJUSTMENT_BASE_ROUTES: ABP.Route[] = [
  {
    path: '/payroll-adjustments',
    iconClass: 'fas fa-file-alt',
    name: '::Menu:PayrollAdjustments',
    layout: eLayoutType.application,
    requiredPolicy: 'HRManagementSoftware.PayrollAdjustments',
    breadcrumbText: '::PayrollAdjustments',
  },
];
