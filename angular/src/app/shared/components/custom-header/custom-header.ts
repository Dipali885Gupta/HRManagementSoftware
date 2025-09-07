import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecentActivitiesModal } from '../recent-activities-modal/recent-activities-modal';

@Component({
  selector: 'app-custom-header',
  imports: [RouterLink, CommonModule, RecentActivitiesModal],
  templateUrl: './custom-header.html',
  styleUrl: './custom-header.scss'
})
export class CustomHeader implements OnInit, OnDestroy {
  @HostBinding('attr.data-theme') currentTheme: string = 'light';

  private themeObserver: MutationObserver | null = null;
  showActivitiesModal = false;
  unreadCount = 3; // Sample unread count

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Detect initial theme
    this.detectCurrentTheme();

    // Watch for theme changes
    this.observeThemeChanges();
  }

  ngOnDestroy(): void {
    if (this.themeObserver) {
      this.themeObserver.disconnect();
    }
  }

  private detectCurrentTheme(): void {
    const body = document.body;
    if (body.classList.contains('lpx-theme-dark')) {
      this.currentTheme = 'dark';
    } else if (body.classList.contains('lpx-theme-dim')) {
      this.currentTheme = 'dim';
    } else {
      this.currentTheme = 'light';
    }
  }

  private observeThemeChanges(): void {
    this.themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          this.detectCurrentTheme();
        }
      });
    });

    this.themeObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  toggleActivitiesModal(): void {
    this.showActivitiesModal = !this.showActivitiesModal;
    if (this.showActivitiesModal) {
      // Reset unread count when opening modal
      this.unreadCount = 0;
    }
  }

  onModalClose(): void {
    this.showActivitiesModal = false;
  }

  logout(): void {
    // Add your logout logic here
    // For example: clear tokens, redirect to login page
    this.router.navigate(['/account/logout']);
  }
}