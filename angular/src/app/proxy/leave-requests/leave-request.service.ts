import type { GetLeaveRequestsInput, LeaveRequestCreateDto, LeaveRequestDto, LeaveRequestExcelDownloadDto, LeaveRequestUpdateDto, LeaveRequestWithNavigationPropertiesDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DownloadTokenResultDto, LookupDto, LookupRequestDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class LeaveRequestService {
  apiName = 'Default';
  

  create = (input: LeaveRequestCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, LeaveRequestDto>({
      method: 'POST',
      url: '/api/app/leave-requests',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/leave-requests/${id}`,
    },
    { apiName: this.apiName,...config });
  

  deleteAll = (input: GetLeaveRequestsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/leave-requests/all',
      params: { filterText: input.filterText, leaveType: input.leaveType, leaveStatus: input.leaveStatus, startDateMin: input.startDateMin, startDateMax: input.startDateMax, endDateMin: input.endDateMin, endDateMax: input.endDateMax, reason: input.reason, requestDateMin: input.requestDateMin, requestDateMax: input.requestDateMax, employeeId: input.employeeId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  deleteByIds = (leaverequestIds: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/leave-requests',
      params: { leaverequestIds },
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, LeaveRequestDto>({
      method: 'GET',
      url: `/api/app/leave-requests/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/leave-requests/download-token',
    },
    { apiName: this.apiName,...config });
  

  getEmployeeLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>({
      method: 'GET',
      url: '/api/app/leave-requests/employee-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetLeaveRequestsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LeaveRequestWithNavigationPropertiesDto>>({
      method: 'GET',
      url: '/api/app/leave-requests',
      params: { filterText: input.filterText, leaveType: input.leaveType, leaveStatus: input.leaveStatus, startDateMin: input.startDateMin, startDateMax: input.startDateMax, endDateMin: input.endDateMin, endDateMax: input.endDateMax, reason: input.reason, requestDateMin: input.requestDateMin, requestDateMax: input.requestDateMax, employeeId: input.employeeId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: LeaveRequestExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/leave-requests/as-excel-file',
      params: { downloadToken: input.downloadToken, filterText: input.filterText, leaveType: input.leaveType, leaveStatus: input.leaveStatus, startDateMin: input.startDateMin, startDateMax: input.startDateMax, endDateMin: input.endDateMin, endDateMax: input.endDateMax, reason: input.reason, requestDateMin: input.requestDateMin, requestDateMax: input.requestDateMax, employeeId: input.employeeId },
    },
    { apiName: this.apiName,...config });
  

  getWithNavigationProperties = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, LeaveRequestWithNavigationPropertiesDto>({
      method: 'GET',
      url: `/api/app/leave-requests/with-navigation-properties/${id}`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: LeaveRequestUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, LeaveRequestDto>({
      method: 'PUT',
      url: `/api/app/leave-requests/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
