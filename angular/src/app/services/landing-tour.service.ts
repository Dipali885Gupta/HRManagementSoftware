import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GuidedTour, GuidedTourService, Orientation } from 'ngx-guided-tour';

@Injectable({ providedIn: 'root' })
export class LandingTourService {
  private guidedTourService = inject(GuidedTourService);
  private router = inject(Router);

  startLandingPageTour() {
    console.log('🎯 [Tour] Starting landing page tour');
    
    const tour: GuidedTour = {
      tourId: 'landing-page-tour',
      useOrb: false,
      completeCallback: () => {
        console.log('🎯 [Tour] Landing page tour completed - navigating to login');
        // Navigate to login page when tour completes
        this.router.navigate(['/account/login']);
      },
      skipCallback: () => {
        console.log('🎯 [Tour] Tour skipped by user');
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
          content: 'Click the Sign in button to open the login page.',
          orientation: Orientation.Bottom
        },
        {
          title: 'Ready to Sign In',
          content: 'Click Done to go to the login page and sign in.',
          orientation: Orientation.Center
        }
      ]
    };

    this.guidedTourService.startTour(tour);
    console.log('🎯 [Tour] Tour started with', tour.steps?.length, 'steps');
  }
}
