using HRManagementSoftware;
using HRManagementSoftware.Employees;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;
using JetBrains.Annotations;

using Volo.Abp;

namespace HRManagementSoftware.LeaveRequests
{
    public abstract class LeaveRequestBase : FullAuditedAggregateRoot<Guid>
    {
        public virtual LeaveType LeaveType { get; set; }

        public virtual LeaveStatus LeaveStatus { get; set; }

        public virtual DateTime StartDate { get; set; }

        public virtual DateTime EndDate { get; set; }

        [NotNull]
        public virtual string Reason { get; set; }

        public virtual DateTime RequestDate { get; set; }
        public Guid? EmployeeId { get; set; }

        protected LeaveRequestBase()
        {

        }

        public LeaveRequestBase(Guid id, Guid? employeeId, LeaveType leaveType, LeaveStatus leaveStatus, DateTime startDate, DateTime endDate, string reason, DateTime requestDate)
        {

            Id = id;
            Check.NotNull(reason, nameof(reason));
            Check.Length(reason, nameof(reason), LeaveRequestConsts.ReasonMaxLength, LeaveRequestConsts.ReasonMinLength);
            LeaveType = leaveType;
            LeaveStatus = leaveStatus;
            StartDate = startDate;
            EndDate = endDate;
            Reason = reason;
            RequestDate = requestDate;
            EmployeeId = employeeId;
        }

    }
}