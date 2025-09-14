import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
import { HRManagerViewService } from '../services/hrmanager.service';
import { HRManagerDetailViewService } from '../services/hrmanager-detail.service';
import { HRManagerDetailModalComponent } from './hrmanager-detail.component';
import { HRManagerService } from '../../../proxy/hrmanagers/hrmanager.service';
import { HRManagerDto } from '../../../proxy/hrmanagers/models';
import { LeaveRequestService } from '../../../proxy/leave-requests';
import { LeaveRequestWithNavigationPropertiesDto } from '../../../proxy/leave-requests/models';
import { LeaveStatus } from '../../../proxy/leave-status.enum';
import {
  AbstractHRManagerComponent,
  ChildTabDependencies,
  ChildComponentDependencies,
} from './hrmanager.abstract.component';

@Component({
  selector: 'app-hrmanager',
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

    HRManagerDetailModalComponent,
    ...ChildComponentDependencies,
  ],
  providers: [
    ListService,
    HRManagerViewService,
    HRManagerDetailViewService,
    { provide: NgbDateAdapter, useClass: DateAdapter },
    { provide: NgbTimeAdapter, useClass: TimeAdapter },
  ],
  templateUrl: './hrmanager.component.html',
  styleUrls: ['./hrmanager.component.scss'],
  styles: `
    ::ng-deep.datatable-row-detail {
      background: transparent !important;
    }
  `,
})
export class HRManagerComponent extends AbstractHRManagerComponent implements OnInit {
// API data properties
hrManager: HRManagerDto | null = null;
isLoading = false;
error: string | null = null;

// Property to hold HR number
hrNumber: string = 'N/A';

// Leave requests data
leaveRequests: LeaveRequestWithNavigationPropertiesDto[] = [];
isLoadingRequests = false;
requestsError: string | null = null;

  constructor(private hrManagerService: HRManagerService, private leaveRequestService: LeaveRequestService) {
    super();
  }

  ngOnInit(): void {
    console.log('HRManagerComponent initialized');
    this.loadHRManagerData();
    this.loadLeaveRequests();
  }

  loadHRManagerData(): void {
    this.isLoading = true;
    this.error = null;

    console.log('Fetching HR Manager data from API...');

    this.hrManagerService.getNewHRNumber().subscribe({
      next: (data: HRManagerDto) => {
        console.log('HR Manager data received:', data);
        this.hrManager = data;
        // Update hrNumber from API data
        this.hrNumber = data.hrNumber || data.id || 'N/A';
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching HR Manager data:', err);
        this.error = 'Failed to load HR Manager data. Please try again.';
        this.isLoading = false;
      }
    });
  }

  loadLeaveRequests(): void {
    this.isLoadingRequests = true;
    this.requestsError = null;

    console.log('Fetching leave requests from API...');

    // Get all leave requests (you can add filtering later if needed)
    this.leaveRequestService.getList({
      maxResultCount: 1000, // Get all requests, adjust as needed
      skipCount: 0
    }).subscribe({
      next: (response) => {
        console.log('Leave requests received:', response);
        this.leaveRequests = response.items || [];
        this.isLoadingRequests = false;
      },
      error: (err) => {
        console.error('Error fetching leave requests:', err);
        this.requestsError = 'Failed to load leave requests. Please try again.';
        this.isLoadingRequests = false;
      }
    });
  }

  getStatusClass(status: number): string {
    switch(status) {
      case LeaveStatus.Approved:
        return 'status-approved';
      case LeaveStatus.Rejected:
        return 'status-rejected';
      case LeaveStatus.Pending:
        return 'status-pending';
      case LeaveStatus.Cancelled:
        return 'status-cancelled';
      default:
        return '';
    }
  }

  approveRequest(request: LeaveRequestWithNavigationPropertiesDto): void {
    if (!request.leaveRequest?.id) {
      console.error('Invalid request ID');
      return;
    }

    console.log('Approving leave request:', request.leaveRequest.id);

    // Update the leave request status to Approved
    this.leaveRequestService.update(request.leaveRequest.id, {
      leaveType: request.leaveRequest.leaveType,
      leaveStatus: LeaveStatus.Approved,
      startDate: request.leaveRequest.startDate,
      endDate: request.leaveRequest.endDate,
      reason: request.leaveRequest.reason || '', // Required field
      requestDate: request.leaveRequest.requestDate,
      employeeId: request.leaveRequest.employeeId,
      concurrencyStamp: request.leaveRequest.concurrencyStamp
    }).subscribe({
      next: (updatedRequest) => {
        console.log('Leave request approved successfully:', updatedRequest);
        // Refresh the list to show updated status
        this.loadLeaveRequests();
        // You can add a success notification here
        alert('Leave request approved successfully!');
      },
      error: (err) => {
        console.error('Error approving leave request:', err);
        alert('Failed to approve leave request. Please try again.');
      }
    });
  }

  rejectRequest(request: LeaveRequestWithNavigationPropertiesDto): void {
    if (!request.leaveRequest?.id) {
      console.error('Invalid request ID');
      return;
    }

    console.log('Rejecting leave request:', request.leaveRequest.id);

    // Update the leave request status to Rejected
    this.leaveRequestService.update(request.leaveRequest.id, {
      leaveType: request.leaveRequest.leaveType,
      leaveStatus: LeaveStatus.Rejected,
      startDate: request.leaveRequest.startDate,
      endDate: request.leaveRequest.endDate,
      reason: request.leaveRequest.reason || '', // Required field
      requestDate: request.leaveRequest.requestDate,
      employeeId: request.leaveRequest.employeeId,
      concurrencyStamp: request.leaveRequest.concurrencyStamp
    }).subscribe({
      next: (updatedRequest) => {
        console.log('Leave request rejected successfully:', updatedRequest);
        // Refresh the list to show updated status
        this.loadLeaveRequests();
        // You can add a success notification here
        alert('Leave request rejected successfully!');
      },
      error: (err) => {
        console.error('Error rejecting leave request:', err);
        alert('Failed to reject leave request. Please try again.');
      }
    });
  }
}
