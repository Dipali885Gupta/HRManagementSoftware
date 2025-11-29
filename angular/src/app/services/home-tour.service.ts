import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GuidedTour, GuidedTourService, Orientation } from 'ngx-guided-tour';

@Injectable({ providedIn: 'root' })
export class HomeTourService {
  private guidedTourService = inject(GuidedTourService);
  private router = inject(Router);

  /**
   * Start the home page guided tour
   * Highlights the Leave Requests menu item and then guides through the form
   */
  startHomeTour(): void {
    console.log('🎯 [HomeTour] Starting home page tour');

    const homeTour: GuidedTour = {
      tourId: 'home-tour',
      useOrb: false,
      steps: [
        {
          title: 'Welcome to HR Management',
          content: 'Let\'s take a quick tour of how to submit a leave request. Click Next to continue.',
          orientation: Orientation.Center
        },
        {
          title: 'Leave Requests Menu',
          selector: 'a.lpx-menu-item-link[href="/leave-requests"]',
          content: 'First, click on the Leave Requests menu item in the sidebar to navigate to the leave management page. Click Next to continue.',
          orientation: Orientation.Right,
          useHighlightPadding: true,
          closeAction: () => {
            console.log('🎯 [HomeTour] Navigating to leave requests page');
            this.router.navigate(['/leave-requests']).then(() => {
              // Wait for page to load before continuing tour
              setTimeout(() => {
                this.startLeaveRequestPageTour();
              }, 1000);
            });
          }
        }
      ],
      skipCallback: () => {
        console.log('🎯 [HomeTour] Tour skipped by user');
      }
    };

    // Start the tour
    this.guidedTourService.startTour(homeTour);
    console.log('🎯 [HomeTour] Tour started with', homeTour.steps?.length, 'steps');
  }

  /**
   * Continue the tour on the Leave Requests page
   * This tour guides through the leave request form fields and auto-fills sample data
   */
  private startLeaveRequestPageTour(): void {
    console.log('🎯 [HomeTour] Starting Leave Requests page tour');

    const leaveRequestTour: GuidedTour = {
      tourId: 'leave-request-form-tour',
      useOrb: false,
      steps: [
        {
          title: 'Leave Request Form',
          selector: '.card-header h5.card-title',
          content: 'This is the quick leave request form where you can submit your leave applications. Click Next to see how to fill it.',
          orientation: Orientation.Bottom
        },
        {
          title: 'Select Leave Type',
          selector: 'select[name="leaveType"]',
          content: 'First, select the type of leave you want to request. We\'ll select "Annual Leave" as an example.',
          orientation: Orientation.Bottom,
          useHighlightPadding: true,
          closeAction: () => {
            this.fillLeaveType();
          }
        },
        {
          title: 'Choose Start Date',
          selector: '#leave-start-date',
          content: 'Select the date when your leave will begin. We\'ve filled in a sample start date for you.',
          orientation: Orientation.Bottom,
          useHighlightPadding: true,
          closeAction: () => {
            this.fillStartDate();
          }
        },
        {
          title: 'Choose End Date',
          selector: '#leave-end-date',
          content: 'Select the date when your leave will end. We\'ve set an end date 3 days after the start date.',
          orientation: Orientation.Bottom,
          useHighlightPadding: true,
          closeAction: () => {
            this.fillEndDate();
          }
        },
        {
          title: 'Provide Reason',
          selector: '#leave-reason',
          content: 'Enter a detailed reason for your leave request. We\'ve added a sample reason to show you how it works.',
          orientation: Orientation.Top,
          useHighlightPadding: true,
          closeAction: () => {
            this.fillReason();
          }
        },
        {
          title: 'Review Your Request',
          selector: 'button[type="submit"]',
          content: 'Great! All fields are now filled with sample data. In a real scenario, you would click Submit to send your request. This completes the tour!',
          orientation: Orientation.Top,
          useHighlightPadding: true
        }
      ],
      completeCallback: () => {
        console.log('🎯 [HomeTour] Leave Request form tour completed');
        // Clear sample data after tour completion
        setTimeout(() => {
          this.clearSampleData();
        }, 500);
      },
      skipCallback: () => {
        console.log('🎯 [HomeTour] Leave Request form tour skipped by user');
        // Clear any partially filled sample data
        this.clearSampleData();
      }
    };

    this.guidedTourService.startTour(leaveRequestTour);
    console.log('🎯 [HomeTour] Leave Request page tour started with', leaveRequestTour.steps?.length, 'steps');
  }

