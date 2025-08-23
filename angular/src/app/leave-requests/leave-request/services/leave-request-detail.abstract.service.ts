import { inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService, TrackByService } from '@abp/ng.core';

import { finalize, tap } from 'rxjs/operators';

import { leaveTypeOptions } from '../../../proxy/leave-type.enum';
import { leaveStatusOptions } from '../../../proxy/leave-status.enum';
import type { LeaveRequestWithNavigationPropertiesDto } from '../../../proxy/leave-requests/models';
import { LeaveRequestService } from '../../../proxy/leave-requests/leave-request.service';

export abstract class AbstractLeaveRequestDetailViewService {
  protected readonly fb = inject(FormBuilder);
  protected readonly track = inject(TrackByService);

  public readonly proxyService = inject(LeaveRequestService);
  public readonly list = inject(ListService);

  public readonly getEmployeeLookup = this.proxyService.getEmployeeLookup;

  leaveTypeOptions = leaveTypeOptions;
  leaveStatusOptions = leaveStatusOptions;

  isBusy = false;
  isVisible = false;
  selected = {} as any;
  form: FormGroup | undefined;

  protected createRequest() {
    const formValues = {
      ...this.form.value,
    };

    if (this.selected) {
      return this.proxyService.update(this.selected.leaveRequest.id, {
        ...formValues,
        concurrencyStamp: this.selected.leaveRequest.concurrencyStamp,
      });
    }

    return this.proxyService.create(formValues);
  }

  buildForm() {
    const { leaveType, leaveStatus, startDate, endDate, reason, requestDate, employeeId } =
      this.selected?.leaveRequest || {};

    this.form = this.fb.group({
      leaveType: [leaveType ?? null, [Validators.required]],
      leaveStatus: [leaveStatus ?? null, [Validators.required]],
      startDate: [startDate ?? null, [Validators.required]],
      endDate: [endDate ?? null, [Validators.required]],
      reason: [
        reason ?? null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(1000000)],
      ],
      requestDate: [requestDate ?? null, [Validators.required]],
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

  update(record: LeaveRequestWithNavigationPropertiesDto) {
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
