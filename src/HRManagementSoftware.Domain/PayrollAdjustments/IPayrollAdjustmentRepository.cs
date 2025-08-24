using HRManagementSoftware;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace HRManagementSoftware.PayrollAdjustments
{
    public partial interface IPayrollAdjustmentRepository : IRepository<PayrollAdjustment, Guid>
    {

        Task DeleteAllAsync(
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
            CancellationToken cancellationToken = default);
        Task<PayrollAdjustmentWithNavigationProperties> GetWithNavigationPropertiesAsync(
            Guid id,
            CancellationToken cancellationToken = default
        );

        Task<List<PayrollAdjustmentWithNavigationProperties>> GetListWithNavigationPropertiesAsync(
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
            CancellationToken cancellationToken = default
        );

        Task<List<PayrollAdjustment>> GetListAsync(
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
                    CancellationToken cancellationToken = default
                );

        Task<long> GetCountAsync(
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
            CancellationToken cancellationToken = default);
    }
}