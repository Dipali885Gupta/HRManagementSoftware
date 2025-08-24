using HRManagementSoftware;
using HRManagementSoftware.Employees;
using HRManagementSoftware.LeaveRequests;
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

namespace HRManagementSoftware.PayrollAdjustments
{
    public abstract class EfCorePayrollAdjustmentRepositoryBase : EfCoreRepository<HRManagementSoftwareDbContext, PayrollAdjustment, Guid>
    {
        public EfCorePayrollAdjustmentRepositoryBase(IDbContextProvider<HRManagementSoftwareDbContext> dbContextProvider)
            : base(dbContextProvider)
        {

        }

        public virtual async Task DeleteAllAsync(
            string? filterText = null,
                        int? monthMin = null,
            int? monthMax = null,
            int? yearMin = null,
            int? yearMax = null,
            PayrollRecordStatus? status = null,
            decimal? netpayMin = null,
            decimal? netpayMax = null,
            Guid? leaveRequestId = null,
            Guid? employeeId = null,
            CancellationToken cancellationToken = default)
        {
            var query = await GetQueryForNavigationPropertiesAsync();

            query = ApplyFilter(query, filterText, monthMin, monthMax, yearMin, yearMax, status, netpayMin, netpayMax, leaveRequestId, employeeId);

            var ids = query.Select(x => x.PayrollAdjustment.Id);
            await DeleteManyAsync(ids, cancellationToken: GetCancellationToken(cancellationToken));
        }

        public virtual async Task<PayrollAdjustmentWithNavigationProperties> GetWithNavigationPropertiesAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var dbContext = await GetDbContextAsync();

            return (await GetDbSetAsync()).Where(b => b.Id == id)
                .Select(payrollAdjustment => new PayrollAdjustmentWithNavigationProperties
                {
                    PayrollAdjustment = payrollAdjustment,
                    LeaveRequest = dbContext.Set<LeaveRequest>().FirstOrDefault(c => c.Id == payrollAdjustment.LeaveRequestId),
                    Employee = dbContext.Set<Employee>().FirstOrDefault(c => c.Id == payrollAdjustment.EmployeeId)
                }).FirstOrDefault();
        }

        public virtual async Task<List<PayrollAdjustmentWithNavigationProperties>> GetListWithNavigationPropertiesAsync(
            string? filterText = null,
            int? monthMin = null,
            int? monthMax = null,
            int? yearMin = null,
            int? yearMax = null,
            PayrollRecordStatus? status = null,
            decimal? netpayMin = null,
            decimal? netpayMax = null,
            Guid? leaveRequestId = null,
            Guid? employeeId = null,
            string? sorting = null,
            int maxResultCount = int.MaxValue,
            int skipCount = 0,
            CancellationToken cancellationToken = default)
        {
            var query = await GetQueryForNavigationPropertiesAsync();
            query = ApplyFilter(query, filterText, monthMin, monthMax, yearMin, yearMax, status, netpayMin, netpayMax, leaveRequestId, employeeId);
            query = query.OrderBy(string.IsNullOrWhiteSpace(sorting) ? PayrollAdjustmentConsts.GetDefaultSorting(true) : sorting);
            return await query.PageBy(skipCount, maxResultCount).ToListAsync(cancellationToken);
        }

        protected virtual async Task<IQueryable<PayrollAdjustmentWithNavigationProperties>> GetQueryForNavigationPropertiesAsync()
        {
            return from payrollAdjustment in (await GetDbSetAsync())
                   join leaveRequest in (await GetDbContextAsync()).Set<LeaveRequest>() on payrollAdjustment.LeaveRequestId equals leaveRequest.Id into leaveRequests
                   from leaveRequest in leaveRequests.DefaultIfEmpty()
                   join employee in (await GetDbContextAsync()).Set<Employee>() on payrollAdjustment.EmployeeId equals employee.Id into employees
                   from employee in employees.DefaultIfEmpty()
                   select new PayrollAdjustmentWithNavigationProperties
                   {
                       PayrollAdjustment = payrollAdjustment,
                       LeaveRequest = leaveRequest,
                       Employee = employee
                   };
        }