  /**
   * Fill the leave type dropdown with sample value (Annual Leave)
   */
  private fillLeaveType(): void {
    setTimeout(() => {
      const leaveTypeSelect = document.querySelector('select[name="leaveType"]') as HTMLSelectElement;
      if (leaveTypeSelect) {
        // Set to Annual Leave (value = 2)
        leaveTypeSelect.value = '2';
        // Trigger change event for Angular to detect
        const event = new Event('change', { bubbles: true });
        leaveTypeSelect.dispatchEvent(event);
        // Also trigger input event
        const inputEvent = new Event('input', { bubbles: true });
        leaveTypeSelect.dispatchEvent(inputEvent);
        console.log('✅ [HomeTour] Leave type filled: Annual Leave');
      }
    }, 300);
  }

  /**
   * Fill the start date with a sample date (7 days from today)
   */
  private fillStartDate(): void {
    setTimeout(() => {
      const startDateInput = document.querySelector('#leave-start-date') as HTMLInputElement;
      if (startDateInput) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + 7); // 7 days from today
        const formattedDate = startDate.toISOString().split('T')[0];
        startDateInput.value = formattedDate;
        // Trigger events for Angular
        const changeEvent = new Event('change', { bubbles: true });
        startDateInput.dispatchEvent(changeEvent);
        const inputEvent = new Event('input', { bubbles: true });
        startDateInput.dispatchEvent(inputEvent);
        console.log('✅ [HomeTour] Start date filled:', formattedDate);
      }
    }, 300);
  }

  /**
   * Fill the end date with a sample date (10 days from today)
   */
  private fillEndDate(): void {
    setTimeout(() => {
      const endDateInput = document.querySelector('#leave-end-date') as HTMLInputElement;
      if (endDateInput) {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 10); // 10 days from today (3 days after start)
        const formattedDate = endDate.toISOString().split('T')[0];
        endDateInput.value = formattedDate;
        // Trigger events for Angular
        const changeEvent = new Event('change', { bubbles: true });
        endDateInput.dispatchEvent(changeEvent);
        const inputEvent = new Event('input', { bubbles: true });
        endDateInput.dispatchEvent(inputEvent);
        console.log('✅ [HomeTour] End date filled:', formattedDate);
      }
    }, 300);
  }

  /**
   * Fill the reason textarea with a sample reason
   */
  private fillReason(): void {
    setTimeout(() => {
      const reasonTextarea = document.querySelector('#leave-reason') as HTMLTextAreaElement;
      if (reasonTextarea) {
        const sampleReason = 'I would like to request annual leave for a family vacation. I have coordinated with my team to ensure all pending work is completed before my leave period.';
        reasonTextarea.value = sampleReason;
        // Trigger events for Angular
        const changeEvent = new Event('change', { bubbles: true });
        reasonTextarea.dispatchEvent(changeEvent);
        const inputEvent = new Event('input', { bubbles: true });
        reasonTextarea.dispatchEvent(inputEvent);
        console.log('✅ [HomeTour] Reason filled with sample text');
      }
    }, 300);
  }

  /**
   * Clear all sample data from the form
   */
  private clearSampleData(): void {
    console.log('🧹 [HomeTour] Clearing sample data from form');
    
    // Clear leave type
    const leaveTypeSelect = document.querySelector('select[name="leaveType"]') as HTMLSelectElement;
    if (leaveTypeSelect) {
      leaveTypeSelect.value = '';
      leaveTypeSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Clear start date
    const startDateInput = document.querySelector('#leave-start-date') as HTMLInputElement;
    if (startDateInput) {
      startDateInput.value = '';
      startDateInput.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Clear end date
    const endDateInput = document.querySelector('#leave-end-date') as HTMLInputElement;
    if (endDateInput) {
      endDateInput.value = '';
      endDateInput.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Clear reason
    const reasonTextarea = document.querySelector('#leave-reason') as HTMLTextAreaElement;
    if (reasonTextarea) {
      reasonTextarea.value = '';
      reasonTextarea.dispatchEvent(new Event('change', { bubbles: true }));
    }

    console.log('✅ [HomeTour] Sample data cleared');
  }
}
