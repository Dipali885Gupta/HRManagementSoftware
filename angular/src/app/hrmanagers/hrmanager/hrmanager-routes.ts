import { Routes } from '@angular/router';
import { authGuard, permissionGuard } from '@abp/ng.core';

export const HRMANAGER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => {
      return import('./components/hrmanager.component').then(c => c.HRManagerComponent);
    },
    canActivate: [authGuard, permissionGuard],
  },
];
