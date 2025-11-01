import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ShepherdService } from 'angular-shepherd';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ShepherdTourService {
  private shepherdService = inject(ShepherdService);
  private router = inject(Router);

  constructor() {
    // Resume tour when navigating to login if a resume flag is present
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.maybeResumeTour();
    });
  }

  startLandingTour() {
    const steps = [
      {
        id: 'welcome',
        classes: 'shepherd-center shepherd-theme-default',
        title: 'Welcome to HR Management',
        text: ['Welcome to the HR Management Software. Click Next to continue the tour.'],
        buttons: [
          {
            text: 'Next',
            action: () => this.shepherdService.next(),
          },
        ],
      },
      {
        id: 'sign-in',
        attachTo: { element: '#sign-in-btn', on: 'bottom' },
        title: 'Sign in',
        text: ['Click the Sign in button to open the login page and continue.'],
        buttons: [
          {
            text: 'Next',
            action: () => this.onSignInNext(),
          },
        ],
      },
    ];

    // Register and start
    this.shepherdService.addSteps(steps as any);
    this.shepherdService.start();
  }

  private onSignInNext() {
    // Persist state so we can resume on the login page
    try {
      localStorage.setItem('hr_tour_resume', 'login-username');
    } catch (e) {
      // ignore
    }
    this.shepherdService.cancel();
    this.router.navigate(['/account/login']);
  }

  private async maybeResumeTour() {
    const key = localStorage.getItem('hr_tour_resume');
    if (!key) return;
    if (this.router.url.startsWith('/account/login') && key === 'login-username') {
      try {
        localStorage.removeItem('hr_tour_resume');
      } catch (e) {}

      // Wait for username input to exist on the page
      const selectors = ['#UserName', 'input[name="username"]', 'input[type="text"]', 'input[placeholder*="User"]'];
      const el = await this.waitForElement(selectors, 8000);

      const loginStep: any = {
        id: 'login-username',
        title: 'Your username',
        text: ['Please enter your username here to sign in.'],
        buttons: [
          {
            text: 'Finish',
            action: () => this.shepherdService.complete(),
          },
        ],
      };

      if (el) {
        loginStep.attachTo = { element: el as any, on: 'right' };
      } else {
        // Center if no element found
        loginStep.classes = 'shepherd-center';
      }

      this.shepherdService.addSteps([loginStep]);
      this.shepherdService.start();
    }
  }

  private waitForElement(selectors: string[], timeout = 8000): Promise<Element | null> {
    return new Promise((resolve) => {
      const interval = 200;
      const maxTries = Math.ceil(timeout / interval);
      let tries = 0;
      const check = () => {
        for (const s of selectors) {
          const el = document.querySelector(s);
          if (el) return resolve(el);
        }
        tries++;
        if (tries >= maxTries) return resolve(null);
        setTimeout(check, interval);
      };
      check();
    });
  }
}
