import { CoreModule, provideAbpCore, withOptions } from '@abp/ng.core';
import { provideAbpOAuth } from '@abp/ng.oauth';
import { provideSettingManagementConfig } from '@abp/ng.setting-management/config';
import { provideFeatureManagementConfig } from '@abp/ng.feature-management';
import {
  provideAbpThemeShared,
  withValidationBluePrint,
  withHttpErrorConfig,
  ThemeSharedModule,
} from '@abp/ng.theme.shared';
import { provideIdentityConfig } from '@volo/abp.ng.identity/config';
import { provideCommercialUiConfig } from '@volo/abp.commercial.ng.ui/config';
import { provideAccountAdminConfig } from '@volo/abp.ng.account/admin/config';
import { provideAccountPublicConfig } from '@volo/abp.ng.account/public/config';
import { provideGdprConfig, withCookieConsentOptions } from '@volo/abp.ng.gdpr/config';
import { provideAuditLoggingConfig } from '@volo/abp.ng.audit-logging/config';
import { provideLanguageManagementConfig } from '@volo/abp.ng.language-management/config';
import { registerLocale } from '@volo/abp.ng.language-management/locale';
import { provideSaasConfig } from '@volo/abp.ng.saas/config';
import { provideTextTemplateManagementConfig } from '@volo/abp.ng.text-template-management/config';
import { provideOpeniddictproConfig } from '@volo/abp.ng.openiddictpro/config';
import { HttpErrorComponent, provideThemeLeptonX } from '@volosoft/abp.ng.theme.lepton-x';
import { provideSideMenuLayout } from '@volosoft/abp.ng.theme.lepton-x/layouts';
import { provideLogo, withEnvironmentOptions } from '@volo/ngx-lepton-x.core';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { environment } from '../environments/environment';
import { APP_ROUTES } from './app.routes';
import { APP_ROUTE_PROVIDER } from './route.provider';
import { EMPLOYEES_EMPLOYEE_ROUTE_PROVIDER } from './employees/employee/providers/employee-route.provider';
import { LEAVE_REQUESTS_LEAVE_REQUEST_ROUTE_PROVIDER } from './leave-requests/leave-request/providers/leave-request-route.provider';
import { HRMANAGERS_HRMANAGER_ROUTE_PROVIDER } from './hrmanagers/hrmanager/providers/hrmanager-route.provider';
import { PAYROLL_ADJUSTMENTS_PAYROLL_ADJUSTMENT_ROUTE_PROVIDER } from './payroll-adjustments/payroll-adjustment/providers/payroll-adjustment-route.provider';
// Import LeptonX Layout Modules as per ABP documentation
import { LpxSideMenuLayoutModule } from '@volosoft/ngx-lepton-x/layouts';
import { LpxResponsiveModule } from '@volo/ngx-lepton-x.core';
import { IdentityConfigModule } from '@volo/abp.ng.identity/config';
import { AccountAdminConfigModule } from '@volo/abp.ng.account/admin/config';
import { GdprConfigModule } from '@volo/abp.ng.gdpr/config';
import { AuditLoggingConfigModule } from '@volo/abp.ng.audit-logging/config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DYNAMIC_SIDEBAR_PROVIDER } from './shared/providers/dynamic-sidebar.provider';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES),
    APP_ROUTE_PROVIDER,
     importProvidersFrom(CommonModule),
    importProvidersFrom(FormsModule),
    importProvidersFrom(NgbModule), // Removed invalid usage
    importProvidersFrom(ThemeSharedModule),
    importProvidersFrom(CoreModule),
    // importProvidersFrom(ThemeLeptonXModule.forRoot()),
    // importProvidersFrom(SideMenuLayoutModule.forRoot()),
    // importProvidersFrom(AccountLayoutModule.forRoot()), // Removed due to missing module
    importProvidersFrom(LpxSideMenuLayoutModule),
    importProvidersFrom(LpxResponsiveModule),
    importProvidersFrom(IdentityConfigModule),
    importProvidersFrom(AccountAdminConfigModule),
    importProvidersFrom(GdprConfigModule),
    importProvidersFrom(AuditLoggingConfigModule),
    provideAnimations(),
      // Import LeptonX modules - Required for custom layout components
    importProvidersFrom([
      LpxSideMenuLayoutModule,
      LpxResponsiveModule // Optional. Only if you are using lpxResponsive directive
    ]),
    provideAbpCore(
      withOptions({
        environment,
        registerLocaleFn: registerLocale(),
      }),
    ),
    provideAbpOAuth(),
    provideIdentityConfig(),
    provideSettingManagementConfig(),
    provideFeatureManagementConfig(),
    provideAccountAdminConfig(),
    provideAccountPublicConfig(),
    provideCommercialUiConfig(),
    provideThemeLeptonX(),
    provideSideMenuLayout(),
    provideAbpThemeShared(
      withHttpErrorConfig({
        errorScreen: {
          component: HttpErrorComponent,
          forWhichErrors: [401, 403, 404, 500],
          hideCloseIcon: true,
        },
      }),
      withValidationBluePrint({
        wrongPassword: 'Please choose 1q2w3E*',
      }),
    ),
    provideLogo(withEnvironmentOptions(environment)),
    provideGdprConfig(
      withCookieConsentOptions({
        cookiePolicyUrl: '/gdpr-cookie-consent/cookie',
        privacyPolicyUrl: '/gdpr-cookie-consent/privacy',
      }),
    ),
    provideLanguageManagementConfig(),
    provideSaasConfig(),
    provideAuditLoggingConfig(),
    provideOpeniddictproConfig(),
    provideTextTemplateManagementConfig(),
    EMPLOYEES_EMPLOYEE_ROUTE_PROVIDER,
    LEAVE_REQUESTS_LEAVE_REQUEST_ROUTE_PROVIDER,
    HRMANAGERS_HRMANAGER_ROUTE_PROVIDER,
    PAYROLL_ADJUSTMENTS_PAYROLL_ADJUSTMENT_ROUTE_PROVIDER,
  ],
};
