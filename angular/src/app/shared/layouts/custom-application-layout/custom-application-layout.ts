import { AfterViewInit, APP_INITIALIZER, Component, inject } from '@angular/core';
import { ConfigStateService, DEFAULT_DYNAMIC_LAYOUTS, ReplaceableComponentsService } from '@abp/ng.core';
import { Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// CRITICAL: Import LeptonX modules for standalone component
import { ThemeLeptonXModule } from '@volosoft/abp.ng.theme.lepton-x';
import { LpxResponsiveModule } from '@volo/ngx-lepton-x.core'; // This provides *lpxResponsive
import { LpxSideMenuLayoutModule } from '@volosoft/ngx-lepton-x/layouts';
import { SideMenuApplicationLayoutComponent } from '@volosoft/abp.ng.theme.lepton-x/layouts';
import { RightSidebarCustom } from '../../components/right-sidebar-custom/right-sidebar-custom';
import { CustomHeader } from "../../components/custom-header/custom-header";
import { LeftSidebarCustom } from '../../components/left-sidebar-custom/left-sidebar-custom';
@Component({
  selector: 'app-custom-application-layout',
  standalone: true, // Standalone component
  imports: [
    CommonModule,
    RouterModule,
    ThemeLeptonXModule,
    LpxResponsiveModule, // ESSENTIAL: This makes *lpxResponsive work
    LpxSideMenuLayoutModule,
    RightSidebarCustom, // ESSENTIAL: This provides LeptonX components
    CustomHeader,
    LeftSidebarCustom
],
  templateUrl: './custom-application-layout.html',
  styleUrls: ['./custom-application-layout.scss']
})
export class CustomApplicationLayoutComponent implements AfterViewInit {
  @ViewChild('sidebarcontainer', { read: ElementRef }) sidebarContainer!: ElementRef;
  loggedInTenant: string = 'Platform Admin';
  currentUser: any = null;

  constructor(
    private renderer: Renderer2,
    private config: ConfigStateService,
    private router: Router
  ) {
    this.currentUser = this.config.getOne('currentUser');
    
    const isBuilding = this.config.getFeatureIsEnabled('AdminFeatures.Building');
    const isDepartment = this.config.getFeatureIsEnabled('AdminFeatures.Department');
    this.loggedInTenant = isBuilding ? 'Site Portal' : (isDepartment ? 'Department Portal' : 'Platform Admin');
  }

  logout(): void {
    this.router.navigate(['/account/logout']);
  }

  ngAfterViewInit(): void {
    document.querySelector('.lpx-user-menu .lpx-menu-item-link .lpx-menu-item-text')?.classList.add('hidden-in-hover-trigger');
    this.tryInjectCustomSetting(5);
  }

  private tryInjectCustomSetting(retries: number) {
    const hasSidebar = !!this.sidebarContainer?.nativeElement;
    if (!hasSidebar && retries > 0) {
      setTimeout(() => this.tryInjectCustomSetting(retries - 1), 150);
      return;
    }

    if (hasSidebar) {
      this.injectCustomSetting();
    }
  }

  injectCustomSetting(): void {
    const sidebar = this.sidebarContainer?.nativeElement;
    if (!sidebar) return;

    const container = sidebar.querySelector('lpx-settings lpx-setting:last-child div.setting-icon');
    const avatarHeight = sidebar.querySelector('.custom-avatar nav.lpx-toolbar')?.offsetHeight ?? 0;
    
    const settingsElem = sidebar.querySelector('lpx-settings .lpx-settings');
    if (settingsElem) {
      this.renderer.setStyle(settingsElem, 'bottom', `${avatarHeight}px`);
    }
    
    if (!container) return;

    const span = this.renderer.createElement('span');
    this.renderer.addClass(span, 'custom-menu-item-text');
    this.renderer.addClass(span, 'hidden-in-hover-trigger');
    const spanText = this.renderer.createText('Settings');
    this.renderer.appendChild(span, spanText);
    this.renderer.appendChild(container, span);

    this.renderer.listen(container, 'click', (_event) => {
      // Settings click logic
    });
  }
}

// Layout registration following ABP documentation for standalone apps
export const eCustomLayout = {
  key: 'CustomLayout',
  component: CustomApplicationLayoutComponent,
};

export const myDynamicLayouts = new Map<string, any>([
  ...DEFAULT_DYNAMIC_LAYOUTS,
  ['ApplicationLayout', SideMenuApplicationLayoutComponent],
  ['CustomApplicationLayout', CustomApplicationLayoutComponent],
]);

export const CUSTOM_LAYOUT_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: configureLayoutFn,
    deps: [ReplaceableComponentsService],
    multi: true,
  },
];

function configureLayoutFn() {
  const service = inject(ReplaceableComponentsService);
  return () => {
    service.add({
      key: eCustomLayout.key,
      component: CustomApplicationLayoutComponent,
    });
    service.add({
      key: 'DefaultSideMenuLayout',
      component: SideMenuApplicationLayoutComponent,
    });
  };
}