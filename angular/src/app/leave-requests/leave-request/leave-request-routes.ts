import { Routes } from '@angular/router';
import { authGuard, permissionGuard } from '@abp/ng.core';

export const LEAVE_REQUEST_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => {
      return import('./components/leave-request.component').then(c => c.LeaveRequestComponent);
    },
    canActivate: [authGuard, permissionGuard],
  },
];
