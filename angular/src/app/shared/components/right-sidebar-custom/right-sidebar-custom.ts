import { Component } from '@angular/core';
import { ThemeLeptonXModule } from '@volosoft/abp.ng.theme.lepton-x';
import { LpxResponsiveModule } from '@volo/ngx-lepton-x.core';
import { LpxSideMenuLayoutModule } from '@volosoft/ngx-lepton-x/layouts';
import { SideMenuApplicationLayoutComponent } from '@volosoft/abp.ng.theme.lepton-x/layouts';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-right-sidebar-custom',
  templateUrl: './right-sidebar-custom.html',
  styleUrl: './right-sidebar-custom.scss',
  imports: [
    CommonModule,
    RouterModule,
    ThemeLeptonXModule,
    LpxResponsiveModule,
    LpxSideMenuLayoutModule,
  ],
})
export class RightSidebarCustom {
  constructor(private router: Router) {}
}
