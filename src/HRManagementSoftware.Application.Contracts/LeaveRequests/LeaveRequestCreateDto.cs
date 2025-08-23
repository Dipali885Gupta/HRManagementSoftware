using HRManagementSoftware;
using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace HRManagementSoftware.LeaveRequests
{
    public abstract class LeaveRequestCreateDtoBase
    {
        public LeaveType LeaveType { get; set; } = ((LeaveType[])Enum.GetValues(typeof(LeaveType)))[0];
        public LeaveStatus LeaveStatus { get; set; } = ((LeaveStatus[])Enum.GetValues(typeof(LeaveStatus)))[0];
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        [Required]
        [StringLength(LeaveRequestConsts.ReasonMaxLength, MinimumLength = LeaveRequestConsts.ReasonMinLength)]
        public string Reason { get; set; } = null!;
        public DateTime RequestDate { get; set; }
        public Guid? EmployeeId { get; set; }
    }
}