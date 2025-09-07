import { Component } from '@angular/core';
import { ThemeLeptonXModule } from '@volosoft/abp.ng.theme.lepton-x';
import { LpxResponsiveModule } from '@volo/ngx-lepton-x.core';
import { LpxSideMenuLayoutModule } from '@volosoft/ngx-lepton-x/layouts';
import { SideMenuApplicationLayoutComponent } from '@volosoft/abp.ng.theme.lepton-x/layouts';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-left-sidebar-custom',
  templateUrl: './left-sidebar-custom.html',
  styleUrl: './left-sidebar-custom.scss',
  imports: [
    CommonModule,
    RouterModule,
    ThemeLeptonXModule,
    LpxResponsiveModule,
    LpxSideMenuLayoutModule,
  ],
})
export class LeftSidebarCustom {
  loggedInTenant: string = 'Platform Admin';
  currentUser: any = null;

  constructor(private router: Router) {
    // Initialize current user (you can inject ConfigStateService if needed)
    this.currentUser = {
      name: 'John Doe',
      email: 'john.doe@mail.com'
    };

    // Set tenant based on features (you can inject ConfigStateService if needed)
    this.loggedInTenant = 'Platform Admin';
  }

  logout(): void {
    this.router.navigate(['/account/logout']);
  }

  manageProfile(): void {
    this.router.navigate(['/account/manage']);
  }

  viewSecurityLogs(): void {
    this.router.navigate(['/account/security-logs']);
  }
}
