import { APP_INITIALIZER } from '@angular/core';
import { DynamicSidebarService } from '../services/dynamic-sidebar.service';
import { DashboardSidebarComponent } from '../components/dashboard-sidebar/dashboard-sidebar.component';
import { EmployeesSidebarComponent } from '../components/employees-sidebar/employees-sidebar.component';
import { LeaveRequestsSidebarComponent } from '../components/leave-requests-sidebar/leave-requests-sidebar.component';
import { PayrollSidebarComponent } from '../components/payroll-sidebar/payroll-sidebar.component';

export function initializeDynamicSidebar(dynamicSidebarService: DynamicSidebarService) {
  return () => {
    // Register dashboard sidebar
    dynamicSidebarService.registerRouteSidebar(
      '/dashboard',
      DashboardSidebarComponent
    );

    // Register employees sidebar
    dynamicSidebarService.registerRouteSidebar(
      '/employees',
      EmployeesSidebarComponent
    );

    // Register leave requests sidebar
    dynamicSidebarService.registerRouteSidebar(
      '/leave-requests',
      LeaveRequestsSidebarComponent
    );

    // Register payroll sidebar
    dynamicSidebarService.registerRouteSidebar(
      '/payroll-adjustments',
      PayrollSidebarComponent
    );

    // Register nested routes for employees
    dynamicSidebarService.registerRouteSidebar(
      '/employees/create',
      EmployeesSidebarComponent
    );

    dynamicSidebarService.registerRouteSidebar(
      '/employees/import',
      EmployeesSidebarComponent
    );

    // Register nested routes for leave requests
    dynamicSidebarService.registerRouteSidebar(
      '/leave-requests/create',
      LeaveRequestsSidebarComponent
    );

    dynamicSidebarService.registerRouteSidebar(
      '/leave-requests/my-history',
      LeaveRequestsSidebarComponent
    );

    dynamicSidebarService.registerRouteSidebar(
      '/leave-requests/pending',
      LeaveRequestsSidebarComponent
    );

    dynamicSidebarService.registerRouteSidebar(
      '/leave-requests/calendar',
      LeaveRequestsSidebarComponent
    );

    // Register nested routes for payroll
    dynamicSidebarService.registerRouteSidebar(
      '/payroll-adjustments/process',
      PayrollSidebarComponent
    );

    dynamicSidebarService.registerRouteSidebar(
      '/payroll-adjustments/reports',
      PayrollSidebarComponent
    );

    dynamicSidebarService.registerRouteSidebar(
      '/payroll-adjustments/tax-documents',
      PayrollSidebarComponent
    );
  };
}

export const DYNAMIC_SIDEBAR_PROVIDER = {
  provide: APP_INITIALIZER,
  useFactory: initializeDynamicSidebar,
  deps: [DynamicSidebarService],
  multi: true,
};
