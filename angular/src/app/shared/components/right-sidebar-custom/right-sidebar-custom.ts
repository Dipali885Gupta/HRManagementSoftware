import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ThemeLeptonXModule } from '@volosoft/abp.ng.theme.lepton-x';
import { LpxResponsiveModule } from '@volo/ngx-lepton-x.core';
import { LpxSideMenuLayoutModule } from '@volosoft/ngx-lepton-x/layouts';
import { SideMenuApplicationLayoutComponent } from '@volosoft/abp.ng.theme.lepton-x/layouts';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
export class RightSidebarCustom implements OnInit, OnDestroy {
  @Input() sidebarComponent: any = null;
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
