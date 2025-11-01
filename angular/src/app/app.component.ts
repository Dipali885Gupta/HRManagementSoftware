import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ReplaceableComponentsService, SessionStateService } from '@abp/ng.core';
import { eThemeLeptonXComponents } from '@volosoft/abp.ng.theme.lepton-x';
import { SideMenuApplicationLayoutComponent } from '@volosoft/abp.ng.theme.lepton-x/layouts';
import { CustomApplicationLayoutComponent } from './shared/layouts/custom-application-layout/custom-application-layout';
import { ThemeService } from '@volosoft/ngx-lepton-x';
import { CommonModule } from '@angular/common';
import { LoaderBarComponent } from '@abp/ng.theme.shared';
import { GdprCookieConsentComponent } from '@volo/abp.ng.gdpr/config';
import { NoSidebar } from './shared/layouts/nosidebar/nosidebar';
import { GuidedTourModule } from 'ngx-guided-tour';
import { TourResumeService } from './services/tour-resume.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    LoaderBarComponent,
    GdprCookieConsentComponent,
    GuidedTourModule
  ],
  template: `
    <ng-container>
      <abp-loader-bar></abp-loader-bar>
      <ng-container *ngIf="currentLayoutComponent">
        <ng-container [ngComponentOutlet]="currentLayoutComponent"></ng-container>
      </ng-container>
      <abp-gdpr-cookie-consent></abp-gdpr-cookie-consent>
      <ngx-guided-tour></ngx-guided-tour>
    </ng-container>
  `,
})
export class AppComponent implements OnInit {
  tenantName: string;
  currentLayoutComponent: any;

  constructor(
    private router: Router,
    public replaceableComponents: ReplaceableComponentsService,
    private sessionStateService: SessionStateService,
    private themeService: ThemeService,
    private tourResumeService: TourResumeService
  ) {
    this.tenantName = this.sessionStateService.getTenant()?.name ?? 'host';

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.setLayoutBasedOnRoute();
    });
  }

  private setLayoutBasedOnRoute() {
    const currentUrl = this.router.url;
    let layoutType: string | undefined;
    let route = this.router.routerState.root;

    while (route) {
      if (route.snapshot.data?.['layout']) {
        layoutType = route.snapshot.data['layout'];
        break;
      }
      route = route.firstChild;
    }


    let layoutComponent;
    switch (layoutType) {
      case 'custom':
        layoutComponent = SideMenuApplicationLayoutComponent;
        break;
      case 'no-sidebar':
        layoutComponent = NoSidebar;
        break;
      default:
        layoutComponent = CustomApplicationLayoutComponent;
        break;

    }

    this.currentLayoutComponent = layoutComponent;

    this.replaceableComponents.add({
      component: layoutComponent,
      key: eThemeLeptonXComponents.ApplicationLayout,
    });

    console.log(`🎯 Layout switched to: ${layoutType || 'default'} using ${layoutComponent.name}`);
  }

  ngOnInit() {
    this.setLayoutBasedOnRoute();
    this.applyCustomStyling();
    this.setInitialTheme();
  }

  startOnboarding() {
    console.log('🎯 [Tour Flow] 1. User clicked "Take a Tour" button');
    console.log('🎯 [Tour Flow] 2. Current route:', this.router.url);
    console.log('🎯 [Tour Flow] 3. Layout type:', this.currentLayoutComponent?.name);

    // Also POST a short message to the local log server (best-effort).
    // Disabled by default to avoid noisy network errors when the server isn't running.
    // To enable, set localStorage.setItem('enableLocalLogServer', '1') in the browser devtools.
    if (localStorage.getItem('enableLocalLogServer') === '1') {
      try {
        fetch('http://localhost:9229/log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ts: new Date().toISOString(), msg: `AppComponent.startOnboarding - route=${this.router.url}` }),
        }).catch(() => {});
      } catch {}
    }

    // Tour is now triggered from the landing page "Take a Tour" button
  }

  private applyCustomStyling() {
    const element = document.querySelector('.lpx-theme-light, .lpx-theme-dark, .lpx-theme-system') as HTMLElement;

    if (element) {
      element.style.setProperty('--lpx-logo', "url(/assets/images/logo/host.png)");
      if (this.tenantName === 'host') {
        element.style.setProperty('--lpx-logo-icon', "url(/assets/images/logo/host-icon.svg)");
      }
    }
  }

  private setInitialTheme() {
    const selectedTheme = this.themeService.selectedStyle?.styleName;
    if (selectedTheme) {
      document.body.setAttribute('data-bs-theme', selectedTheme.toLowerCase());
    }
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement) return;

    const selectedTheme = clickedElement.innerHTML;
    const themes = ['Light', 'Dark', 'Semi-Dark', 'System'];

    if (themes.includes(selectedTheme)) {
      document.body.setAttribute('data-bs-theme', selectedTheme.toLowerCase());
    }
  }
}
