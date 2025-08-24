import { inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService, TrackByService } from '@abp/ng.core';

import { finalize, tap } from 'rxjs/operators';

import { payrollRecordStatusOptions } from '../../../proxy/payroll-record-status.enum';
import type { PayrollAdjustmentWithNavigationPropertiesDto } from '../../../proxy/payroll-adjustments/models';
import { PayrollAdjustmentService } from '../../../proxy/payroll-adjustments/payroll-adjustment.service';

export abstract class AbstractPayrollAdjustmentDetailViewService {
  protected readonly fb = inject(FormBuilder);
  protected readonly track = inject(TrackByService);

  public readonly proxyService = inject(PayrollAdjustmentService);
  public readonly list = inject(ListService);

  public readonly getLeaveRequestLookup = this.proxyService.getLeaveRequestLookup;

  public readonly getEmployeeLookup = this.proxyService.getEmployeeLookup;

  payrollRecordStatusOptions = payrollRecordStatusOptions;

  isBusy = false;
  isVisible = false;
  selected = {} as any;
  form: FormGroup | undefined;

  protected createRequest() {
    const formValues = {
      ...this.form.value,
    };

    if (this.selected) {
      return this.proxyService.update(this.selected.payrollAdjustment.id, {
        ...formValues,
        concurrencyStamp: this.selected.payrollAdjustment.concurrencyStamp,
      });
    }

    return this.proxyService.create(formValues);
  }

  buildForm() {
    const { month, year, status, netpay, leaveRequestId, employeeId } =
      this.selected?.payrollAdjustment || {};

    this.form = this.fb.group({
      month: [month ?? '0', [Validators.required, Validators.min(0), Validators.max(100)]],
      year: [year ?? '1', [Validators.required, Validators.min(1), Validators.max(100000)]],
      status: [status ?? null, [Validators.required]],
      netpay: [netpay ?? '0', [Validators.required, Validators.min(0), Validators.max(1000000)]],
      leaveRequestId: [leaveRequestId ?? null, []],
      employeeId: [employeeId ?? null, []],
    });
  }

  showForm() {
    this.buildForm();
    this.isVisible = true;
  }

  create() {
    this.selected = undefined;
    this.showForm();
  }

  update(record: PayrollAdjustmentWithNavigationPropertiesDto) {
    this.selected = record;
    this.showForm();
  }

  hideForm() {
    this.isVisible = false;
  }

  submitForm() {
    if (this.form.invalid) return;

    this.isBusy = true;

    const request = this.createRequest().pipe(
      finalize(() => (this.isBusy = false)),
      tap(() => this.hideForm()),
    );

    request.subscribe(this.list.get);
  }

  changeVisible($event: boolean) {
    this.isVisible = $event;
  }
}
