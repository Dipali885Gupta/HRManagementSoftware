import type {
  GetPayrollAdjustmentsInput,
  PayrollAdjustmentCreateDto,
  PayrollAdjustmentDto,
  PayrollAdjustmentExcelDownloadDto,
  PayrollAdjustmentUpdateDto,
  PayrollAdjustmentWithNavigationPropertiesDto,
} from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type {
  AppFileDescriptorDto,
  DownloadTokenResultDto,
  GetFileInput,
  LookupDto,
  LookupRequestDto,
} from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class PayrollAdjustmentService {
  apiName = 'Default';

  create = (input: PayrollAdjustmentCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PayrollAdjustmentDto>(
      {
        method: 'POST',
        url: '/api/app/payroll-adjustments',
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: `/api/app/payroll-adjustments/${id}`,
      },
      { apiName: this.apiName, ...config },
    );

  deleteAll = (input: GetPayrollAdjustmentsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: '/api/app/payroll-adjustments/all',
        params: {
          filterText: input.filterText,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
          monthMin: input.monthMin,
          monthMax: input.monthMax,
          yearMin: input.yearMin,
          yearMax: input.yearMax,
          status: input.status,
          netpayMin: input.netpayMin,
          netpayMax: input.netpayMax,
          leaveRequestId: input.leaveRequestId,
          employeeId: input.employeeId,
        },
      },
      { apiName: this.apiName, ...config },
    );

  deleteByIds = (payrollAdjustmentIds: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: '/api/app/payroll-adjustments',
        params: { payrollAdjustmentIds },
      },
      { apiName: this.apiName, ...config },
    );

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PayrollAdjustmentDto>(
      {
        method: 'GET',
        url: `/api/app/payroll-adjustments/${id}`,
      },
      { apiName: this.apiName, ...config },
    );

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>(
      {
        method: 'GET',
        url: '/api/app/payroll-adjustments/download-token',
      },
      { apiName: this.apiName, ...config },
    );

  getEmployeeLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>(
      {
        method: 'GET',
        url: '/api/app/payroll-adjustments/employee-lookup',
        params: {
          filter: input.filter,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
        },
      },
      { apiName: this.apiName, ...config },
    );

  getFile = (input: GetFileInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>(
      {
        method: 'GET',
        responseType: 'blob',
        url: '/api/app/payroll-adjustments/file',
        params: { downloadToken: input.downloadToken, fileId: input.fileId },
      },
      { apiName: this.apiName, ...config },
    );

  getLeaveRequestLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>(
      {
        method: 'GET',
        url: '/api/app/payroll-adjustments/leave-request-lookup',
        params: {
          filter: input.filter,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
        },
      },
      { apiName: this.apiName, ...config },
    );

  getList = (input: GetPayrollAdjustmentsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<PayrollAdjustmentWithNavigationPropertiesDto>>(
      {
        method: 'GET',
        url: '/api/app/payroll-adjustments',
        params: {
          filterText: input.filterText,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
          monthMin: input.monthMin,
          monthMax: input.monthMax,
          yearMin: input.yearMin,
          yearMax: input.yearMax,
          status: input.status,
          netpayMin: input.netpayMin,
          netpayMax: input.netpayMax,
          leaveRequestId: input.leaveRequestId,
          employeeId: input.employeeId,
        },
      },
      { apiName: this.apiName, ...config },
    );

  getListAsExcelFile = (input: PayrollAdjustmentExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>(
      {
        method: 'GET',
        responseType: 'blob',
        url: '/api/app/payroll-adjustments/as-excel-file',
        params: {
          downloadToken: input.downloadToken,
          filterText: input.filterText,
          monthMin: input.monthMin,
          monthMax: input.monthMax,
          yearMin: input.yearMin,
          yearMax: input.yearMax,
          status: input.status,
          netpayMin: input.netpayMin,
          netpayMax: input.netpayMax,
          leaveRequestId: input.leaveRequestId,
          employeeId: input.employeeId,
        },
      },
      { apiName: this.apiName, ...config },
    );

  getWithNavigationProperties = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PayrollAdjustmentWithNavigationPropertiesDto>(
      {
        method: 'GET',
        url: `/api/app/payroll-adjustments/with-navigation-properties/${id}`,
      },
      { apiName: this.apiName, ...config },
    );

  update = (id: string, input: PayrollAdjustmentUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PayrollAdjustmentDto>(
      {
        method: 'PUT',
        url: `/api/app/payroll-adjustments/${id}`,
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  uploadFile = (input: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AppFileDescriptorDto>(
      {
        method: 'POST',
        url: '/api/app/payroll-adjustments/upload-file',
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  constructor(private restService: RestService) {}
}
