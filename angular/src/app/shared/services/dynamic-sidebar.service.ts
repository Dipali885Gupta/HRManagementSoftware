import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface SidebarContent {
  component: any;
  data?: any;
}

export interface RouteSidebarConfig {
  path: string;
  sidebarContent: SidebarContent;
}

@Injectable({
  providedIn: 'root'
})
export class DynamicSidebarService {
  private sidebarContent$ = new BehaviorSubject<SidebarContent | null>(null);
  private routeConfigs: RouteSidebarConfig[] = [];

  constructor(private router: Router) {
    this.initializeRouteWatcher();
  }

  /**
   * Register sidebar content for a specific route
   */
  registerRouteSidebar(path: string, component: any, data?: any): void {
    const existingIndex = this.routeConfigs.findIndex(config => config.path === path);

    if (existingIndex >= 0) {
      this.routeConfigs[existingIndex] = { path, sidebarContent: { component, data } };
    } else {
      this.routeConfigs.push({ path, sidebarContent: { component, data } });
    }
  }

  /**
   * Get current sidebar content observable
   */
  getSidebarContent(): Observable<SidebarContent | null> {
    return this.sidebarContent$.asObservable();
  }

  /**
   * Get current sidebar content value
   */
  getCurrentSidebarContent(): SidebarContent | null {
    return this.sidebarContent$.value;
  }

  /**
   * Set sidebar content manually
   */
  setSidebarContent(content: SidebarContent | null): void {
    this.sidebarContent$.next(content);
  }

  /**
   * Clear sidebar content
   */
  clearSidebarContent(): void {
    this.sidebarContent$.next(null);
  }

  /**
   * Initialize route watcher to automatically update sidebar content
   */
  private initializeRouteWatcher(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.urlAfterRedirects)
      )
      .subscribe(url => {
        this.updateSidebarForRoute(url);
      });

    // Set initial sidebar content
    this.updateSidebarForRoute(this.router.url);
  }

  /**
   * Update sidebar content based on current route
   */
  private updateSidebarForRoute(url: string): void {
    // Remove query parameters and fragments
    const cleanUrl = url.split('?')[0].split('#')[0];

    // Find matching route config
    const matchingConfig = this.routeConfigs.find(config => {
      // Exact match
      if (config.path === cleanUrl) {
        return true;
      }

      // Prefix match for nested routes
      if (cleanUrl.startsWith(config.path + '/') || cleanUrl === config.path) {
        return true;
      }

      return false;
    });

    if (matchingConfig) {
      this.sidebarContent$.next(matchingConfig.sidebarContent);
    } else {
      // Default sidebar content or clear
      this.sidebarContent$.next(null);
    }
  }

  /**
   * Get all registered route configs (for debugging)
   */
  getAllRouteConfigs(): RouteSidebarConfig[] {
    return [...this.routeConfigs];
  }
}
