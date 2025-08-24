using HRManagementSoftware.Shared;
using HRManagementSoftware.Employees;
using HRManagementSoftware.LeaveRequests;
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
using HRManagementSoftware.PayrollAdjustments;
using MiniExcelLibs;
using Volo.Abp.Content;
using Volo.Abp.Authorization;
using Volo.Abp.Caching;
using Microsoft.Extensions.Caching.Distributed;
using HRManagementSoftware.Shared;

namespace HRManagementSoftware.PayrollAdjustments
{
    [RemoteService(IsEnabled = false)]
    [Authorize(HRManagementSoftwarePermissions.PayrollAdjustments.Default)]
    public abstract class PayrollAdjustmentsAppServiceBase : HRManagementSoftwareAppService
    {
        protected IDistributedCache<PayrollAdjustmentDownloadTokenCacheItem, string> _downloadTokenCache;
        protected IPayrollAdjustmentRepository _payrollAdjustmentRepository;
        protected PayrollAdjustmentManager _payrollAdjustmentManager;

        protected IRepository<HRManagementSoftware.LeaveRequests.LeaveRequest, Guid> _leaveRequestRepository;
        protected IRepository<HRManagementSoftware.Employees.Employee, Guid> _employeeRepository;

        public PayrollAdjustmentsAppServiceBase(IPayrollAdjustmentRepository payrollAdjustmentRepository, PayrollAdjustmentManager payrollAdjustmentManager, IDistributedCache<PayrollAdjustmentDownloadTokenCacheItem, string> downloadTokenCache, IRepository<HRManagementSoftware.LeaveRequests.LeaveRequest, Guid> leaveRequestRepository, IRepository<HRManagementSoftware.Employees.Employee, Guid> employeeRepository)
        {
            _downloadTokenCache = downloadTokenCache;
            _payrollAdjustmentRepository = payrollAdjustmentRepository;
            _payrollAdjustmentManager = payrollAdjustmentManager; _leaveRequestRepository = leaveRequestRepository;
            _employeeRepository = employeeRepository;

        }

        public virtual async Task<PagedResultDto<PayrollAdjustmentWithNavigationPropertiesDto>> GetListAsync(GetPayrollAdjustmentsInput input)
        {
            var totalCount = await _payrollAdjustmentRepository.GetCountAsync(input.FilterText, input.MonthMin, input.MonthMax, input.YearMin, input.YearMax, input.Status, input.NetpayMin, input.NetpayMax, input.LeaveRequestId, input.EmployeeId);
            var items = await _payrollAdjustmentRepository.GetListWithNavigationPropertiesAsync(input.FilterText, input.MonthMin, input.MonthMax, input.YearMin, input.YearMax, input.Status, input.NetpayMin, input.NetpayMax, input.LeaveRequestId, input.EmployeeId, input.Sorting, input.MaxResultCount, input.SkipCount);

            return new PagedResultDto<PayrollAdjustmentWithNavigationPropertiesDto>
            {
                TotalCount = totalCount,
                Items = ObjectMapper.Map<List<PayrollAdjustmentWithNavigationProperties>, List<PayrollAdjustmentWithNavigationPropertiesDto>>(items)
            };
        }

        public virtual async Task<PayrollAdjustmentWithNavigationPropertiesDto> GetWithNavigationPropertiesAsync(Guid id)
        {
            return ObjectMapper.Map<PayrollAdjustmentWithNavigationProperties, PayrollAdjustmentWithNavigationPropertiesDto>
                (await _payrollAdjustmentRepository.GetWithNavigationPropertiesAsync(id));
        }

        public virtual async Task<PayrollAdjustmentDto> GetAsync(Guid id)
        {
            return ObjectMapper.Map<PayrollAdjustment, PayrollAdjustmentDto>(await _payrollAdjustmentRepository.GetAsync(id));
        }

