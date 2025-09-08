import { Routes } from '@angular/router';
import { authGuard, permissionGuard } from '@abp/ng.core';
import { LeaveRequestsSidebarComponent } from '../../shared/components/leave-requests-sidebar/leave-requests-sidebar.component';

export const LEAVE_REQUEST_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => {
      return import('./components/leave-request.component').then(c => c.LeaveRequestComponent);
    },
    canActivate: [authGuard, permissionGuard],
    data: {
      sidebarComponent: LeaveRequestsSidebarComponent
    }
  },
];
