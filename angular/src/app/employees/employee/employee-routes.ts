import { Routes } from '@angular/router';
import { authGuard, permissionGuard } from '@abp/ng.core';

export const EMPLOYEE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => {
      return import('./components/employee.component').then(c => c.EmployeeComponent);
    },
    canActivate: [authGuard, permissionGuard],
  },
];
