import { Routes } from '@angular/router';
import { authGuard, permissionGuard } from '@abp/ng.core';
import { HRManagerSidebarComponent } from '../../shared/components/hrmanager-sidebar/hrmanager-sidebar.component';

export const HRMANAGER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => {
      return import('./components/hrmanager.component').then(c => c.HRManagerComponent);
    },
    canActivate: [authGuard, permissionGuard],
    data: {
      sidebarComponent: HRManagerSidebarComponent
    }
  },
];
