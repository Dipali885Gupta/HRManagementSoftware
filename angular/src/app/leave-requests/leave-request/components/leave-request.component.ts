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
export class LeaveRequestComponent extends AbstractLeaveRequestComponent {}
