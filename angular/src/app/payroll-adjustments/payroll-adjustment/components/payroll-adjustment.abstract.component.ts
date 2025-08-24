import { Directive, OnInit, inject } from '@angular/core';

import { ListService, PermissionService, TrackByService } from '@abp/ng.core';

import { payrollRecordStatusOptions } from '../../../proxy/payroll-record-status.enum';
import type { PayrollAdjustmentWithNavigationPropertiesDto } from '../../../proxy/payroll-adjustments/models';
import { PayrollAdjustmentViewService } from '../services/payroll-adjustment.service';
import { PayrollAdjustmentDetailViewService } from '../services/payroll-adjustment-detail.service';

export const ChildTabDependencies = [];

export const ChildComponentDependencies = [];

@Directive()
export abstract class AbstractPayrollAdjustmentComponent implements OnInit {
  public readonly list = inject(ListService);
  public readonly track = inject(TrackByService);
  public readonly service = inject(PayrollAdjustmentViewService);
  public readonly serviceDetail = inject(PayrollAdjustmentDetailViewService);
  public readonly permissionService = inject(PermissionService);

  protected title = '::PayrollAdjustments';
  protected isActionButtonVisible: boolean | null = null;

  payrollRecordStatusOptions = payrollRecordStatusOptions;

  ngOnInit() {
    this.service.hookToQuery();
    this.checkActionButtonVisibility();
  }

  clearFilters() {
    this.service.clearFilters();
  }

  showForm() {
    this.serviceDetail.showForm();
  }

  create() {
    this.serviceDetail.selected = undefined;
    this.serviceDetail.showForm();
  }

  update(record: PayrollAdjustmentWithNavigationPropertiesDto) {
    this.serviceDetail.update(record);
  }

  delete(record: PayrollAdjustmentWithNavigationPropertiesDto) {
    this.service.delete(record);
  }

  exportToExcel() {
    this.service.exportToExcel();
  }

  checkActionButtonVisibility() {
    if (this.isActionButtonVisible !== null) {
      return;
    }

    const canEdit = this.permissionService.getGrantedPolicy(
      'HRManagementSoftware.PayrollAdjustments.Edit',
    );
    const canDelete = this.permissionService.getGrantedPolicy(
      'HRManagementSoftware.PayrollAdjustments.Delete',
    );
    this.isActionButtonVisible = canEdit || canDelete;
  }
}
