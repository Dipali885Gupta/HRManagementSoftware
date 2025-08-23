using HRManagementSoftware;
using System;
using System.Collections.Generic;

using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Entities;

namespace HRManagementSoftware.LeaveRequests
{
    public abstract class LeaveRequestDtoBase : FullAuditedEntityDto<Guid>, IHasConcurrencyStamp
    {
        public LeaveType LeaveType { get; set; }
        public LeaveStatus LeaveStatus { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Reason { get; set; } = null!;
        public DateTime RequestDate { get; set; }
        public Guid? EmployeeId { get; set; }

        public string ConcurrencyStamp { get; set; } = null!;

    }
}