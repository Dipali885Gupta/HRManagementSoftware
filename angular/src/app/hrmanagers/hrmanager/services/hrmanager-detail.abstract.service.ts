import { inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService, TrackByService } from '@abp/ng.core';

import { finalize, tap } from 'rxjs/operators';

import type { HRManagerWithNavigationPropertiesDto } from '../../../proxy/hrmanagers/models';
import { HRManagerService } from '../../../proxy/hrmanagers/hrmanager.service';

export abstract class AbstractHRManagerDetailViewService {
  protected readonly fb = inject(FormBuilder);
  protected readonly track = inject(TrackByService);

  public readonly proxyService = inject(HRManagerService);
  public readonly list = inject(ListService);

  public readonly getIdentityUserLookup = this.proxyService.getIdentityUserLookup;

  isBusy = false;
  isVisible = false;
  selected = {} as any;
  form: FormGroup | undefined;

  protected createRequest() {
    const formValues = {
      ...this.form.value,
    };

    if (this.selected) {
      return this.proxyService.update(this.selected.hrManager.id, {
        ...formValues,
        concurrencyStamp: this.selected.hrManager.concurrencyStamp,
      });
    }

    return this.proxyService.create(formValues);
  }

  buildForm() {
    const { hrNumber, department, identityUserId } = this.selected?.hrManager || {};

    this.form = this.fb.group({
      hrNumber: [
        hrNumber ?? null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(1000000)],
      ],
      department: [
        department ?? null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(1000000)],
      ],
      identityUserId: [identityUserId ?? null, []],
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

  update(record: HRManagerWithNavigationPropertiesDto) {
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
