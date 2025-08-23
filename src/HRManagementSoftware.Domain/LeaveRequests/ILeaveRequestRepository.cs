using HRManagementSoftware;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace HRManagementSoftware.LeaveRequests
{
    public partial interface ILeaveRequestRepository : IRepository<LeaveRequest, Guid>
    {

        Task DeleteAllAsync(
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
            CancellationToken cancellationToken = default);
        Task<LeaveRequestWithNavigationProperties> GetWithNavigationPropertiesAsync(
            Guid id,
            CancellationToken cancellationToken = default
        );

        Task<List<LeaveRequestWithNavigationProperties>> GetListWithNavigationPropertiesAsync(
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
            CancellationToken cancellationToken = default
        );

        Task<List<LeaveRequest>> GetListAsync(
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
                    CancellationToken cancellationToken = default
                );

        Task<long> GetCountAsync(
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
            CancellationToken cancellationToken = default);
    }
}