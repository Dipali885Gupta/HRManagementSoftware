using HRManagementSoftware;
using HRManagementSoftware.Employees;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using HRManagementSoftware.EntityFrameworkCore;

namespace HRManagementSoftware.LeaveRequests
{
    public abstract class EfCoreLeaveRequestRepositoryBase : EfCoreRepository<HRManagementSoftwareDbContext, LeaveRequest, Guid>
    {
        public EfCoreLeaveRequestRepositoryBase(IDbContextProvider<HRManagementSoftwareDbContext> dbContextProvider)
            : base(dbContextProvider)
        {

        }

        public virtual async Task DeleteAllAsync(
            string? filterText = null,
                        LeaveType? leaveType = null,
            LeaveStatus? leaveStatus = null,
            DateTime? startDateMin = null,
            DateTime? startDateMax = null,
            DateTime? endDateMin = null,
            DateTime? endDateMax = null,
            string? reason = null,
            DateTime? requestDateMin = null,
            DateTime? requestDateMax = null,
            Guid? employeeId = null,
            CancellationToken cancellationToken = default)
        {
            var query = await GetQueryForNavigationPropertiesAsync();

            query = ApplyFilter(query, filterText, leaveType, leaveStatus, startDateMin, startDateMax, endDateMin, endDateMax, reason, requestDateMin, requestDateMax, employeeId);

            var ids = query.Select(x => x.LeaveRequest.Id);
            await DeleteManyAsync(ids, cancellationToken: GetCancellationToken(cancellationToken));
        }

        public virtual async Task<LeaveRequestWithNavigationProperties> GetWithNavigationPropertiesAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var dbContext = await GetDbContextAsync();

            return (await GetDbSetAsync()).Where(b => b.Id == id)
                .Select(leaveRequest => new LeaveRequestWithNavigationProperties
                {
                    LeaveRequest = leaveRequest,
                    Employee = dbContext.Set<Employee>().FirstOrDefault(c => c.Id == leaveRequest.EmployeeId)
                }).FirstOrDefault();
        }

        public virtual async Task<List<LeaveRequestWithNavigationProperties>> GetListWithNavigationPropertiesAsync(
            string? filterText = null,
            LeaveType? leaveType = null,
            LeaveStatus? leaveStatus = null,
            DateTime? startDateMin = null,
            DateTime? startDateMax = null,
            DateTime? endDateMin = null,
            DateTime? endDateMax = null,
            string? reason = null,
            DateTime? requestDateMin = null,
            DateTime? requestDateMax = null,
            Guid? employeeId = null,
            string? sorting = null,
            int maxResultCount = int.MaxValue,
            int skipCount = 0,
            CancellationToken cancellationToken = default)
        {
            var query = await GetQueryForNavigationPropertiesAsync();
            query = ApplyFilter(query, filterText, leaveType, leaveStatus, startDateMin, startDateMax, endDateMin, endDateMax, reason, requestDateMin, requestDateMax, employeeId);
            query = query.OrderBy(string.IsNullOrWhiteSpace(sorting) ? LeaveRequestConsts.GetDefaultSorting(true) : sorting);
            return await query.PageBy(skipCount, maxResultCount).ToListAsync(cancellationToken);
        }

        protected virtual async Task<IQueryable<LeaveRequestWithNavigationProperties>> GetQueryForNavigationPropertiesAsync()
        {
            return from leaveRequest in (await GetDbSetAsync())
                   join employee in (await GetDbContextAsync()).Set<Employee>() on leaveRequest.EmployeeId equals employee.Id into employees
                   from employee in employees.DefaultIfEmpty()
                   select new LeaveRequestWithNavigationProperties
                   {
                       LeaveRequest = leaveRequest,
                       Employee = employee
                   };
        }

