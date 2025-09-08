import { Routes } from '@angular/router';
import { authGuard, permissionGuard } from '@abp/ng.core';
import { PayrollSidebarComponent } from '../../shared/components/payroll-sidebar/payroll-sidebar.component';

export const PAYROLL_ADJUSTMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => {
      return import('./components/payroll-adjustment.component').then(
        c => c.PayrollAdjustmentComponent,
      );
    },
    canActivate: [authGuard, permissionGuard],
    data: {
      sidebarComponent: PayrollSidebarComponent
    }
  },
];
