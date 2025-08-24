import { inject, provideAppInitializer } from '@angular/core';
import { ABP, RoutesService } from '@abp/ng.core';
import { PAYROLL_ADJUSTMENT_BASE_ROUTES } from './payroll-adjustment-base.routes';

export const PAYROLL_ADJUSTMENTS_PAYROLL_ADJUSTMENT_ROUTE_PROVIDER = [
  provideAppInitializer(() => {
    configureRoutes();
  }),
];

function configureRoutes() {
  const routesService = inject(RoutesService);
  const routes: ABP.Route[] = [...PAYROLL_ADJUSTMENT_BASE_ROUTES];
  routesService.add(routes);
}
