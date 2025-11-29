import { Component } from '@angular/core';
import { GuidedTourModule } from 'ngx-guided-tour';

@Component({
  selector: 'app-guided-tour-wrapper',
  standalone: true,
  imports: [GuidedTourModule],
  template: '<ngx-guided-tour></ngx-guided-tour>'
})
export class GuidedTourWrapperComponent {}
