import { Injectable } from '@angular/core';
import { GuidedTour, GuidedTourService } from 'ngx-guided-tour';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '@abp/ng.core';

@Injectable({
  providedIn: 'root',
})
export class HrTourService {
  private selectors = {
    signInBtn: '#sign-in-btn',
    loginUsername: "input[name='username']",
    loginPassword: "input[name='password']",
    loginSubmit: "button[type='submit']",
    leaveModule: '#leave-requests-link',
    newLeaveBtn: '#new-leave-btn',
    leaveStartDate: '#leave-start-date',
    leaveEndDate: '#leave-end-date',
    leaveReason: '#leave-reason',
    submitLeaveBtn: '#submit-leave-btn',
  };

  // Keep references to attached listeners so we can remove them when tour ends
  private attachedListeners: Array<() => void> = [];

  constructor(
    private guidedTourService: GuidedTourService,
    private router: Router,
    private authService: AuthService
  ) {
    console.log('1. HrTourService initialized');
    this.setupTourNavigation();
  }

  private waitForElement(selector: string, timeout = 10000): Promise<Element | null> {
    return new Promise((resolve) => {
      const el = document.querySelector(selector);
      if (el) return resolve(el);

      const interval = setInterval(() => {
        const found = document.querySelector(selector);
        if (found) {
          clearInterval(interval);
          clearTimeout(timer);
          resolve(found);
        }
      }, 200);

      const timer = setTimeout(() => {
        clearInterval(interval);
        resolve(null);
      }, timeout);
    });
  }

  private addListenerOnce(selector: string, eventName: string, handler: EventListener) {
    const wrapped = (ev: Event) => {
      try {
        handler(ev);
      } finally {
        const el = document.querySelector(selector);
        if (el) el.removeEventListener(eventName, wrapped);
      }
    };

    const el = document.querySelector(selector);
    if (el) {
      el.addEventListener(eventName, wrapped);
      this.attachedListeners.push(() => el.removeEventListener(eventName, wrapped));
    } else {
      // If element not present yet, poll for it and then attach
      const interval = setInterval(() => {
        const found = document.querySelector(selector);
        if (found) {
          found.addEventListener(eventName, wrapped);
          this.attachedListeners.push(() => found.removeEventListener(eventName, wrapped));
          clearInterval(interval);
        }
      }, 250);
      // store a remover to clear the interval in case we cancel the tour
      this.attachedListeners.push(() => clearInterval(interval));
    }
  }

  private clearListeners() {
    this.attachedListeners.forEach((fn) => {
      try {
        fn();
      } catch (e) {
        // ignore
      }
    });
    this.attachedListeners = [];
  }

