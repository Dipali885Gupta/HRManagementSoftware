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
  }

  // Enhanced submit method with better error handling
  submitCustom(): void {
    if (this.isSubmitting) return;

    // Basic validation
    if (!this.customModel.leaveType || !this.customModel.startDate || !this.customModel.endDate) {
      // Show validation message or use Angular form validation
      return;
    }

    // Check if employee data is loaded
    if (!this.currentEmployee) {
      console.error('Employee data not loaded');
      return;
    }

    this.isSubmitting = true;

    const payload = {
      leaveType: this.customModel.leaveType,
      leaveStatus: LeaveStatus.Pending,
      startDate: this.customModel.startDate ?? undefined,
      endDate: this.customModel.endDate ?? undefined,
      reason: this.customModel.reason,
      employeeId: this.currentEmployee.id, // Use the actual employee ID from API
    } as any;

    console.log('Submitting leave request with payload:', payload);

    this.leaveRequestApi.create(payload).subscribe({
      next: (response) => {
        console.log('Leave request submitted successfully:', response);
        this.list.get();
        this.resetForm();
        // Show success message
      },
      error: (error) => {
        console.error('Error submitting leave request:', error);
        this.isSubmitting = false;
        // Show error message
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