        protected virtual IQueryable<PayrollAdjustmentWithNavigationProperties> ApplyFilter(
            IQueryable<PayrollAdjustmentWithNavigationProperties> query,
            string? filterText,
            int? monthMin = null,
            int? monthMax = null,
            int? yearMin = null,
            int? yearMax = null,
            PayrollRecordStatus? status = null,
            decimal? netpayMin = null,
            decimal? netpayMax = null,
            Guid? leaveRequestId = null,
            Guid? employeeId = null)
        {
            return query
                .WhereIf(!string.IsNullOrWhiteSpace(filterText), e => true)
                    .WhereIf(monthMin.HasValue, e => e.PayrollAdjustment.Month >= monthMin!.Value)
                    .WhereIf(monthMax.HasValue, e => e.PayrollAdjustment.Month <= monthMax!.Value)
                    .WhereIf(yearMin.HasValue, e => e.PayrollAdjustment.Year >= yearMin!.Value)
                    .WhereIf(yearMax.HasValue, e => e.PayrollAdjustment.Year <= yearMax!.Value)
                    .WhereIf(status.HasValue, e => e.PayrollAdjustment.Status == status)
                    .WhereIf(netpayMin.HasValue, e => e.PayrollAdjustment.Netpay >= netpayMin!.Value)
                    .WhereIf(netpayMax.HasValue, e => e.PayrollAdjustment.Netpay <= netpayMax!.Value)
                    .WhereIf(leaveRequestId != null && leaveRequestId != Guid.Empty, e => e.LeaveRequest != null && e.LeaveRequest.Id == leaveRequestId)
                    .WhereIf(employeeId != null && employeeId != Guid.Empty, e => e.Employee != null && e.Employee.Id == employeeId);
        }

        public virtual async Task<List<PayrollAdjustment>> GetListAsync(
            string? filterText = null,
            int? monthMin = null,
            int? monthMax = null,
            int? yearMin = null,
            int? yearMax = null,
            PayrollRecordStatus? status = null,
            decimal? netpayMin = null,
            decimal? netpayMax = null,
            string? sorting = null,
            int maxResultCount = int.MaxValue,
            int skipCount = 0,
            CancellationToken cancellationToken = default)
        {
            var query = ApplyFilter((await GetQueryableAsync()), filterText, monthMin, monthMax, yearMin, yearMax, status, netpayMin, netpayMax);
            query = query.OrderBy(string.IsNullOrWhiteSpace(sorting) ? PayrollAdjustmentConsts.GetDefaultSorting(false) : sorting);
            return await query.PageBy(skipCount, maxResultCount).ToListAsync(cancellationToken);
        }

        public virtual async Task<long> GetCountAsync(
            string? filterText = null,
            int? monthMin = null,
            int? monthMax = null,
            int? yearMin = null,
            int? yearMax = null,
            PayrollRecordStatus? status = null,
            decimal? netpayMin = null,
            decimal? netpayMax = null,
            Guid? leaveRequestId = null,
            Guid? employeeId = null,
            CancellationToken cancellationToken = default)
        {
            var query = await GetQueryForNavigationPropertiesAsync();
            query = ApplyFilter(query, filterText, monthMin, monthMax, yearMin, yearMax, status, netpayMin, netpayMax, leaveRequestId, employeeId);
            return await query.LongCountAsync(GetCancellationToken(cancellationToken));
        }

        protected virtual IQueryable<PayrollAdjustment> ApplyFilter(
            IQueryable<PayrollAdjustment> query,
            string? filterText = null,
            int? monthMin = null,
            int? monthMax = null,
            int? yearMin = null,
            int? yearMax = null,
            PayrollRecordStatus? status = null,
            decimal? netpayMin = null,
            decimal? netpayMax = null)
        {
            return query
                    .WhereIf(!string.IsNullOrWhiteSpace(filterText), e => true)
                    .WhereIf(monthMin.HasValue, e => e.Month >= monthMin!.Value)
                    .WhereIf(monthMax.HasValue, e => e.Month <= monthMax!.Value)
                    .WhereIf(yearMin.HasValue, e => e.Year >= yearMin!.Value)
                    .WhereIf(yearMax.HasValue, e => e.Year <= yearMax!.Value)
                    .WhereIf(status.HasValue, e => e.Status == status)
                    .WhereIf(netpayMin.HasValue, e => e.Netpay >= netpayMin!.Value)
                    .WhereIf(netpayMax.HasValue, e => e.Netpay <= netpayMax!.Value);
        }
    }
}