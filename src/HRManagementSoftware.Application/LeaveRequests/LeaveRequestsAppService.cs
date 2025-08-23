using HRManagementSoftware.Shared;
using HRManagementSoftware.Employees;
using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using HRManagementSoftware.Permissions;
using HRManagementSoftware.LeaveRequests;
using MiniExcelLibs;
using Volo.Abp.Content;
using Volo.Abp.Authorization;
using Volo.Abp.Caching;
using Microsoft.Extensions.Caching.Distributed;
using HRManagementSoftware.Shared;

namespace HRManagementSoftware.LeaveRequests
{
    [RemoteService(IsEnabled = false)]
    [Authorize(HRManagementSoftwarePermissions.LeaveRequests.Default)]
    public abstract class LeaveRequestsAppServiceBase : HRManagementSoftwareAppService
    {
        protected IDistributedCache<LeaveRequestDownloadTokenCacheItem, string> _downloadTokenCache;
        protected ILeaveRequestRepository _leaveRequestRepository;
        protected LeaveRequestManager _leaveRequestManager;

        protected IRepository<HRManagementSoftware.Employees.Employee, Guid> _employeeRepository;

        public LeaveRequestsAppServiceBase(ILeaveRequestRepository leaveRequestRepository, LeaveRequestManager leaveRequestManager, IDistributedCache<LeaveRequestDownloadTokenCacheItem, string> downloadTokenCache, IRepository<HRManagementSoftware.Employees.Employee, Guid> employeeRepository)
        {
            _downloadTokenCache = downloadTokenCache;
            _leaveRequestRepository = leaveRequestRepository;
            _leaveRequestManager = leaveRequestManager; _employeeRepository = employeeRepository;

        }

        public virtual async Task<PagedResultDto<LeaveRequestWithNavigationPropertiesDto>> GetListAsync(GetLeaveRequestsInput input)
        {
            var totalCount = await _leaveRequestRepository.GetCountAsync(input.FilterText, input.LeaveType, input.LeaveStatus, input.StartDateMin, input.StartDateMax, input.EndDateMin, input.EndDateMax, input.Reason, input.RequestDateMin, input.RequestDateMax, input.EmployeeId);
            var items = await _leaveRequestRepository.GetListWithNavigationPropertiesAsync(input.FilterText, input.LeaveType, input.LeaveStatus, input.StartDateMin, input.StartDateMax, input.EndDateMin, input.EndDateMax, input.Reason, input.RequestDateMin, input.RequestDateMax, input.EmployeeId, input.Sorting, input.MaxResultCount, input.SkipCount);

            return new PagedResultDto<LeaveRequestWithNavigationPropertiesDto>
            {
                TotalCount = totalCount,
                Items = ObjectMapper.Map<List<LeaveRequestWithNavigationProperties>, List<LeaveRequestWithNavigationPropertiesDto>>(items)
            };
        }

        public virtual async Task<LeaveRequestWithNavigationPropertiesDto> GetWithNavigationPropertiesAsync(Guid id)
        {
            return ObjectMapper.Map<LeaveRequestWithNavigationProperties, LeaveRequestWithNavigationPropertiesDto>
                (await _leaveRequestRepository.GetWithNavigationPropertiesAsync(id));
        }

        public virtual async Task<LeaveRequestDto> GetAsync(Guid id)
        {
            return ObjectMapper.Map<LeaveRequest, LeaveRequestDto>(await _leaveRequestRepository.GetAsync(id));
        }

        public virtual async Task<PagedResultDto<LookupDto<Guid>>> GetEmployeeLookupAsync(LookupRequestDto input)
        {
            var query = (await _employeeRepository.GetQueryableAsync())
                .WhereIf(!string.IsNullOrWhiteSpace(input.Filter),
                    x => x.EmployeeNumber != null &&
                         x.EmployeeNumber.Contains(input.Filter));

            var lookupData = await query.PageBy(input.SkipCount, input.MaxResultCount).ToDynamicListAsync<HRManagementSoftware.Employees.Employee>();
            var totalCount = query.Count();
            return new PagedResultDto<LookupDto<Guid>>
            {
                TotalCount = totalCount,
                Items = ObjectMapper.Map<List<HRManagementSoftware.Employees.Employee>, List<LookupDto<Guid>>>(lookupData)
            };
        }

