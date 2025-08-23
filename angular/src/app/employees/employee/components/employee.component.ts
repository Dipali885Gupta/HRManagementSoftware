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
import { EmployeeViewService } from '../services/employee.service';
import { EmployeeDetailViewService } from '../services/employee-detail.service';
import { EmployeeDetailModalComponent } from './employee-detail.component';
import {
  AbstractEmployeeComponent,
  ChildTabDependencies,
  ChildComponentDependencies,
} from './employee.abstract.component';

@Component({
  selector: 'app-employee',
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

    EmployeeDetailModalComponent,
    ...ChildComponentDependencies,
  ],
  providers: [
    ListService,
    EmployeeViewService,
    EmployeeDetailViewService,
    { provide: NgbDateAdapter, useClass: DateAdapter },
    { provide: NgbTimeAdapter, useClass: TimeAdapter },
  ],
  templateUrl: './employee.component.html',
  styles: `
    ::ng-deep.datatable-row-detail {
      background: transparent !important;
    }
  `,
})
export class EmployeeComponent extends AbstractEmployeeComponent {}
