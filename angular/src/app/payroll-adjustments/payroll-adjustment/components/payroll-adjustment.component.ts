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
import { PayrollAdjustmentViewService } from '../services/payroll-adjustment.service';
import { PayrollAdjustmentDetailViewService } from '../services/payroll-adjustment-detail.service';
import { PayrollAdjustmentDetailModalComponent } from './payroll-adjustment-detail.component';
import {
  AbstractPayrollAdjustmentComponent,
  ChildTabDependencies,
  ChildComponentDependencies,
} from './payroll-adjustment.abstract.component';

@Component({
  selector: 'app-payroll-adjustment',
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

    PayrollAdjustmentDetailModalComponent,
    ...ChildComponentDependencies,
  ],
  providers: [
    ListService,
    PayrollAdjustmentViewService,
    PayrollAdjustmentDetailViewService,
    { provide: NgbDateAdapter, useClass: DateAdapter },
    { provide: NgbTimeAdapter, useClass: TimeAdapter },
  ],
  templateUrl: './payroll-adjustment.component.html',
  styleUrls: ['./payroll-adjustment.component.scss'],
  styles: `
    ::ng-deep.datatable-row-detail {
      background: transparent !important;
    }
  `,
})
export class PayrollAdjustmentComponent extends AbstractPayrollAdjustmentComponent {
  // Dummy data for payroll adjustments
  payrollAdjustments = [
    {
      year: 2024,
      month: 1,
      netpay: 5000,
      leavereqid: 'LR001'
    },
    {
      year: 2024,
      month: 2,
      netpay: 5200,
      leavereqid: 'LR002'
    },
    {
      year: 2024,
      month: 3,
      netpay: 4800,
      leavereqid: 'LR003'
    },
    {
      year: 2024,
      month: 4,
      netpay: 5500,
      leavereqid: 'LR004'
    },
    {
      year: 2024,
      month: 5,
      netpay: 5100,
      leavereqid: 'LR005'
    }
  ];
}