        [Authorize(HRManagementSoftwarePermissions.LeaveRequests.Delete)]
        public virtual async Task DeleteAsync(Guid id)
        {
            await _leaveRequestRepository.DeleteAsync(id);
        }

        [Authorize(HRManagementSoftwarePermissions.LeaveRequests.Create)]
        public virtual async Task<LeaveRequestDto> CreateAsync(LeaveRequestCreateDto input)
        {

            var leaveRequest = await _leaveRequestManager.CreateAsync(
            input.EmployeeId, input.LeaveType, input.LeaveStatus, input.StartDate, input.EndDate, input.Reason, input.RequestDate
            );

            return ObjectMapper.Map<LeaveRequest, LeaveRequestDto>(leaveRequest);
        }

        [Authorize(HRManagementSoftwarePermissions.LeaveRequests.Edit)]
        public virtual async Task<LeaveRequestDto> UpdateAsync(Guid id, LeaveRequestUpdateDto input)
        {

            var leaveRequest = await _leaveRequestManager.UpdateAsync(
            id,
            input.EmployeeId, input.LeaveType, input.LeaveStatus, input.StartDate, input.EndDate, input.Reason, input.RequestDate, input.ConcurrencyStamp
            );

            return ObjectMapper.Map<LeaveRequest, LeaveRequestDto>(leaveRequest);
        }

        [AllowAnonymous]
        public virtual async Task<IRemoteStreamContent> GetListAsExcelFileAsync(LeaveRequestExcelDownloadDto input)
        {
            var downloadToken = await _downloadTokenCache.GetAsync(input.DownloadToken);
            if (downloadToken == null || input.DownloadToken != downloadToken.Token)
            {
                throw new AbpAuthorizationException("Invalid download token: " + input.DownloadToken);
            }

            var leaveRequests = await _leaveRequestRepository.GetListWithNavigationPropertiesAsync(input.FilterText, input.LeaveType, input.LeaveStatus, input.StartDateMin, input.StartDateMax, input.EndDateMin, input.EndDateMax, input.Reason, input.RequestDateMin, input.RequestDateMax, input.EmployeeId);
            var items = leaveRequests.Select(item => new
            {
                LeaveType = item.LeaveRequest.LeaveType,
                LeaveStatus = item.LeaveRequest.LeaveStatus,
                StartDate = item.LeaveRequest.StartDate,
                EndDate = item.LeaveRequest.EndDate,
                Reason = item.LeaveRequest.Reason,
                RequestDate = item.LeaveRequest.RequestDate,

                Employee = item.Employee?.EmployeeNumber,

            });

            var memoryStream = new MemoryStream();
            await memoryStream.SaveAsAsync(items);
            memoryStream.Seek(0, SeekOrigin.Begin);

            return new RemoteStreamContent(memoryStream, "LeaveRequests.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        }

        [Authorize(HRManagementSoftwarePermissions.LeaveRequests.Delete)]
        public virtual async Task DeleteByIdsAsync(List<Guid> leaverequestIds)
        {
            await _leaveRequestRepository.DeleteManyAsync(leaverequestIds);
        }

        [Authorize(HRManagementSoftwarePermissions.LeaveRequests.Delete)]
        public virtual async Task DeleteAllAsync(GetLeaveRequestsInput input)
        {
            await _leaveRequestRepository.DeleteAllAsync(input.FilterText, input.LeaveType, input.LeaveStatus, input.StartDateMin, input.StartDateMax, input.EndDateMin, input.EndDateMax, input.Reason, input.RequestDateMin, input.RequestDateMax, input.EmployeeId);
        }
        public virtual async Task<HRManagementSoftware.Shared.DownloadTokenResultDto> GetDownloadTokenAsync()
        {
            var token = Guid.NewGuid().ToString("N");

            await _downloadTokenCache.SetAsync(
                token,
                new LeaveRequestDownloadTokenCacheItem { Token = token },
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(30)
                });

            return new HRManagementSoftware.Shared.DownloadTokenResultDto
            {
                Token = token
            };
        }
    }
}