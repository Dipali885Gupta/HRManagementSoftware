import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GuidedTour, GuidedTourService, Orientation } from 'ngx-guided-tour';

@Injectable({ providedIn: 'root' })
export class LandingTourService {
  private guidedTourService = inject(GuidedTourService);
  private router = inject(Router);

  startLandingPageTour() {
    const tour: GuidedTour = {
      tourId: 'landing-page-tour',
      useOrb: false,
      completeCallback: () => {
        // When tour completes (user clicks Next on last step), navigate to login
        this.navigateToLogin();
      },
      steps: [
        {
          title: 'Welcome to HR Management',
          selector: '.hero',
          content: 'Welcome to the HR Management Software. Click Next to continue the tour.',
          orientation: Orientation.Center
        },
        {
          title: 'Sign In',
          selector: '#sign-in-btn',
          content: 'Click the Sign in button to open the login page and continue the tour.',
          orientation: Orientation.Bottom
        }
      ]
    };

    this.guidedTourService.startTour(tour);
  }

  private navigateToLogin() {
    // Store flag to resume tour on login page
    localStorage.setItem('hr_tour_resume', 'login-page');
    
    // Navigate to login
    this.router.navigate(['/account/login']).then(() => {
      // Wait for login page to load and start the login page tour
      setTimeout(() => {
        this.startLoginPageTour();
      }, 1000);
    });
  }

  startLoginPageTour() {
    const resumeFlag = localStorage.getItem('hr_tour_resume');
    if (resumeFlag !== 'login-page') {
      return;
    }

    // Clear the flag
    localStorage.removeItem('hr_tour_resume');

    const tour: GuidedTour = {
      tourId: 'login-page-tour',
      useOrb: false,
      steps: [
        {
          title: 'Username Field',
          selector: '#LoginInput_UserNameOrEmailAddress',
          content: 'Enter your username or email address here to sign in.',
          orientation: Orientation.Right
        }
      ]
    };

    this.guidedTourService.startTour(tour);
  }
}