  // A small wrapper that prints to browser console and forwards logs to a local terminal log server
  private sendLogToServer(payload: any) {
    // Only attempt to forward logs if the developer explicitly enabled the local log server.
    // This prevents noisy "ERR_CONNECTION_REFUSED" messages when the server is not running.
    try {
      if (typeof localStorage !== 'undefined' && localStorage.getItem('enableLocalLogServer') === '1') {
        // best-effort fire-and-forget POST to local log server
        fetch('http://localhost:9229/log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: false,
        }).catch(() => {
          // ignore network / CORS errors silently
        });
      }
    } catch (e) {
      // ignore
    }
  }

  private log(...args: any[]) {
    // Print to browser console
    // eslint-disable-next-line no-console
    console.log(...args);

    // Also forward a compact string to the local terminal server
    try {
      const message = args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
      this.sendLogToServer({ ts: new Date().toISOString(), msg: message });
    } catch {
      // ignore
    }
  }

  private setupTourNavigation() {
    // Listen for tour steps
    this.guidedTourService.guidedTourCurrentStepStream.subscribe(step => {
      if (step) {
        console.log('🎯 [Tour Flow] 7. Current tour step:', step.title);
        
        if (step.selector === this.selectors.signInBtn) {
          const signInBtn = document.querySelector(this.selectors.signInBtn) as HTMLElement;
          if (signInBtn) {
            // When user clicks the real sign-in button we want the app to navigate to the login page.
            // Stop/skip the current onboarding tour so the route change + DOM observer can start the login tour.
            signInBtn.addEventListener('click', () => {
              this.log('🎯 [Tour Flow] 8. Sign-in button clicked (pausing onboarding tour)');
              // Allow the navigation to proceed, then stop the current tour so the login tour can take over
              setTimeout(() => {
                try { this.guidedTourService.skipTour(); } catch (e) { /* ignore */ }
              }, 200);
            }, { once: true });
          }

          // Also handle the case where the user clicks the tour's "Next" button (not the real sign-in button).
          // In that case we should navigate to the login page and pause/skip the onboarding tour so the
          // login-specific tour can take over when the login form is present.
          this.attachTourNextOnce(() => {
            this.log('🎯 [Tour Flow] 8b. Tour Next clicked on Sign-in step (navigating to login)');
            // Navigate to login page and skip the current tour shortly after to allow navigation to start
            this.router.navigate(['/account/login']).then(() => {
              setTimeout(() => {
                try { this.guidedTourService.skipTour(); } catch (e) { /* ignore */ }
              }, 200);
            });
          });
        }
      }
    });

    // Listen for route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      console.log('🎯 [Tour Flow] Navigation detected:', {
        url: event.url,
        previousUrl: event.urlAfterRedirects,
        timestamp: new Date().toISOString()
      });
      
      // Check if we're on the login page during tour
      if (event.url.includes('account/login')) {
        this.log('🎯 [Tour Flow] 7. Reached login page');
        this.waitForElement(this.selectors.loginUsername).then((element) => {
          this.log('🎯 [Tour Flow] 8. Login form elements status:', {
            usernameField: !!element,
            passwordField: !!document.querySelector(this.selectors.loginPassword),
            submitButton: !!document.querySelector(this.selectors.loginSubmit)
          });
          this.continueWithLoginForm();
        });
      }

      // Check if we've reached the home page after login
      if (event.url === '/home') {
        this.log('🎯 [Tour Flow] 11. Reached home page, tour complete');
        this.guidedTourService.startTour({
          tourId: 'hr-welcome-tour',
          useOrb: true,
          steps: [{
            title: 'Welcome',
            content: 'Welcome to HR Management! Your tour is complete.',
            orientation: 'center'
          }]
        });
      }
    });
  }

  /**
   * Polls the DOM for the guided-tour "Next" button and attaches a one-time click handler.
   * The function pushes a remover into attachedListeners so it will be cleared when the tour stops.
   */
  private attachTourNextOnce(handler: () => void) {
    // Poll for the tour component's next button. Support a few common selectors used by ngx-guided-tour
    const selectors = [
      'ngx-guided-tour button[aria-label="Next"]',
      'ngx-guided-tour button:contains("Next")',
      '.guided-tour .guided-tour__controls button.next',
      '.guided-tour button.next',
      '.guided-tour-spotlight button.next',
      'ngx-guided-tour button' // fallback - we'll filter by text
    ];

    const interval = setInterval(() => {
      const tourRoot = document.querySelector('ngx-guided-tour') || document.querySelector('.guided-tour');
      if (!tourRoot) return;

      // try to find a button that looks like the Next button
      const buttons = Array.from(tourRoot.querySelectorAll('button')) as HTMLButtonElement[];
      const nextBtn = buttons.find(b => {
        const txt = (b.textContent || '').trim().toLowerCase();
        return txt === 'next' || txt === '›' || b.getAttribute('aria-label')?.toLowerCase() === 'next' || b.className.toLowerCase().includes('next');
      });

      if (nextBtn) {
        const wrapped = (ev: Event) => {
          try {
            handler();
          } finally {
            try { nextBtn.removeEventListener('click', wrapped); } catch (e) { }
          }
        };
        nextBtn.addEventListener('click', wrapped, { once: true });
        // store remover for cleanup
        this.attachedListeners.push(() => { try { nextBtn.removeEventListener('click', wrapped); } catch (e) {} });
        clearInterval(interval);
      }
    }, 150);

    // store interval clearer in case tour is stopped before we find the button
    this.attachedListeners.push(() => clearInterval(interval));
  }

  private continueWithLoginForm() {
    this.log('🎯 [Tour Flow] 9. Setting up login form tour');
    
    const loginTour: GuidedTour = {
      tourId: 'hr-login-tour',
      useOrb: true,
      preventBackdropFromAdvancing: true,
      steps: [
        {
          title: 'Login',
          selector: this.selectors.loginUsername,
          content: 'Enter your username here',
          orientation: 'bottom'
        },
        {
          title: 'Password',
          selector: this.selectors.loginPassword,
          content: 'Enter your password',
          orientation: 'bottom'
        },
        {
          title: 'Submit',
          selector: this.selectors.loginSubmit,
          content: 'Click here to log in',
          orientation: 'bottom'
        }
      ]
    };

  this.log('🎯 [Tour Flow] 10. Starting login form tour steps');
    this.guidedTourService.startTour(loginTour);

    // Listen for the submit button step
    this.guidedTourService.guidedTourCurrentStepStream.subscribe(step => {
        if (step?.selector === this.selectors.loginSubmit) {
        this.log('7. On login submit button step');
        this.addListenerOnce(this.selectors.loginSubmit, 'click', () => {
          this.log('8. Login submit clicked');
        });
      }
    });
  }

  startTour() {
    console.log('🎯 [Tour Flow] 4. HrTourService.startTour() called');
    console.log('🎯 [Tour Flow] 5. Clearing previous listeners');
    this.clearListeners();

    const signInBtn = document.querySelector(this.selectors.signInBtn);
    console.log('🎯 [Tour Flow] 6. Sign-in button present:', !!signInBtn);
    
    const tour: GuidedTour = {
      tourId: 'hr-onboarding-tour',
      useOrb: false,  // Disable orb for now
      preventBackdropFromAdvancing: true,  // Force using buttons
      steps: [
        {
          title: 'Welcome to HR Management System!',
          content: 'This is a guided tour to help you navigate the HR Management System. Click "Next" to continue or "Skip" to exit the tour.',
          // NO selector = centered modal that should always show
        },
        {
          title: 'Sign in',
          selector: this.selectors.signInBtn,
          content: 'Click here to sign in to your account.',
          orientation: 'bottom',
        },
        {
          title: 'Leave Requests',
          selector: this.selectors.leaveModule,
          content: 'Navigate to Leave Requests module.',
          orientation: 'right',
        },
        {
          title: 'Create Leave Request',
          selector: this.selectors.newLeaveBtn,
          content: 'Click here to create a new leave request.',
          orientation: 'left',
        },
        {
          title: 'Start Date',
          selector: this.selectors.leaveStartDate,
          content: 'Select the start date of your leave.',
          orientation: 'top',
        },
        {
          title: 'End Date',
          selector: this.selectors.leaveEndDate,
          content: 'Select the end date of your leave.',
          orientation: 'top',
        },
        {
          title: 'Reason',
          selector: this.selectors.leaveReason,
          content: 'Enter the reason for your leave request.',
          orientation: 'top',
        },
        {
          title: 'Submit Request',
          selector: this.selectors.submitLeaveBtn,
          content: 'Click here to submit your leave request.',
          orientation: 'top',
        },
      ],
    };

    // Set up a mutation observer to watch for login form appearance.
    // Use explicit parameter names/types and call the existing continueWithLoginForm()
    const observer = new MutationObserver((mutations: MutationRecord[], observer: MutationObserver) => {
      const loginForm = document.querySelector(this.selectors.loginUsername);
      if (loginForm) {
        this.log('🎯 [Tour Flow] 9. Login form detected');
        try {
          observer.disconnect();
        } catch (e) {
          // ignore disconnect errors
        }
        // Resume the tour flow on the login form
        this.continueWithLoginForm();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    this.attachedListeners.push(() => observer.disconnect());

    // When leave module link clicked, advance
    this.addListenerOnce(this.selectors.leaveModule, 'click', () => {
      setTimeout(() => this.guidedTourService.nextStep(), 300);
    });

    // When new leave button clicked, advance
    this.addListenerOnce(this.selectors.newLeaveBtn, 'click', () => {
      setTimeout(() => this.guidedTourService.nextStep(), 300);
    });

    // When submit leave clicked, advance/finish
    this.addListenerOnce(this.selectors.submitLeaveBtn, 'click', () => {
      setTimeout(() => this.guidedTourService.nextStep(), 300);
    });

    // Debug: Check if ngx-guided-tour component exists in DOM
    const tourComponent = document.querySelector('ngx-guided-tour');
    console.log('🎯 [Debug] ngx-guided-tour element in DOM:', !!tourComponent);
    console.log('🎯 [Debug] ngx-guided-tour innerHTML:', tourComponent?.innerHTML);
    
    // Start the tour
    console.log('🎯 [Tour Flow] 8. Calling guidedTourService.startTour()');
    this.guidedTourService.startTour(tour);
    
    // Debug: Check tour state after starting
    setTimeout(() => {
      console.log('🎯 [Debug] Tour component after start:', tourComponent?.innerHTML);
      const tourStepElement = document.querySelector('.tour-step, .page-tour-step');
      console.log('🎯 [Debug] Tour step element found:', !!tourStepElement);
      const overlay = document.querySelector('.guided-tour-spotlight-overlay');
      console.log('🎯 [Debug] Overlay element found:', !!overlay);
    }, 100);
  }

  stopTour() {
    try {
      this.guidedTourService.skipTour();
    } finally {
      this.clearListeners();
    }
  }
}
