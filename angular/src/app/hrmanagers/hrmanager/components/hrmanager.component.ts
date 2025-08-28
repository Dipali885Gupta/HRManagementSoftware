import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export class HRManagerComponent extends AbstractHRManagerComponent {
  // Hardcoded HR Number as requested
  hrNumber = 'HR001';

  // Dummy data for leave requests that need approval
  leaveRequests = [
    {
      empno: 'EMP001',
      reason: 'Medical leave',
      startdate: '2024-01-15',
      enddate: '2024-01-20',
      leavereqid: 'LR001',
      reqdate: '2024-01-10',
      status: 'Pending'
    },
    {
      empno: 'EMP002',
      reason: 'Vacation',
      startdate: '2024-02-01',
      enddate: '2024-02-05',
      leavereqid: 'LR002',
      reqdate: '2024-01-28',
      status: 'Pending'
    },
    {
      empno: 'EMP003',
      reason: 'Personal matters',
      startdate: '2024-03-10',
      enddate: '2024-03-12',
      leavereqid: 'LR003',
      reqdate: '2024-03-05',
      status: 'Pending'
    }
  ];

  getStatusClass(status: string): string {
    switch(status.toLowerCase()) {
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      case 'pending': return 'status-pending';
      default: return '';
    }
  }

  approveRequest(request: any) {
    request.status = 'Approved';
    // Here you would typically call your backend API to update the status
    console.log('Approved request:', request.leavereqid);
  }

  rejectRequest(request: any) {
    request.status = 'Rejected';
    // Here you would typically call your backend API to update the status
    console.log('Rejected request:', request.leavereqid);
  }
}
