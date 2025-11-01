import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { LandingTourService } from './landing-tour.service';

@Injectable({ providedIn: 'root' })
export class TourResumeService {
  constructor(
    private router: Router,
    private landingTourService: LandingTourService
  ) {
    // Listen to route changes and resume tour if needed
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkAndResumeTour();
      });
  }

  private checkAndResumeTour() {
    const currentUrl = this.router.url;
    
    // Check if we're on the login page and have a resume flag
    if (currentUrl.includes('/account/login')) {
      const resumeFlag = localStorage.getItem('hr_tour_resume');
      if (resumeFlag === 'login-page') {
        // Wait a bit for the page to render
        setTimeout(() => {
          this.landingTourService.startLoginPageTour();
        }, 1000);
      }
    }
  }
}
