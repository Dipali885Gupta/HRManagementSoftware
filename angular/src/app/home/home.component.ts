import { Component, inject } from '@angular/core';
import { AuthService, LocalizationPipe } from '@abp/ng.core';
import { HomeTourService } from '../services/home-tour.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [LocalizationPipe]
})
export class HomeComponent {
  private authService = inject(AuthService);
  private homeTourService = inject(HomeTourService);

  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated
  }

  login() {
    this.authService.navigateToLogin();
  }

  /**
   * Start the guided tour for home page
   * Called when user clicks the "Continue Tour" button
   */
  onStartTourClick(): void {
    console.log('🎯 [Home] Continue Tour button clicked');
    this.homeTourService.startHomeTour();
  }
}
