import { Component, inject, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@abp/ng.core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.html',
  styleUrl: './landingpage.scss',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None
})
export class Landingpage implements OnInit, AfterViewInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    // Check if user is already authenticated
    if (this.authService.isAuthenticated) {
      // If authenticated, redirect to home
      this.router.navigate(['/home']);
    }
  }

  ngAfterViewInit(): void {
    // Initialize animations and interactions
    setTimeout(() => {
      this.initStaticAnimations();
      this.initCounters();
    }, 100);
  }

  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  signIn() {
    // Navigate to ABP's login page
    this.authService.navigateToLogin();
  }

  register() {
    // Navigate to register page
    this.router.navigate(['/account/register']);
  }

  goToLogin() {
    this.authService.navigateToLogin();
  }

  goToRegister() {
    this.router.navigate(['/account/register']);
  }

  goToScheduleDemo() {
    // Navigate to schedule demo page (if exists)
    this.router.navigate(['/schedule-demo']);
  }

  private initStaticAnimations() {
    // Show all elements immediately without scroll triggers
    const items = Array.from(document.querySelectorAll('[data-animate]')) as HTMLElement[];

    // Make all elements visible immediately
    items.forEach((item, index) => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
      item.classList.add('in');
    });
  }

  private initCounters() {
    const metrics = Array.from(document.querySelectorAll('.metric[data-count]')) as HTMLElement[];
    const animate = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.count || '0');
      const isFloat = !Number.isInteger(target);
      let start = 0; const dur = 1600; const startTs = performance.now();
      const step = (ts: number) => {
        const p = Math.min(1, (ts - startTs) / dur);
        const val = start + (target - start) * p;
        el.textContent = isFloat ? val.toFixed(1) : Math.round(val).toString();
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { animate(e.target as HTMLElement); io.unobserve(e.target); } });
    }, { threshold: 0.6 });
    metrics.forEach(m => io.observe(m));
  }
}
