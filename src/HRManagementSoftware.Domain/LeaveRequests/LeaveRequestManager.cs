using HRManagementSoftware;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Volo.Abp;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.Data;

namespace HRManagementSoftware.LeaveRequests
{
    public abstract class LeaveRequestManagerBase : DomainService
    {
        protected ILeaveRequestRepository _leaveRequestRepository;

        public LeaveRequestManagerBase(ILeaveRequestRepository leaveRequestRepository)
        {
            _leaveRequestRepository = leaveRequestRepository;
        }

        public virtual async Task<LeaveRequest> CreateAsync(
        Guid? employeeId, LeaveType leaveType, LeaveStatus leaveStatus, DateTime startDate, DateTime endDate, string reason, DateTime requestDate)
        {
            Check.NotNull(leaveType, nameof(leaveType));
            Check.NotNull(leaveStatus, nameof(leaveStatus));
            Check.NotNull(startDate, nameof(startDate));
            Check.NotNull(endDate, nameof(endDate));
            Check.NotNullOrWhiteSpace(reason, nameof(reason));
            Check.Length(reason, nameof(reason), LeaveRequestConsts.ReasonMaxLength, LeaveRequestConsts.ReasonMinLength);
            Check.NotNull(requestDate, nameof(requestDate));

            var leaveRequest = new LeaveRequest(
             GuidGenerator.Create(),
             employeeId, leaveType, leaveStatus, startDate, endDate, reason, requestDate
             );

            return await _leaveRequestRepository.InsertAsync(leaveRequest);
        }

        public virtual async Task<LeaveRequest> UpdateAsync(
            Guid id,
            Guid? employeeId, LeaveType leaveType, LeaveStatus leaveStatus, DateTime startDate, DateTime endDate, string reason, DateTime requestDate, [CanBeNull] string? concurrencyStamp = null
        )
        {
            Check.NotNull(leaveType, nameof(leaveType));
            Check.NotNull(leaveStatus, nameof(leaveStatus));
            Check.NotNull(startDate, nameof(startDate));
            Check.NotNull(endDate, nameof(endDate));
            Check.NotNullOrWhiteSpace(reason, nameof(reason));
            Check.Length(reason, nameof(reason), LeaveRequestConsts.ReasonMaxLength, LeaveRequestConsts.ReasonMinLength);
            Check.NotNull(requestDate, nameof(requestDate));

            var leaveRequest = await _leaveRequestRepository.GetAsync(id);

            leaveRequest.EmployeeId = employeeId;
            leaveRequest.LeaveType = leaveType;
            leaveRequest.LeaveStatus = leaveStatus;
            leaveRequest.StartDate = startDate;
            leaveRequest.EndDate = endDate;
            leaveRequest.Reason = reason;
            leaveRequest.RequestDate = requestDate;

            leaveRequest.SetConcurrencyStampIfNotNull(concurrencyStamp);
            return await _leaveRequestRepository.UpdateAsync(leaveRequest);
        }

    }
}