        protected virtual IQueryable<LeaveRequestWithNavigationProperties> ApplyFilter(
            IQueryable<LeaveRequestWithNavigationProperties> query,
            string? filterText,
            LeaveType? leaveType = null,
            LeaveStatus? leaveStatus = null,
            DateTime? startDateMin = null,
            DateTime? startDateMax = null,
            DateTime? endDateMin = null,
            DateTime? endDateMax = null,
            string? reason = null,
            DateTime? requestDateMin = null,
            DateTime? requestDateMax = null,
            Guid? employeeId = null)
        {
            return query
                .WhereIf(!string.IsNullOrWhiteSpace(filterText), e => e.LeaveRequest.Reason!.Contains(filterText!))
                    .WhereIf(leaveType.HasValue, e => e.LeaveRequest.LeaveType == leaveType)
                    .WhereIf(leaveStatus.HasValue, e => e.LeaveRequest.LeaveStatus == leaveStatus)
                    .WhereIf(startDateMin.HasValue, e => e.LeaveRequest.StartDate >= startDateMin!.Value)
                    .WhereIf(startDateMax.HasValue, e => e.LeaveRequest.StartDate <= startDateMax!.Value)
                    .WhereIf(endDateMin.HasValue, e => e.LeaveRequest.EndDate >= endDateMin!.Value)
                    .WhereIf(endDateMax.HasValue, e => e.LeaveRequest.EndDate <= endDateMax!.Value)
                    .WhereIf(!string.IsNullOrWhiteSpace(reason), e => e.LeaveRequest.Reason.Contains(reason))
                    .WhereIf(requestDateMin.HasValue, e => e.LeaveRequest.RequestDate >= requestDateMin!.Value)
                    .WhereIf(requestDateMax.HasValue, e => e.LeaveRequest.RequestDate <= requestDateMax!.Value)
                    .WhereIf(employeeId != null && employeeId != Guid.Empty, e => e.Employee != null && e.Employee.Id == employeeId);
        }

        public virtual async Task<List<LeaveRequest>> GetListAsync(
            string? filterText = null,
            LeaveType? leaveType = null,
            LeaveStatus? leaveStatus = null,
            DateTime? startDateMin = null,
            DateTime? startDateMax = null,
            DateTime? endDateMin = null,
            DateTime? endDateMax = null,
            string? reason = null,
            DateTime? requestDateMin = null,
            DateTime? requestDateMax = null,
            string? sorting = null,
            int maxResultCount = int.MaxValue,
            int skipCount = 0,
            CancellationToken cancellationToken = default)
        {
            var query = ApplyFilter((await GetQueryableAsync()), filterText, leaveType, leaveStatus, startDateMin, startDateMax, endDateMin, endDateMax, reason, requestDateMin, requestDateMax);
            query = query.OrderBy(string.IsNullOrWhiteSpace(sorting) ? LeaveRequestConsts.GetDefaultSorting(false) : sorting);
            return await query.PageBy(skipCount, maxResultCount).ToListAsync(cancellationToken);
        }

        public virtual async Task<long> GetCountAsync(
            string? filterText = null,
            LeaveType? leaveType = null,
            LeaveStatus? leaveStatus = null,
            DateTime? startDateMin = null,
            DateTime? startDateMax = null,
            DateTime? endDateMin = null,
            DateTime? endDateMax = null,
            string? reason = null,
            DateTime? requestDateMin = null,
            DateTime? requestDateMax = null,
            Guid? employeeId = null,
            CancellationToken cancellationToken = default)
        {
            var query = await GetQueryForNavigationPropertiesAsync();
            query = ApplyFilter(query, filterText, leaveType, leaveStatus, startDateMin, startDateMax, endDateMin, endDateMax, reason, requestDateMin, requestDateMax, employeeId);
            return await query.LongCountAsync(GetCancellationToken(cancellationToken));
        }

        protected virtual IQueryable<LeaveRequest> ApplyFilter(
            IQueryable<LeaveRequest> query,
            string? filterText = null,
            LeaveType? leaveType = null,
            LeaveStatus? leaveStatus = null,
            DateTime? startDateMin = null,
            DateTime? startDateMax = null,
            DateTime? endDateMin = null,
            DateTime? endDateMax = null,
            string? reason = null,
            DateTime? requestDateMin = null,
            DateTime? requestDateMax = null)
        {
            return query
                    .WhereIf(!string.IsNullOrWhiteSpace(filterText), e => e.Reason!.Contains(filterText!))
                    .WhereIf(leaveType.HasValue, e => e.LeaveType == leaveType)
                    .WhereIf(leaveStatus.HasValue, e => e.LeaveStatus == leaveStatus)
                    .WhereIf(startDateMin.HasValue, e => e.StartDate >= startDateMin!.Value)
                    .WhereIf(startDateMax.HasValue, e => e.StartDate <= startDateMax!.Value)
                    .WhereIf(endDateMin.HasValue, e => e.EndDate >= endDateMin!.Value)
                    .WhereIf(endDateMax.HasValue, e => e.EndDate <= endDateMax!.Value)
                    .WhereIf(!string.IsNullOrWhiteSpace(reason), e => e.Reason.Contains(reason))
                    .WhereIf(requestDateMin.HasValue, e => e.RequestDate >= requestDateMin!.Value)
                    .WhereIf(requestDateMax.HasValue, e => e.RequestDate <= requestDateMax!.Value);
        }
    }
}