        public virtual async Task<PagedResultDto<LookupDto<Guid>>> GetLeaveRequestLookupAsync(LookupRequestDto input)
        {
            var query = (await _leaveRequestRepository.GetQueryableAsync())
                .WhereIf(!string.IsNullOrWhiteSpace(input.Filter),
                    x => x.Reason != null &&
                         x.Reason.Contains(input.Filter));

            var lookupData = await query.PageBy(input.SkipCount, input.MaxResultCount).ToDynamicListAsync<HRManagementSoftware.LeaveRequests.LeaveRequest>();
            var totalCount = query.Count();
            return new PagedResultDto<LookupDto<Guid>>
            {
                TotalCount = totalCount,
                Items = ObjectMapper.Map<List<HRManagementSoftware.LeaveRequests.LeaveRequest>, List<LookupDto<Guid>>>(lookupData)
            };
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

        [Authorize(HRManagementSoftwarePermissions.PayrollAdjustments.Delete)]
        public virtual async Task DeleteAsync(Guid id)
        {
            await _payrollAdjustmentRepository.DeleteAsync(id);
        }

        [Authorize(HRManagementSoftwarePermissions.PayrollAdjustments.Create)]
        public virtual async Task<PayrollAdjustmentDto> CreateAsync(PayrollAdjustmentCreateDto input)
        {

            var payrollAdjustment = await _payrollAdjustmentManager.CreateAsync(
            input.LeaveRequestId, input.EmployeeId, input.Month, input.Year, input.Status, input.Netpay
            );

            return ObjectMapper.Map<PayrollAdjustment, PayrollAdjustmentDto>(payrollAdjustment);
        }

        [Authorize(HRManagementSoftwarePermissions.PayrollAdjustments.Edit)]
        public virtual async Task<PayrollAdjustmentDto> UpdateAsync(Guid id, PayrollAdjustmentUpdateDto input)
        {

            var payrollAdjustment = await _payrollAdjustmentManager.UpdateAsync(
            id,
            input.LeaveRequestId, input.EmployeeId, input.Month, input.Year, input.Status, input.Netpay, input.ConcurrencyStamp
            );

            return ObjectMapper.Map<PayrollAdjustment, PayrollAdjustmentDto>(payrollAdjustment);
        }

        [AllowAnonymous]
        public virtual async Task<IRemoteStreamContent> GetListAsExcelFileAsync(PayrollAdjustmentExcelDownloadDto input)
        {
            var downloadToken = await _downloadTokenCache.GetAsync(input.DownloadToken);
            if (downloadToken == null || input.DownloadToken != downloadToken.Token)
            {
                throw new AbpAuthorizationException("Invalid download token: " + input.DownloadToken);
            }

            var payrollAdjustments = await _payrollAdjustmentRepository.GetListWithNavigationPropertiesAsync(input.FilterText, input.MonthMin, input.MonthMax, input.YearMin, input.YearMax, input.Status, input.NetpayMin, input.NetpayMax, input.LeaveRequestId, input.EmployeeId);
            var items = payrollAdjustments.Select(item => new
            {
                Month = item.PayrollAdjustment.Month,
                Year = item.PayrollAdjustment.Year,
                Status = item.PayrollAdjustment.Status,
                Netpay = item.PayrollAdjustment.Netpay,

                LeaveRequest = item.LeaveRequest?.Reason,
                Employee = item.Employee?.EmployeeNumber,

            });

            var memoryStream = new MemoryStream();
            await memoryStream.SaveAsAsync(items);
            memoryStream.Seek(0, SeekOrigin.Begin);

            return new RemoteStreamContent(memoryStream, "PayrollAdjustments.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        }

        [Authorize(HRManagementSoftwarePermissions.PayrollAdjustments.Delete)]
        public virtual async Task DeleteByIdsAsync(List<Guid> payrolladjustmentIds)
        {
            await _payrollAdjustmentRepository.DeleteManyAsync(payrolladjustmentIds);
        }

        [Authorize(HRManagementSoftwarePermissions.PayrollAdjustments.Delete)]
        public virtual async Task DeleteAllAsync(GetPayrollAdjustmentsInput input)
        {
            await _payrollAdjustmentRepository.DeleteAllAsync(input.FilterText, input.MonthMin, input.MonthMax, input.YearMin, input.YearMax, input.Status, input.NetpayMin, input.NetpayMax, input.LeaveRequestId, input.EmployeeId);
        }
        public virtual async Task<HRManagementSoftware.Shared.DownloadTokenResultDto> GetDownloadTokenAsync()
        {
            var token = Guid.NewGuid().ToString("N");

            await _downloadTokenCache.SetAsync(
                token,
                new PayrollAdjustmentDownloadTokenCacheItem { Token = token },
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