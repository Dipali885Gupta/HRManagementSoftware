import type { GetHRManagersInput, HRManagerCreateDto, HRManagerDto, HRManagerExcelDownloadDto, HRManagerUpdateDto, HRManagerWithNavigationPropertiesDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DownloadTokenResultDto, LookupDto, LookupRequestDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class HRManagerService {
  apiName = 'Default';
  

  create = (input: HRManagerCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HRManagerDto>({
      method: 'POST',
      url: '/api/app/h-rManagers',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/h-rManagers/${id}`,
    },
    { apiName: this.apiName,...config });
  

  deleteAll = (input: GetHRManagersInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/h-rManagers/all',
      params: { filterText: input.filterText, hrNumber: input.hrNumber, department: input.department, identityUserId: input.identityUserId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  deleteByIds = (hrmanagerIds: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/h-rManagers',
      params: { hrmanagerIds },
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HRManagerDto>({
      method: 'GET',
      url: `/api/app/h-rManagers/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/h-rManagers/download-token',
    },
    { apiName: this.apiName,...config });
  

  getIdentityUserLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>({
      method: 'GET',
      url: '/api/app/h-rManagers/identity-user-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetHRManagersInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<HRManagerWithNavigationPropertiesDto>>({
      method: 'GET',
      url: '/api/app/h-rManagers',
      params: { filterText: input.filterText, hrNumber: input.hrNumber, department: input.department, identityUserId: input.identityUserId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: HRManagerExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/h-rManagers/as-excel-file',
      params: { downloadToken: input.downloadToken, filterText: input.filterText, hrNumber: input.hrNumber, department: input.department, identityUserId: input.identityUserId },
    },
    { apiName: this.apiName,...config });
  

  getNewHRNumber = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, HRManagerDto>({
      method: 'GET',
      url: '/api/app/h-rManagers/by-userid',
    },
    { apiName: this.apiName,...config });
  

  getWithNavigationProperties = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HRManagerWithNavigationPropertiesDto>({
      method: 'GET',
      url: `/api/app/h-rManagers/with-navigation-properties/${id}`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: HRManagerUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HRManagerDto>({
      method: 'PUT',
      url: `/api/app/h-rManagers/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
