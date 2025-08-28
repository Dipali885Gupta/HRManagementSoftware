import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
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
export class LeaveRequestComponent extends AbstractLeaveRequestComponent {
  private readonly leaveRequestApi = inject(LeaveRequestService);

  customModel: any = {
    employeeNumber: '',
    leaveType: null,
    startDate: null,
    endDate: null,
    reason: '',
  };

  isSubmitting = false;

  // Reset form method
  resetForm(): void {
    this.customModel = {
      employeeNumber: '',
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

    this.isSubmitting = true;

    const payload = {
      leaveType: this.customModel.leaveType,
      leaveStatus: LeaveStatus.Pending,
      startDate: this.customModel.startDate ?? undefined,
      endDate: this.customModel.endDate ?? undefined,
      reason: this.customModel.reason,
      employeeId: undefined, // Map this to actual employee ID
    } as any;

    this.leaveRequestApi.create(payload).subscribe({
      next: (response) => {
        this.list.get();
        this.resetForm();
        // Show success message
      },
      error: (error) => {
        this.isSubmitting = false;
        // Show error message
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
