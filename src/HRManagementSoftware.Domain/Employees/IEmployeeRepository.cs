using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace HRManagementSoftware.Employees
{
    public partial interface IEmployeeRepository : IRepository<Employee, Guid>
    {

        Task DeleteAllAsync(
            string? filterText = null,
            string? employeeNumber = null,
            string? jobTitle = null,
            DateTime? dateOfJoiningMin = null,
            DateTime? dateOfJoiningMax = null,
            decimal? paidLeaveBalanceMin = null,
            decimal? paidLeaveBalanceMax = null,
            decimal? sickLeaveBalanceMin = null,
            decimal? sickLeaveBalanceMax = null,
            decimal? unpaidLeaveBalanceMin = null,
            decimal? unpaidLeaveBalanceMax = null,
            decimal? baseSalaryMin = null,
            decimal? baseSalaryMax = null,
            Guid? identityUserId = null,
            CancellationToken cancellationToken = default);
        Task<EmployeeWithNavigationProperties> GetWithNavigationPropertiesAsync(
            Guid id,
            CancellationToken cancellationToken = default
        );

        Task<List<EmployeeWithNavigationProperties>> GetListWithNavigationPropertiesAsync(
            string? filterText = null,
            string? employeeNumber = null,
            string? jobTitle = null,
            DateTime? dateOfJoiningMin = null,
            DateTime? dateOfJoiningMax = null,
            decimal? paidLeaveBalanceMin = null,
            decimal? paidLeaveBalanceMax = null,
            decimal? sickLeaveBalanceMin = null,
            decimal? sickLeaveBalanceMax = null,
            decimal? unpaidLeaveBalanceMin = null,
            decimal? unpaidLeaveBalanceMax = null,
            decimal? baseSalaryMin = null,
            decimal? baseSalaryMax = null,
            Guid? identityUserId = null,
            string? sorting = null,
            int maxResultCount = int.MaxValue,
            int skipCount = 0,
            CancellationToken cancellationToken = default
        );

        Task<List<Employee>> GetListAsync(
                    string? filterText = null,
                    string? employeeNumber = null,
                    string? jobTitle = null,
                    DateTime? dateOfJoiningMin = null,
                    DateTime? dateOfJoiningMax = null,
                    decimal? paidLeaveBalanceMin = null,
                    decimal? paidLeaveBalanceMax = null,
                    decimal? sickLeaveBalanceMin = null,
                    decimal? sickLeaveBalanceMax = null,
                    decimal? unpaidLeaveBalanceMin = null,
                    decimal? unpaidLeaveBalanceMax = null,
                    decimal? baseSalaryMin = null,
                    decimal? baseSalaryMax = null,
                    string? sorting = null,
                    int maxResultCount = int.MaxValue,
                    int skipCount = 0,
                    CancellationToken cancellationToken = default
                );

        Task<long> GetCountAsync(
            string? filterText = null,
            string? employeeNumber = null,
            string? jobTitle = null,
            DateTime? dateOfJoiningMin = null,
            DateTime? dateOfJoiningMax = null,
            decimal? paidLeaveBalanceMin = null,
            decimal? paidLeaveBalanceMax = null,
            decimal? sickLeaveBalanceMin = null,
            decimal? sickLeaveBalanceMax = null,
            decimal? unpaidLeaveBalanceMin = null,
            decimal? unpaidLeaveBalanceMax = null,
            decimal? baseSalaryMin = null,
            decimal? baseSalaryMax = null,
            Guid? identityUserId = null,
            CancellationToken cancellationToken = default);
    }
}