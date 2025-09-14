import { Component, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbDateAdapter,
  NgbTimeAdapter,
  NgbCollapseModule,
  NgbDatepickerModule,
  NgbTimepickerModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ListService, LocalizationPipe, PermissionDirective } from '@abp/ng.core';
import {
  DateAdapter,
  TimeAdapter,
  NgxDatatableDefaultDirective,
  NgxDatatableListDirective,
} from '@abp/ng.theme.shared';
import { PageComponent, PageToolbarContainerComponent } from '@abp/ng.components/page';
import {
  AdvancedEntityFiltersComponent,
  AdvancedEntityFiltersFormComponent,
  LookupSelectComponent,
} from '@volo/abp.commercial.ng.ui';
import { LeaveRequestService } from '../../../proxy/leave-requests';
import { LeaveStatus } from '../../../proxy/leave-status.enum';
import { LeaveRequestViewService } from '../services/leave-request.service';
import { LeaveRequestDetailViewService } from '../services/leave-request-detail.service';
import { LeaveRequestDetailModalComponent } from './leave-request-detail.component';
import { EmployeeService } from '../../../proxy/employees/employee.service';
import { EmployeeDto } from '../../../proxy/employees/models';
import {
  AbstractLeaveRequestComponent,
  ChildTabDependencies,
  ChildComponentDependencies,
} from './leave-request.abstract.component';

@Component({
  selector: 'app-leave-request',
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    ...ChildTabDependencies,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxDatatableDefaultDirective,
    NgxDatatableListDirective,
    PermissionDirective,
    LocalizationPipe,
    PageComponent,
    PageToolbarContainerComponent,
    AdvancedEntityFiltersComponent,
    AdvancedEntityFiltersFormComponent,
    LookupSelectComponent,

    LeaveRequestDetailModalComponent,
    ...ChildComponentDependencies,
  ],
  providers: [
    ListService,
    LeaveRequestViewService,
    LeaveRequestDetailViewService,
    { provide: NgbDateAdapter, useClass: DateAdapter },
    { provide: NgbTimeAdapter, useClass: TimeAdapter },
  ],
  templateUrl: './leave-request.component.html',
  styles: `
    ::ng-deep.datatable-row-detail {
      background: transparent !important;
    }
  `,
})
export class LeaveRequestComponent extends AbstractLeaveRequestComponent implements OnInit {
  private readonly leaveRequestApi = inject(LeaveRequestService);
  private readonly employeeService = inject(EmployeeService);

  // Employee data properties
  currentEmployee: EmployeeDto | null = null;
  isLoadingEmployee = false;
  employeeError: string | null = null;

  // Form validation
  validationError: string | null = null;

  customModel: any = {
    employeeNumber: '',
    leaveType: null,
    startDate: null,
    endDate: null,
    reason: '',
  };

  isSubmitting = false;

  ngOnInit(): void {
    console.log('LeaveRequestComponent initialized');
    this.loadEmployeeData();
  }

  loadEmployeeData(): void {
    this.isLoadingEmployee = true;
    this.employeeError = null;

    console.log('Fetching current employee data from API...');

    this.employeeService.getNewEmployeeNumber().subscribe({
      next: (data: EmployeeDto) => {
        console.log('Employee data received:', data);
        this.currentEmployee = data;
        this.customModel.employeeNumber = data.employeeNumber || data.id || 'N/A';
        this.isLoadingEmployee = false;
      },
      error: (err) => {
        console.error('Error fetching employee data:', err);
        this.employeeError = 'Failed to load employee information. Please try again.';
        this.isLoadingEmployee = false;
      }
    });
  }

  // Reset form method
  resetForm(): void {
    const currentEmployeeNumber = this.customModel.employeeNumber;
    this.customModel = {
      employeeNumber: currentEmployeeNumber, // Preserve employee number
      leaveType: null,
      startDate: null,
      endDate: null,
      reason: '',
    };
    this.validationError = null; // Clear validation errors
  }

  /**
   * Submits a leave request to the backend API for database storage.
   * Validates form data, formats dates, and uses the current employee's ID.
   * Creates a new record in the LeaveRequests table with status 'Pending'.
   */
  // Enhanced submit method with better error handling
  submitCustom(): void {
    if (this.isSubmitting) return;

    // Comprehensive validation
    if (!this.validateForm()) {
      return;
    }

    // Check if employee data is loaded
    if (!this.currentEmployee || !this.currentEmployee.id) {
      console.error('Employee data not loaded or invalid');
      this.showError('Employee information is not available. Please refresh the page.');
      return;
    }

    this.isSubmitting = true;

    // Format dates properly for backend
    const startDate = this.formatDateForBackend(this.customModel.startDate);
    const endDate = this.formatDateForBackend(this.customModel.endDate);
    const requestDate = this.formatDateForBackend(new Date().toISOString().split('T')[0]);

    const payload = {
      leaveType: this.customModel.leaveType,
      leaveStatus: LeaveStatus.Pending,
      startDate: startDate,
      endDate: endDate,
      reason: this.customModel.reason?.trim(),
      requestDate: requestDate,
      employeeId: this.currentEmployee.id
    };

    console.log('Submitting leave request with payload:', payload);

    this.leaveRequestApi.create(payload).subscribe({
      next: (response) => {
        console.log('Leave request submitted successfully:', response);
        this.showSuccess('Leave request submitted successfully!');
        this.list.get(); // Refresh the list
        this.resetForm();
      },
      error: (error) => {
        console.error('Error submitting leave request:', error);
        this.showError('Failed to submit leave request. Please try again.');
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }

  // Form validation method
  private validateForm(): boolean {
    this.validationError = null; // Clear previous errors

    if (this.customModel.leaveType === null || this.customModel.leaveType === undefined) {
      this.validationError = 'Please select a leave type.';
      return false;
    }

    if (!this.customModel.startDate) {
      this.validationError = 'Please select a start date.';
      return false;
    }

    if (!this.customModel.endDate) {
      this.validationError = 'Please select an end date.';
      return false;
    }

    if (!this.customModel.reason || this.customModel.reason.trim().length === 0) {
      this.validationError = 'Please provide a reason for your leave request.';
      return false;
    }

    // Validate date range
    const startDate = new Date(this.customModel.startDate);
    const endDate = new Date(this.customModel.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      this.validationError = 'Start date cannot be in the past.';
      return false;
    }

    if (endDate < startDate) {
      this.validationError = 'End date cannot be before start date.';
      return false;
    }

    return true;
  }

  // Format date for backend (ensure it's in YYYY-MM-DD format)
  private formatDateForBackend(dateString: string): string {
    if (!dateString) return undefined;

    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
  }

  // Show success message (you can integrate with ABP's notification service)
  private showSuccess(message: string): void {
    console.log('SUCCESS:', message);
    // TODO: Integrate with ABP notification service
    // this.notify.success(message);
    alert(message); // Temporary solution
  }

  // Show error message
  private showError(message: string): void {
    console.error('ERROR:', message);
    // TODO: Integrate with ABP notification service
    // this.notify.error(message);
    alert(message); // Temporary solution
  }

  // Get minimum date for date inputs (today)
  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
}
